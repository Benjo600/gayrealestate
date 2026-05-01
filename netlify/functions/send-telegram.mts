import type { Context, Config } from "@netlify/functions";

const AGENT_PRIVATE_ID_MAP: Record<string, string> = {
  "arek": "0", "abby": "0", "travis": "0", "jake": "0", "carolyn": "0"
};

function safeHTML(text: string = ""): string {
  return text.toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default async (req: Request, context: Context) => {
  // 1. CONFIGURATION
  const token = Netlify.env.get("TELEGRAM_BOT_TOKEN");
  const adminChatId = Netlify.env.get("TELEGRAM_ADMIN_CHAT_ID") || "-1003377773133";
  const adminThreadId = Netlify.env.get("TELEGRAM_THREAD_ID");

  // 2. HEALTH CHECK (GET)
  if (req.method === "GET") {
    const url = new URL(req.url);
    if (url.searchParams.get("test") === "true") {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: adminChatId,
          message_thread_id: adminThreadId,
          text: "🏠 <b>V2 Engine Test</b>\nSystem rewiring successful.",
          parse_mode: "HTML"
        })
      });
      const data = await res.json();
      return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
    }
    return new Response("Telegram Bot V2 is Active.");
  }

  // 3. LEAD PROCESSING (POST)
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const payload = await req.json();
    console.log("Lead Payload:", payload);

    // Handle Telegram Webhook (if Telegram sends data here)
    if (payload.message || payload.callback_query) {
      if (payload.message?.text?.toLowerCase().includes("id")) {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: payload.message.chat.id,
            message_thread_id: payload.message.message_thread_id,
            text: `🤖 <b>V2 Bot Active</b>\nID: <code>${payload.message.chat.id}</code>`,
            parse_mode: "HTML"
          })
        });
      }
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // --- PROCESS REAL LEAD ---
    const agentId = payload.agentId || "";
    const targetChatId = (agentId && AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] && AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] !== "0")
      ? AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()]
      : adminChatId;
    const targetThreadId = (targetChatId === adminChatId) ? adminThreadId : undefined;

    let messageText = payload.text;
    if (!messageText) {
      const name = safeHTML(payload.firstName || payload.name || "Unknown");
      const email = safeHTML(payload.email || "N/A");
      const phone = safeHTML(payload.phone || "N/A");
      const msg = safeHTML(payload.message || "None");
      messageText = `🏠 <b>Website Lead</b>\n\n👤 <b>Name:</b> ${name}\n📧 <b>Email:</b> ${email}\n📞 <b>Phone:</b> ${phone}\n💬 <b>Message:</b> ${msg}`;
    } else {
      // Basic ampersand fix for pre-formatted text
      messageText = payload.text.replace(/&/g, "&amp;");
    }

    if (agentId) messageText = `🔔 <b>FOR: ${agentId.toUpperCase()}</b>\n\n${messageText}`;

    // Helper for sending
    const send = async (cid: string, tid?: string | null, html = true) => {
      const body: any = { chat_id: cid, text: messageText };
      if (tid) body.message_thread_id = parseInt(tid);
      if (html) {
        body.parse_mode = "HTML";
        body.reply_markup = { inline_keyboard: [[{ text: "✅ Attended", callback_data: "ok" }]] };
      }
      return fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }).then(r => r.json());
    };

    let result = await send(targetChatId, targetThreadId, true);

    // Fallback: If HTML failed, try plain text
    if (!result.ok) {
      console.warn("HTML message failed, retrying plain text:", result.description);
      result = await send(targetChatId, targetThreadId, false);
    }

    if (result.ok) {
      // Dual delivery to admin if targeted at specific agent
      if (targetChatId !== adminChatId) {
        await send(adminChatId, adminThreadId, true);
      }
      return new Response(JSON.stringify({ status: "success" }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: result.description }), { status: 500 });

  } catch (error: any) {
    console.error("V2 Handler Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const config: Config = {
  path: "/api/send-telegram"
};
