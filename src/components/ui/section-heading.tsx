import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';

import { cn } from '@/lib/cn';

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  link?: { label: string; to: string };
  className?: string;
};

/** A section's small label, serif title and an optional "see all" link on the right. */
export function SectionHeading({ eyebrow, title, link, className }: SectionHeadingProps) {
  return (
    <div className={cn('flex items-end justify-between gap-6', className)}>
      <div>
        {eyebrow && (
          <p className="mb-2 text-xs tracking-[0.08em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight font-light">
          {title}
        </h2>
      </div>
      {link && (
        <Link
          to={link.to}
          className="group hidden shrink-0 items-center gap-2 text-sm font-medium sm:inline-flex"
        >
          <span className="border-b border-foreground/30 pb-0.5 transition-colors group-hover:border-foreground">
            {link.label}
          </span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
