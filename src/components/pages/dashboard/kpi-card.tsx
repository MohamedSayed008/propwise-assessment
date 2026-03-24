"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SparklineChart } from "./sparkline-chart";
import type { DashboardKPI } from "@/types/dashboard";

interface KpiCardProps {
  kpi: DashboardKPI;
}

export function KpiCard({ kpi }: KpiCardProps) {
  const isUp = kpi.trendDirection === "up";

  return (
    <div className="flex items-start justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-default)] p-4 shadow-xs">
      <div className="min-w-0">
        <p className="text-xs text-[var(--content-subtle)]">{kpi.label}</p>
        <p className="mt-1 font-heading text-2xl font-extrabold tracking-[0.01em] text-[var(--content-emphasis)]">
          {kpi.value}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <SparklineChart data={kpi.sparklineData} />
        <div
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
            isUp
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
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
