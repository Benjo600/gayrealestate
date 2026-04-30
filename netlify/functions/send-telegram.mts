import type { Context, Config } from "@netlify/functions";

// 🏆 PRIVATE AGENT IDS
// Each agent must start a chat with @inclusivehousingbot and get their ID
const AGENT_PRIVATE_ID_MAP: Record<string, string> = {
    "arek": "0",    // Replace with real User IDs
    "abby": "0",
    "travis": "0",
    "jake": "0",
    "carolyn": "0"
};

/**
 * Escapes characters for HTML to prevent injection and parsing errors.
 */
function escapeHTML(text: string = ""): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

export default async (req: Request, context: Context) => {
    // 1. Parse Payload
    let payload: any;
    try {
        payload = await req.json();
    } catch (e) {
        return new Response("Invalid JSON", { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN || Netlify.env.get("TELEGRAM_BOT_TOKEN");
    const adminChatId = process.env.TELEGRAM_CHAT_ID || Netlify.env.get("TELEGRAM_CHAT_ID");

    if (!token || !adminChatId) {
        return new Response(JSON.stringify({ error: "Telegram configuration missing" }), { status: 500 });
    }

    // ════════════════════════════════════════════════════════════════════════
    // 🛑 EARLY EXIT: Handle Telegram Webhook (Messages & Callbacks)
    // ════════════════════════════════════════════════════════════════════════
    const isTelegram = !!(payload.update_id || payload.message || payload.callback_query || payload.edited_message);

    if (isTelegram) {
        // CASE A: CALLBACK (Button Click)
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
                    parse_mode: 'HTML',
                    reply_markup: { inline_keyboard: [] }
                }),
            });
        }
        // CASE B: INCOMING MESSAGE
        else if (payload.message && payload.message.text) {
            const chatId = payload.message.chat.id;
            const threadId = payload.message.message_thread_id;
            const text = payload.message.text.toLowerCase();

            if (text.includes("id") || text.includes("start") || text.includes("hello")) {
                const isGroup = chatId < 0;
                const typeLabel = isGroup ? "Group/Supergroup" : "Private Chat";
                
                const responseText = `👋 <b>Bot is Active!</b>\n\n<b>Type:</b> ${typeLabel}\n<b>ID:</b> <code>${chatId}</code>\n\nTo receive website enquiries here, set <code>TELEGRAM_CHAT_ID</code> to this ID in your Netlify settings.`;

                // 1. Try sending to the group/source
                const groupResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        message_thread_id: threadId || undefined,
                        text: responseText,
                        parse_mode: 'HTML'
                    }),
                });

                // 2. Fallback: Also send to the Admin chat just in case the group response failed
                if (chatId.toString() !== adminChatId.toString()) {
                    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: adminChatId,
                            text: `🔔 <b>ID Lookup Request</b>\nFrom: <code>${chatId}</code>\n\n${responseText}`,
                            parse_mode: 'HTML'
                        }),
                    });
                }
            }
        }

        // ABSOLUTE STOP: Do not proceed to Lead logic
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // ════════════════════════════════════════════════════════════════════════
    // PART 2: WEBSITE LEAD SUBMISSION (Only reached if NOT Telegram)
    // ════════════════════════════════════════════════════════════════════════
    const agentId = payload.agentId;
    const privateChatId = agentId ? AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] : undefined;
    const targetChatId = (privateChatId && privateChatId !== "0") ? privateChatId : adminChatId;

    let text = payload.text;
    if (!text) {
        const firstName = escapeHTML(payload.firstName || payload.name || "Unknown");
        const lastName = escapeHTML(payload.lastName || "");
        const email = escapeHTML(payload.email || "Not provided");
        const phone = escapeHTML(payload.phone || "Not provided");
        const interest = escapeHTML(payload.interest || "Not specified");
        const location = escapeHTML(payload.location || "Not specified");
        
        // Ensure message is a string and not the Telegram message object
        const rawMessage = typeof payload.message === 'string' ? payload.message : "None";
        const message = escapeHTML(rawMessage);

        text = `
🏠 <b>New Enquiry — Connecticut Real Estate</b>

👤 <b>Name:</b> ${firstName} ${lastName}
📧 <b>Email:</b> ${email}
📞 <b>Phone:</b> ${phone}
🎯 <b>Interest:</b> ${interest}
📍 <b>Location:</b> ${location}
💬 <b>Message:</b> ${message}

<i>(Debug: Code Version 4.0)</i>
        `.trim();
    }

    if (agentId) {
        text = `🔔 <b>FOR AGENT:</b> ${escapeHTML(agentId.toUpperCase())}\n\n${text}`;
    }

    // Helper to send message and handle errors
    const sendMessage = async (cid: string) => {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: cid,
                text,
                parse_mode: 'HTML',
                reply_markup: {
                    inline_keyboard: [[
                        { text: "✅ Mark as Attended", callback_data: "handled" }
                    ]]
                }
            }),
        });

        if (!response.ok) {
            const errData = await response.json();
            console.error(`Telegram API Error:`, errData);
            return { ok: false, error: errData };
        }
        return { ok: true };
    };

    const result = await sendMessage(targetChatId);
    if (result.ok && targetChatId !== adminChatId) {
        await sendMessage(adminChatId);
    }

    if (!result.ok) {
        return new Response(JSON.stringify(result.error), { status: 502 });
    }

    return new Response(JSON.stringify({ status: "success" }), {
        headers: { "Content-Type": "application/json" }
    });
};


export const config: Config = {
    path: "/api/send-telegram"
};

