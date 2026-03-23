"use client";

import { useAtomValue } from "jotai";
import { kpisAtom } from "@/store";
import { KpiCard } from "./kpi-card";
import { Skeleton } from "@/components/ui/skeleton";
import { dashboardLoadingAtom } from "@/store";

export function KpiCards() {
  const kpis = useAtomValue(kpisAtom);
  const loading = useAtomValue(dashboardLoadingAtom);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-default)] p-4 shadow-xs"
          >
            <Skeleton className="h-3 w-20" />
            <Skeleton className="mt-2 h-7 w-24" />
            <Skeleton className="mt-2 h-5 w-16" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.label} kpi={kpi} />
      ))}
    </div>
  );
}