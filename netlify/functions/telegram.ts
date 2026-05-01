import type { Context, Config } from "@netlify/functions";

const AGENT_PRIVATE_ID_MAP: Record<string, string> = {
  "arek": "0", "abby": "0", "travis": "0", "jake": "0", "carolyn": "0"
};

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405 });
  }

  try {
    const payload = await req.json();
    const token = Netlify.env.get("TELEGRAM_BOT_TOKEN");
    const adminChatId = Netlify.env.get("TELEGRAM_ADMIN_CHAT_ID") || "-1003377773133";
    const adminThreadId = Netlify.env.get("TELEGRAM_THREAD_ID");

    if (!token) {
      return new Response(JSON.stringify({ error: "Missing Token" }), { status: 500 });
    }

    const agentId = payload.agentId || "";
    const targetChatId = (agentId && AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] && AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] !== "0") 
      ? AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] 
      : adminChatId;
    
    let text = payload.text || "";

    const safeHTML = (str: any) => {
       if (!str) return "N/A";
       return str.toString()
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;");
    };

    if (!text) {
      // Main Enquiry Form payload
      const fn = payload.firstName || "";
      const ln = payload.lastName || "";
      const name = `${fn} ${ln}`.trim() || payload.name || "Unknown";
      
      const email = payload.email;
      const phone = payload.phone;
      const interest = payload.interest;
      const location = payload.location;
      const msg = payload.message;
      
      text = `🏠 <b>NEW LEAD (MAIN FORM)</b>\n\n` +
             `👤 <b>Name:</b> ${safeHTML(name)}\n` +
             `📞 <b>Phone:</b> ${safeHTML(phone)}\n` +
             `📧 <b>Email:</b> ${safeHTML(email)}\n` +
             `🎯 <b>Interest:</b> ${safeHTML(interest)}\n` +
             `📍 <b>Location:</b> ${safeHTML(location)}\n\n` +
             `💬 <b>Message:</b>\n${safeHTML(msg)}`;
    } else {
      // ContactModal pre-formatted text: We don't want to double-escape structural HTML tags.
      // The frontend should ideally send clean text, but it's sending raw HTML.
      // We'll trust the frontend HTML and NOT replace < and > to preserve the bolding.
      text = text.replace(/&/g, "&amp;"); 
    }

    if (agentId) text = `🔔 <b>FOR: ${agentId.toUpperCase()}</b>\n\n${text}`;

    const body: any = {
      chat_id: targetChatId,
      text: text,
      parse_mode: "HTML"
    };

    if (targetChatId === adminChatId && adminThreadId) {
      body.message_thread_id = parseInt(adminThreadId);
    }

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const result = await res.json();
    
    if (!result.ok) {
       console.warn("HTML delivery failed", result.description);
       const plainTextBody: any = {
          chat_id: targetChatId,
          text: "⚠️ (Plain Text)\n\n" + text.replace(/<[^>]*>?/gm, '')
       };
       if (targetChatId === adminChatId && adminThreadId) {
          plainTextBody.message_thread_id = parseInt(adminThreadId);
       }
       const retry = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(plainTextBody)
       });
       const retryResult = await retry.json();
       if (!retryResult.ok) {
           return new Response(JSON.stringify({ error: retryResult.description }), { status: 500 });
       }
    }

    return new Response(JSON.stringify({ status: "success" }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: any) {
    console.error("V2 Proxy Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const config: Config = {
  path: "/api/telegram"
};
