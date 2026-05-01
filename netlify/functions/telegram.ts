import type { Context, Config } from "@netlify/functions";

const AGENT_PRIVATE_ID_MAP: Record<string, string> = {
  "arek": "0", "abby": "0", "travis": "0", "jake": "0", "carolyn": "0"
};

export default async (req: Request, context: Context) => {
  const token = Netlify.env.get("TELEGRAM_BOT_TOKEN");
  const adminChatId = Netlify.env.get("TELEGRAM_ADMIN_CHAT_ID") || "-1003377773133";
  const adminThreadId = Netlify.env.get("TELEGRAM_THREAD_ID");

  if (!token) {
    return new Response(JSON.stringify({ error: "Missing Token" }), { status: 500 });
  }

  // GET: Setup Webhook easily
  if (req.method === "GET") {
     const url = new URL(req.url);
     if (url.searchParams.get("setup") === "webhook") {
        const webhookUrl = `https://${url.hostname}/api/telegram`;
        const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${webhookUrl}`);
        const result = await res.json();
        return new Response(JSON.stringify({ message: "Webhook setup attempt", result }));
     }
     return new Response("Bot Engine Online");
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405 });
  }

  try {
    const payload = await req.json();

    // ─── WEBHOOK HANDLER: BUTTON CLICKS ───
    if (payload.callback_query) {
       const cb = payload.callback_query;
       const msgId = cb.message?.message_id;
       const chatId = cb.message?.chat?.id;
       const user = cb.from?.first_name || cb.from?.username || "An Agent";
       
       if (cb.data === "handled" && msgId && chatId) {
          // Extract original text (it comes unformatted from Telegram API)
          const originalText = cb.message?.text || "Lead Details";
          // Create the "Handled" overlay
          const newText = `✅ <b>HANDLED BY ${user.toUpperCase()}</b>\n\n<s>${originalText}</s>`;
          
          // 1. Edit the original message to show it's handled (and remove the button)
          await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({
                chat_id: chatId,
                message_id: msgId,
                text: newText,
                parse_mode: "HTML",
                reply_markup: { inline_keyboard: [] } // Remove the button
             })
          });
          
          // 2. Answer the callback to stop the loading spinner on the user's phone
          await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({
                callback_query_id: cb.id,
                text: "Lead marked as handled!"
             })
          });
       }
       return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
    }

    // ─── STANDARD LEAD SUBMISSION ───
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
      text = text.replace(/&/g, "&amp;"); 
    }

    if (agentId) text = `🔔 <b>FOR: ${agentId.toUpperCase()}</b>\n\n${text}`;

    // Attach the "Mark as Handled" button
    const body: any = {
      chat_id: targetChatId,
      text: text,
      parse_mode: "HTML",
      reply_markup: { 
         inline_keyboard: [[{ text: "✅ Mark as Handled", callback_data: "handled" }]] 
      }
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
