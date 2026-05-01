import { Handler } from "@netlify/functions";

const AGENT_PRIVATE_ID_MAP: Record<string, string> = {
    "arek": "0", "abby": "0", "travis": "0", "jake": "0", "carolyn": "0"
};

/**
 * Safely escapes text for Telegram HTML mode, while preserving <b> and <i> tags if they were already there.
 */
function safeTelegramHTML(text: string = ""): string {
    return text.toString()
        .replace(/&(?!(amp|lt|gt|quot|#039);)/g, "&amp;") // Escape & only if not already escaped
        .replace(/<(?!\/?(b|i|u|code|pre|a|ins|strike|s|tg-spoiler)>)/g, "&lt;") // Escape < only if not a supported tag
        .replace(/>(?<!<(b|i|u|code|pre|a|ins|strike|s|tg-spoiler))>/g, "&gt;"); // Escape > only if not part of a tag
}

function escapeHTML(text: string = ""): string {
    return text.toString()
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

const handler: Handler = async (event) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID || "-1003377773133";
    const adminThreadId = process.env.TELEGRAM_THREAD_ID ? parseInt(process.env.TELEGRAM_THREAD_ID) : undefined;
    
    if (event.httpMethod === "GET") {
        return { statusCode: 200, body: "Bot is Alive." };
    }

    if (event.httpMethod !== "POST" || !token) return { statusCode: 405, body: "Not Allowed" };

    try {
        const payload = JSON.parse(event.body || "{}");
        const isTelegram = !!(payload.update_id || payload.message || payload.callback_query);

        if (isTelegram) {
            // Handle /id command
            if (payload.message?.text?.toLowerCase().includes("id")) {
                await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: payload.message.chat.id, message_thread_id: payload.message.message_thread_id, text: `✅ <b>ID Check</b>\nChat: <code>${payload.message.chat.id}</code>`, parse_mode: 'HTML' }),
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

        let messageText = "";
        
        // If frontend sends pre-formatted text (like ContactModal)
        if (payload.text) {
            messageText = safeTelegramHTML(payload.text);
        } else {
            // Build from fields (like EnquiryForm)
            const fName = escapeHTML(payload.firstName || payload.name || "Unknown");
            const lName = escapeHTML(payload.lastName || "");
            const email = escapeHTML(payload.email || "N/A");
            const phone = escapeHTML(payload.phone || "N/A");
            const interest = escapeHTML(payload.interest || "N/A");
            const location = escapeHTML(payload.location || "N/A");
            const msg = escapeHTML(payload.message || "None");
            
            messageText = `🏠 <b>New Website Enquiry</b>\n\n👤 <b>Name:</b> ${fName} ${lName}\n📧 <b>Email:</b> ${email}\n📞 <b>Phone:</b> ${phone}\n🎯 <b>Interest:</b> ${interest}\n📍 <b>Location:</b> ${location}\n💬 <b>Message:</b> ${msg}`;
        }

        if (agentId) messageText = `🔔 <b>FOR: ${agentId.toUpperCase()}</b>\n\n${messageText}`;

        const sendMessage = async (cid: string, tid?: number, useHTML = true) => {
            const body: any = {
                chat_id: cid,
                message_thread_id: tid,
                text: messageText,
            };
            if (useHTML) {
                body.parse_mode = 'HTML';
                body.reply_markup = { inline_keyboard: [[{ text: "✅ Attended", callback_data: "handled" }]] };
            }

            const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            return await res.json();
        };

        let result = await sendMessage(targetChatId, targetThreadId, true);
        
        // Fallback 1: Try without HTML formatting (Plain Text) if it failed
        if (!result.ok) {
            console.error("HTML Send Failed, retrying plain text...", result);
            result = await sendMessage(targetChatId, targetThreadId, false);
        }

        if (result.ok) {
            if (targetChatId !== adminChatId) await sendMessage(adminChatId, adminThreadId, true);
            return { statusCode: 200, body: JSON.stringify({ status: "success" }) };
        } else {
            return { statusCode: 500, body: JSON.stringify({ error: result.description }) };
        }

    } catch (error: any) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};

export { handler };
