import type { Context, Config } from "@netlify/functions";

// Local mapping for Topic IDs (Threads)
// User can update these IDs once they set up topics in their Telegram Group
const AGENT_TOPIC_MAP: Record<string, number> = {
    "arek": 0,    // Replace 0 with real Topic IDs
    "abby": 0,
    "travis": 0,
    "jake": 0,
    "carolyn": 0
};

export default async (req: Request, context: Context) => {
    // 1. Identify Request Type
    let payload: any;
    try {
        payload = await req.json();
    } catch (e) {
        return new Response("Invalid JSON", { status: 400 });
    }

    const token = Netlify.env.get("TELEGRAM_BOT_TOKEN");
    const chatId = Netlify.env.get("TELEGRAM_CHAT_ID");

    if (!token || !chatId) {
        return new Response(JSON.stringify({ error: "Telegram not configured" }), { status: 500 });
    }

    // ════════════════════════════════════════════════════════════════════════
    // CASE A: TELEGRAM CALLBACK (Agent clicked "Attended" button)
    // ════════════════════════════════════════════════════════════════════════
    if (payload.callback_query) {
        const cb = payload.callback_query;
        const msg = cb.message;
        const agentName = cb.from.first_name || "Agent";

        // Update the message text to show it's handled
        const newText = `${msg.text}\n\n✅ *HANDLED BY:* ${agentName}`;

        // Tell Telegram API to edit the message and remove buttons
        await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                text: newText,
                parse_mode: 'Markdown',
                reply_markup: { inline_keyboard: [] } // Remove buttons
            }),
        });

        // Answer the callback to hide the loading spinner in Telegram
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // ════════════════════════════════════════════════════════════════════════
    // CASE B: WEBSITE LEAD (New form submission)
    // ════════════════════════════════════════════════════════════════════════
    const agentId = payload.agentId;
    const topicId = agentId ? AGENT_TOPIC_MAP[agentId] : undefined;
    
    let text = payload.text;
    if (!text) {
        // Fallback formatting if structured data is sent
        text = `
🏠 *New Enquiry — Connecticut Real Estate*

👤 *Name:* ${payload.firstName} ${payload.lastName}
📧 *Email:* ${payload.email || 'Not provided'}
📞 *Phone:* ${payload.phone}
🎯 *Interest:* ${payload.interest || 'Not specified'}
📍 *Location:* ${payload.location || 'Not specified'}
💬 *Message:* ${payload.message || 'None'}
        `.trim();
    }

    // Add Agent Routing Note
    if (agentId) {
        text = `🔔 *FOR AGENT:* ${agentId.toUpperCase()}\n\n${text}`;
    }

    // Build Message with "Mark Attended" Button
    const response = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                message_thread_id: topicId || undefined,
                text,
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [[
                        { text: "✅ Mark as Attended", callback_data: "handled" }
                    ]]
                }
            }),
        }
    );

    if (!response.ok) {
        const error = await response.json();
        return new Response(JSON.stringify(error), { status: 502 });
    }

    return new Response(JSON.stringify({ status: "success" }), {
        headers: { "Content-Type": "application/json" }
    });
};

export const config: Config = {
    path: "/api/send-telegram"
};
