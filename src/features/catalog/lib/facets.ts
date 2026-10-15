import type { CategoryId, Product, ProductColor, ProductOption } from '@/features/catalog/types';

export const CATEGORY_IDS: CategoryId[] = [
  'track',
  'led',
  'bulbs',
  'sockets',
  'switches',
  'smart',
  'holiday',
];

export function isCategoryId(value: string | undefined): value is CategoryId {
  return CATEGORY_IDS.includes(value as CategoryId);
}

/** Numbers in order (3000K before 4000K, 1 მ before 2 მ), the rest alphabetically. */
function compareValues(a: string, b: string) {
  const numberA = parseFloat(a);
  const numberB = parseFloat(b);
  if (Number.isFinite(numberA) && Number.isFinite(numberB) && numberA !== numberB) {
    return numberA - numberB;
  }
  return a.localeCompare(b, 'ka');
}

/**
 * The finishes and options found in a list of products: the filters worth offering for it, one
 * group per option name (color temperature, length, …).
 */
export function productFacets(products: Product[]) {
  const colors = new Map<string, ProductColor>();
  const options = new Map<string, Set<string>>();
  for (const product of products) {
    for (const color of product.colors) colors.set(color.id, color);
    if (product.option) {
      const values = options.get(product.option.name) ?? new Set();
      for (const value of product.option.values) values.add(value);
      options.set(product.option.name, values);
    }
  }
  return {
    colors: [...colors.values()],
    options: [...options].map(([name, values]): ProductOption => ({
      name,
      values: [...values].toSorted(compareValues),
    })),
  };
}

/** "შავი · 4000K": the variant's finish and option, for the cart and the order. */
export function variantTitle(product: Product, colorId: string, option?: string) {
  const color = product.colors.find((candidate) => candidate.id === colorId);
  return [color?.name, option].filter(Boolean).join(' · ');
}
