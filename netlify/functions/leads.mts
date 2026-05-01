import type { Handler } from "@netlify/functions";

const AGENT_PRIVATE_ID_MAP: Record<string, string> = {
  "arek": "0", "abby": "0", "travis": "0", "jake": "0", "carolyn": "0"
};

function safeHTML(text: string = ""): string {
  return text.toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export const handler: Handler = async (event) => {
  // Use process.env for V1 functions
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID || "-1003377773133";
  const adminThreadId = process.env.TELEGRAM_THREAD_ID ? parseInt(process.env.TELEGRAM_THREAD_ID) : undefined;

  // GET: Health Check
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify({ status: "V1 API Leads Engine is Online." })
    };
  }

  // POST: Lead Processing
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "POST Required" }) };
  }

  if (!token) {
    return { statusCode: 500, body: JSON.stringify({ error: "Missing Telegram Token" }) };
  }

  try {
    const payload = JSON.parse(event.body || "{}");
    console.log("Processing Lead:", payload);

    const agentId = payload.agentId || "";
    const targetChatId = (agentId && AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] && AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] !== "0") 
      ? AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] 
      : adminChatId;
    
    let text = payload.text;
    if (!text) {
      const name = safeHTML(payload.firstName || payload.name || "Unknown");
      const email = safeHTML(payload.email || "N/A");
      const phone = safeHTML(payload.phone || "N/A");
      const msg = safeHTML(payload.message || "None");
      text = `🏠 <b>New Lead</b>\n\n👤 <b>Name:</b> ${name}\n📧 <b>Email:</b> ${email}\n📞 <b>Phone:</b> ${phone}\n💬 <b>Message:</b> ${msg}`;
    } else {
      text = text.replace(/&/g, "&amp;");
    }

    if (agentId) text = `🔔 <b>FOR: ${agentId.toUpperCase()}</b>\n\n${text}`;

    // Helper to send message
    const sendMsg = async (chatId: string, threadId?: number, html = true) => {
      const body: any = { chat_id: chatId, text: text };
      if (threadId) body.message_thread_id = threadId;
      if (html) {
        body.parse_mode = "HTML";
        body.reply_markup = { inline_keyboard: [[{ text: "✅ Handled", callback_data: "ok" }]] };
      }
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      return response.json();
    };

    let result = await sendMsg(targetChatId, targetChatId === adminChatId ? adminThreadId : undefined, true);

    // Fallback if HTML fails
    if (!result.ok) {
      console.warn("HTML delivery failed, trying plain text. Error:", result.description);
      const plainTextBody: any = {
        chat_id: targetChatId,
        text: "⚠️ (Plain Text Fallback)\n\n" + text.replace(/<[^>]*>?/gm, '')
      };
      if (targetChatId === adminChatId && adminThreadId) {
        plainTextBody["message_thread_id"] = adminThreadId;
      }
      const retry = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plainTextBody)
      });
      result = await retry.json();
    }

    if (result.ok) {
      return { statusCode: 200, body: JSON.stringify({ status: "success" }) };
    } else {
      return { statusCode: 500, body: JSON.stringify({ error: result.description }) };
    }

  } catch (error: any) {
    console.error("V1 Handler Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message || "Unknown error parsing JSON" }) };
  }
};
