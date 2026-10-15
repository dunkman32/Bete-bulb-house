import { keepPreviousData, queryOptions } from '@tanstack/react-query';

import type { ProductQuery } from '@/features/catalog/types';

import { fetchCategories, fetchProduct, fetchProducts } from './catalog-api';

export const catalogKeys = {
  all: ['catalog'] as const,
  categories: () => [...catalogKeys.all, 'categories'] as const,
  products: (query: ProductQuery) => [...catalogKeys.all, 'products', query] as const,
  product: (slug: string) => [...catalogKeys.all, 'product', slug] as const,
};

export const categoriesQuery = () =>
  queryOptions({
    queryKey: catalogKeys.categories(),
    queryFn: fetchCategories,
    staleTime: Infinity,
  });

export const productsQuery = (query: ProductQuery = {}) =>
  queryOptions({
    queryKey: catalogKeys.products(query),
    queryFn: () => fetchProducts(query),
    // Changing a filter keeps the current grid on screen until the new one arrives.
    placeholderData: keepPreviousData,
  });

export const productQuery = (slug: string) =>
  queryOptions({
    queryKey: catalogKeys.product(slug),
    queryFn: () => fetchProduct(slug),
  });
