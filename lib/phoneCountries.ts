import { getCountryCallingCode, type CountryCode } from 'libphonenumber-js';

export interface PhoneCountry {
  /** ISO 3166-1 alpha-2 */
  code: CountryCode;
  /** International dialing prefix without + */
  dial: string;
  name: string;
}

/** Curated list — US first (CT site). Dial codes from libphonenumber. */
const COUNTRY_META: { code: CountryCode; name: string }[] = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IN', name: 'India' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'MX', name: 'Mexico' },
  { code: 'BR', name: 'Brazil' },
  { code: 'PH', name: 'Philippines' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SG', name: 'Singapore' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'IL', name: 'Israel' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'CN', name: 'China' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'CO', name: 'Colombia' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CL', name: 'Chile' },
  { code: 'PE', name: 'Peru' },
];

export const PHONE_COUNTRIES: PhoneCountry[] = COUNTRY_META.map(({ code, name }) => ({
  code,
  name,
  dial: getCountryCallingCode(code),
}));

export const DEFAULT_PHONE_COUNTRY: CountryCode = 'US';

export function isKnownPhoneCountry(code: string | undefined | null): code is CountryCode {
  if (!code) return false;
  return PHONE_COUNTRIES.some((c) => c.code === code);
}

export function getPhoneCountry(code: string | undefined | null): PhoneCountry {
  const found = PHONE_COUNTRIES.find((c) => c.code === code);
  return found || PHONE_COUNTRIES[0];
}

/** Accessible title */
export function phoneCountryTitle(c: PhoneCountry): string {
  return `${c.name} (+${c.dial})`;
}
