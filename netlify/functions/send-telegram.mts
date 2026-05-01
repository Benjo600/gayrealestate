import { Handler } from "@netlify/functions";

// 🏆 AGENT TO PRIVATE CHAT ID MAPPING
const AGENT_PRIVATE_ID_MAP: Record<string, string> = {
    "arek": "0", "abby": "0", "travis": "0", "jake": "0", "carolyn": "0"
};

function escapeHTML(text: string = ""): string {
    return text.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

const handler: Handler = async (event) => {
    console.log("--- TELEGRAM FUNCTION TRIGGERED ---");
    console.log("Method:", event.httpMethod);
    
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID || "-1003377773133";
    const adminThreadId = process.env.TELEGRAM_THREAD_ID ? parseInt(process.env.TELEGRAM_THREAD_ID) : undefined;

    // 1. Simple Health Check for browser testing
    if (event.httpMethod === "GET") {
        return { 
            statusCode: 200, 
            body: JSON.stringify({ 
                status: "alive", 
                config: { 
                    hasToken: !!token, 
                    adminChatId, 
                    adminThreadId 
                } 
            }) 
        };
    }

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    if (!token) {
        console.error("ERROR: TELEGRAM_BOT_TOKEN is missing.");
        return { statusCode: 500, body: JSON.stringify({ error: "Missing Bot Token" }) };
    }

    try {
        const payload = JSON.parse(event.body || "{}");
        console.log("Payload Keys:", Object.keys(payload));

        // ════════════════════════════════════════════════════════════════════════
        // PART 1: TELEGRAM WEBHOOK (Commands)
        // ════════════════════════════════════════════════════════════════════════
        const isTelegram = !!(payload.update_id || payload.message || payload.callback_query);

        if (isTelegram) {
            console.log("Processing Telegram Update...");
            
            if (payload.callback_query) {
                const cb = payload.callback_query;
                const msg = cb.message;
                const agentName = cb.from.first_name || "Agent";
                const newText = `${msg.text}\n\n✅ <b>HANDLED BY:</b> ${escapeHTML(agentName)}`;

                const res = await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: msg.chat.id,
                        message_id: msg.message_id,
                        text: newText,
                        parse_mode: 'HTML'
                    }),
                });
                console.log("Edit result status:", res.status);
            } 
            else if (payload.message && payload.message.text) {
                const chatId = payload.message.chat.id;
                const threadId = payload.message.message_thread_id;
                const text = payload.message.text.toLowerCase();

                if (text.includes("id") || text.includes("start") || text.includes("ping")) {
                    const responseText = [
                        `🤖 <b>Notification Bot Active</b>`,
                        `Chat ID: <code>${chatId}</code>`,
                        threadId ? `Thread ID: <code>${threadId}</code>` : `Thread: General`,
                        `Token: ${token.substring(0, 5)}...${token.substring(token.length - 5)}`
                    ].join('\n');

                    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: chatId,
                            message_thread_id: threadId || undefined,
                            text: responseText,
                            parse_mode: 'HTML'
                        }),
                    });
                    console.log("Command response status:", res.status);
                }
            }
            return { statusCode: 200, body: JSON.stringify({ ok: true }) };
        }

        // ════════════════════════════════════════════════════════════════════════
        // PART 2: WEBSITE LEAD SUBMISSION
        // ════════════════════════════════════════════════════════════════════════
        const agentId = payload.agentId;
        const privateChatId = agentId ? AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] : undefined;
        const finalChatId = (privateChatId && privateChatId !== "0") ? privateChatId : adminChatId;
        const finalThreadId = (finalChatId === adminChatId) ? adminThreadId : undefined;

        console.log(`Sending lead to Chat ${finalChatId}, Thread ${finalThreadId || 'Main'}`);

        let messageText = payload.text;
        if (!messageText) {
            const fName = escapeHTML(payload.firstName || payload.name || "Unknown");
            const lName = escapeHTML(payload.lastName || "");
            const email = escapeHTML(payload.email || "Not provided");
            const phone = escapeHTML(payload.phone || "Not provided");
            const interest = escapeHTML(payload.interest || "Not specified");
            const location = escapeHTML(payload.location || "Not specified");
            const msgBody = escapeHTML(typeof payload.message === 'string' ? payload.message : "None");

            messageText = `
🏠 <b>New Enquiry — Connecticut Real Estate</b>

👤 <b>Name:</b> ${fName} ${lName}
📧 <b>Email:</b> ${email}
📞 <b>Phone:</b> ${phone}
🎯 <b>Interest:</b> ${interest}
📍 <b>Location:</b> ${location}
💬 <b>Message:</b> ${msgBody}
            `.trim();
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
            const data = await res.json();
            return { ok: res.ok, data };
        };

        const result = await sendMessage(finalChatId, finalThreadId);
        
        // Backup to admin
        if (finalChatId !== adminChatId) {
            await sendMessage(adminChatId, adminThreadId);
        }

        if (result.ok) {
            return { statusCode: 200, body: JSON.stringify({ status: "success" }) };
        } else {
            console.error("Telegram error:", result.data);
            return { statusCode: 500, body: JSON.stringify({ error: result.data }) };
        }

    } catch (error: any) {
        console.error("HANDLER ERROR:", error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};

export { handler };
