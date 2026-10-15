import { ArrowRight } from 'lucide-react';

import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Picture } from '@/components/ui/picture';
import type { HomePage } from '@/features/content/types';

/** The full-width opening photo with the season's headline. */
export function Hero({ hero }: { hero: HomePage['hero'] | undefined }) {
  return (
    <section className="relative h-[min(86svh,840px)] min-h-[540px] overflow-hidden bg-muted">
      {hero && (
        <>
          <div className="absolute inset-0 animate-fade-in">
            <Picture image={hero.image} sizes="100vw" priority className="object-[60%_35%]" />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-scrim/70 via-scrim/15 to-transparent sm:bg-linear-to-r sm:from-scrim/60 sm:via-scrim/20" />

          <Container className="relative flex h-full flex-col justify-end pb-12 text-on-scrim sm:justify-center sm:pb-0">
            <div className="max-w-3xl">
              <p className="animate-fade-up text-xs tracking-[0.1em] uppercase opacity-85">
                {hero.eyebrow}
              </p>
              <h1 className="mt-4 animate-fade-up font-display text-[clamp(2.4rem,5.2vw,4.25rem)] leading-[1.1] font-light [animation-delay:120ms]">
                {hero.title}
              </h1>
              <p className="mt-6 max-w-lg animate-fade-up text-[15px] leading-relaxed opacity-85 [animation-delay:240ms] sm:text-base">
                {hero.text}
              </p>
              <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:360ms]">
                <ButtonLink to={hero.primary.to} variant="light" size="lg" className="group">
                  {hero.primary.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </ButtonLink>
                <ButtonLink
                  to={hero.secondary.to}
                  size="lg"
                  variant="outline"
                  className="border-on-scrim/50 text-on-scrim hover:border-on-scrim hover:bg-on-scrim/10"
                >
                  {hero.secondary.label}
                </ButtonLink>
              </div>
            </div>
          </Container>
        </>
      )}
    </section>
  );
}
