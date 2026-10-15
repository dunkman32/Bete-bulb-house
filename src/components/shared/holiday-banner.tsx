import { ArrowRight, Sparkles } from 'lucide-react';

import { Button, ButtonLink } from '@/components/ui/button';
import { cn } from '@/lib/cn';
import { toggleTheme, useThemeStore } from '@/lib/theme';

import { FestiveTrees } from './festive-trees';

type HolidayBannerProps = {
  eyebrow: string;
  /** Left out on the collection's own page, whose header already says it. */
  title?: string;
  text: string;
  cta?: { label: string; to: string };
  className?: string;
};

/**
 * The New Year promo: the festive trees beside a short text. Its switch turns the night (the dark
 * theme) on, and with it the garlands.
 */
export function HolidayBanner({ eyebrow, title, text, cta, className }: HolidayBannerProps) {
  const dark = useThemeStore((state) => state.theme === 'dark');

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl bg-muted transition-colors duration-500 dark:bg-ink',
        className,
      )}
    >
      <div className="grid items-end lg:grid-cols-[1fr_1.2fr]">
        <div className="p-7 sm:p-10 lg:self-center lg:p-14">
          <p className="flex items-center gap-2 text-xs tracking-[0.08em] text-accent uppercase">
            <Sparkles className="size-3.5" />
            {eyebrow}
          </p>
          {title && (
            <h2 className="mt-3 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-tight font-light">
              {title}
            </h2>
          )}
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-subtle">{text}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            {cta && (
              <ButtonLink to={cta.to} className="group">
                {cta.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
            )}
            <Button
              variant="outline"
              aria-pressed={dark}
              onClick={(event) => {
                const box = event.currentTarget.getBoundingClientRect();
                toggleTheme({ x: box.left + box.width / 2, y: box.top + box.height / 2 });
              }}
            >
              <Sparkles className={cn('size-4', dark && 'text-glow')} />
              {dark ? 'ჩააქრე ნათურები' : 'აანთე ნაძვის ხეები'}
            </Button>
          </div>
        </div>
        <FestiveTrees className="-mb-px" />
      </div>
    </section>
  );
}
