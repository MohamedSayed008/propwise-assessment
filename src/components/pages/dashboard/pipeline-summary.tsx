'use client';

import { useAtomValue } from 'jotai';
import { dashboardLoadingAtom, pipelineAtom } from '@/store';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

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
      <div className="rounded-lg border border-edge-subtle bg-surface p-6 shadow-xs">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-2 h-3 w-48" />
        <div className="mt-4 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...pipeline.stages.map(s => s.value));

  return (
    <div className="rounded-lg border border-edge-subtle bg-surface p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-content-emphasis">
          Pipeline Summary
        </h2>
        <button className="text-sm font-medium text-brand-500 hover:underline">
          Details &rarr;
        </button>
      </div>
      <p className="mt-1 text-xs text-content-subtle">
        {pipeline.totalDeals} deals across {pipeline.totalStages} stages
        &middot; {pipeline.totalValue} total value
      </p>

      {/* Bars */}
      <div className="mt-5 space-y-3">
        {pipeline.stages.map(stage => {
          const widthPct = maxValue > 0 ? (stage.value / maxValue) * 100 : 0;
          return (
            <div key={stage.stage} className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-sm font-medium text-content-default">
                {stage.stage}
              </span>
              <div className="relative h-8 flex-1 overflow-hidden rounded-md bg-surface-subtle">
                <motion.div
                  className="absolute inset-y-0 inset-inline-start-0 flex items-center rounded-md bg-brand-900 px-2 dark:bg-brand-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(widthPct, 15)}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <span className="flex items-center gap-2 whitespace-nowrap rounded-md bg-primary-foreground/20 px-1.5 py-0.75">
                    <span className="font-heading text-xs font-bold text-primary-foreground">
                      {stage.count}
                    </span>
                    <span className="text-2xs font-medium text-primary-foreground/70">
                      {formatValue(stage.value, stage.currency)}
                    </span>
                  </span>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
