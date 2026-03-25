'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SparklineChart } from './sparkline-chart';
import type { DashboardKPI } from '@/types/dashboard';

interface KpiCardProps {
  kpi: DashboardKPI;
}

export function KpiCard({ kpi }: KpiCardProps) {
  const isUp = kpi.trendDirection === 'up';

  return (
    <div className="flex items-center justify-between rounded-lg border border-edge-subtle bg-surface px-4 py-3 shadow-xs">
      <div className="min-w-0">
        <p className="text-xs font-medium leading-5 text-content-subtle">
          {kpi.label}
        </p>
        <p className="mt-2 text-base font-semibold leading-5 text-content-emphasis">
          {kpi.value}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <SparklineChart data={kpi.sparklineData} />
        <div
          className={cn(
            'inline-flex items-center gap-0.5 rounded-full px-0.75 py-0.5 text-2xs font-semibold',
            isUp ? 'bg-kpi-trend-bg text-sparkline' : 'text-status-danger'
          )}
        >
          {isUp ? (
            <TrendingUp className="h-2.5 w-2.5" strokeWidth={2.25} />
          ) : (
            <TrendingDown className="h-2.5 w-2.5" strokeWidth={2.25} />
          )}
          +{kpi.trend}%
        </div>
      </div>
    </div>
  );
}
