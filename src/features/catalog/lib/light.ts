import type { CSSProperties } from 'react';

import type { CategoryId, Product } from '@/features/catalog/types';

import { isKelvinValue, kelvinGlow } from './kelvin';

/** What lights up in the dark theme: bulbs, and the New Year garlands. */
const LIT_CATEGORIES: CategoryId[] = ['bulbs', 'holiday'];

/**
 * How a product lights up in the dark theme (`.bulb-photo` / `.bulb-glow` / `.bulb-halo` in
 * index.css): the color of its light (colored garlands and RGB bulbs glow pink, cold white ones
 * blue-white, the rest by color temperature) and a flicker delay of its own, so the lights on a
 * page switch on one by one. Null for anything that doesn't light up.
 */
export function bulbLight(product: Product): CSSProperties | null {
  if (!LIT_CATEGORIES.includes(product.categoryId)) return null;
  const colorIds = product.colors.map((color) => color.id);
  const kelvin =
    product.option?.values.find(isKelvinValue) ??
    product.specs.map((spec) => spec.value.match(/\d{4}K/)?.[0]).find(Boolean) ??
    '2700K';
  const light =
    colorIds.includes('rgb') || colorIds[0] === 'multi'
      ? 'var(--color-rgb-light)'
      : colorIds[0] === 'cold'
        ? kelvinGlow('6000K')
        : kelvinGlow(kelvin);
  const delay = (Number(product.id.replace(/\D/g, '')) * 173) % 700;
  return { '--light': light, '--light-delay': `${delay}ms` } as CSSProperties;
}
