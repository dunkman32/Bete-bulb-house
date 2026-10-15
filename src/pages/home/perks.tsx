import { BadgeCheck, ShieldCheck, Truck, Wrench, type LucideIcon } from 'lucide-react';

import type { Perk } from '@/features/content/types';

const ICONS: Record<Perk['icon'], LucideIcon> = {
  delivery: Truck,
  installation: Wrench,
  warranty: ShieldCheck,
  certified: BadgeCheck,
};

/** Why to buy here: delivery, installation, warranty, certification. */
export function Perks({ perks }: { perks: Perk[] }) {
  return (
    <section aria-label="უპირატესობები" className="reveal border-y border-border">
      {/* The 1 px gaps over a border-colored list draw the inner rules. */}
      <ul className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
        {perks.map((perk) => {
          const Icon = ICONS[perk.icon];
          return (
            <li
              key={perk.title}
              className="flex flex-col gap-3 bg-background px-3 py-8 sm:flex-row sm:gap-4 lg:px-6"
            >
              <Icon className="size-6 shrink-0 text-accent" strokeWidth={1.25} />
              <div>
                <h3 className="text-[15px] font-medium">{perk.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                  {perk.text}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
