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
    <div className="flex items-start justify-between rounded-lg border border-edge-subtle bg-surface p-4 shadow-xs">
      <div className="min-w-0">
        <p className="text-xs text-content-subtle">{kpi.label}</p>
        <p className="mt-1 font-heading text-2xl font-extrabold tracking-dashboard text-content-emphasis">
          {kpi.value}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <SparklineChart data={kpi.sparklineData} />
        <div
          className={cn(
            'inline-flex items-center gap-1 rounded-full p-0.75 text-xs font-medium',
            isUp ? 'bg-kpi-trend-bg text-sparkline' : 'text-status-danger'
          )}
        >
          {isUp ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          +{kpi.trend}%
        </div>
      </div>
    </div>
  );
}
