"use client";

import { cn } from "@/lib/utils";
import { CheckSquare, Mail, Calendar, Phone } from "lucide-react";
import type { Task } from "@/types/dashboard";

const typeIconMap: Record<Task["type"], React.ElementType> = {
  task: CheckSquare,
  email: Mail,
  meeting: Calendar,
  call: Phone,
};

const typeLabelMap: Record<Task["type"], string> = {
  task: "Task",
  email: "Email",
  meeting: "Meeting",
  call: "Call",
};

const priorityClasses: Record<Task["priority"], string> = {
  low: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  med: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
  const Icon = typeIconMap[task.type];

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors",
        task.isOverdue && !task.completed && "bg-red-50 dark:bg-red-900/10"
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
          task.completed
            ? "border-[var(--color-brand-500)] bg-[var(--color-brand-500)]"
            : "border-[var(--border-emphasis)] hover:border-[var(--color-brand-500)]"
        )}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
      >
        {task.completed && (
          <svg
            className="h-3 w-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-sm font-medium",
            task.completed
              ? "text-[var(--content-muted)] line-through"
              : "text-[var(--content-default)]"
          )}
        >
          {task.title}
        </p>
        <p
          className={cn(
            "mt-0.5 text-xs",
            task.isOverdue && !task.completed
              ? "font-medium text-red-600 dark:text-red-400"
              : "text-[var(--content-subtle)]"
          )}
        >
          {task.dueLabel}
        </p>
      </div>

      {/* Badges */}
      <div className="flex shrink-0 items-center gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--bg-subtle)] px-2 py-0.5 text-[10px] font-medium text-[var(--content-subtle)]">
          <Icon className="h-3 w-3" />
          {typeLabelMap[task.type]}
        </span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-medium capitalize",
            priorityClasses[task.priority]
          )}
        >
          {task.priority}
        </span>
      </div>
    </div>
  );
}