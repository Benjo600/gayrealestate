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
    
    const host = event.headers.host || "www.gayrealestatect.net";
    const protocol = event.headers["x-forwarded-proto"] || "https";
    const currentUrl = `${protocol}://${host}/.netlify/functions/send-telegram`;

    // ════════════════════════════════════════════════════════════════════════
    // DEBUG TOOLS (GET)
    // ════════════════════════════════════════════════════════════════════════
    if (event.httpMethod === "GET") {
        const query = event.queryStringParameters || {};
        
        if (query.setWebhook === "true") {
            const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(currentUrl)}`);
            return { statusCode: 200, body: JSON.stringify(await res.json()) };
        }

        // 🧪 TEST SENDING A LEAD
        if (query.test === "true") {
            const testText = "🧪 <b>TEST LEAD</b>\nThis is a diagnostic message from the server.";
            const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: adminChatId,
                    message_thread_id: adminThreadId,
                    text: testText,
                    parse_mode: 'HTML'
                }),
            });
            return { statusCode: 200, body: JSON.stringify({ action: "test_send", result: await res.json() }) };
        }

        return { 
            statusCode: 200, 
            body: `<html><body style="font-family:sans-serif;padding:40px;background:#f4f4f9;">
                <h1>🤖 Bot Debug Panel</h1>
                <p>Status: <b>ALIVE</b></p>
                <p>Token: <code>${token ? '✅ Loaded' : '❌ MISSING'}</code></p>
                <p>Chat ID: <code>${adminChatId}</code></p>
                <p>Thread ID: <code>${adminThreadId || 'None'}</code></p>
                <hr/>
                <a href="?setWebhook=true" style="display:inline-block;padding:10px 20px;background:#6366f1;color:white;text-decoration:none;border-radius:5px;margin-right:10px;">Reconnect Webhook</a>
                <a href="?test=true" style="display:inline-block;padding:10px 20px;background:#10b981;color:white;text-decoration:none;border-radius:5px;">Send Test Lead</a>
            </body></html>`,
            headers: { "Content-Type": "text/html" }
        };
    }

    if (event.httpMethod !== "POST" || !token) return { statusCode: 405, body: "Not Allowed" };

    try {
        const payload = JSON.parse(event.body || "{}");
        const isTelegram = !!(payload.update_id || payload.message || payload.callback_query);

        if (isTelegram) {
            // Handle /id command
            if (payload.message && payload.message.text && payload.message.text.toLowerCase().includes("id")) {
                await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: payload.message.chat.id,
                        message_thread_id: payload.message.message_thread_id,
                        text: `✅ <b>ID Check</b>\nChat: <code>${payload.message.chat.id}</code>\nTopic: <code>${payload.message.message_thread_id || 'None'}</code>`,
                        parse_mode: 'HTML'
                    }),
                });
            }
            return { statusCode: 200, body: JSON.stringify({ ok: true }) };
        }

        // REAL LEAD SUBMISSION
        const agentId = payload.agentId;
        const privateChatId = agentId ? AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] : undefined;
        const targetChatId = (privateChatId && privateChatId !== "0") ? privateChatId : adminChatId;
        const targetThreadId = (targetChatId === adminChatId) ? adminThreadId : undefined;

        let messageText = payload.text || `🏠 <b>New Website Lead</b>\nName: ${escapeHTML(payload.firstName || payload.name || "Unknown")}\nEmail: ${escapeHTML(payload.email || "N/A")}\nPhone: ${escapeHTML(payload.phone || "N/A")}`;
        if (agentId) messageText = `🔔 <b>FOR: ${agentId.toUpperCase()}</b>\n\n${messageText}`;

        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: targetChatId,
                message_thread_id: targetThreadId,
                text: messageText,
                parse_mode: 'HTML',
                reply_markup: { inline_keyboard: [[{ text: "✅ Mark as Attended", callback_data: "handled" }]] }
            }),
        });
        
        const result = await res.json();
        
        // Fallback if keyboard fails
        if (!result.ok) {
            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: targetChatId,
                    message_thread_id: targetThreadId,
                    text: messageText,
                    parse_mode: 'HTML'
                }),
            });
        }

        return { statusCode: 200, body: JSON.stringify({ status: "success" }) };
    } catch (error: any) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};

export { handler };
