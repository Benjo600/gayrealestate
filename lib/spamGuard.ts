/**
 * Anti-spam helpers for lead forms.
 * Shared by the browser (light checks) and netlify/functions/telegram.ts (enforced).
 */

import { parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js';
import { DEFAULT_PHONE_COUNTRY, isKnownPhoneCountry } from './phoneCountries';

export const MIN_SUBMIT_MS = 3000;
export const MAX_SUBMIT_MS = 24 * 60 * 60 * 1000;

export type { CountryCode };

export const ALLOWED_INTERESTS = [
  'Buying a Home',
  'Selling a Home',
  'Buying & Selling',
  'Relocation',
  'Investment Property',
  'Re-financing',
  'Legal Advice',
] as const;

export type SpamCheck =
  | { pass: true }
  | { pass: false; reason: string; /** bot-like → silent 200, no Telegram */ drop: boolean };

export interface SpamPayload {
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  /** ISO country for phone validation (e.g. US, GB, IN) */
  phoneCountry?: string;
  interest?: string;
  location?: string;
  message?: string;
  /** Honeypot — must be empty */
  _hp?: string;
  /** Form-open time (Date.now()) */
  _ts?: number | string;
}

function fullName(p: SpamPayload): string {
  if (p.firstName || p.lastName) {
    return `${p.firstName || ''} ${p.lastName || ''}`.trim().replace(/\s+/g, ' ');
  }
  return (p.name || '').trim().replace(/\s+/g, ' ');
}

/** Count letters that are not Latin script (CJK, Cyrillic, Arabic, Devanagari, etc.) */
function nonLatinLetterCount(s: string): number {
  const letters = s.match(/\p{L}/gu) || [];
  return letters.filter((ch) => !/\p{Script=Latin}/u.test(ch)).length;
}

function latinLetterCount(s: string): number {
  const letters = s.match(/\p{L}/gu) || [];
  return letters.filter((ch) => /\p{Script=Latin}/u.test(ch)).length;
}

/** True when text is clearly written in a non-Latin language (or mixed with enough non-Latin). */
export function isGlobalLanguageText(s: string): boolean {
  const nonLat = nonLatinLetterCount(s);
  const lat = latinLetterCount(s);
  const total = nonLat + lat;
  if (nonLat >= 4) return true;
  if (total > 0 && nonLat / total >= 0.25) return true;
  return false;
}

/** Human names — Latin + global scripts (王小明, María, محمد, …). */
export function isRealName(value: string): boolean {
  const name = value.trim().replace(/\s+/g, ' ');
  if (name.length < 1 || name.length > 80) return false;
  if (/[0-9]/.test(name)) return false;

  // Global scripts: letters/marks/spaces and common name punctuation
  if (isGlobalLanguageText(name) || nonLatinLetterCount(name) >= 2) {
    if (!/^[\p{L}\p{M}\s.'·•\-‧]+$/u.test(name)) return false;
    // Compact form (no spaces) must still be at least 2 letters, e.g. 王伟
    if (name.replace(/[^\p{L}\p{M}]/gu, '').length < 2) return false;
    // Reject if dominated by Latin camelCase spam with a few foreign chars sprinkled in
    if (latinLetterCount(name) >= 10 && /[a-z][A-Z]/.test(name)) return false;
    return true;
  }

  // Latin-script names (José, O'Brien, Mary-Jane, McDonald)
  const parts = name.split(' ').filter(Boolean);
  if (parts.length < 1 || parts.length > 6) return false;

  for (const part of parts) {
    if (part.length < 2 || part.length > 28) return false;
    if (!/^[\p{Script=Latin}][\p{Script=Latin}'\-.]*$/u.test(part)) return false;
    const core = part.replace(/^(Mc|Mac)(?=[\p{Lu}])/u, '');
    if (/[\p{Ll}][\p{Lu}]/u.test(core)) return false;
    if (part.length > 5 && part === part.toUpperCase() && /[A-Z]/.test(part)) return false;
    // Latin names need a vowel-like character
    if (!/[aeiouyàáâãäåæèéêëìíîïòóôõöøùúûüýÿ]/i.test(part)) return false;
  }
  return true;
}

function isFictionalNanp(national: string): boolean {
  // Reserved TV/movie range: NPA-555-01xx
  return /^\d{3}55501\d{2}$/.test(national);
}

function tryAcceptPhone(phone: ReturnType<typeof parsePhoneNumberFromString>): boolean {
  if (!phone || !phone.isValid()) return false;
  if ((phone.country === 'US' || phone.country === 'CA') && isFictionalNanp(phone.nationalNumber)) {
    return false;
  }
  return true;
}

/**
 * Validate phone for a selected country (preferred) or free-form +E.164.
 * Pass the ISO country from the country-code dropdown when available.
 */
export function isRealPhone(value: string, countryCode?: string | null): boolean {
  const t = value.trim();
  if (!t || t.length > 30) return false;
  if (/[a-zA-Z]/.test(t)) return false;
  if (!/^[\d+(][\d\s()./-]*$/.test(t)) return false;

  const digits = t.replace(/\D/g, '');
  if (digits.length < 6 || digits.length > 15) return false;
  if (/^(\d)\1{7,}$/.test(digits)) return false;
  if (digits === '1234567890' || digits === '0123456789' || digits === '9876543210') return false;

  // Already full international
  if (t.startsWith('+')) {
    return tryAcceptPhone(parsePhoneNumberFromString(t));
  }

  const country: CountryCode = isKnownPhoneCountry(countryCode)
    ? countryCode
    : DEFAULT_PHONE_COUNTRY;

  return tryAcceptPhone(parsePhoneNumberFromString(t, country));
}

/**
 * Normalize to E.164 (+18605123456) for storage / Telegram when valid.
 * Returns original trimmed string if parsing fails.
 */
export function toE164(value: string, countryCode?: string | null): string {
  const t = value.trim();
  if (!t) return t;
  try {
    if (t.startsWith('+')) {
      const p = parsePhoneNumberFromString(t);
      return p?.isValid() ? p.format('E.164') : t;
    }
    const country: CountryCode = isKnownPhoneCountry(countryCode)
      ? countryCode
      : DEFAULT_PHONE_COUNTRY;
    const p = parsePhoneNumberFromString(t, country);
    return p?.isValid() ? p.format('E.164') : t;
  } catch {
    return t;
  }
}

/** Friendly error for phone field */
export const PHONE_ERROR =
  'Enter a valid phone number for the selected country (e.g. 860 512 3456)';

export function isRealEmail(value: string): boolean {
  const e = value.trim();
  if (e.length < 5 || e.length > 120) return false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(e)) return false;
  const local = e.split('@')[0] || '';
  // hez.i.b.o.yanu.te.55@… style spam
  if ((local.match(/\./g) || []).length >= 4) return false;
  return true;
}

/** Optional free text (location) — empty OK; allows global languages; blocks Latin keyboard spam */
export function isPlausibleOptionalText(value: string | undefined, max = 500): boolean {
  if (!value || !value.trim()) return true;
  const t = value.trim();
  if (t.length > max) return false;

  // Non-Latin / mixed global language locations are fine (e.g. 東京都, Москва)
  if (isGlobalLanguageText(t)) return true;

  if (t.length >= 14 && !/\s/.test(t) && /[a-z]/.test(t) && /[A-Z]/.test(t) && /^[A-Za-z0-9]+$/.test(t)) {
    return false;
  }
  // Single long Latin nonsense token only
  if (t.length >= 16 && !/\s/.test(t) && /^[A-Za-z0-9]+$/.test(t)) {
    const vowels = (t.match(/[aeiouy]/gi) || []).length;
    if (vowels / t.length < 0.2) return false;
  }
  return true;
}

/**
 * Message spam keyword pack. Keep real-estate-safe language out of this list
 * (e.g. avoid bare "investment", "property", "loan" which legit leads use).
 */
const MESSAGE_SPAM_KEYWORD_PARTS = [
  // pharma / adult
  'viagra', 'cialis', 'levitra', 'xanax', 'valium', 'adderall', 'oxycodone', 'tramadol', 'phentermine',
  'porn', 'porno', 'xxx', 'onlyfans', 'cam\\s*girls?', 'escort\\s*service', 'sex\\s*chat',
  'male\\s*enhancement', 'penis\\s*enlargement', 'erectile', 'weight\\s*loss\\s*pills?',
  // gambling
  'casino', 'online\\s*poker', 'slot\\s*machines?', 'betting\\s*tips?', 'sports\\s*betting',
  // crypto / scams
  'crypto\\s*airdrop', 'nft\\s*giveaway', 'free\\s*bitcoin', 'bitcoin\\s*giveaway',
  'binary\\s*options?', 'forex\\s*robot', 'forex\\s*signals?', 'investment\\s*guaranteed',
  'double\\s*your\\s*(?:money|btc|crypto)', 'guaranteed\\s*returns?',
  'make\\s*money\\s*fast', 'get\\s*rich\\s*quick', 'passive\\s*income\\s*bot',
  // SEO / social spam
  'seo\\s*backlinks?', 'buy\\s*backlinks?', 'guest\\s*post\\s*for\\s*sale', 'link\\s*building\\s*service',
  'buy\\s*followers', 'buy\\s*likes', 'buy\\s*views', 'instagram\\s*growth',
  'increase\\s*your\\s*(?:traffic|ranking)', 'rank\\s*#?\\s*1\\s*on\\s*google',
  // phishing / urgency
  'click\\s*here\\s*now', 'act\\s*now', 'limited\\s*time\\s*offer', 'you\\s*have\\s*won',
  'claim\\s*your\\s*prize', 'congratulations\\s*you\\s*won', 'lottery\\s*winner',
  'nigerian\\s*prince', 'wire\\s*transfer\\s*fee', 'western\\s*union\\s*request',
  // fake jobs / MLM
  'work\\s*from\\s*home\\s*\\$\\d', 'earn\\s*\\$\\d+\\s*(?:a|per)\\s*day',
  'mlm\\s*opportunity', 'multi[- ]level\\s*marketing',
  // malware / software
  'free\\s*vpn\\s*crack', 'software\\s*crack', 'keygen', 'warez',
  // misc bot spam
  'telegram\\s*promo', 'whatsapp\\s*marketing', 'bulk\\s*sms', 'email\\s*blast\\s*service',
  'cheap\\s*meds', 'online\\s*pharmacy', 'no\\s*prescription\\s*needed',
  // dating / more common spam
  'hot\\s*singles', 'dating\\s*site', 'meet\\s*singles', 'sugar\\s*daddy',
  'debt\\s*relief\\s*scam', 'tax\\s*relief\\s*now', 'irs\\s*debt\\s*forgiveness',
  'payday\\s*loan\\s*online', 'bad\\s*credit\\s*loan\\s*guaranteed',
  'replica\\s*watches?', 'fake\\s*rolex', 'designer\\s*replicas?',
  'cbd\\s*gummies\\s*for\\s*sale', 'kratom\\s*wholesale',
  'seo\\s*agency\\s*offer', 'website\\s*traffic\\s*package',
  'dm\\s*for\\s*promo', 'collab\\s*for\\s*crypto',
];

const MESSAGE_SPAM_KEYWORDS = new RegExp(
  `\\b(?:${MESSAGE_SPAM_KEYWORD_PARTS.join('|')})\\b`,
  'i',
);

/**
 * Message field spam filter.
 * Empty OK. Real enquiries in any language pass.
 * Latin keyboard / bot noise and English spam keywords still blocked.
 */
export function checkMessageSpam(
  value: string | undefined,
  max = 2000,
): { ok: true } | { ok: false; drop: boolean; reason: string } {
  if (value == null || !String(value).trim()) return { ok: true };

  const t = String(value).trim();
  if (t.length > max) {
    return { ok: false, drop: false, reason: 'Please keep your message under 2000 characters.' };
  }

  // Too many URLs → spam (language-agnostic)
  const urlCount = (t.match(/https?:\/\/|www\./gi) || []).length;
  if (urlCount >= 3) {
    return { ok: false, drop: true, reason: 'spam' };
  }

  // English spam keyword packs (still catch mixed-language spam that includes these)
  if (MESSAGE_SPAM_KEYWORDS.test(t)) {
    return { ok: false, drop: true, reason: 'spam' };
  }

  // Long repeated character runs (aaaaaaaaa / !!!!!!!!!)
  if (/(.)\1{9,}/.test(t)) {
    return { ok: false, drop: true, reason: 'spam' };
  }

  // Global-language enquiries (中文, Español with enough non-ASCII letters, العربية, हिन्दी, …)
  // Skip Latin-only gibberish heuristics — those false-flag non-English text.
  if (isGlobalLanguageText(t)) {
    return { ok: true };
  }

  // --- Below: Latin-script noise only ---

  // Whole message is one random blob (e.g. TrPmOCYxwIvVWamgCySNX)
  if (!/\s/.test(t) && t.length >= 12 && /^[A-Za-z0-9]+$/.test(t)) {
    if (/[a-z][A-Z]/.test(t) || /[A-Z][a-z][A-Z]/.test(t)) {
      return { ok: false, drop: true, reason: 'spam' };
    }
    const vowels = (t.match(/[aeiouy]/gi) || []).length;
    if (vowels / t.length < 0.22) {
      return { ok: false, drop: true, reason: 'spam' };
    }
  }

  const words = t.split(/\s+/).filter(Boolean);
  let gibberishWords = 0;

  for (const w of words) {
    // Only score pure Latin tokens as gibberish
    const core = w.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, '');
    if (core.length < 8) continue;
    if (!/^[A-Za-z0-9]+$/.test(core)) continue;

    if (/[a-z][A-Z]/.test(core) && /^[A-Za-z]+$/.test(core)) {
      gibberishWords += 1;
      continue;
    }

    if (core.length >= 14 && /^[A-Za-z0-9]+$/.test(core)) {
      const v = (core.match(/[aeiouy]/gi) || []).length;
      if (v / core.length < 0.18) gibberishWords += 1;
    }

    if (core.length >= 10 && /^[A-Za-z]+$/.test(core)) {
      if (/[bcdfghjklmnpqrstvwxz]{6,}/i.test(core)) gibberishWords += 1;
    }
  }

  if (words.length > 0 && gibberishWords >= Math.max(1, Math.ceil(words.length * 0.5))) {
    return { ok: false, drop: true, reason: 'spam' };
  }
  if (gibberishWords >= 2) {
    return { ok: false, drop: true, reason: 'spam' };
  }

  // Overall Latin letter stream: too few vowels
  const letters = t.replace(/[^A-Za-z]/g, '');
  if (letters.length >= 16) {
    const vowels = (letters.match(/[aeiouy]/gi) || []).length;
    if (vowels / letters.length < 0.16) {
      return { ok: false, drop: true, reason: 'spam' };
    }
  }

  const camelHits = (t.match(/[a-z][A-Z]/g) || []).length;
  if (camelHits >= 3 && t.length < 80) {
    return { ok: false, drop: true, reason: 'spam' };
  }

  return { ok: true };
}

/**
 * Full lead check. Server always runs this (with timing).
 * Client runs field checks with skipTiming=true, then waits MIN_SUBMIT_MS before POST.
 */
export function checkLead(
  p: SpamPayload,
  opts: { requireEmail?: boolean; skipTiming?: boolean } = {},
): SpamCheck {
  // 1) Honeypot
  if (p._hp != null && String(p._hp).trim() !== '') {
    return { pass: false, reason: 'spam', drop: true };
  }

  // 2) Timing
  if (!opts.skipTiming) {
    const ts = typeof p._ts === 'string' ? Number(p._ts) : p._ts;
    if (ts == null || !Number.isFinite(ts)) {
      return { pass: false, reason: 'spam', drop: true };
    }
    const age = Date.now() - ts;
    if (age < MIN_SUBMIT_MS || age > MAX_SUBMIT_MS) {
      return { pass: false, reason: 'spam', drop: true };
    }
  }

  // 3) Name
  const name = fullName(p);
  if (!name) return { pass: false, reason: 'Please enter your name.', drop: false };
  if (!isRealName(name)) {
    const drop =
      /[0-9]/.test(name) ||
      (/[a-z][A-Z]/.test(name) && !isGlobalLanguageText(name)) ||
      (name.replace(/\s/g, '').length > 24 && !isGlobalLanguageText(name));
    return { pass: false, reason: 'Please enter a real name.', drop };
  }

  // 4) Phone — validate against selected country code when provided
  const phone = (p.phone || '').trim();
  if (!phone) return { pass: false, reason: 'Please enter a phone number.', drop: false };
  if (!isRealPhone(phone, p.phoneCountry)) {
    const digits = phone.replace(/\D/g, '');
    const letterSpam = /[a-zA-Z]/.test(phone);
    return {
      pass: false,
      reason: PHONE_ERROR,
      drop: letterSpam || digits.length < 7,
    };
  }

  // 5) Email
  const email = (p.email || '').trim();
  if (opts.requireEmail) {
    if (!email) return { pass: false, reason: 'Please enter your email address.', drop: false };
    if (!isRealEmail(email)) return { pass: false, reason: 'Please enter a valid email address.', drop: false };
  } else if (email && !isRealEmail(email)) {
    const local = email.split('@')[0] || '';
    const drop = (local.match(/\./g) || []).length >= 4;
    return { pass: false, reason: 'Please enter a valid email address.', drop };
  }

  // 6) Interest whitelist
  const interest = (p.interest || '').trim();
  if (interest && interest !== 'N/A') {
    if (!(ALLOWED_INTERESTS as readonly string[]).includes(interest)) {
      return { pass: false, reason: 'spam', drop: true };
    }
  }

  // 7) Location gibberish
  if (!isPlausibleOptionalText(p.location, 120)) {
    return { pass: false, reason: 'Please enter a real location.', drop: true };
  }

  // 8) Message spam (keyboard noise, keyword spam, URL dumps)
  const msgCheck = checkMessageSpam(p.message, 2000);
  if (msgCheck.ok === false) {
    return {
      pass: false,
      reason:
        msgCheck.drop
          ? 'Please enter a clearer message about your real estate needs.'
          : msgCheck.reason,
      drop: msgCheck.drop,
    };
  }

  return { pass: true };
}

/** Wait so legitimate fast fills still clear the server timing check */
export function waitMinSubmitTime(openedAt: number): Promise<void> {
  const left = MIN_SUBMIT_MS - (Date.now() - openedAt);
  if (left <= 0) return Promise.resolve();
  return new Promise((r) => setTimeout(r, left));
}

/** Hidden honeypot field styles */
export const honeypotStyle = {
  position: 'absolute' as const,
  left: '-10000px',
  width: '1px',
  height: '1px',
  overflow: 'hidden' as const,
};
