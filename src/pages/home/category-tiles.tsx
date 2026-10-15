import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

import { Picture } from '@/components/ui/picture';
import { SectionHeading } from '@/components/ui/section-heading';
import { Skeleton } from '@/components/ui/skeleton';
import type { Category } from '@/features/catalog/types';

export function CategoryTiles({ categories }: { categories: Category[] | undefined }) {
  return (
    <section>
      <SectionHeading
        eyebrow="კატეგორიები"
        title="რას ეძებ?"
        link={{ label: 'მთელი კატალოგი', to: '/shop' }}
      />
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {categories
          ? categories.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/shop/${category.id}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-muted sm:aspect-[4/3]"
                >
                  <Picture
                    image={category.image}
                    sizes="(min-width: 1024px) 31vw, 48vw"
                    className="transition-[scale,opacity] duration-1000 ease-(--ease-out-soft) group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-scrim/75 via-scrim/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-on-scrim sm:p-6">
                    <div>
                      <h3 className="font-display text-lg leading-tight font-light sm:text-[26px]">
                        {category.title}
                      </h3>
                      <p className="mt-1.5 hidden max-w-xs text-[13px] leading-snug opacity-75 md:block">
                        {category.description}
                      </p>
                    </div>
                    <span className="hidden size-10 shrink-0 place-items-center rounded-full bg-card text-foreground opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:grid sm:translate-y-2">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </li>
            ))
          : Array.from({ length: 6 }, (_, index) => (
              <li key={index}>
                <Skeleton className="aspect-[4/5] rounded-2xl sm:aspect-[4/3]" />
              </li>
            ))}
      </ul>
    </section>
  );
}
