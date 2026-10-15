import type { ComponentProps } from 'react';
import { Link } from 'react-router';

import { cn } from '@/lib/cn';

type Variant = 'primary' | 'outline' | 'ghost' | 'light';
type Size = 'sm' | 'md' | 'lg';

type ButtonStyle = { variant?: Variant; size?: Size; block?: boolean };

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/88',
  outline: 'border border-foreground/20 bg-transparent text-foreground hover:border-foreground',
  ghost: 'bg-transparent text-foreground hover:bg-muted',
  // On photos: white in both themes.
  light: 'bg-on-scrim text-scrim hover:bg-on-scrim/90',
};

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-8 text-[15px]',
};

export function buttonClasses({ variant = 'primary', size = 'md', block }: ButtonStyle = {}) {
  return cn(
    'inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full font-medium tracking-wide whitespace-nowrap transition-[background-color,border-color,color,scale] duration-200 select-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45',
    VARIANTS[variant],
    SIZES[size],
    block && 'w-full',
  );
}

export function Button({
  variant,
  size,
  block,
  className,
  type = 'button',
  ...props
}: ComponentProps<'button'> & ButtonStyle) {
  return (
    <button
      type={type}
      className={cn(buttonClasses({ variant, size, block }), className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant,
  size,
  block,
  className,
  ...props
}: ComponentProps<typeof Link> & ButtonStyle) {
  return <Link className={cn(buttonClasses({ variant, size, block }), className)} {...props} />;
}

/** A round icon-only button. `label` is what screen readers say. */
export function IconButton({
  label,
  className,
  type = 'button',
  ...props
}: ComponentProps<'button'> & { label: string }) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        'relative inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted',
        className,
      )}
      {...props}
    />
  );
}
