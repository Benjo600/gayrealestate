import React from 'react';
import * as Flags from 'country-flag-icons/react/3x2';
import type { CountryCode } from 'libphonenumber-js';

export interface CountryFlagProps {
  code: CountryCode | string;
  title?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClass: Record<NonNullable<CountryFlagProps['size']>, string> = {
  sm: 'w-5 h-[0.9375rem]',
  md: 'w-6 h-[1.125rem]',
  lg: 'w-7 h-[1.3125rem]',
};

/**
 * Real SVG country flags (not emoji — emoji flags fail on Windows).
 * Uses country-flag-icons 3×2 aspect ratio.
 */
export const CountryFlag: React.FC<CountryFlagProps> = ({
  code,
  title,
  className = '',
  size = 'md',
}) => {
  const iso = code.toUpperCase();
  // Package exports each ISO code as a React component (US, GB, …)
  const Flag = (Flags as unknown as Record<string, React.ComponentType<{ title?: string; className?: string }> | undefined>)[iso];

  if (!Flag) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-[2px] bg-slate-100 text-[9px] font-bold text-slate-500 ${sizeClass[size]} ${className}`}
        title={title || iso}
        aria-hidden
      >
        {iso}
      </span>
    );
  }

  return (
    <Flag
      title={title || iso}
      className={`inline-block rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(15,23,42,0.08)] ${sizeClass[size]} ${className}`}
    />
  );
};
