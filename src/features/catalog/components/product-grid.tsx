import type { Product } from '@/features/catalog/types';
import { cn } from '@/lib/cn';

import { ProductCard, ProductCardSkeleton } from './product-card';

type ProductGridProps = {
  products: Product[] | undefined;
  /** Columns on wide screens: 4 across the page, 3 beside the filters. */
  columns?: 3 | 4;
  /** How many skeletons to show while loading. */
  skeletons?: number;
  className?: string;
};

export function ProductGrid({ products, columns = 4, skeletons = 8, className }: ProductGridProps) {
  return (
    <ul
      className={cn(
        'grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-3',
        columns === 4 && 'xl:grid-cols-4',
        className,
      )}
    >
      {products
        ? products.map((product, index) => (
            <li key={product.id}>
              <ProductCard product={product} priority={index < 4} />
            </li>
          ))
        : Array.from({ length: skeletons }, (_, index) => (
            <li key={index}>
              <ProductCardSkeleton />
            </li>
          ))}
    </ul>
  );
}
