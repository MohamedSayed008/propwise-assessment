'use client';

import { cn } from '@/lib/utils';
import {
  UserPlus,
  ArrowRightLeft,
  Phone,
  Mail,
  StickyNote,
  DollarSign,
} from 'lucide-react';
import type { ActivityEntry as ActivityEntryType } from '@/types/dashboard';

const iconMap: Record<ActivityEntryType['icon'], React.ElementType> = {
  lead: UserPlus,
  deal: ArrowRightLeft,
  call: Phone,
  email: Mail,
  note: StickyNote,
  task: ArrowRightLeft,
  commission: DollarSign,
};

const iconColorMap: Record<ActivityEntryType['icon'], string> = {
  lead: 'bg-activity-lead text-activity-lead-text',
  deal: 'bg-activity-deal text-activity-deal-text',
  call: 'bg-activity-success text-activity-success-text',
  email: 'bg-activity-email text-activity-email-text',
  note: 'bg-activity-note text-activity-note-text',
  task: 'bg-activity-neutral text-activity-neutral-text',
  commission: 'bg-activity-success text-activity-success-text',
};

function highlightMessage(
  message: string,
  highlights: ActivityEntryType['highlights']
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
          hl.type === 'person'
            ? 'font-medium text-brand-500'
            : 'font-semibold text-content-emphasis'
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
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          colorClass
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-content-default leading-5">
          {highlightMessage(entry.message, entry.highlights)}
        </p>
        <p className="mt-0.5 text-xs text-content-muted">
          {entry.relativeTime}
        </p>
      </div>
    </div>
  );
}
