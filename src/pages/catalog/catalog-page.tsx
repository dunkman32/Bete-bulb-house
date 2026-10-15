import { useQuery } from '@tanstack/react-query';
import { SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';

import { HolidayBanner } from '@/components/shared/holiday-banner';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Drawer } from '@/components/ui/drawer';
import { PageTitle } from '@/components/ui/page-title';
import { categoriesQuery, productsQuery } from '@/features/catalog/api/catalog-queries';
import {
  CatalogFilters,
  type CatalogFilterValue,
} from '@/features/catalog/components/catalog-filters';
import { ProductGrid } from '@/features/catalog/components/product-grid';
import { isCategoryId, productFacets } from '@/features/catalog/lib/facets';
import type { ProductBadge, ProductQuery, ProductSort } from '@/features/catalog/types';
import { cn } from '@/lib/cn';
import { NotFoundPage } from '@/pages/not-found-page';

const SORTS: { value: ProductSort; label: string }[] = [
  { value: 'featured', label: 'რეკომენდებული' },
  { value: 'new', label: 'ჯერ ახალი' },
  { value: 'price-asc', label: 'ფასი: ზრდით' },
  { value: 'price-desc', label: 'ფასი: კლებით' },
];

const TAG_TITLES: Partial<Record<ProductBadge, { title: string; description: string }>> = {
  new: { title: 'სიახლეები', description: 'ბოლო კვირების შემოსვლები — პირველმა ნახე.' },
  sale: {
    title: 'ფასდაკლებები',
    description: 'შერჩეული პროდუქცია შემცირებულ ფასად, სანამ მარაგშია.',
  },
};

