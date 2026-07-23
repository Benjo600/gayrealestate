/**
 * Local-only mock of /api/telegram so `npm run dev` can test forms
 * without Netlify Functions. Uses the same spamGuard as production.
 */
import type { Plugin } from 'vite';
import { checkLead } from './lib/spamGuard';

export function telegramDevApi(): Plugin {
  return {
    name: 'telegram-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.split('?')[0] !== '/api/telegram' || req.method !== 'POST') {
          return next();
        }

        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
          }
          const payload = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');

          const requireEmail = Boolean(payload.requireEmail || payload.method === 'email');
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
            { requireEmail },
          );

          res.setHeader('Content-Type', 'application/json');

          if (spam.pass === false) {
            if (spam.drop) {
              console.warn('[dev /api/telegram] Dropped spam:', spam.reason, {
                name: payload.firstName || payload.name,
                phone: payload.phone,
              });
              res.statusCode = 200;
              res.end(JSON.stringify({ status: 'success', dev: true, dropped: true }));
              return;
            }
            res.statusCode = 400;
            res.end(JSON.stringify({ error: spam.reason, description: spam.reason }));
            return;
          }

          console.log('[dev /api/telegram] Lead accepted (not sent to Telegram in Vite):', {
            name: [payload.firstName, payload.lastName].filter(Boolean).join(' ') || payload.name,
            phone: payload.phone,
            email: payload.email,
          });
          res.statusCode = 200;
          res.end(JSON.stringify({ status: 'success', dev: true }));
        } catch (err) {
          console.error('[dev /api/telegram]', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'Server error' }));
        }
      });
    },
  };
}
