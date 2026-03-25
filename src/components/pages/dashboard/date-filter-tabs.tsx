'use client';

import { useCallback } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

  const handleValueChange = useCallback(
    (value: string) => {
      const tab = tabs.find(t => t.value === value);
      if (!tab || tab.value === period) return;

      changePeriod(tab.value)
        .then(() => {
          toast.info(`Dashboard updated to ${tab.label}`);
        })
        .catch(() => {
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
        });
    },
    [period, changePeriod]
  );

  return (
    <Tabs value={period} onValueChange={handleValueChange}>
      <TabsList className="grid w-full grid-cols-3 gap-1 tablet-s:grid-cols-6 tablet-s:w-139.5 tablet-s:gap-0">
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="text-search"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
