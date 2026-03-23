"use client";

import { useAtomValue } from "jotai";
import { pipelineAtom, dashboardLoadingAtom } from "@/store";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

function formatValue(value: number, currency: string): string {
  if (value >= 1000000) return `${currency} ${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${currency} ${Math.round(value / 1000)}K`;
  return `${currency} ${value}`;
}

export function PipelineSummary() {
  const pipeline = useAtomValue(pipelineAtom);
  const loading = useAtomValue(dashboardLoadingAtom);

  if (loading || !pipeline) {
    return (
      <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-default)] p-6 shadow-xs">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-2 h-3 w-48" />
        <div className="mt-4 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...pipeline.stages.map((s) => s.value));

  return (
    <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-default)] p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[var(--content-emphasis)]">
          Pipeline Summary
        </h2>
        <button className="text-sm font-medium text-[var(--color-brand-500)] hover:underline">
          Details &rarr;
        </button>
      </div>
      <p className="mt-1 text-xs text-[var(--content-subtle)]">
        {pipeline.totalDeals} deals across {pipeline.totalStages} stages &middot;{" "}
        {pipeline.totalValue} total value
      </p>

      {/* Bars */}
      <div className="mt-5 space-y-3">
        {pipeline.stages.map((stage) => {
          const widthPct = maxValue > 0 ? (stage.value / maxValue) * 100 : 0;
          return (
            <div key={stage.stage} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[var(--content-default)]">
                    {stage.stage}
                  </span>
                  <span className="inline-flex items-center justify-center rounded-full bg-[var(--bg-subtle)] px-2 py-0.5 text-xs font-medium text-[var(--content-subtle)]">
                    {stage.count}
                  </span>
                </div>
                <span className="text-xs text-[var(--content-subtle)]">
                  {formatValue(stage.value, stage.currency)}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-subtle)]">
                <motion.div
                  className="h-full rounded-full bg-[var(--color-brand-500)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPct}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}