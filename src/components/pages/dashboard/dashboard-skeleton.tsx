import { Skeleton } from '@/components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-start justify-between">
        <div>
          <Skeleton className="h-7 w-36" />
          <Skeleton className="mt-2 h-4 w-72" />
        </div>
        <Skeleton className="h-9 w-24 rounded-lg" />
      </div>

      {/* Date filter skeleton */}
      <Skeleton className="h-10 w-125 rounded-lg" />

      {/* KPI cards skeleton */}
      <div className="grid grid-cols-1 gap-4 tablet-s:grid-cols-2 desktop-m:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-25 rounded-lg" />
        ))}
      </div>

      {/* Main content skeleton */}
      <div className="grid grid-cols-1 gap-6 tablet-m:grid-cols-2 desktop-s:grid-cols-5">
        <div className="space-y-6 tablet-m:col-span-2 desktop-s:col-span-3">
          <Skeleton className="h-85 rounded-lg" />
          <Skeleton className="h-75 rounded-lg" />
        </div>
        <div className="space-y-6 tablet-m:col-span-2 desktop-s:col-span-2">
          <Skeleton className="h-95 rounded-lg" />
          <Skeleton className="h-85 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
