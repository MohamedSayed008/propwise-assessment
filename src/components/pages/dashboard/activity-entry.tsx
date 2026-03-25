'use client';

import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import {
  ArrowRightLeft,
  DollarSign,
  Mail,
  Phone,
  StickyNote,
  UserPlus,
} from 'lucide-react';
import type { ActivityEntry as ActivityEntryType } from '@/types/dashboard';

const iconMap: Record<ActivityEntryType['icon'], ElementType> = {
  lead: UserPlus,
  deal: ArrowRightLeft,
  call: Phone,
  email: Mail,
  note: StickyNote,
  task: ArrowRightLeft,
  commission: DollarSign,
};

const iconBgMap: Record<ActivityEntryType['icon'], string> = {
  lead: 'bg-gray-50',
  deal: 'bg-gray-50',
  call: 'bg-gray-50',
  email: 'bg-gray-50',
  note: 'bg-surface-info',
  task: 'bg-gray-50',
  commission: 'bg-kpi-trend-bg',
};

function highlightMessage(
  message: string,
  highlights: ActivityEntryType['highlights']
): ReactNode {
  if (highlights.length === 0) return message;

  const result: ReactNode[] = [];
  let remaining = message;
  let keyIndex = 0;

  let personIndex = 0;

  for (const hl of highlights) {
    const idx = remaining.indexOf(hl.text);
    if (idx === -1) continue;

    if (idx > 0) {
      result.push(remaining.slice(0, idx));
    }

    const isInitiator = hl.type === 'person' && personIndex === 0;
    if (hl.type === 'person') personIndex++;

    result.push(
      <span
        key={keyIndex++}
        className={
          isInitiator
            ? 'font-semibold text-content-emphasis'
            : 'font-semibold text-activity-link'
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
  const bgClass = iconBgMap[entry.icon] ?? 'bg-gray-50';

  return (
    <div className="relative flex gap-3 px-5 py-3">
      <div
        className={cn(
          'relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
          bgClass
        )}
      >
        <Icon className="h-3.5 w-3.5 text-content-subtle" />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-xs leading-4.5 text-content-emphasis">
          {highlightMessage(entry.message, entry.highlights)}
        </p>
        <p className="mt-0.5 text-chart text-dropdown-subtitle">
          {entry.relativeTime}
        </p>
      </div>
    </div>
  );
}
