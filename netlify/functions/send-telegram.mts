import type { Context, Config } from "@netlify/functions";

export interface EnquiryData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    interest: string;
    location: string;
    message: string;
}

export default async (req: Request, context: Context) => {
    if (req.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
    }

    const token = Netlify.env.get("TELEGRAM_BOT_TOKEN");
    const chatId = Netlify.env.get("TELEGRAM_CHAT_ID");

    if (!token || !chatId) {
        console.error("Telegram env vars are missing.");
        return new Response(JSON.stringify({ error: "Telegram not configured" }), { status: 500 });
    }

    try {
        const data: EnquiryData = await req.json();

        const now = new Date().toLocaleString('en-US', {
            timeZone: 'America/New_York',
            dateStyle: 'medium',
            timeStyle: 'short',
        });

        const text = `
🏠 *New Enquiry — Connecticut Real Estate*

👤 *Name:* ${data.firstName} ${data.lastName}
📧 *Email:* ${data.email || 'Not provided'}
📞 *Phone:* ${data.phone}
🎯 *Interest:* ${data.interest || 'Not specified'}
📍 *Location:* ${data.location || 'Not specified'}
💬 *Message:* ${data.message || 'None'}

🕐 _Received: ${now} ET_
  `.trim();

        const response = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text,
                    parse_mode: 'Markdown',
                }),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            console.error('Telegram API error:', error);
            return new Response(JSON.stringify(error), { status: 502 });
        }

        return new Response(JSON.stringify({ status: "success" }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error: any) {
        console.error("Telegram Proxy Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};

export const config: Config = {
    path: "/api/send-telegram"
};
