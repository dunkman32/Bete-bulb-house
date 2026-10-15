import { Check } from 'lucide-react';
import { useId, type ReactNode } from 'react';

import type { ProductColor, ProductOption } from '@/features/catalog/types';
import { cn } from '@/lib/cn';

export type CatalogFilterValue = { colors: string[]; options: string[]; maxPrice?: number };

const PRICE_LIMITS = [25, 50, 100, 200];

type CatalogFiltersProps = {
  colors: ProductColor[];
  options: ProductOption[];
  value: CatalogFilterValue;
  onChange: (value: CatalogFilterValue) => void;
};

const toggle = (list: string[], item: string) =>
  list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item];

/** Finish, option (one group per option name) and price filters: the sidebar, or the phone's sheet. */
export function CatalogFilters({ colors, options, value, onChange }: CatalogFiltersProps) {
  // The sidebar and the phone's sheet are both on the page: each needs its own radio group.
  const priceGroup = useId();
  return (
    <div className="space-y-8">
      <FilterGroup title="ფერი">
        <ul className="space-y-2">
          {colors.map((color) => {
            const checked = value.colors.includes(color.id);
            return (
              <li key={color.id}>
                <label className="group flex cursor-pointer items-center gap-2.5 text-sm">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={checked}
                    onChange={() => onChange({ ...value, colors: toggle(value.colors, color.id) })}
                  />
                  <span
                    className="grid size-6 shrink-0 place-items-center rounded-full ring-1 ring-foreground/15 ring-offset-2 ring-offset-background transition-shadow ring-inset peer-checked:ring-2 peer-checked:ring-foreground peer-checked:ring-offset-0 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-foreground"
                    style={{ background: color.swatch }}
                  >
                    {checked && (
                      // Inverts against the swatch, so it reads on light and dark colors alike.
                      <Check
                        className="size-3.5 text-on-scrim mix-blend-difference"
                        strokeWidth={3}
                      />
                    )}
                  </span>
                  <span
                    className={cn(
                      'text-subtle group-hover:text-foreground',
                      checked && 'text-foreground',
                    )}
                  >
                    {color.name}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </FilterGroup>

      {options.map((option) => (
        <FilterGroup key={option.name} title={option.name}>
          <ul className="flex flex-wrap gap-2">
            {option.values.map((optionValue) => (
              <li key={optionValue}>
                <label className="cursor-pointer">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={value.options.includes(optionValue)}
                    onChange={() =>
                      onChange({ ...value, options: toggle(value.options, optionValue) })
                    }
                  />
                  <span className="inline-flex h-9 min-w-11 items-center justify-center rounded-full border border-border px-3 text-[13px] transition-colors peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-foreground hover:border-foreground">
                    {optionValue}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </FilterGroup>
      ))}

      <FilterGroup title="ფასი">
        <ul className="space-y-2.5">
          {[undefined, ...PRICE_LIMITS].map((limit) => (
            <li key={limit ?? 'all'}>
              <label className="flex cursor-pointer items-center gap-3 text-sm">
                <input
                  type="radio"
                  name={priceGroup}
                  className="peer sr-only"
                  checked={value.maxPrice === limit}
                  onChange={() => onChange({ ...value, maxPrice: limit })}
                />
                <span className="grid size-[18px] place-items-center rounded-full border border-foreground/30 transition-colors peer-checked:border-[5px] peer-checked:border-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-foreground" />
                <span className="text-subtle peer-checked:text-foreground">
                  {limit ? `${limit} ₾-მდე` : 'ნებისმიერი'}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-4 text-xs tracking-[0.08em] text-muted-foreground uppercase">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}
