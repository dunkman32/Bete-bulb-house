export type Currency = 'GEL';

/**
 * A price in minor units (tetri: 1 ₾ = 100), as payment providers and commerce backends take it,
 * so sums never go through floating point.
 */
export type Money = { amount: number; currency: Currency };

export function lari(value: number): Money {
  return { amount: Math.round(value * 100), currency: 'GEL' };
}

export function addMoney(a: Money, b: Money): Money {
  return { amount: a.amount + b.amount, currency: a.currency };
}

export function multiplyMoney(money: Money, times: number): Money {
  return { amount: money.amount * times, currency: money.currency };
}

const SYMBOLS: Record<Currency, string> = { GEL: '₾' };

// The number only: browsers disagree on ka-GE's currency format ("120,00 ₾" vs "GEL 120").
const wholeFormat = new Intl.NumberFormat('ka-GE', { maximumFractionDigits: 0 });
const tetriFormat = new Intl.NumberFormat('ka-GE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** "120 ₾", "1 250 ₾", "89,50 ₾": whole amounts without the tetri. */
export function formatMoney({ amount, currency }: Money) {
  const format = amount % 100 === 0 ? wholeFormat : tetriFormat;
  return `${format.format(amount / 100)} ${SYMBOLS[currency]}`;
}

/** The discount in whole percent: 25 for 120 ₾ → 90 ₾. */
export function discountPercent(price: Money, compareAt: Money) {
  return Math.round((1 - price.amount / compareAt.amount) * 100);
}
