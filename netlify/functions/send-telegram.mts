import type { Context } from "@netlify/functions";

const AGENT_PRIVATE_ID_MAP: Record<string, string> = {
  "arek": "0", "abby": "0", "travis": "0", "jake": "0", "carolyn": "0"
};

export default async (req: Request, context: Context) => {
  const token = Netlify.env.get("TELEGRAM_BOT_TOKEN");
  const adminChatId = Netlify.env.get("TELEGRAM_ADMIN_CHAT_ID") || "-1003377773133";
  const adminThreadId = Netlify.env.get("TELEGRAM_THREAD_ID");

  // 1. DIAGNOSTIC PANEL (GET)
  if (req.method === "GET") {
    const url = new URL(req.url);
    if (url.searchParams.get("test") === "true") {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: adminChatId,
          message_thread_id: adminThreadId,
          text: "🧪 <b>V2 Diagnostic Lead</b>\nServer-to-Telegram connection is OK.",
          parse_mode: "HTML"
        })
      });
      return new Response(JSON.stringify(await res.json()), { headers: { "Content-Type": "application/json" } });
    }
    return new Response(`
      <html><body style="font-family:sans-serif;padding:50px;">
        <h1>🤖 V2 Bot Diagnostic</h1>
        <p>Status: <b>ALIVE</b></p>
        <p>Chat ID: <code>${adminChatId}</code></p>
        <hr/>
        <a href="?test=true" style="padding:10px 20px;background:#10b981;color:white;text-decoration:none;border-radius:5px;">Send Test Lead</a>
      </body></html>
    `, { headers: { "Content-Type": "text/html" } });
  }

  // 2. LEAD PROCESSING (POST)
  if (req.method !== "POST") return new Response("POST Required", { status: 405 });

  try {
    const payload = await req.json();
    
    // Handle Webhook
    if (payload.message || payload.callback_query) {
      if (payload.message?.text?.toLowerCase().includes("id")) {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: payload.message.chat.id,
            message_thread_id: payload.message.message_thread_id,
            text: `🤖 <b>V2 Engine</b>\nID: <code>${payload.message.chat.id}</code>`,
            parse_mode: "HTML"
          })
        });
      }
      return new Response(JSON.stringify({ ok: true }));
    }

    // Process Lead
    const agentId = payload.agentId || "";
    const targetChatId = (agentId && AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] && AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] !== "0") 
      ? AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] 
      : adminChatId;
    
    let text = payload.text;
    if (!text) {
      const name = (payload.firstName || payload.name || "Unknown").toString().replace(/&/g, "&amp;");
      const email = (payload.email || "N/A").toString().replace(/&/g, "&amp;");
      const msg = (payload.message || "None").toString().replace(/&/g, "&amp;");
      text = `🏠 <b>New Lead</b>\n\n👤 <b>Name:</b> ${name}\n📧 <b>Email:</b> ${email}\n💬 <b>Message:</b> ${msg}`;
    } else {
      text = text.replace(/&/g, "&amp;");
    }

    if (agentId) text = `🔔 <b>FOR: ${agentId.toUpperCase()}</b>\n\n${text}`;

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: targetChatId,
        message_thread_id: targetChatId === adminChatId ? adminThreadId : undefined,
        text: text,
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: [[{ text: "✅ Handled", callback_data: "ok" }]] }
      })
    });

    const result = await response.json();
    if (!result.ok) {
        // Retry without HTML/Keyboard
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: targetChatId,
                message_thread_id: targetChatId === adminChatId ? adminThreadId : undefined,
                text: "⚠️ Lead: " + text.replace(/<[^>]*>?/gm, '')
            })
        });
    }

    return new Response(JSON.stringify({ status: "success", result }), { status: 200 });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
