import type { Category, Product, ProductQuery } from '@/features/catalog/types';

import { CATEGORIES, PRODUCTS } from './mock/catalog-data';

// One function per backend call. Today they read the demo catalog; when the commerce backend (or
// the CMS) exists, replace the bodies and keep the signatures: the queries and pages stay.

/** A little latency, so loading states show the way they will with a real API. */
const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

/** GET /categories */
export async function fetchCategories(): Promise<Category[]> {
  await delay(150);
  return structuredClone(CATEGORIES);
}

/** GET /products?category=&tag=&colors=&sizes=&maxPrice=&search=&sort=&limit= */
export async function fetchProducts(query: ProductQuery = {}): Promise<Product[]> {
  await delay();
  const search = query.search?.trim().toLocaleLowerCase('ka');

  let products = PRODUCTS.filter(
    (product) =>
      product.slug !== query.exclude &&
      (!query.category || product.categoryId === query.category) &&
      (!query.tag || product.badges.includes(query.tag)) &&
      (!query.colors?.length || product.colors.some((color) => query.colors!.includes(color.id))) &&
      (!query.options?.length ||
        product.option?.values.some((value) => query.options!.includes(value))) &&
      (!query.maxPrice || product.price.amount <= query.maxPrice * 100) &&
      (!search ||
        `${product.title} ${product.description} ${product.specs.map((spec) => spec.value).join(' ')}`
          .toLocaleLowerCase('ka')
          .includes(search)),
  );

  switch (query.sort) {
    case 'new':
      products = products.toSorted((a, b) => b.createdAt.localeCompare(a.createdAt));
      break;
    case 'price-asc':
      products = products.toSorted((a, b) => a.price.amount - b.price.amount);
      break;
    case 'price-desc':
      products = products.toSorted((a, b) => b.price.amount - a.price.amount);
      break;
  }

  return structuredClone(query.limit ? products.slice(0, query.limit) : products);
}

/** GET /products/:slug (404 → null) */
export async function fetchProduct(slug: string): Promise<Product | null> {
  await delay();
  const product = PRODUCTS.find((candidate) => candidate.slug === slug);
  return product ? structuredClone(product) : null;
}
