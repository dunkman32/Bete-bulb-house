import { site } from '@/config/site';
import { cn } from '@/lib/cn';

/** The wordmark with a glowing point of light before it. */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn('inline-flex items-center gap-2.5 font-display tracking-[0.3em]', className)}
    >
      <span
        aria-hidden
        className="size-2.5 shrink-0 rounded-full bg-glow shadow-[0_0_14px_3px_var(--color-glow)]"
      />
      {site.name}
    </span>
  );
}
