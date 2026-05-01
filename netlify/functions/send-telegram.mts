import { Handler } from "@netlify/functions";

const AGENT_PRIVATE_ID_MAP: Record<string, string> = {
    "arek": "0", "abby": "0", "travis": "0", "jake": "0", "carolyn": "0"
};

function escapeHTML(text: string = ""): string {
    return text.toString()
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

const handler: Handler = async (event) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID || "-1003377773133";
    const adminThreadId = process.env.TELEGRAM_THREAD_ID ? parseInt(process.env.TELEGRAM_THREAD_ID) : undefined;
    
    // DEBUG PANEL (GET)
    if (event.httpMethod === "GET") {
        const query = event.queryStringParameters || {};
        if (query.test === "true") {
            const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: adminChatId, message_thread_id: adminThreadId, text: "🏠 <b>Diagnostic Test</b>\nReal-world formatting check.", parse_mode: 'HTML' }),
            });
            return { statusCode: 200, body: JSON.stringify(await res.json()) };
        }
        return { statusCode: 200, body: "Bot is Alive. Use POST for leads." };
    }

    if (event.httpMethod !== "POST" || !token) return { statusCode: 405, body: "Not Allowed" };

    try {
        const payload = JSON.parse(event.body || "{}");
        
        // Handle Telegram Webhook (ID Check)
        if (payload.message || payload.callback_query) {
            if (payload.message?.text?.toLowerCase().includes("id")) {
                await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: payload.message.chat.id, message_thread_id: payload.message.message_thread_id, text: `✅ <b>Bot ID Check</b>\nChat: <code>${payload.message.chat.id}</code>`, parse_mode: 'HTML' }),
                });
            }
            return { statusCode: 200, body: JSON.stringify({ ok: true }) };
        }

        // --- REAL LEAD PROCESSING ---
        const agentId = payload.agentId || "";
        const targetChatId = (agentId && AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] && AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] !== "0") 
            ? AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] 
            : adminChatId;
        const targetThreadId = (targetChatId === adminChatId) ? adminThreadId : undefined;

        let text = payload.text;
        if (!text) {
            const fName = escapeHTML(payload.firstName || payload.name || "Unknown");
            const lName = escapeHTML(payload.lastName || "");
            const email = escapeHTML(payload.email || "N/A");
            const phone = escapeHTML(payload.phone || "N/A");
            const interest = escapeHTML(payload.interest || "N/A");
            const msg = escapeHTML(payload.message || "None");
            
            text = `🏠 <b>New Website Enquiry</b>\n\n👤 <b>Name:</b> ${fName} ${lName}\n📧 <b>Email:</b> ${email}\n📞 <b>Phone:</b> ${phone}\n🎯 <b>Interest:</b> ${interest}\n💬 <b>Message:</b> ${msg}`;
        }

        if (agentId) text = `🔔 <b>FOR: ${agentId.toUpperCase()}</b>\n\n${text}`;

        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: targetChatId,
                message_thread_id: targetThreadId,
                text: text,
                parse_mode: 'HTML',
                reply_markup: { inline_keyboard: [[{ text: "✅ Attended", callback_data: "handled" }]] }
            }),
        });
        
        const result = await res.json();
        
        // Final fallback if the keyboard causes an error
        if (!result.ok) {
            const retry = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: targetChatId, message_thread_id: targetThreadId, text: text, parse_mode: 'HTML' }),
            });
            return { statusCode: 200, body: JSON.stringify(await retry.json()) };
        }

        return { statusCode: 200, body: JSON.stringify({ status: "success", telegram: result }) };

    } catch (error: any) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};

export { handler };
