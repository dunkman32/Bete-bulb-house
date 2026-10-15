import { cn } from '@/lib/cn';
import { toggleTheme, useThemeStore } from '@/lib/theme';

/**
 * The theme switch: a bulb, off in the light theme and lit (glass glowing, rays out) in the dark
 * one. Pressing it spreads the other theme from the bulb.
 */
export function ThemeBulb({ className }: { className?: string }) {
  const dark = useThemeStore((state) => state.theme === 'dark');

  return (
    <button
      type="button"
      aria-label="მუქი რეჟიმი"
      aria-pressed={dark}
      title={dark ? 'გამორთე მუქი რეჟიმი' : 'ჩართე მუქი რეჟიმი'}
      onClick={(event) => {
        const box = event.currentTarget.getBoundingClientRect();
        toggleTheme({ x: box.left + box.width / 2, y: box.top + box.height / 2 });
      }}
      className={cn(
        'group relative inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-muted',
        className,
      )}
    >
      <svg
        viewBox="-2 -2 28 28"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="size-[22px] overflow-visible transition-[filter] duration-500 dark:drop-shadow-[0_0_6px_var(--color-glow)]"
      >
        {/* Rays */}
        <g className="origin-[12px_9.5px] scale-50 stroke-glow opacity-0 transition duration-500 dark:scale-100 dark:opacity-100">
          <path d="M12 -1v1.8M3.8 1.8l1.3 1.3M20.2 1.8l-1.3 1.3M0.8 9.5h1.8M23.2 9.5h-1.8" />
        </g>
        {/* Glass */}
        <path
          d="M9 16.5c0-1.2-.5-2-1.3-2.9A5.9 5.9 0 0 1 6 9.5a6 6 0 1 1 12 0c0 1.6-.6 3-1.7 4.1-.8.9-1.3 1.7-1.3 2.9Z"
          className="fill-transparent transition-[fill,stroke] duration-500 dark:fill-glow dark:stroke-glow"
        />
        {/* Filament: warms up on hover, white-hot when on */}
        <path
          d="M10.3 13.8 11 11.2l1 1.3 1-1.3.7 2.6"
          strokeWidth={1.2}
          className="stroke-muted-foreground transition-[stroke] duration-500 group-hover:stroke-accent dark:stroke-on-scrim"
        />
        {/* Base */}
        <path d="M9.5 19h5M10.5 21.5h3" />
      </svg>
    </button>
  );
}
