import { site } from '@/config/site';
import type { CartLine } from '@/features/cart/store/cart-store';
import { addMoney, lari, multiplyMoney, type Money } from '@/lib/money';

export type ShippingMethodId = 'courier' | 'regions' | 'pickup';

export type ShippingMethod = {
  id: ShippingMethodId;
  title: string;
  eta: string;
  price: Money;
  /** Free from the store's threshold. */
  freeAboveThreshold: boolean;
};

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'courier',
    title: 'კურიერი თბილისში',
    eta: '1–2 სამუშაო დღე',
    price: lari(5),
    freeAboveThreshold: true,
  },
  {
    id: 'regions',
    title: 'მიწოდება რეგიონებში',
    eta: '2–4 სამუშაო დღე',
    price: lari(10),
    freeAboveThreshold: false,
  },
  {
    id: 'pickup',
    title: 'მაღაზიიდან გატანა',
    eta: 'შეკვეთიდან 2 საათში',
    price: lari(0),
    freeAboveThreshold: false,
  },
];

export function cartSubtotal(lines: CartLine[]): Money {
  return lines.reduce(
    (sum, line) => addMoney(sum, multiplyMoney(line.unitPrice, line.quantity)),
    lari(0),
  );
}

export function shippingPrice(method: ShippingMethod, subtotal: Money): Money {
  return method.freeAboveThreshold && subtotal.amount >= site.freeShippingFrom.amount
    ? lari(0)
    : method.price;
}

/** What is left to spend for free delivery (0 once reached). */
export function untilFreeShipping(subtotal: Money): Money {
  return { ...subtotal, amount: Math.max(0, site.freeShippingFrom.amount - subtotal.amount) };
}
