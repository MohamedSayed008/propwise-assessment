'use client';

import { useAtom, useAtomValue } from 'jotai';
import { RotateCcw } from 'lucide-react';
import { dashboardDataAtom, dashboardLoadingAtom, tasksAtom } from '@/store';
import { TaskItem } from './task-item';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { useCallback } from 'react';

export function TasksPanel() {
  const tasks = useAtomValue(tasksAtom);
  const loading = useAtomValue(dashboardLoadingAtom);
  const [data, setData] = useAtom(dashboardDataAtom);

  const handleToggle = useCallback(
    (id: string) => {
      if (!data) return;

      const toggled = data.tasks.items.find(t => t.id === id);
      const wasCompleted = toggled?.completed ?? false;

      const updatedItems = data.tasks.items.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );

      setData({
        ...data,
        tasks: {
          ...data.tasks,
          items: updatedItems,
          completed: updatedItems.filter(t => t.completed).length,
        },
      });

      if (!wasCompleted) {
        toast.success('Task completed', {
          action: {
            label: (
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="h-3 w-px bg-current" />
                <RotateCcw className="size-4" strokeWidth={2} />
                <span>Undo</span>
              </span>
            ),
            onClick: () => {
              // Toggle only this specific task back — reads current state, not a stale snapshot
              setData(current => {
                if (!current) return current;
                const revertedItems = current.tasks.items.map(t =>
                  t.id === id ? { ...t, completed: false } : t
                );
                return {
                  ...current,
                  tasks: {
                    ...current.tasks,
                    items: revertedItems,
                    completed: revertedItems.filter(t => t.completed).length,
                  },
                };
              });
            },
          },
        });
      }
    },
    [data, setData]
  );

  if (loading || !tasks) {
    return (
      <div className="rounded-lg border border-edge-subtle bg-surface p-6 shadow-xs">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="mt-3 h-2 w-full" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const progressPct =
    tasks.total > 0 ? (tasks.completed / tasks.total) * 100 : 0;

  return (
    <div className="rounded-lg border border-edge-subtle bg-surface p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="t-base-semibold text-content-emphasis">
          Tasks &amp; Reminders
        </h2>
        <button className="t-sm-medium text-brand-500 hover:underline">
          + Quick add
        </button>
      </div>

      {/* Progress */}
      <div className="mt-3 flex items-center gap-2">
        <Progress value={progressPct} className="h-1.5 flex-1" />
        <span className="shrink-0 t-xxs-semibold text-dropdown-subtitle">
          {tasks.completed}/{tasks.total} done
        </span>
      </div>

      {/* Task list */}
      <div className="mt-4 -mx-3 divide-y divide-edge-muted">
        {tasks.items.map(task => (
          <TaskItem key={task.id} task={task} onToggle={handleToggle} />
        ))}
      </div>
    </div>
  );
}
