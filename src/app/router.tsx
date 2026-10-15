import { createBrowserRouter } from 'react-router';

import { CatalogPage } from '@/pages/catalog/catalog-page';
import { CheckoutPage } from '@/pages/checkout/checkout-page';
import { HomePage } from '@/pages/home/home-page';
import { InfoPage } from '@/pages/info-page';
import { NotFoundPage } from '@/pages/not-found-page';
import { ProductPage } from '@/pages/product/product-page';

import { RootLayout } from './layout/root-layout';
import { RouteError } from './route-error';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <CatalogPage /> },
      { path: 'shop/:category', element: <CatalogPage /> },
      { path: 'product/:slug', element: <ProductPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'pages/:slug', element: <InfoPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
