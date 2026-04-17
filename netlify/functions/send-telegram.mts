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

export default async (req: Request, context: Context) => {
    // 1. Identify Request Type
    let payload: any;
    try {
        payload = await req.json();
    } catch (e) {
        return new Response("Invalid JSON", { status: 400 });
    }

    const token = Netlify.env.get("TELEGRAM_BOT_TOKEN");
    const adminChatId = Netlify.env.get("TELEGRAM_CHAT_ID"); // The main group or your private ID

    if (!token || !adminChatId) {
        return new Response(JSON.stringify({ error: "Telegram not configured" }), { status: 500 });
    }

    // ════════════════════════════════════════════════════════════════════════
    // CASE A: TELEGRAM CALLBACK (Agent clicked "Attended" button)
    // ════════════════════════════════════════════════════════════════════════
    if (payload.callback_query) {
        const cb = payload.callback_query;
        const msg = cb.message;
        const agentName = cb.from.first_name || "Agent";

        const newText = `${msg.text}\n\n✅ *HANDLED BY:* ${agentName}`;

        await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                text: newText,
                parse_mode: 'Markdown',
                reply_markup: { inline_keyboard: [] }
            }),
        });

        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // ════════════════════════════════════════════════════════════════════════
    // CASE B: WEBSITE LEAD (New form submission)
    // ════════════════════════════════════════════════════════════════════════
    const agentId = payload.agentId;
    const privateChatId = agentId ? AGENT_PRIVATE_ID_MAP[agentId] : undefined;
    
    // Logic: If we have a private ID for the agent, send it there. 
    // Otherwise, send to the Admin/Group.
    const targetChatId = (privateChatId && privateChatId !== "0") ? privateChatId : adminChatId;

    let text = payload.text;
    if (!text) {
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

    if (agentId) {
        text = `🔔 *FOR AGENT:* ${agentId.toUpperCase()}\n\n${text}`;
    }

    // 1. Send to the Target (Agent or Admin)
    const sendMessage = async (cid: string) => {
        return fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: cid,
                text,
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [[
                        { text: "✅ Mark as Attended", callback_data: "handled" }
                    ]]
                }
            }),
        });
    };

    const mainResponse = await sendMessage(targetChatId);

    // 2. CARBON COPY (CC): If it was sent to an agent privately, 
    // also send a copy to the Admin Group so you stay in the loop!
    if (targetChatId !== adminChatId) {
        await sendMessage(adminChatId);
    }

    if (!mainResponse.ok) {
        const error = await mainResponse.json();
        return new Response(JSON.stringify(error), { status: 502 });
    }

    return new Response(JSON.stringify({ status: "success" }), {
        headers: { "Content-Type": "application/json" }
    });
};

export const config: Config = {
    path: "/api/send-telegram"
};
