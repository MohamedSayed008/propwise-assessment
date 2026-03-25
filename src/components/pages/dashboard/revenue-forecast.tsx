'use client';

import { useAtomValue } from 'jotai';
import { dashboardLoadingAtom, revenueAtom } from '@/store';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function formatAxisValue(value: number): string {
  if (value >= 1000) return `$${Math.round(value / 1000)}K`;
  return `$${value}`;
}

const revenueTicks = [0, 60000, 120000, 180000, 240000];

export function RevenueForecast() {
  const revenue = useAtomValue(revenueAtom);
  const loading = useAtomValue(dashboardLoadingAtom);

  if (loading || !revenue) {
    return (
      <div className="rounded-lg border border-edge-subtle bg-surface px-5 py-4 shadow-xs">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-3 h-8 w-48" />
        <Skeleton className="mt-4 h-52 w-full" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-edge-subtle bg-surface px-5 py-4 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="t-sm-regular text-content-subtle">Revenue Forecast</h2>
        <button className="inline-flex items-center gap-1 t-xs-semibold text-brand-500 hover:opacity-80">
          <span>Report</span>
          <ArrowUpRight className="size-3" strokeWidth={2.25} />
        </button>
      </div>

      {/* Value + Trend */}
      <div className="mt-1 flex flex-wrap items-end gap-2.5">
        <p className="t-heading-lg text-content-emphasis">{revenue.total}</p>
        <div className="flex items-end gap-1">
          <span className="inline-flex items-center gap-0.5 rounded-full bg-kpi-trend-bg px-1 py-0.5 t-xxs-semibold text-sparkline">
            <TrendingUp className="size-2.5" strokeWidth={2.25} />+
            {revenue.trend}%
          </span>
          <span className="pb-0.5 text-xs text-content-muted">
            vs last year
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-5 text-chart text-chart-legend">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.75 w-3 rounded-full bg-brand-500" />
          This year
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.75 w-3 rounded-full bg-edge" />
          Last year
        </span>
      </div>

      {/* Chart */}
      <div className="mt-3 h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenue.data}
            margin={{ top: 14, right: 0, bottom: 10, left: 8 }}
          >
            <defs>
              <linearGradient id="thisYearGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-brand-500)"
                  stopOpacity={0.12}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-brand-500)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="2 3"
              vertical={false}
              stroke="var(--border-subtle)"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: 'var(--content-muted)' }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={formatAxisValue}
              tick={{ fontSize: 11, fill: 'var(--content-muted)' }}
              width={60}
              ticks={revenueTicks}
              domain={[0, 240000]}
            />
            <Tooltip
              cursor={{
                stroke: 'var(--border-subtle)',
                strokeDasharray: '2 3',
              }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const thisYear = payload.find(p => p.dataKey === 'thisYear');
                const lastYear = payload.find(p => p.dataKey === 'lastYear');
                return (
                  <div className="rounded-lg border border-edge-subtle bg-surface px-3 py-2 text-xs shadow-sm">
                    <p className="mb-1 font-medium text-content-muted">
                      {label}
                    </p>
                    {thisYear && (
                      <p className="text-content-emphasis">
                        This year:{' '}
                        <span className="font-semibold">
                          AED {Number(thisYear.value).toLocaleString()}
                        </span>
                      </p>
                    )}
                    {lastYear && (
                      <p className="mt-0.5 text-content-subtle">
                        Last year:{' '}
                        <span className="font-semibold">
                          AED {Number(lastYear.value).toLocaleString()}
                        </span>
                      </p>
                    )}
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="thisYear"
              stroke="var(--color-brand-500)"
              strokeWidth={2.25}
              fill="url(#thisYearGrad)"
              name="This year"
              animationDuration={1000}
              animationEasing="ease-out"
              dot={false}
              activeDot={{
                r: 4,
                fill: 'var(--color-brand-500)',
                strokeWidth: 0,
              }}
            />
            <Area
              type="monotone"
              dataKey="lastYear"
              stroke="var(--color-edge)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="none"
              name="Last year"
              animationDuration={1000}
              animationBegin={200}
              animationEasing="ease-out"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
