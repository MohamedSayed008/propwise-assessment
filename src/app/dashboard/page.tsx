'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { periodAtom } from '@/store';
import { useDashboard } from '@/hooks/use-dashboard';
import {
  DashboardHeader,
  DateFilterTabs,
  KpiCards,
  RevenueForecast,
  PipelineSummary,
  ActivityFeed,
  TasksPanel,
} from '@/components/pages/dashboard';
import { toast } from 'sonner';
import type { Period } from '@/types/dashboard';

const validPeriods: Period[] = [
  'today',
  'this_week',
  'this_month',
  'this_quarter',
  'this_year',
  'custom',
];

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setPeriod = useSetAtom(periodAtom);
  const { loadData, period } = useDashboard();
  const initializedRef = useRef(false);

  // Sync URL params to state on mount
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const urlPeriod = searchParams.get('period') as Period | null;
    const initialPeriod =
      urlPeriod && validPeriods.includes(urlPeriod) ? urlPeriod : 'today';

    setPeriod(initialPeriod);
    loadData(initialPeriod).catch(() => {
      toast.error('Failed to load data', {
        action: {
          label: 'Retry',
          onClick: () => {
            loadData(initialPeriod).catch(() => {
              toast.error('Failed to load data. Please try again.');
            });
          },
        },
      });
    });
  }, [searchParams, setPeriod, loadData]);

  // Sync period changes to URL
  useEffect(() => {
    const current = searchParams.get('period');
    if (period !== current) {
      router.replace(`/dashboard?period=${period}`, { scroll: false });
    }
  }, [period, searchParams, router]);

  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DateFilterTabs />
      <KpiCards />
      <div className="grid grid-cols-1 gap-6 tablet-m:grid-cols-2 desktop-s:grid-cols-5">
        <div className="space-y-6 tablet-m:col-span-2 desktop-s:col-span-3">
          <RevenueForecast />
          <PipelineSummary />
        </div>
        <div className="space-y-6 tablet-m:col-span-2 desktop-s:col-span-2">
          <ActivityFeed />
          <TasksPanel />
        </div>
      </div>
    </div>
  );
}
