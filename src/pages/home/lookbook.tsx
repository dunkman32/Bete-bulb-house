import { ArrowRight } from 'lucide-react';

import { ButtonLink } from '@/components/ui/button';
import { Picture } from '@/components/ui/picture';
import type { HomePage } from '@/features/content/types';
import { cn } from '@/lib/cn';

/** Three photos in a mosaic (one tall, two square) beside a short text. */
export function Lookbook({ lookbook }: { lookbook: HomePage['lookbook'] }) {
  return (
    <section className="reveal grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
      <div className="lg:col-span-4">
        <p className="text-xs tracking-[0.08em] text-muted-foreground uppercase">
          {lookbook.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.75rem)] leading-tight font-light">
          {lookbook.title}
        </h2>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-subtle">{lookbook.text}</p>
        <ButtonLink to={lookbook.cta.to} variant="outline" className="group mt-7">
          {lookbook.cta.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </ButtonLink>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-8">
        {lookbook.images.slice(0, 3).map((image, index) => (
          <div
            key={image.url}
            className={cn(
              'relative overflow-hidden rounded-2xl bg-muted',
              index === 0 ? 'row-span-2' : 'aspect-[4/3]',
            )}
          >
            <Picture
              image={image}
              sizes="(min-width: 1024px) 30vw, 50vw"
              className="absolute inset-0 transition-[scale,opacity] duration-1000 ease-(--ease-out-soft) hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
