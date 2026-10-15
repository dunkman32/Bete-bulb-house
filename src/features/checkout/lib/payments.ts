import type { ShippingMethodId } from '@/features/cart/lib/totals';

// Where payments will plug in. The app never charges a card itself: it sends the order to our
// server, the server prices it, creates the payment with the provider (TBC / BOG / Stripe, …) and
// returns the provider's page to redirect to. The provider then calls the server back (webhook).

export type PaymentMethodId = 'card' | 'wallet' | 'installments' | 'cash';

export type PaymentMethod = {
  id: PaymentMethodId;
  title: string;
  description: string;
  marks?: string[];
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'card',
    title: 'ბარათით',
    description: 'Visa, Mastercard — დაცული გადახდა ბანკის გვერდზე',
    marks: ['VISA', 'Mastercard'],
  },
  {
    id: 'wallet',
    title: 'Apple Pay / Google Pay',
    description: 'ერთი შეხებით, ბარათის მონაცემების გარეშე',
  },
  {
    id: 'installments',
    title: 'განვადება',
    description: '0%-ით, 6 თვემდე — განაცხადი ონლაინ',
  },
  {
    id: 'cash',
    title: 'ადგილზე გადახდა',
    description: 'ნაღდით ან ბარათით, კურიერთან',
  },
];

export type CheckoutRequest = {
  lines: { variantId: string; quantity: number }[];
  contact: { email: string; phone: string };
  address: { firstName: string; lastName: string; city: string; street: string; note?: string };
  shippingMethod: ShippingMethodId;
  /** An electrician should call to arrange the installation (priced on site). */
  installation: boolean;
  paymentMethod: PaymentMethodId;
};

/** The server's answer: the order and where to send the buyer to pay (none for cash). */
export type CheckoutSession = { orderId: string; redirectUrl?: string };

export class PaymentsNotConnectedError extends Error {
  constructor() {
    super('Payments are not connected yet');
    this.name = 'PaymentsNotConnectedError';
  }
}

/** POST /checkout — not wired yet. */
export async function startCheckout(_request: CheckoutRequest): Promise<CheckoutSession> {
  throw new PaymentsNotConnectedError();
}
