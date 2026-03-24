import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'group/button relative inline-flex shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border border-transparent bg-clip-padding text-sm font-medium leading-4 whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-0 active:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-brand-600 text-content-inverted hover:bg-brand-500 focus-visible:bg-brand-600 focus-visible:shadow-focus-button disabled:bg-brand-600 disabled:text-content-inverted disabled:opacity-30',
        outline:
          'border-edge bg-surface text-content-emphasis hover:border-edge-emphasis hover:bg-surface-muted focus-visible:border-edge-emphasis focus-visible:bg-surface-muted focus-visible:shadow-focus-button aria-expanded:border-edge-emphasis aria-expanded:bg-surface-muted',
        secondary:
          'border-edge bg-surface text-content-emphasis hover:border-edge-emphasis hover:bg-surface-muted focus-visible:border-edge-emphasis focus-visible:bg-surface-muted focus-visible:shadow-focus-button aria-expanded:border-edge-emphasis aria-expanded:bg-surface-muted disabled:opacity-40',
        ghost:
          'bg-transparent text-content-emphasis hover:bg-surface-muted focus-visible:bg-surface-muted focus-visible:shadow-focus-button aria-expanded:bg-surface-muted disabled:opacity-40',
        destructive:
          'border-edge bg-surface text-content-emphasis hover:border-red-400 hover:bg-surface-muted hover:text-red-700 focus-visible:border-surface-muted focus-visible:bg-surface-muted focus-visible:text-red-700 focus-visible:shadow-focus-button-destructive disabled:border-red-200 disabled:bg-red-100 disabled:text-red-700 disabled:opacity-40',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default:
          'min-h-8 px-2.5 py-2 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2',
        xs: 'min-h-6 px-2 py-1 text-xs [&_svg:not([class*=size-])]:size-3',
        sm: 'min-h-7 px-2 py-1.5 has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5',
        lg: 'min-h-10 px-4 py-3 has-data-[icon=inline-end]:pe-3 has-data-[icon=inline-start]:ps-3',
        icon: 'size-8',
        'icon-xs': 'size-6 [&_svg:not([class*=size-])]:size-3',
        'icon-sm': 'size-7',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  loading = false,
  children,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';
  const isDisabled = loading || props.disabled;

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-loading={loading ? '' : undefined}
      disabled={asChild ? undefined : isDisabled}
      aria-disabled={isDisabled || undefined}
      className={cn(
        buttonVariants({ variant, size, className }),
        loading && 'text-current hover:text-current focus-visible:text-current',
        loading &&
          variant === 'destructive' &&
          'border-red-200 bg-red-100 text-red-700 opacity-100',
        loading &&
          (variant === 'secondary' || variant === 'outline') &&
          'border-edge bg-surface-muted text-content-emphasis',
        loading &&
          variant === 'ghost' &&
          'bg-surface-muted text-content-emphasis'
      )}
      {...props}
    >
      <span
        className={cn(
          'inline-flex items-center justify-center gap-1',
          loading && 'opacity-30'
        )}
      >
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="size-5 animate-spin" strokeWidth={2} />
        </span>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