/** /shop and /shop/:category. Filters and sort live in the URL, so a filtered list can be shared. */
export function CatalogPage() {
  const { category: categoryParam } = useParams();
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const category = isCategoryId(categoryParam) ? categoryParam : undefined;
  const tag = (params.get('tag') as ProductBadge | null) ?? undefined;
  const search = params.get('search') ?? undefined;
  const sort = (params.get('sort') as ProductSort | null) ?? 'featured';
  const filters: CatalogFilterValue = {
    colors: params.getAll('color'),
    options: params.getAll('opt'),
    maxPrice: Number(params.get('max')) || undefined,
  };

  const baseQuery: ProductQuery = { category, tag, search };
  const { data: categories } = useQuery(categoriesQuery());
  const { data: baseProducts } = useQuery(productsQuery(baseQuery));
  const { data: products, isPlaceholderData } = useQuery(
    productsQuery({ ...baseQuery, ...filters, sort }),
  );
  const facets = productFacets(baseProducts ?? []);

  if (categoryParam && !category) return <NotFoundPage />;

  const categoryInfo = categories?.find((candidate) => candidate.id === category);
  const tagInfo = tag ? TAG_TITLES[tag] : undefined;
  const title = search
    ? `ძიება: „${search}“`
    : (categoryInfo?.title ?? tagInfo?.title ?? 'ყველა პროდუქტი');
  const description = search
    ? undefined
    : (categoryInfo?.description ?? tagInfo?.description ?? 'მთელი კატალოგი ერთ გვერდზე.');

  const update = (change: (next: URLSearchParams) => void) =>
    setParams(
      (current) => {
        const next = new URLSearchParams(current);
        change(next);
        return next;
      },
      { replace: true, preventScrollReset: true },
    );

  const setFilters = (value: CatalogFilterValue) =>
    update((next) => {
      next.delete('color');
      next.delete('opt');
      next.delete('max');
      value.colors.forEach((color) => next.append('color', color));
      value.options.forEach((option) => next.append('opt', option));
      if (value.maxPrice) next.set('max', String(value.maxPrice));
    });

  const activeFilters = [
    ...filters.colors.map((id) => ({
      key: `color-${id}`,
      label: facets.colors.find((color) => color.id === id)?.name ?? id,
      remove: () =>
        setFilters({ ...filters, colors: filters.colors.filter((color) => color !== id) }),
    })),
    ...filters.options.map((option) => ({
      key: `opt-${option}`,
      label: option,
      remove: () =>
        setFilters({ ...filters, options: filters.options.filter((entry) => entry !== option) }),
    })),
    ...(filters.maxPrice
      ? [
          {
            key: 'max',
            label: `${filters.maxPrice} ₾-მდე`,
            remove: () => setFilters({ ...filters, maxPrice: undefined }),
          },
        ]
      : []),
  ];
  const clearFilters = () => setFilters({ colors: [], options: [] });

  // Category links keep the "new" / "sale" tag.
  const categoryLink = (id?: string) => `/shop${id ? `/${id}` : ''}${tag ? `?tag=${tag}` : ''}`;

  return (
    <>
      <PageTitle title={title} />
      <Container className="pt-8 pb-4 sm:pt-12">
        <Breadcrumbs
          items={[{ label: 'მაღაზია', to: '/shop' }, ...(category ? [{ label: title }] : [])]}
        />
        <div className="mt-6 flex flex-col gap-5 sm:mt-8">
          <div>
            <h1 className="font-display text-[clamp(2.2rem,5vw,3.75rem)] leading-tight font-light">
              {title}
            </h1>
            {description && <p className="mt-2 max-w-xl text-[15px] text-subtle">{description}</p>}
          </div>
          {!search && (
            <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pt-2 sm:mx-0 sm:px-0">
              {[{ id: undefined, shortTitle: 'ყველა' }, ...(categories ?? [])].map((item) => (
                <li key={item.id ?? 'all'}>
                  <Link
                    to={categoryLink(item.id)}
                    className={cn(
                      'inline-flex h-9 items-center rounded-full border px-4 text-[13px] whitespace-nowrap transition-colors',
                      item.id === category
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border hover:border-foreground',
                    )}
                  >
                    {item.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>

      {category === 'holiday' && (
        <Container className="pt-2 pb-6">
          <HolidayBanner
            eyebrow="ახალი წელი 2027"
            text="ჩართე ღამე და ნახე, როგორ ინთება ნაძვის ხეებზე შემოხვეული ნათურები."
          />
        </Container>
      )}

      <div className="sticky top-16 z-30 mt-4 border-y border-border bg-background/90 backdrop-blur-md lg:top-[72px]">
        <Container className="flex h-14 items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="inline-flex cursor-pointer items-center gap-2 text-sm lg:hidden"
          >
            <SlidersHorizontal className="size-4" strokeWidth={1.5} />
            ფილტრები
            {activeFilters.length > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-foreground text-[11px] text-background">
                {activeFilters.length}
              </span>
            )}
          </button>
          <p className="hidden text-sm text-muted-foreground lg:block" aria-live="polite">
            {products ? `${products.length} პროდუქტი` : ' '}
          </p>
          <label className="flex items-center gap-2 text-sm">
            <span className="hidden text-muted-foreground sm:inline">დალაგება:</span>
            <select
              value={sort}
              onChange={(event) => update((next) => next.set('sort', event.target.value))}
              className="cursor-pointer rounded-full border border-border bg-card py-1.5 pr-8 pl-3 text-[13px] outline-none hover:border-foreground"
            >
              {SORTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </Container>
      </div>

      <Container className="mt-8 grid gap-12 lg:grid-cols-[230px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-[160px]">
            <CatalogFilters
              colors={facets.colors}
              options={facets.options}
              value={filters}
              onChange={setFilters}
            />
            {activeFilters.length > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-8 cursor-pointer text-sm underline underline-offset-4 hover:text-accent"
              >
                ფილტრების გასუფთავება
              </button>
            )}
          </div>
        </aside>

        <div>
          {activeFilters.length > 0 && (
            <ul className="mb-6 flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <li key={filter.key}>
                  <button
                    type="button"
                    onClick={filter.remove}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-muted py-1.5 pr-2.5 pl-3.5 text-[13px] transition-colors hover:bg-border"
                  >
                    {filter.label}
                    <X className="size-3.5" aria-label="მოხსნა" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {products?.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border px-6 py-20 text-center">
              <p className="font-display text-2xl font-light">ვერაფერი ვიპოვეთ</p>
              <p className="mt-2 text-sm text-muted-foreground">
                სცადე სხვა ფილტრები ან სხვა სიტყვა.
              </p>
              {activeFilters.length > 0 && (
                <Button variant="outline" className="mt-6" onClick={clearFilters}>
                  ფილტრების გასუფთავება
                </Button>
              )}
            </div>
          ) : (
            <ProductGrid
              products={products}
              columns={3}
              className={cn('transition-opacity duration-300', isPlaceholderData && 'opacity-50')}
            />
          )}
        </div>
      </Container>

      <Drawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        side="left"
        title="ფილტრები"
        footer={
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={clearFilters}
              disabled={!activeFilters.length}
            >
              გასუფთავება
            </Button>
            <Button className="flex-1" onClick={() => setFiltersOpen(false)}>
              ნახე {products?.length ?? ''} პროდუქტი
            </Button>
          </div>
        }
      >
        <div className="px-5 py-6">
          <CatalogFilters
            colors={facets.colors}
            options={facets.options}
            value={filters}
            onChange={setFilters}
          />
        </div>
      </Drawer>
    </>
  );
}
