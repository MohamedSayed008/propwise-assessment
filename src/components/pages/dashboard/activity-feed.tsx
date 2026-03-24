'use client';

import { useAtomValue } from 'jotai';
import { activitiesAtom, dashboardLoadingAtom } from '@/store';
import { ActivityEntryItem } from './activity-entry';
import { Skeleton } from '@/components/ui/skeleton';

export function ActivityFeed() {
  const activities = useAtomValue(activitiesAtom);
  const loading = useAtomValue(dashboardLoadingAtom);

  if (loading || !activities) {
    return (
      <div className="rounded-lg border border-edge-subtle bg-surface p-6 shadow-xs">
        <Skeleton className="h-5 w-28" />
        <div className="mt-4 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
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
    <div className="rounded-lg border border-edge-subtle bg-surface p-6 shadow-xs">
      <h2 className="text-base font-semibold text-content-emphasis">
        Activity Feed
      </h2>

      <div className="mt-4 space-y-4">
        {activities.groups.map(group => (
          <div key={group.label}>
            <p className="text-2xs font-semibold uppercase tracking-wider text-content-muted">
              {group.label}
            </p>
            <div className="mt-1 divide-y divide-edge-muted">
              {group.entries.map(entry => (
                <ActivityEntryItem key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 text-sm font-medium text-brand-500 hover:underline">
        View full activity log &rarr;
      </button>
    </div>
  );
}
