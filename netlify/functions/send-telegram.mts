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
    const token = process.env.TELEGRAM_BOT_TOKEN || Netlify.env.get("TELEGRAM_BOT_TOKEN");
    const adminChatId = process.env.TELEGRAM_CHAT_ID || Netlify.env.get("TELEGRAM_CHAT_ID");

    try {
        const bodyText = await req.text();
        let payload: any;
        try {
            payload = JSON.parse(bodyText);
        } catch (e) {
            return new Response("Invalid JSON", { status: 400 });
        }

        if (!token || !adminChatId) {
            return new Response("Config missing", { status: 500 });
        }

        // ════════════════════════════════════════════════════════════════════════
        // PART 1: TELEGRAM WEBHOOK (Commands & Callbacks)
        // ════════════════════════════════════════════════════════════════════════
        const isTelegram = !!(payload.update_id || payload.message || payload.callback_query || payload.edited_message);

        if (isTelegram) {
            // A. Callback Query (Buttons)
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
            // B. Incoming Commands
            else if (payload.message && payload.message.text) {
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
            return new Response(JSON.stringify({ ok: true }), { status: 200 });
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
                return { ok: false, error: err };
            }
            return { ok: true };
        };

        const result = await sendMessage(targetChatId);
        
        if (!result.ok) {
            return new Response(JSON.stringify({ error: "Telegram Send Failed", details: result.error }), { status: 502 });
        }

        if (targetChatId !== adminChatId) await sendMessage(adminChatId);

        return new Response(JSON.stringify({ status: "success" }), { headers: { "Content-Type": "application/json" } });

    } catch (error: any) {
        console.error("Function Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};




export const config: Config = {
    path: "/api/send-telegram"
};

