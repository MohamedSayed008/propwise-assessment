'use client';

import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import { CheckboxCircle } from '@/components/ui/checkbox-circle';
import type { Task } from '@/types/dashboard';

const typeLabelMap: Record<Task['type'], string> = {
  task: 'Task',
  email: 'Email',
  meeting: 'Meeting',
  call: 'Call',
};

const priorityClasses: Record<Task['priority'], string> = {
  low: 'text-status-success',
  med: 'text-status-warning',
  high: 'text-status-danger',
};

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 px-3 py-3 transition-colors',
        task.isOverdue && !task.completed && 'bg-status-danger-subtle'
      )}
    >
      <CheckboxCircle
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="mt-0.5"
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
      />

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'text-sm font-medium',
            task.completed
              ? 'text-content-muted line-through'
              : 'text-content-default'
          )}
        >
          {task.title}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span
            className={cn(
              'flex items-center gap-1 text-xs',
              task.isOverdue && !task.completed
                ? 'font-medium text-status-danger'
                : 'text-content-subtle'
            )}
          >
            <Clock className="h-3 w-3" />
            {task.dueLabel}
          </span>
          <span className="text-xs text-content-muted">
            {typeLabelMap[task.type]}
          </span>
        </div>
      </div>

      {/* Priority */}
      <span
        className={cn(
          'shrink-0 text-xs font-medium capitalize',
          priorityClasses[task.priority]
        )}
      >
        {task.priority === 'med' ? 'Med' : task.priority}
      </span>
    </div>
  );
}
