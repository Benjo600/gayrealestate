import React, { useEffect, useId, useRef, useState } from 'react';
import {
  DEFAULT_PHONE_COUNTRY,
  PHONE_COUNTRIES,
  getPhoneCountry,
  phoneCountryTitle,
  type PhoneCountry,
} from '../../lib/phoneCountries';
import type { CountryCode } from 'libphonenumber-js';
import { CountryFlag } from './CountryFlag';

export interface PhoneInputProps {
  id?: string;
  country: CountryCode;
  national: string;
  onCountryChange: (code: CountryCode) => void;
  onNationalChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  /** Visual style to match parent form */
  variant?: 'enquiry' | 'plain' | 'modal' | 'blog';
  className?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  id: idProp,
  country,
  national,
  onCountryChange,
  onNationalChange,
  required,
  disabled,
  variant = 'plain',
  className = '',
}) => {
  const reactId = useId();
  const id = idProp || `phone-${reactId}`;
  const listId = `${id}-countries`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const meta: PhoneCountry = getPhoneCountry(country);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const filtered = query.trim()
    ? PHONE_COUNTRIES.filter((c) => {
        const q = query.trim().toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.dial.includes(q) ||
          `+${c.dial}`.includes(q)
        );
      })
    : PHONE_COUNTRIES;

  const isEnquiry = variant === 'enquiry';
  const isModal = variant === 'modal';
  const isBlog = variant === 'blog';

  // One shell = same height / radius as sibling fields
  const shell = [
    'relative flex w-full items-stretch bg-white transition-colors duration-150',
    isEnquiry || variant === 'plain'
      ? 'h-12 rounded-lg border border-slate-300 focus-within:border-slate-800'
      : '',
    isModal
      ? 'rounded-xl border border-slate-200 bg-white/80 focus-within:border-purple-300 focus-within:ring-4 focus-within:ring-purple-50 focus-within:bg-white'
      : '',
    isBlog
      ? 'rounded-xl border border-slate-200 bg-slate-50/50 focus-within:ring-2 focus-within:ring-brand-400/20 focus-within:border-brand-400'
      : '',
    open ? (isEnquiry || variant === 'plain' ? 'border-slate-800' : '') : '',
    disabled ? 'opacity-60 pointer-events-none' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const countryBtn = [
    'flex shrink-0 items-center gap-1.5 pl-3 pr-2.5 border-r border-slate-200',
    'text-slate-700 hover:bg-slate-50/80 transition-colors',
    'focus:outline-none focus-visible:bg-slate-50',
    isModal || isBlog ? 'py-2.5' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const phoneField = isEnquiry
    ? 'peer w-full h-full min-w-0 bg-transparent border-0 pl-3 pr-3 pt-5 pb-1 text-slate-800 text-sm placeholder-transparent focus:outline-none focus:ring-0'
    : [
        'w-full min-w-0 bg-transparent border-0 px-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-0',
        isModal || isBlog ? 'py-2.5' : 'h-full',
      ].join(' ');

  const placeholder =
    country === 'US' || country === 'CA'
      ? '860 512 3456'
      : country === 'GB'
        ? '7911 123456'
        : 'Phone number';

  const pick = (code: CountryCode) => {
    onCountryChange(code);
    setOpen(false);
    setQuery('');
  };

  return (
    <div ref={rootRef} className={`relative ${open ? 'z-50' : 'z-0'} ${className}`}>
      <div className={shell}>
        {/* Country trigger — flag + dial only */}
        <button
          type="button"
          id={`${id}-country`}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          title={phoneCountryTitle(meta)}
          onClick={() => setOpen((v) => !v)}
          className={countryBtn}
        >
          <CountryFlag code={meta.code} title={meta.name} size="md" />
          <span className="text-xs font-semibold tabular-nums tracking-tight text-slate-600">
            +{meta.dial}
          </span>
          <svg
            className={`w-3 h-3 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* National number */}
        <div className="relative flex-1 min-w-0">
          {isEnquiry ? (
            <>
              <input
                id={id}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                required={required}
                disabled={disabled}
                placeholder=" "
                value={national}
                onChange={(e) => onNationalChange(e.target.value)}
                className={phoneField}
              />
              <label
                htmlFor={id}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm transition-all duration-150 pointer-events-none peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:text-slate-900 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-slate-900"
              >
                Phone <span className="text-red-500">*</span>
              </label>
            </>
          ) : (
            <input
              id={id}
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              required={required}
              disabled={disabled}
              placeholder={placeholder}
              value={national}
              onChange={(e) => onNationalChange(e.target.value)}
              className={phoneField}
            />
          )}
        </div>
      </div>

      {/* Country picker panel */}
      {open && (
        <div
          id={listId}
          role="listbox"
          aria-label="Select country"
          className="absolute z-[60] left-0 right-0 mt-1.5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 isolate"
        >
          <div className="border-b border-slate-100 p-2">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country…"
              autoFocus
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white"
            />
          </div>
          <ul className="max-h-52 overflow-y-auto py-1 overscroll-contain">
            {filtered.length === 0 ? (
              <li className="px-3 py-3 text-sm text-slate-400 text-center">No matches</li>
            ) : (
              filtered.map((c) => {
                const active = c.code === country;
                return (
                  <li key={c.code} role="option" aria-selected={active}>
                    <button
                      type="button"
                      onClick={() => pick(c.code)}
                      className={[
                        'flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors',
                        active ? 'bg-slate-900 text-white' : 'text-slate-800 hover:bg-slate-50',
                      ].join(' ')}
                    >
                      <CountryFlag code={c.code} title={c.name} size="md" className="shrink-0" />
                      <span className="flex-1 truncate font-medium">{c.name}</span>
                      <span
                        className={[
                          'tabular-nums text-xs font-semibold',
                          active ? 'text-white/70' : 'text-slate-400',
                        ].join(' ')}
                      >
                        +{c.dial}
                      </span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export { DEFAULT_PHONE_COUNTRY };
