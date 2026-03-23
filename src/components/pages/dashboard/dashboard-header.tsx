"use client";

import { toast } from "sonner";

export function DashboardHeader() {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="font-heading text-2xl font-extrabold tracking-[0.01em] text-[var(--content-emphasis)]">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-[var(--content-subtle)]">
          Here&apos;s your pipeline health and sales activity at a glance.
        </p>
      </div>
      <button
        onClick={() => toast("Feature coming soon")}
        className="rounded-lg bg-[var(--color-brand-500)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-600)]"
      >
        + Create
      </button>
    </div>
  );
}