'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useDashboard } from '@/hooks/use-dashboard';
import type { Period } from '@/types/dashboard';

const tabs: { label: string; value: Period }[] = [
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'this_week' },
  { label: 'This Month', value: 'this_month' },
  { label: 'This Quarter', value: 'this_quarter' },
  { label: 'This Year', value: 'this_year' },
  { label: 'Custom', value: 'custom' },
];

export function DateFilterTabs() {
  const { period, changePeriod } = useDashboard();

  const attemptChange = useCallback(
    async (tab: (typeof tabs)[number]) => {
      try {
        await changePeriod(tab.value);
        toast.info(`Dashboard updated to ${tab.label}`);
      } catch {
        toast.error('Failed to load data', {
          action: {
            label: 'Retry',
            onClick: () => {
              changePeriod(tab.value).catch(() => {
                toast.error('Failed to load data. Please try again.');
              });
            },
          },
        });
      }
    },
    [changePeriod]
  );

  const handleChange = useCallback(
    (tab: (typeof tabs)[number]) => {
      if (tab.value === period) return;
      attemptChange(tab);
    },
    [period, attemptChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIndex = tabs.findIndex(t => t.value === period);
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const isRtl = document.documentElement.dir === 'rtl';
        const isForward = isRtl
          ? e.key === 'ArrowLeft'
          : e.key === 'ArrowRight';
        const next = isForward
          ? (currentIndex + 1) % tabs.length
          : (currentIndex - 1 + tabs.length) % tabs.length;
        handleChange(tabs[next]);
      }
    },
    [period, handleChange]
  );

  return (
    <div
      className="flex w-full items-center gap-1 overflow-x-auto rounded-lg bg-surface-subtle p-1 tablet-s:inline-flex tablet-s:w-auto"
      role="tablist"
      onKeyDown={handleKeyDown}
    >
      {tabs.map(tab => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={period === tab.value}
          tabIndex={period === tab.value ? 0 : -1}
          onClick={() => handleChange(tab)}
          className={cn(
            'relative cursor-pointer whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors tablet-s:flex-none',
            period === tab.value
              ? 'text-content-emphasis'
              : 'text-content-subtle hover:text-content-default'
          )}
        >
          {period === tab.value && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-0 rounded-md bg-surface shadow-xs"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
