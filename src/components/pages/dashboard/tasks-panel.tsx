'use client';

import { useAtom, useAtomValue } from 'jotai';
import { RotateCcw } from 'lucide-react';
import { tasksAtom, dashboardLoadingAtom, dashboardDataAtom } from '@/store';
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

      const prevItems = data.tasks.items;
      const updatedItems = prevItems.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      const completedCount = updatedItems.filter(t => t.completed).length;
      const toggled = prevItems.find(t => t.id === id);
      const wasCompleted = toggled?.completed ?? false;

      setData({
        ...data,
        tasks: {
          ...data.tasks,
          items: updatedItems,
          completed: completedCount,
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
              setData({
                ...data,
                tasks: {
                  ...data.tasks,
                  items: prevItems,
                  completed: prevItems.filter(t => t.completed).length,
                },
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
        <h2 className="text-base font-semibold text-content-emphasis">
          Tasks &amp; Reminders
        </h2>
        <button className="text-sm font-medium text-brand-500 hover:underline">
          + Quick add
        </button>
      </div>

      {/* Progress */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-content-subtle">
          <span>
            {tasks.completed}/{tasks.total} done
          </span>
        </div>
        <Progress value={progressPct} className="mt-1.5 h-2" />
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
