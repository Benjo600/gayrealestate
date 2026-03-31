/**
 * Telegram Notification Service
 * Sends form submissions as formatted messages to a Telegram chat via a Serverless Proxy.
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
    const response = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        console.error('Telegram API error via proxy:', error);
        throw new Error(`Proxy responded with status ${response.status}`);
    }
}
