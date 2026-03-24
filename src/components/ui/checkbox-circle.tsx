'use client';

import { cn } from '@/lib/utils';

interface CheckboxCircleProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
  'aria-label'?: string;
}

export function CheckboxCircle({
  checked,
  onChange,
  className,
  'aria-label': ariaLabel,
}: CheckboxCircleProps) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={onChange}
      className={cn(
        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
        checked
          ? 'border-brand-500 bg-brand-500'
          : 'border-edge-emphasis hover:border-brand-500',
        className
      )}
    >
      {checked && (
        <svg
          className="h-3 w-3 text-primary-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  );
}
