import { Minus, Plus } from 'lucide-react';

import { cn } from '@/lib/cn';

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  className?: string;
};

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  size = 'md',
  className,
}: QuantityStepperProps) {
  const button =
    'flex h-full cursor-pointer items-center justify-center text-foreground transition-colors hover:bg-muted disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent';
  return (
    <div
      role="group"
      aria-label="რაოდენობა"
      className={cn(
        'inline-flex items-center overflow-hidden rounded-full border border-border bg-card',
        size === 'sm' ? 'h-8' : 'h-11',
        className,
      )}
    >
      <button
        type="button"
        aria-label="შემცირება"
        className={cn(button, size === 'sm' ? 'w-8' : 'w-11')}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        <Minus className="size-3.5" />
      </button>
      <output aria-live="polite" className="min-w-6 text-center text-sm tabular-nums">
        {value}
      </output>
      <button
        type="button"
        aria-label="გაზრდა"
        className={cn(button, size === 'sm' ? 'w-8' : 'w-11')}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
