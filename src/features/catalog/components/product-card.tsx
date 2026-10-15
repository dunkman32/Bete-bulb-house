import { Link } from 'react-router';

import { Picture } from '@/components/ui/picture';
import { Price } from '@/components/ui/price';
import { Skeleton } from '@/components/ui/skeleton';
import { bulbLight } from '@/features/catalog/lib/light';
import type { Product } from '@/features/catalog/types';
import { cn } from '@/lib/cn';

import { ProductBadges } from './product-badges';

const CARD_SIZES = '(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw';

/** A product in a grid or rail: its photo (the second one on hover), badges, title, colors, price. */
export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const [first, second] = product.images;
  // Bulbs switch on in the dark theme.
  const light = bulbLight(product);
  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div
        className={cn(
          'relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted',
          light && 'bulb-halo',
        )}
        style={light ?? undefined}
      >
        <div className={cn('absolute inset-0', light && 'bulb-photo')}>
          {first && (
            <Picture
              image={first}
              sizes={CARD_SIZES}
              priority={priority}
              className="transition-[scale,opacity] duration-700 ease-(--ease-out-soft) group-hover:scale-[1.04]"
            />
          )}
          {second && (
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <Picture image={second} sizes={CARD_SIZES} />
            </div>
          )}
        </div>
        {light && <div aria-hidden className="bulb-glow absolute inset-0" />}
        <ProductBadges product={product} className="absolute top-3 left-3" />
      </div>
      <div className="mt-3.5 space-y-1 px-0.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[15px] leading-snug">{product.title}</h3>
          <ColorDots product={product} />
        </div>
        {product.option && (
          <p className="truncate text-[13px] text-muted-foreground">
            {product.option.values.join(' · ')}
          </p>
        )}
        <Price
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          from={hasPriceRange(product)}
          className="pt-0.5 text-sm font-medium"
        />
      </div>
    </Link>
  );
}

const hasPriceRange = (product: Product) =>
  product.variants.some((variant) => variant.price.amount !== product.price.amount);

function ColorDots({ product }: { product: Product }) {
  if (product.colors.length < 2) return null;
  return (
    <ul className="mt-1 flex shrink-0 gap-1" aria-label={`${product.colors.length} ფერი`}>
      {product.colors.map((color) => (
        <li
          key={color.id}
          title={color.name}
          className="size-3 rounded-full ring-1 ring-foreground/15 ring-inset"
          style={{ background: color.swatch }}
        />
      ))}
    </ul>
  );
}

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-3', className)}>
      <Skeleton className="aspect-[4/5] rounded-2xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  );
}
