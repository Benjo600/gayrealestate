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
    if (!text) {
      const name = (payload.firstName || payload.name || "Unknown").toString().replace(/&/g, "&amp;");
      const email = (payload.email || "N/A").toString().replace(/&/g, "&amp;");
      const phone = (payload.phone || "N/A").toString().replace(/&/g, "&amp;");
      const msg = (payload.message || "None").toString().replace(/&/g, "&amp;");
      text = `🏠 <b>New Lead</b>\n\n👤 <b>Name:</b> ${name}\n📧 <b>Email:</b> ${email}\n📞 <b>Phone:</b> ${phone}\n💬 <b>Message:</b> ${msg}`;
    } else {
      text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
