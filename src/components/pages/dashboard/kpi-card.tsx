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
    <div className="flex items-center justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-default)] p-4 shadow-xs">
      <div className="min-w-0 flex-1">
        <p className="text-xs text-[var(--content-subtle)]">{kpi.label}</p>
        <p className="mt-1 font-heading text-2xl font-extrabold tracking-[0.01em] text-[var(--content-emphasis)]">
          {kpi.value}
        </p>
        <div
          className={cn(
            "mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
            isUp
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
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
      <SparklineChart data={kpi.sparklineData} />
    </div>
  );
}