import { Handler } from "@netlify/functions";

// 🏆 PRIVATE AGENT IDS
const AGENT_PRIVATE_ID_MAP: Record<string, string> = {
    "arek": "0",
    "abby": "0",
    "travis": "0",
    "jake": "0",
    "carolyn": "0"
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
    const token = process.env.TELEGRAM_BOT_TOKEN || "";
    const adminChatId = "-1003377773133"; // Hardcoded for reliability

    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const payload = JSON.parse(event.body || "{}");

        // ════════════════════════════════════════════════════════════════════════
        // PART 1: TELEGRAM WEBHOOK (Commands & Callbacks)
        // ════════════════════════════════════════════════════════════════════════
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
                const text = payload.message.text.toLowerCase();

                if (text.includes("id") || text.includes("start")) {
                    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: chatId,
                            message_thread_id: payload.message.message_thread_id || undefined,
                            text: `✅ <b>Bot Active</b>\nID: <code>${chatId}</code>`,
                            parse_mode: 'HTML'
                        }),
                    });
                }
            }
            return { statusCode: 200, body: JSON.stringify({ ok: true }) };
        }

        // ════════════════════════════════════════════════════════════════════════
        // PART 2: WEBSITE LEAD SUBMISSION
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
            const message = escapeHTML(typeof payload.message === 'string' ? payload.message : "None");

            text = `
🏠 <b>New Enquiry — Connecticut Real Estate</b>

👤 <b>Name:</b> ${firstName} ${lastName}
📧 <b>Email:</b> ${email}
📞 <b>Phone:</b> ${phone}
🎯 <b>Interest:</b> ${interest}
📍 <b>Location:</b> ${location}
💬 <b>Message:</b> ${message}
            `.trim();
        }

        if (agentId) text = `🔔 <b>FOR AGENT:</b> ${escapeHTML(agentId.toUpperCase())}\n\n${text}`;

        const sendMessage = async (cid: string) => {
            const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: cid,
                    text,
                    parse_mode: 'HTML',
                    reply_markup: { inline_keyboard: [[{ text: "✅ Mark as Attended", callback_data: "handled" }]] }
                }),
            });
            if (!res.ok) {
                const err = await res.json();
                console.error("Telegram API Error:", err);
            }
            return res.ok;
        };

        await sendMessage(targetChatId);
        if (targetChatId !== adminChatId) await sendMessage(adminChatId);

        return { statusCode: 200, body: JSON.stringify({ status: "success" }) };

    } catch (error: any) {
        console.error("Function Error:", error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};

export { handler };
