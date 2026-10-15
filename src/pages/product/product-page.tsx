import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';
import { productQuery } from '@/features/catalog/api/catalog-queries';
import { NotFoundPage } from '@/pages/not-found-page';

import { ProductView } from './product-view';

/** /product/:slug */
export function ProductPage() {
  const { slug = '' } = useParams();
  const { data: product, isPending } = useQuery(productQuery(slug));

  if (isPending) return <ProductPageSkeleton />;
  if (!product) return <NotFoundPage />;
  // A new product starts with fresh choices (color, size, quantity).
  return <ProductView key={product.id} product={product} />;
}

function ProductPageSkeleton() {
  return (
    <Container className="grid gap-10 pt-8 sm:pt-12 lg:grid-cols-12 lg:gap-14">
      <div className="grid gap-3 lg:col-span-7 lg:grid-cols-2">
        <Skeleton className="aspect-[4/5] rounded-2xl" />
        <Skeleton className="hidden aspect-[4/5] rounded-2xl lg:block" />
      </div>
      <div className="space-y-4 lg:col-span-5">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-12 w-full rounded-full" />
      </div>
    </Container>
  );
}
