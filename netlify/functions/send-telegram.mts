import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  // 1. CONFIGURATION
  const token = Netlify.env.get("TELEGRAM_BOT_TOKEN");
  const adminChatId = Netlify.env.get("TELEGRAM_ADMIN_CHAT_ID") || "-1003377773133";
  const adminThreadId = Netlify.env.get("TELEGRAM_THREAD_ID");

  // 2. HEALTH CHECK (GET)
  if (req.method === "GET") {
    return new Response("Bot is ALIVE and using Modern V2 Engine.");
  }

  // 3. POST HANDLER
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const payload = await req.json();
    console.log("Incoming Payload:", payload);

    // --- WEBHOOK HANDLING (/id command) ---
    if (payload.message || payload.callback_query) {
      if (payload.message?.text?.toLowerCase().includes("id")) {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: payload.message.chat.id,
            message_thread_id: payload.message.message_thread_id,
            text: `🤖 <b>V2 Bot Active</b>\nChat ID: <code>${payload.message.chat.id}</code>`,
            parse_mode: "HTML"
          })
        });
      }
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // --- REAL LEAD PROCESSING ---
    const name = payload.firstName || payload.name || "Unknown";
    const email = payload.email || "N/A";
    const phone = payload.phone || "N/A";
    const msg = payload.message || "None";
    const location = payload.location || "N/A";

    const text = `🏠 <b>Website Lead</b>\n\n👤 <b>Name:</b> ${name}\n📧 <b>Email:</b> ${email}\n📞 <b>Phone:</b> ${phone}\n📍 <b>Location:</b> ${location}\n💬 <b>Message:</b> ${msg}`.replace(/&/g, "&amp;");

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: adminChatId,
        message_thread_id: adminThreadId,
        text: text,
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: [[{ text: "✅ Handled", callback_data: "ok" }]] }
      })
    });

    const result = await response.json();
    if (result.ok) {
      return new Response(JSON.stringify({ status: "success" }), { status: 200 });
    }

    // Fallback if HTML fails
    const retry = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: adminChatId,
        message_thread_id: adminThreadId,
        text: "⚠️ Lead (Plain Text): " + text.replace(/<[^>]*>?/gm, '')
      })
    });

    const retryResult = await retry.json();
    return new Response(JSON.stringify(retryResult), { status: retryResult.ok ? 200 : 500 });

  } catch (error: any) {
    console.error("V2 Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
