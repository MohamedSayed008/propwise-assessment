"use client";

import { useAtomValue } from "jotai";
import { revenueAtom, dashboardLoadingAtom } from "@/store";
import { TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function formatAxisValue(value: number): string {
  if (value >= 1000) return `$${Math.round(value / 1000)}K`;
  return `$${value}`;
}

export function RevenueForecast() {
  const revenue = useAtomValue(revenueAtom);
  const loading = useAtomValue(dashboardLoadingAtom);

  if (loading || !revenue) {
    return (
      <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-default)] p-6 shadow-xs">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-3 h-8 w-48" />
        <Skeleton className="mt-4 h-[200px] w-full" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-default)] p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[var(--content-emphasis)]">
          Revenue Forecast
        </h2>
        <button className="text-sm font-medium text-[var(--color-brand-500)] hover:underline">
          Report &rarr;
        </button>
      </div>

      {/* Value + Trend */}
      <div className="mt-2">
        <p className="font-heading text-[28px] font-extrabold leading-7 tracking-[0.01em] text-[var(--content-emphasis)]">
          {revenue.total}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <TrendingUp className="h-3 w-3" />
            +{revenue.trend}%
          </span>
          <span className="text-xs text-[var(--content-subtle)]">vs last year</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-xs text-[var(--content-subtle)]">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 rounded bg-[var(--color-brand-500)]" />
          This year
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 rounded border-t-2 border-dashed border-gray-300" />
          Last year
        </span>
      </div>

      {/* Chart */}
      <div className="mt-4 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenue.data}>
            <defs>
              <linearGradient id="thisYearGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-brand-500)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-brand-500)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="0"
              vertical={false}
              stroke="var(--border-subtle)"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "var(--content-muted)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={formatAxisValue}
              tick={{ fontSize: 12, fill: "var(--content-muted)" }}
              width={50}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--bg-default)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value) => [`AED ${Number(value).toLocaleString()}`, ""]}
            />
            <Area
              type="monotone"
              dataKey="thisYear"
              stroke="var(--color-brand-500)"
              strokeWidth={2}
              fill="url(#thisYearGrad)"
              name="This year"
            />
            <Area
              type="monotone"
              dataKey="lastYear"
              stroke="#D1D5DB"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              fill="none"
              name="Last year"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}