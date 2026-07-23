/**
 * Telegram Notification Service
 * Sends form submissions as formatted messages to a Telegram chat via a Serverless Proxy.
 */

export interface EnquiryData {
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  /** ISO country for phone (US, GB, …) */
  phoneCountry?: string;
  interest?: string;
  location?: string;
  message?: string;
  agentId?: string;
  text?: string;
  method?: string;
  requireEmail?: boolean;
  /** Honeypot — must be empty */
  _hp?: string;
  /** Form open timestamp (Date.now()) */
  _ts?: number;
}

async function postTelegram(body: EnquiryData): Promise<void> {
  const response = await fetch('/api/telegram', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({} as { description?: string; error?: string }));
    console.error('Telegram API error via proxy:', error);
    throw new Error(error?.description || error?.error || `Proxy responded with status ${response.status}`);
  }
}

export async function sendEnquiryToTelegram(data: EnquiryData): Promise<void> {
  return postTelegram(data);
}

export async function sendGenericTelegram(
  text: string,
  agentId?: string,
  meta?: Omit<EnquiryData, 'text' | 'agentId'>,
): Promise<void> {
  return postTelegram({ text, agentId, ...meta });
}
