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

    if (event.httpMethod === "GET") {
        const query = event.queryStringParameters || {};
        if (query.setWebhook === "true") {
            if (!token) return { statusCode: 500, body: "Missing Token" };
            const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${encodeURIComponent(currentUrl)}`);
            const data = await res.json();
            return { statusCode: 200, body: JSON.stringify({ action: "setWebhook", url: currentUrl, result: data }) };
        }
        return { 
            statusCode: 200, 
            body: JSON.stringify({ 
                status: "alive", 
                config: { hasToken: !!token, adminChatId, adminThreadId }
            }) 
        };
    }

    if (event.httpMethod !== "POST" || !token) {
        return { statusCode: 405, body: "Not Allowed" };
    }

    try {
        const payload = JSON.parse(event.body || "{}");
        const isTelegram = !!(payload.update_id || payload.message || payload.callback_query);

        if (isTelegram) {
            if (payload.callback_query) {
                const cb = payload.callback_query;
                const msg = cb.message;
                const agentName = cb.from.first_name || "Agent";
                const newText = `${msg.text}\n\n✅ <b>HANDLED BY:</b> ${escapeHTML(agentName)}`;
                await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: msg.chat.id,
                        message_id: msg.message_id,
                        text: newText,
                        parse_mode: 'HTML'
                    }),
                });
            } else if (payload.message && payload.message.text) {
                const chatId = payload.message.chat.id;
                const threadId = payload.message.message_thread_id;
                const text = payload.message.text.toLowerCase();

                if (text.includes("id") || text.includes("start") || text.includes("ping")) {
                    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: chatId,
                            message_thread_id: threadId || undefined,
                            text: `🤖 <b>Bot Connected!</b>\nChat ID: <code>${chatId}</code>\nTopic ID: <code>${threadId || 'None'}</code>`,
                            parse_mode: 'HTML'
                        }),
                    });
                }
            }
            return { statusCode: 200, body: JSON.stringify({ ok: true }) };
        }

        // LEAD SUBMISSION
        const agentId = payload.agentId;
        const privateChatId = agentId ? AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] : undefined;
        const targetChatId = (privateChatId && privateChatId !== "0") ? privateChatId : adminChatId;
        const targetThreadId = (targetChatId === adminChatId) ? adminThreadId : undefined;

        let messageText = payload.text;
        if (!messageText) {
            const fName = escapeHTML(payload.firstName || payload.name || "Unknown");
            const lName = escapeHTML(payload.lastName || "");
            const email = escapeHTML(payload.email || "Not provided");
            const phone = escapeHTML(payload.phone || "Not provided");
            const interest = escapeHTML(payload.interest || "Not specified");
            const location = escapeHTML(payload.location || "Not specified");
            const msgBody = escapeHTML(typeof payload.message === 'string' ? payload.message : "None");

            messageText = `🏠 <b>New Enquiry — Connecticut Real Estate</b>\n\n👤 <b>Name:</b> ${fName} ${lName}\n📧 <b>Email:</b> ${email}\n📞 <b>Phone:</b> ${phone}\n🎯 <b>Interest:</b> ${interest}\n📍 <b>Location:</b> ${location}\n💬 <b>Message:</b> ${msgBody}`;
        }

        if (agentId) messageText = `🔔 <b>FOR AGENT:</b> ${escapeHTML(agentId.toUpperCase())}\n\n${messageText}`;

        const sendMessage = async (cid: string, tid?: number) => {
            const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: cid,
                    message_thread_id: tid,
                    text: messageText,
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [[{ text: "✅ Mark as Attended", callback_data: "handled" }]]
                    }
                }),
            });
            return await res.json();
        };

        const result = await sendMessage(targetChatId, targetThreadId);
        
        if (result.ok) {
            if (targetChatId !== adminChatId) await sendMessage(adminChatId, adminThreadId);
            return { statusCode: 200, body: JSON.stringify({ status: "success" }) };
        } else {
            console.error("TELEGRAM ERROR:", result);
            // Fallback: Try sending WITHOUT the inline keyboard (some groups block them)
            const retryRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: targetChatId,
                    message_thread_id: targetThreadId,
                    text: messageText + "\n\n(Note: Keyboard disabled due to group restrictions)",
                    parse_mode: 'HTML'
                }),
            });
            const retryData = await retryRes.json();
            
            if (retryData.ok) {
                return { statusCode: 200, body: JSON.stringify({ status: "success", note: "Sent without keyboard" }) };
            }
            
            return { statusCode: 500, body: JSON.stringify({ error: result.description || "Telegram Delivery Failed" }) };
        }

    } catch (error: any) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};

export { handler };
