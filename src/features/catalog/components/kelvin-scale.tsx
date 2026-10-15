import { KELVINS } from '@/features/catalog/lib/kelvin';
import { cn } from '@/lib/cn';

/** The four color temperatures as dark tiles lit by their own light. */
export function KelvinScale({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <ul
      className={cn(
        'grid gap-3',
        compact ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {KELVINS.map((kelvin) => (
        <li
          key={kelvin.value}
          className={cn(
            'relative overflow-hidden rounded-2xl bg-ink text-on-ink',
            compact ? 'p-4 pt-16' : 'p-5 pt-28 sm:p-6 sm:pt-32',
          )}
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-full opacity-90"
            style={{
              background: `radial-gradient(circle at 50% -10%, ${kelvin.glow}, transparent 62%)`,
            }}
          />
          <div
            aria-hidden
            className={cn(
              'absolute left-1/2 -translate-x-1/2 rounded-full',
              compact ? 'top-5 size-5' : 'top-8 size-8',
            )}
            style={{ background: kelvin.glow, boxShadow: `0 0 40px 12px ${kelvin.glow}` }}
          />
          <p className="relative text-xl font-light tabular-nums sm:text-2xl">{kelvin.value}</p>
          <p className="relative mt-1 text-sm font-medium">{kelvin.name}</p>
          <p className="relative mt-2 text-[13px] leading-relaxed text-on-ink/65">{kelvin.use}</p>
        </li>
      ))}
    </ul>
  );
}
