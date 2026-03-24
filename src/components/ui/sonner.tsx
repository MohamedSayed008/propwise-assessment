'use client';

import {
  Alert02Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Loading03Icon,
  MultiplicationSignCircleIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const iconClassName = 'size-4 shrink-0';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      // TODO: RTL — Sonner's position prop does not support logical values; may need manual override for RTL layouts
      position="bottom-right"
      gap={8}
      closeButton
      offset={24}
      visibleToasts={1}
      icons={{
        success: (
          <HugeiconsIcon
            icon={CheckmarkCircle02Icon}
            strokeWidth={2}
            className={iconClassName}
          />
        ),
        info: (
          <HugeiconsIcon
            icon={InformationCircleIcon}
            strokeWidth={2}
            className={iconClassName}
          />
        ),
        warning: (
          <HugeiconsIcon
            icon={Alert02Icon}
            strokeWidth={2}
            className={iconClassName}
          />
        ),
        error: (
          <HugeiconsIcon
            icon={MultiplicationSignCircleIcon}
            strokeWidth={2}
            className={iconClassName}
          />
        ),
        loading: (
          <HugeiconsIcon
            icon={Loading03Icon}
            strokeWidth={2}
            className={`${iconClassName} animate-spin`}
          />
        ),
        close: <X className="size-3.5" strokeWidth={2.25} />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'group relative inline-flex min-h-9 items-center gap-2 rounded-md border border-transparent bg-toast ps-4 pe-9 font-body text-toast-text shadow-toast data-[type=error]:bg-toast-error data-[type=error]:text-toast-error-text',
          content: 'flex min-w-0 items-center pe-1',
          title: 'truncate text-sm font-semibold leading-4 text-current',
          description: 'text-sm leading-4 text-current',
          icon: 'mt-0 shrink-0 text-current group-data-[type=error]:text-content-emphasis',
          closeButton:
            'absolute end-3 top-1/2 flex size-4 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm text-current/80 transition-opacity hover:text-current hover:opacity-100 focus:outline-none focus:ring-0 group-data-[type=error]:text-content-emphasis group-data-[type=error]:hover:text-content-emphasis',
          actionButton:
            'ms-0 inline-flex shrink-0 cursor-pointer items-center gap-2 bg-transparent p-1 text-sm font-medium text-current hover:opacity-80',
          cancelButton:
            'ms-0 inline-flex shrink-0 cursor-pointer items-center gap-2 bg-transparent p-1 text-sm font-medium text-current hover:opacity-80',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
