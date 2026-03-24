"use client";

import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import type { Task } from "@/types/dashboard";

const typeLabelMap: Record<Task["type"], string> = {
  task: "Task",
  email: "Email",
  meeting: "Meeting",
  call: "Call",
};

const priorityClasses: Record<Task["priority"], string> = {
  low: "text-green-600 dark:text-green-400",
  med: "text-orange-600 dark:text-orange-400",
  high: "text-red-600 dark:text-red-400",
};

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 px-3 py-3 transition-colors",
        task.isOverdue && !task.completed && "bg-red-50/50 dark:bg-red-900/10"
      )}
    >
      {/* Circular checkbox */}
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
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
        <div className="mt-1 flex items-center gap-2">
          <span
            className={cn(
              "flex items-center gap-1 text-xs",
              task.isOverdue && !task.completed
                ? "font-medium text-red-600 dark:text-red-400"
                : "text-[var(--content-subtle)]"
            )}
          >
            <Clock className="h-3 w-3" />
            {task.dueLabel}
          </span>
          <span className="text-xs text-[var(--content-muted)]">
            {typeLabelMap[task.type]}
          </span>
        </div>
      </div>

      {/* Priority */}
      <span
        className={cn(
          "shrink-0 text-xs font-medium capitalize",
          priorityClasses[task.priority]
        )}
      >
        {task.priority === "med" ? "Med" : task.priority}
      </span>
    </div>
  );
}
