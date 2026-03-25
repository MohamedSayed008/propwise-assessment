'use client';

import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import type { Task } from '@/types/dashboard';

const typeLabelMap: Record<Task['type'], string> = {
  task: 'Task',
  email: 'Email',
  meeting: 'Meeting',
  call: 'Call',
};

const priorityClasses: Record<Task['priority'], string> = {
  low: 'bg-priority-low-bg text-priority-low-text',
  med: 'bg-priority-med-bg text-priority-med-text',
  high: 'bg-priority-high-bg text-priority-high-text',
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
      <Checkbox
        variant="circle"
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="mt-0.5"
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
      />

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            't-sm-medium',
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
              'flex items-center gap-1 t-xs-regular',
              task.isOverdue && !task.completed
                ? 'font-medium text-status-danger'
                : 'text-content-subtle'
            )}
          >
            <Clock className="h-3 w-3" />
            {task.dueLabel}
          </span>
          <span className="t-xs-regular text-content-muted">
            {typeLabelMap[task.type]}
          </span>
        </div>
      </div>

      {/* Priority */}
      <span
        className={cn(
          'shrink-0 rounded-full px-1.25 py-px t-xxs-semibold capitalize',
          priorityClasses[task.priority]
        )}
      >
        {task.priority === 'med' ? 'Med' : task.priority}
      </span>
    </div>
  );
}
