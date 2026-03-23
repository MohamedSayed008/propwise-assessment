"use client";

import {
  UserPlus,
  ArrowRightLeft,
  Phone,
  Mail,
  StickyNote,
  DollarSign,
} from "lucide-react";
import type { ActivityEntry as ActivityEntryType } from "@/types/dashboard";

const iconMap: Record<ActivityEntryType["icon"], React.ElementType> = {
  lead: UserPlus,
  deal: ArrowRightLeft,
  call: Phone,
  email: Mail,
  note: StickyNote,
  task: ArrowRightLeft,
  commission: DollarSign,
};

const iconColorMap: Record<ActivityEntryType["icon"], string> = {
  lead: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  deal: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  call: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  email: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  note: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  task: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  commission: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
};

function highlightMessage(
  message: string,
  highlights: ActivityEntryType["highlights"]
): React.ReactNode {
  if (highlights.length === 0) return message;

  const result: React.ReactNode[] = [];
  let remaining = message;
  let keyIndex = 0;

  for (const hl of highlights) {
    const idx = remaining.indexOf(hl.text);
    if (idx === -1) continue;

    if (idx > 0) {
      result.push(remaining.slice(0, idx));
    }
    result.push(
      <span
        key={keyIndex++}
        className={
          hl.type === "person"
            ? "font-medium text-[var(--color-brand-500)]"
            : "font-semibold text-[var(--content-emphasis)]"
        }
      >
        {hl.text}
      </span>
    );
    remaining = remaining.slice(idx + hl.text.length);
  }

  if (remaining) result.push(remaining);
  return result;
}

interface ActivityEntryProps {
  entry: ActivityEntryType;
}

export function ActivityEntryItem({ entry }: ActivityEntryProps) {
  const Icon = iconMap[entry.icon] ?? ArrowRightLeft;
  const colorClass = iconColorMap[entry.icon] ?? iconColorMap.task;

  return (
    <div className="flex gap-3 py-2">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${colorClass}`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-[var(--content-default)] leading-5">
          {highlightMessage(entry.message, entry.highlights)}
        </p>
        <p className="mt-0.5 text-xs text-[var(--content-muted)]">
          {entry.relativeTime}
        </p>
      </div>
    </div>
  );
}