import type { Context, Config } from "@netlify/functions";
import { checkLead } from "../../lib/spamGuard";

const AGENT_PRIVATE_ID_MAP: Record<string, string> = {
  "arek": "0", "abby": "0", "travis": "0", "jake": "0", "carolyn": "0"
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export default async (req: Request, _context: Context) => {
  const token = Netlify.env.get("TELEGRAM_BOT_TOKEN");
  // Do not hardcode chat IDs — Netlify secrets scanning fails the build if
  // Telegram-looking IDs are committed, and they belong in site env vars.
  const adminChatId = Netlify.env.get("TELEGRAM_ADMIN_CHAT_ID");
  const adminThreadId = Netlify.env.get("TELEGRAM_THREAD_ID");

  if (!token) {
    return json({ error: "Missing Token" }, 500);
  }

  // GET: Setup Webhook easily
  if (req.method === "GET") {
    const url = new URL(req.url);
    if (url.searchParams.get("setup") === "webhook") {
      const webhookUrl = `https://${url.hostname}/api/telegram`;
      const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${webhookUrl}`);
      const result = await res.json();
      return json({ message: "Webhook setup attempt", result });
    }
    return new Response("Bot Engine Online");
  }

  if (req.method !== "POST") {
    return json({ error: "Method Not Allowed" }, 405);
  }

  try {
    const payload = await req.json();

    // ─── WEBHOOK HANDLER: BUTTON CLICKS ───
    if (payload.callback_query) {
      const cb = payload.callback_query;
      const msgId = cb.message?.message_id;
      const chatId = cb.message?.chat?.id;
      const user = cb.from?.first_name || cb.from?.username || "An Agent";

      if (cb.data === "handled" && msgId && chatId) {
        const originalText = cb.message?.text || "Lead Details";
        const newText = `✅ <b>HANDLED BY ${user.toUpperCase()}</b>\n\n<s>${originalText}</s>`;

        await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            message_id: msgId,
            text: newText,
            parse_mode: "HTML",
            reply_markup: { inline_keyboard: [] },
          }),
        });

        await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            callback_query_id: cb.id,
            text: "Lead marked as handled!",
          }),
        });
      }
      return json({ status: "ok" });
    }

    // ─── ANTI-SPAM (all form POSTs) ───
    const requireEmail = Boolean(
      payload.requireEmail || payload.method === "email"
    );

    const spam = checkLead(
      {
        firstName: payload.firstName,
        lastName: payload.lastName,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        phoneCountry: payload.phoneCountry,
        interest: payload.interest,
        location: payload.location,
        message: payload.message,
        _hp: payload._hp,
        _ts: payload._ts,
      },
      { requireEmail }
    );

    if (spam.pass === false) {
      if (spam.drop) {
        console.warn("[telegram] Dropped spam lead", {
          name: payload.firstName || payload.name,
          phone: payload.phone,
          reason: spam.reason,
        });
        // Silent success so bots don't retry harder
        return json({ status: "success" });
      }
      return json({ error: spam.reason, description: spam.reason }, 400);
    }

    // ─── STANDARD LEAD SUBMISSION ───
    if (!adminChatId) {
      return json({ error: "Missing TELEGRAM_ADMIN_CHAT_ID" }, 500);
    }

    const agentId = payload.agentId || "";
    const targetChatId =
      agentId &&
      AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] &&
      AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()] !== "0"
        ? AGENT_PRIVATE_ID_MAP[agentId.toLowerCase()]
        : adminChatId;

    let text = payload.text || "";

    const safeHTML = (str: unknown) => {
      if (str == null || str === "") return "N/A";
      return str
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    };

    if (!text) {
      const fn = payload.firstName || "";
      const ln = payload.lastName || "";
      const name = `${fn} ${ln}`.trim() || payload.name || "Unknown";

      text =
        `🏠 <b>NEW LEAD (MAIN FORM)</b>\n\n` +
        `👤 <b>Name:</b> ${safeHTML(name)}\n` +
        `📞 <b>Phone:</b> ${safeHTML(payload.phone)}\n` +
        `📧 <b>Email:</b> ${safeHTML(payload.email)}\n` +
        `🎯 <b>Interest:</b> ${safeHTML(payload.interest)}\n` +
        `📍 <b>Location:</b> ${safeHTML(payload.location)}\n\n` +
        `💬 <b>Message:</b>\n${safeHTML(payload.message)}`;
    } else {
      text = text.replace(/&/g, "&amp;");
    }

    if (agentId) text = `🔔 <b>FOR: ${agentId.toUpperCase()}</b>\n\n${text}`;

    const body: Record<string, unknown> = {
      chat_id: targetChatId,
      text,
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [[{ text: "✅ Mark as Handled", callback_data: "handled" }]],
      },
    };

    if (targetChatId === adminChatId && adminThreadId) {
      body.message_thread_id = parseInt(adminThreadId);
    }

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await res.json();

    if (!result.ok) {
      console.warn("HTML delivery failed", result.description);
      const plainTextBody: Record<string, unknown> = {
        chat_id: targetChatId,
        text: "⚠️ (Plain Text)\n\n" + text.replace(/<[^>]*>?/gm, ""),
      };
      if (targetChatId === adminChatId && adminThreadId) {
        plainTextBody.message_thread_id = parseInt(adminThreadId);
      }
      const retry = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plainTextBody),
      });
      const retryResult = await retry.json();
      if (!retryResult.ok) {
        return json({ error: retryResult.description }, 500);
      }
    }

    return json({ status: "success" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("V2 Proxy Error:", error);
    return json({ error: message }, 500);
  }
};

export const config: Config = {
  path: "/api/telegram",
};
