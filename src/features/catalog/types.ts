import type { ImageAsset } from '@/lib/image';
import type { Money } from '@/lib/money';

// The catalog as the commerce backend will give it. Prices and stock always come from there (the
// server re-prices every order); the CMS may add marketing copy and images on top.

export type CategoryId = 'track' | 'led' | 'bulbs' | 'sockets' | 'switches' | 'smart' | 'holiday';

export type Category = {
  id: CategoryId;
  title: string;
  /** For the menu and tiles, when the title is too long. */
  shortTitle: string;
  /** A season's collection (New Year): promoted on its own, not among the regular tiles. */
  seasonal?: boolean;
  description: string;
  image: ImageAsset;
};

/** A finish (white, black, brass, …). `swatch` is a CSS background: a color or a gradient. */
export type ProductColor = { id: string; name: string; swatch: string };

/** The product's second choice beside the finish: color temperature, power, length, gangs, … */
export type ProductOption = { name: string; values: string[] };

export type ProductBadge = 'new' | 'sale' | 'bestseller';

/** What is actually bought (and what a payment line refers to): one finish with one option. */
export type ProductVariant = {
  id: string;
  sku: string;
  colorId: string;
  option?: string;
  price: Money;
  compareAtPrice?: Money;
  stock: number;
};

export type ProductSpec = { label: string; value: string };

export type Product = {
  id: string;
  slug: string;
  title: string;
  categoryId: CategoryId;
  description: string;
  /** The lowest variant price ("from" when the variants differ). */
  price: Money;
  /** The price before the sale, when on sale. */
  compareAtPrice?: Money;
  images: ImageAsset[];
  /** Photos of a particular finish, shown first when it is chosen. */
  colorImages?: Partial<Record<string, ImageAsset[]>>;
  colors: ProductColor[];
  option?: ProductOption;
  variants: ProductVariant[];
  badges: ProductBadge[];
  specs: ProductSpec[];
  createdAt: string;
};

export type ProductSort = 'featured' | 'new' | 'price-asc' | 'price-desc';

export type ProductQuery = {
  category?: CategoryId;
  tag?: ProductBadge;
  colors?: string[];
  /** Option values (4000K, 10W, 2 მ, …): a product matches if it offers any of them. */
  options?: string[];
  /** In lari. */
  maxPrice?: number;
  search?: string;
  sort?: ProductSort;
  limit?: number;
  /** A product to leave out (the one on screen, for "you may also like"). */
  exclude?: string;
};
