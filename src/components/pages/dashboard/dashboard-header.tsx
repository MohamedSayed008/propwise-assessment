"use client";

import { Bell } from "lucide-react";
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
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button
          className="relative rounded-md p-2 text-[var(--content-subtle)] hover:bg-[var(--bg-subtle)] transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            2
          </span>
        </button>
        {/* Create button */}
        <button
          onClick={() => toast("Feature coming soon")}
          aria-label="Create new item"
          className="flex items-center gap-1.5 rounded-lg bg-[var(--color-brand-500)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-brand-600)]"
        >
          + Create
        </button>
      </div>
    </div>
  );
}
