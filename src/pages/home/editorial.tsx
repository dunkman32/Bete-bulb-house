import { ArrowRight } from 'lucide-react';

import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Picture } from '@/components/ui/picture';
import type { HomePage } from '@/features/content/types';

/** A photo and the brand's story, on a tinted band across the page. */
export function Editorial({ editorial }: { editorial: HomePage['editorial'] | undefined }) {
  return (
    <section className="my-24 bg-muted sm:my-32">
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
        <div className="reveal relative aspect-[4/5] overflow-hidden rounded-2xl bg-border lg:aspect-[5/6]">
          {editorial && <Picture image={editorial.image} sizes="(min-width: 1024px) 45vw, 100vw" />}
        </div>
        {editorial && (
          <div className="reveal max-w-lg">
            <p className="text-xs tracking-[0.08em] text-muted-foreground uppercase">
              {editorial.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] font-light">
              {editorial.title}
            </h2>
            <p className="mt-6 text-[15px] leading-[1.8] text-subtle">{editorial.text}</p>
            <ButtonLink to={editorial.cta.to} variant="outline" className="group mt-8">
              {editorial.cta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        )}
      </Container>
    </section>
  );
}
