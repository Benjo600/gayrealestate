import type { Context, Config } from "@netlify/functions";

const AGENT_PRIVATE_ID_MAP: Record<string, string> = {
  "arek": "0", "abby": "0", "travis": "0", "jake": "0", "carolyn": "0"
};

export default async (req: Request, context: Context) => {
  const token = Netlify.env.get("TELEGRAM_BOT_TOKEN");
  const adminChatId = Netlify.env.get("TELEGRAM_ADMIN_CHAT_ID") || "-1003377773133";
  const adminThreadId = Netlify.env.get("TELEGRAM_THREAD_ID");

  // GET: Health Check
  if (req.method === "GET") {
    return new Response("API Leads Engine is Online.");
  }

  // POST: Lead Processing
  if (req.method !== "POST") return new Response("POST Required", { status: 405 });

  try {
    const payload = await req.json();
    console.log("Processing Lead:", payload);

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

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
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

    const result = await res.json();
    return new Response(JSON.stringify(result), { status: result.ok ? 200 : 500 });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const config: Config = {
  path: "/api/leads"
};
