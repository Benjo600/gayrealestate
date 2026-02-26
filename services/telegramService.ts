/**
 * Telegram Notification Service
 * Sends form submissions as formatted messages to a Telegram chat via the Bot API.
 *
 * Required env vars (in .env.local):
 *   VITE_TELEGRAM_BOT_TOKEN  – the token given to you by @BotFather
 *   VITE_TELEGRAM_CHAT_ID    – your (or your client's) Telegram chat / group ID
 */

export interface EnquiryData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    interest: string;
    location: string;
    message: string;
}

export async function sendEnquiryToTelegram(data: EnquiryData): Promise<void> {
    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string | undefined;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID as string | undefined;

    if (!token || !chatId) {
        console.error(
            '⚠️  Telegram env vars are missing. Add VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID to your .env.local file.'
        );
        throw new Error('Telegram credentials not configured.');
    }

    const now = new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'medium',
        timeStyle: 'short',
    });

    // Build a nicely formatted Markdown message
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
        throw new Error(`Telegram API responded with status ${response.status}`);
    }
}
