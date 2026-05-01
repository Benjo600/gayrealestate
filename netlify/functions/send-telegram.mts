import { Handler } from "@netlify/functions";

const AGENT_PRIVATE_ID_MAP: Record<string, string> = {
    "arek": "0", "abby": "0", "travis": "0", "jake": "0", "carolyn": "0"
};

/**
 * Safely handles HTML escaping for Telegram.
 */
function safeHTML(text: string = ""): string {
    return text.toString()
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const handler: Handler = async (event) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID || "-1003377773133";
    const adminThreadId = process.env.TELEGRAM_THREAD_ID ? parseInt(process.env.TELEGRAM_THREAD_ID) : undefined;
    
    // --- DIAGNOSTICS (GET) ---
    if (event.httpMethod === "GET") {
        return { 
            statusCode: 200, 
            body: `<html><body style="font-family:sans-serif;padding:40px;">
                <h1>🛠️ Lead Debugger</h1>
                <p>Status: <b>ALIVE</b></p>
                <p>Config: Chat=${adminChatId}, Thread=${adminThreadId || 'None'}</p>
                <a href="?test=true">Send Test Lead</a>
            </body></html>`,
            headers: { "Content-Type": "text/html" }
        };
    }

    if (event.httpMethod !== "POST") return { statusCode: 405, body: "POST Required" };
    if (!token) return { statusCode: 500, body: "Missing Token" };

    try {
        console.log("--- INCOMING REQUEST ---");
        const payload = JSON.parse(event.body || "{}");
        console.log("Payload Received:", JSON.stringify(payload, null, 2));

        // 1. TELEGRAM WEBHOOK (Commands)
        if (payload.message || payload.callback_query) {
            return { statusCode: 200, body: JSON.stringify({ ok: true }) };
        }

        // 2. LEAD PROCESSING
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
            // If text comes from frontend, we still need to make it safe but preserve bold
            messageText = payload.text.replace(/&/g, "&amp;"); 
        }

        if (agentId) messageText = `🔔 <b>FOR: ${agentId.toUpperCase()}</b>\n\n${messageText}`;

        // SEND ATTEMPT 1: With HTML & Keyboard
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: targetChatId,
                message_thread_id: targetThreadId,
                text: messageText,
                parse_mode: 'HTML',
                reply_markup: { inline_keyboard: [[{ text: "✅ Handled", callback_data: "ok" }]] }
            }),
        });
        
        const result = await res.json();
        console.log("Telegram Response:", JSON.stringify(result));

        if (result.ok) {
            return { statusCode: 200, body: JSON.stringify({ status: "success", info: "Delivered to Telegram" }) };
        }

        // SEND ATTEMPT 2: Plain Text Fallback (No HTML, No Buttons)
        const retryRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: targetChatId,
                message_thread_id: targetThreadId,
                text: "⚠️ (Format Fallback) " + messageText.replace(/<[^>]*>?/gm, ''), 
            }),
        });

        const retryResult = await retryRes.json();
        if (retryResult.ok) {
            return { statusCode: 200, body: JSON.stringify({ status: "success", info: "Delivered as Plain Text" }) };
        }

        // FINAL FAILURE
        return { 
            statusCode: 500, 
            body: JSON.stringify({ 
                error: "Telegram rejected lead completely", 
                details: retryResult.description,
                payload_debug: payload 
            }) 
        };

    } catch (err: any) {
        console.error("Function Error:", err);
        return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
};

export { handler };
