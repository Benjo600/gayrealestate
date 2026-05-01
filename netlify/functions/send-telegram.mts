import { Handler } from "@netlify/functions";

const AGENT_PRIVATE_ID_MAP: Record<string, string> = {
  "arek": "0", "abby": "0", "travis": "0", "jake": "0", "carolyn": "0"
};

function safeHTML(text: string = ""): string {
  return text.toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const handler: Handler = async (event) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID || "-1003377773133";
  const adminThreadId = process.env.TELEGRAM_THREAD_ID ? parseInt(process.env.TELEGRAM_THREAD_ID) : undefined;

  // 1. HEALTH CHECK (GET)
  if (event.httpMethod === "GET") {
    return { statusCode: 200, body: "Telegram Bot is Active." };
  }

  if (event.httpMethod !== "POST" || !token) {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const payload = JSON.parse(event.body || "{}");

    // 2. WEBHOOK HANDLING
    const isTelegram = !!(payload.update_id || payload.message || payload.callback_query);
    if (isTelegram) {
      if (payload.message?.text?.toLowerCase().includes("id")) {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: payload.message.chat.id,
            message_thread_id: payload.message.message_thread_id,
            text: `🤖 <b>Bot Connected</b>\nID: <code>${payload.message.chat.id}</code>`,
            parse_mode: "HTML"
          })
        });
      }
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    // 3. LEAD PROCESSING
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
      messageText = payload.text.replace(/&/g, "&amp;");
    }

    if (agentId) messageText = `🔔 <b>FOR: ${agentId.toUpperCase()}</b>\n\n${messageText}`;

    const send = async (cid: string, tid?: number, html = true) => {
      const body: any = { chat_id: cid, text: messageText };
      if (tid) body.message_thread_id = tid;
      if (html) {
        body.parse_mode = "HTML";
        body.reply_markup = { inline_keyboard: [[{ text: "✅ Attended", callback_data: "ok" }]] };
      }
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      return await res.json();
    };

    let result = await send(targetChatId, targetThreadId, true);

    // Fallback: If HTML failed, try plain text
    if (!result.ok) {
      result = await send(targetChatId, targetThreadId, false);
    }

    if (result.ok) {
      if (targetChatId !== adminChatId) await send(adminChatId, adminThreadId, true);
      return { statusCode: 200, body: JSON.stringify({ status: "success" }) };
    }

    return { statusCode: 500, body: JSON.stringify({ error: result.description }) };

  } catch (error: any) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};

export { handler };
