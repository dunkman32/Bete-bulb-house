import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

import { IconButton } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Product } from '@/features/catalog/types';

import { ProductCard, ProductCardSkeleton } from './product-card';

type ProductRailProps = {
  eyebrow?: string;
  title: string;
  link?: { label: string; to: string };
  products: Product[] | undefined;
};

/** A heading and a horizontally scrolling (snapping) row of products, with arrows on desktop. */
export function ProductRail({ eyebrow, title, link, products }: ProductRailProps) {
  const listRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: 1 | -1) => {
    const list = listRef.current;
    if (list) list.scrollBy({ left: direction * list.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section>
      <div className="flex items-end justify-between gap-6">
        <SectionHeading eyebrow={eyebrow} title={title} link={link} className="flex-1" />
        <div className="hidden gap-1 lg:flex">
          <IconButton label="წინა" onClick={() => scroll(-1)} className="border border-border">
            <ChevronLeft className="size-4" />
          </IconButton>
          <IconButton label="შემდეგი" onClick={() => scroll(1)} className="border border-border">
            <ChevronRight className="size-4" />
          </IconButton>
        </div>
      </div>
      <ul
        ref={listRef}
        className="no-scrollbar -mx-4 mt-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 py-4 sm:-mx-6 sm:scroll-px-6 sm:gap-5 sm:px-6 lg:-mx-6 lg:scroll-px-6 lg:px-6"
      >
        {(products ?? Array.from({ length: 5 }, () => undefined)).map((product, index) => (
          <li
            key={product?.id ?? index}
            className="w-[68%] shrink-0 snap-start sm:w-[42%] md:w-[31%] xl:w-[calc((100%-3*1.25rem)/4)]"
          >
            {product ? <ProductCard product={product} /> : <ProductCardSkeleton />}
          </li>
        ))}
      </ul>
    </section>
  );
}
