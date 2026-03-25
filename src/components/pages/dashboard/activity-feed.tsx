'use client';

import { useAtomValue } from 'jotai';
import { activitiesAtom, dashboardLoadingAtom } from '@/store';
import { ArrowUpRight } from 'lucide-react';
import { ActivityEntryItem } from './activity-entry';
import { Skeleton } from '@/components/ui/skeleton';

export function ActivityFeed() {
  const activities = useAtomValue(activitiesAtom);
  const loading = useAtomValue(dashboardLoadingAtom);

  if (loading || !activities) {
    return (
      <div className="overflow-clip rounded-dropdown-menu border border-dropdown-border bg-surface shadow-xs">
        <div className="px-5 py-4">
          <Skeleton className="h-5 w-28" />
        </div>
        <div className="space-y-4 px-5 pb-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-7 w-7 shrink-0 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-clip rounded-dropdown-menu border border-dropdown-border bg-surface shadow-xs">
      {/* Header */}
      <div className="border-b border-dropdown-divider px-5 py-4">
        <h2 className="t-base-medium text-content-emphasis">Activity Feed</h2>
      </div>

      {/* Groups */}
      <div>
        {activities.groups.map(group => (
          <div key={group.label}>
            {/* Group label */}
            <div className="border-b border-dropdown-divider bg-surface-muted px-5 py-2.5">
              <p className="t-heading-xxs-bold uppercase text-dropdown-subtitle">
                {group.label}
              </p>
            </div>
            {/* Entries with timeline */}
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute inset-y-0 inset-s-8 w-px bg-dropdown-border" />
              {group.entries.map(entry => (
                <ActivityEntryItem key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-dropdown-divider px-5 py-3">
        <button className="flex w-full cursor-pointer items-center justify-center gap-1 t-xs-semibold text-brand-500 hover:opacity-80">
          View full activity log
          <ArrowUpRight className="h-3 w-3" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}
