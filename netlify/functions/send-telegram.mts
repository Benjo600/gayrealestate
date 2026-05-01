import { Handler } from "@netlify/functions";

// 🏆 AGENT TO PRIVATE CHAT ID MAPPING
// Update these IDs if agents want private notifications
const AGENT_PRIVATE_ID_MAP: Record<string, string> = {
    "arek": "0",
    "abby": "0",
    "travis": "0",
    "jake": "0",
    "carolyn": "0"
};

/**
 * Escapes special characters for Telegram HTML mode
 */
function escapeHTML(text: string = ""): string {
    return text.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

const handler: Handler = async (event) => {
    // 1. CONFIGURATION
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID || "-1003377773133";
    const adminThreadId = process.env.TELEGRAM_THREAD_ID ? parseInt(process.env.TELEGRAM_THREAD_ID) : undefined;

    // Security & Method check
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    if (!token) {
        console.error("CRITICAL: TELEGRAM_BOT_TOKEN is missing from environment variables.");
        return { statusCode: 500, body: JSON.stringify({ error: "Server Configuration Error" }) };
    }

    try {
        const body = event.body || "{}";
        const payload = JSON.parse(body);
        console.log("DEBUG: Incoming request payload:", Object.keys(payload));

        // ════════════════════════════════════════════════════════════════════════
        // PART 1: TELEGRAM WEBHOOK HANDLING (Commands from Telegram)
        // ════════════════════════════════════════════════════════════════════════
        const isTelegramUpdate = !!(payload.update_id || payload.message || payload.callback_query);

        if (isTelegramUpdate) {
            console.log("DEBUG: Handling Telegram Webhook update");

            // Handle Buttons (Callbacks)
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
            } 
            // Handle Commands (/id, /start)
            else if (payload.message && payload.message.text) {
                const chatId = payload.message.chat.id;
                const threadId = payload.message.message_thread_id;
                const text = payload.message.text.toLowerCase();

                if (text.includes("id") || text.includes("start") || text.includes("help")) {
                    const responseText = [
                        `🤖 <b>Telegram Notification Bot</b>`,
                        `--------------------------`,
                        `📍 <b>Chat ID:</b> <code>${chatId}</code>`,
                        threadId ? `🧵 <b>Thread ID:</b> <code>${threadId}</code>` : `🧵 <b>Thread:</b> General/None`,
                        `👤 <b>Sender:</b> ${escapeHTML(payload.message.from?.first_name || "Unknown")}`,
                        `--------------------------`,
                        `<i>Add these to Netlify env vars as <code>TELEGRAM_ADMIN_CHAT_ID</code> and <code>TELEGRAM_THREAD_ID</code> to route leads here.</i>`
                    ].join('\n');

                    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: chatId,
                            message_thread_id: threadId || undefined,
                            text: responseText,
                            parse_mode: 'HTML'
                        }),
                    });
                }
            }
            return { statusCode: 200, body: JSON.stringify({ ok: true }) };
        }

        // ════════════════════════════════════════════════════════════════════════
        // PART 2: WEBSITE LEAD SUBMISSION HANDLING
        // ════════════════════════════════════════════════════════════════════════
        
        // Determine Routing
        const agentId = payload.agentId;
        const privateChatId = agentId ? AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] : undefined;
        
        // Fallback to admin chat if no specific agent or if agent ID is placeholder "0"
        const finalChatId = (privateChatId && privateChatId !== "0") ? privateChatId : adminChatId;
        // Only use the global thread ID if we are sending to the admin chat (groups)
        const finalThreadId = (finalChatId === adminChatId) ? adminThreadId : undefined;

        console.log(`DEBUG: Routing lead to Chat ${finalChatId}, Thread ${finalThreadId || 'Main'}`);

        // Construct Message Text
        let text = payload.text;
        if (!text) {
            // Build default formatted enquiry
            const fName = escapeHTML(payload.firstName || payload.name || "Unknown");
            const lName = escapeHTML(payload.lastName || "");
            const email = escapeHTML(payload.email || "Not provided");
            const phone = escapeHTML(payload.phone || "Not provided");
            const interest = escapeHTML(payload.interest || "Not specified");
            const location = escapeHTML(payload.location || "Not specified");
            const msg = escapeHTML(typeof payload.message === 'string' ? payload.message : "None");

            text = [
                `🏠 <b>New Enquiry — Connecticut Real Estate</b>`,
                ``,
                `👤 <b>Name:</b> ${fName} ${lName}`,
                `📧 <b>Email:</b> ${email}`,
                `📞 <b>Phone:</b> ${phone}`,
                `🎯 <b>Interest:</b> ${interest}`,
                `📍 <b>Location:</b> ${location}`,
                `💬 <b>Message:</b> ${msg}`
            ].join('\n');
        }

        // Add Agent Attribution header if applicable
        if (agentId) {
            text = `🔔 <b>FOR AGENT:</b> ${escapeHTML(agentId.toUpperCase())}\n\n${text}`;
        }

        // Send to Telegram
        const sendToTelegram = async (cid: string, tid?: number) => {
            const apiEndpoint = `https://api.telegram.org/bot${token}/sendMessage`;
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: cid,
                    message_thread_id: tid,
                    text: text,
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [[{ text: "✅ Mark as Attended", callback_data: "handled" }]]
                    }
                }),
            });
            
            const data = await response.json();
            if (!response.ok) {
                console.error(`Telegram API Error for chat ${cid}:`, data);
                return { success: false, error: data };
            }
            return { success: true, data };
        };

        // Execution
        const result = await sendToTelegram(finalChatId, finalThreadId);

        // Backup: Always send to admin if the primary target was an agent (dual delivery)
        if (finalChatId !== adminChatId) {
            await sendToTelegram(adminChatId, adminThreadId);
        }

        if (result.success) {
            return { statusCode: 200, body: JSON.stringify({ status: "success", message: "Notification sent" }) };
        } else {
            return { 
                statusCode: 500, 
                body: JSON.stringify({ 
                    status: "error", 
                    error: result.error,
                    hint: "Ensure the bot is added to the group and has admin permissions."
                }) 
            };
        }

    } catch (error: any) {
        console.error("HANDLER ERROR:", error);
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: error.message || "Internal Server Error" }) 
        };
    }
};

export { handler };
