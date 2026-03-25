'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-3 mt-10 desktop-s:mt-0 tablet-s:flex-row tablet-s:items-start tablet-s:justify-between">
      <div>
        <h1 className="hidden desktop-s:block font-heading text-xl font-bold leading-5  text-content-emphasis">
          Dashboard
        </h1>
        <p className="mt-2 text-sm text-content-subtle">
          Here&apos;s your pipeline health and sales activity at a glance.
        </p>
      </div>

      <Button
        onClick={() => toast.info('Feature coming soon')}
        aria-label="Create new item"
        variant="default"
        size="default"
        className="w-22.25 ms-auto"
      >
        + Create
      </Button>
    </div>
  );
}
