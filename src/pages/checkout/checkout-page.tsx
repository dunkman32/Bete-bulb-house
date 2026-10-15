import { Check, Info, Lock, ShoppingBag, Wrench } from 'lucide-react';
import { useState, type ComponentProps, type ReactNode } from 'react';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button, ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PageTitle } from '@/components/ui/page-title';
import { CartLineItem } from '@/features/cart/components/cart-line-item';
import { FreeShippingProgress } from '@/features/cart/components/free-shipping-progress';
import {
  cartSubtotal,
  SHIPPING_METHODS,
  shippingPrice,
  type ShippingMethodId,
} from '@/features/cart/lib/totals';
import { useCartStore } from '@/features/cart/store/cart-store';
import {
  PAYMENT_METHODS,
  PaymentsNotConnectedError,
  startCheckout,
  type PaymentMethodId,
} from '@/features/checkout/lib/payments';
import { cn } from '@/lib/cn';
import { addMoney, formatMoney } from '@/lib/money';

const CITIES = [
  'თბილისი',
  'ბათუმი',
  'ქუთაისი',
  'რუსთავი',
  'გორი',
  'ზუგდიდი',
  'ფოთი',
  'თელავი',
  'სხვა',
];

export function CheckoutPage() {
  const lines = useCartStore((state) => state.lines);
  const openCart = useCartStore((state) => state.open);
  const [shippingId, setShippingId] = useState<ShippingMethodId>('courier');
  const [paymentId, setPaymentId] = useState<PaymentMethodId>('card');
  const [installation, setInstallation] = useState(false);
  const [notice, setNotice] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  if (lines.length === 0) {
    return (
      <Container className="flex flex-col items-center py-28 text-center">
        <PageTitle title="გაფორმება" />
        <div className="grid size-16 place-items-center rounded-full bg-muted">
          <ShoppingBag className="size-6" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 font-display text-3xl font-light">კალათა ცარიელია</h1>
        <p className="mt-3 text-[15px] text-subtle">გასაფორმებლად ჯერ დაამატე ნივთები.</p>
        <ButtonLink to="/shop" className="mt-8">
          მაღაზიაში გადასვლა
        </ButtonLink>
      </Container>
    );
  }

  const shippingMethod = SHIPPING_METHODS.find((method) => method.id === shippingId)!;
  const subtotal = cartSubtotal(lines);
  const shipping = shippingPrice(shippingMethod, subtotal);
  const total = addMoney(subtotal, shipping);

  const submit = async (form: HTMLFormElement) => {
    const data = new FormData(form);
    const field = (name: string) => String(data.get(name) ?? '').trim();
    setSubmitting(true);
    setNotice(undefined);
    try {
      const session = await startCheckout({
        lines: lines.map((line) => ({ variantId: line.variantId, quantity: line.quantity })),
        contact: { email: field('email'), phone: field('phone') },
        address: {
          firstName: field('firstName'),
          lastName: field('lastName'),
          city: field('city'),
          street: field('street'),
          note: field('note') || undefined,
        },
        shippingMethod: shippingId,
        installation,
        paymentMethod: paymentId,
      });
      if (session.redirectUrl) window.location.assign(session.redirectUrl);
    } catch (error) {
      setNotice(
        error instanceof PaymentsNotConnectedError
          ? 'გადახდის სისტემა ჯერ არ არის მიერთებული — ეს ეტაპი ჯერჯერობით მხოლოდ დიზაინია.'
          : 'შეკვეთა ვერ გაიგზავნა. სცადე თავიდან.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="pt-8 sm:pt-12">
      <PageTitle title="გაფორმება" />
      <Breadcrumbs items={[{ label: 'კალათა' }, { label: 'გაფორმება' }]} />
      <h1 className="mt-6 font-display text-[clamp(2.2rem,5vw,3.5rem)] leading-tight font-light">
        გაფორმება
      </h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void submit(event.currentTarget);
        }}
        className="mt-10 grid gap-10 lg:grid-cols-[1fr_420px] lg:gap-16"
      >
        <div className="space-y-12">
          <Step number={1} title="საკონტაქტო ინფორმაცია">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="ელფოსტა" name="email" type="email" autoComplete="email" required />
              <Field
                label="ტელეფონი"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="5XX XX XX XX"
                required
              />
            </div>
          </Step>

          <Step number={2} title="მიწოდების მისამართი">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="სახელი" name="firstName" autoComplete="given-name" required />
              <Field label="გვარი" name="lastName" autoComplete="family-name" required />
              <label className="block sm:col-span-2">
                <span className="mb-2 block text-[13px] text-subtle">ქალაქი</span>
                <select
                  name="city"
                  required
                  defaultValue="თბილისი"
                  className={cn(INPUT, 'cursor-pointer')}
                >
                  {CITIES.map((city) => (
                    <option key={city}>{city}</option>
                  ))}
                </select>
              </label>
              <Field
                label="მისამართი"
                name="street"
                autoComplete="street-address"
                placeholder="ქუჩა, სახლი, ბინა"
                required
                className="sm:col-span-2"
              />
              <Field
                label="კომენტარი კურიერისთვის (არასავალდებულო)"
                name="note"
                className="sm:col-span-2"
              />
            </div>
          </Step>

          <Step number={3} title="მიწოდების მეთოდი">
            <div className="space-y-3">
              {SHIPPING_METHODS.map((method) => {
                const price = shippingPrice(method, subtotal);
                return (
                  <OptionCard
                    key={method.id}
                    name="shipping"
                    checked={shippingId === method.id}
                    onChange={() => setShippingId(method.id)}
                    title={method.title}
                    description={method.eta}
                    aside={price.amount === 0 ? 'უფასო' : formatMoney(price)}
                  />
                );
              })}
              <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-foreground/25 bg-card p-4 transition-colors hover:border-foreground/50 has-checked:border-solid has-checked:border-foreground has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-foreground">
                <input
                  type="checkbox"
                  checked={installation}
                  onChange={(event) => setInstallation(event.target.checked)}
                  className="peer sr-only"
                />
                <span className="grid size-[18px] shrink-0 place-items-center rounded-[5px] border border-foreground/30 text-background transition-colors peer-checked:border-foreground peer-checked:bg-foreground">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <Wrench className="size-5 shrink-0 text-accent" strokeWidth={1.5} />
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px]">მჭირდება მონტაჟი</span>
                  <span className="mt-0.5 block text-[13px] text-muted-foreground">
                    ელექტრიკოსი დაგიკავშირდება დროის და ფასის შესათანხმებლად
                  </span>
                </span>
                <span className="shrink-0 text-sm font-medium">30 ₾-დან</span>
              </label>
            </div>
          </Step>

          <Step number={4} title="გადახდა">
            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => (
                <OptionCard
                  key={method.id}
                  name="payment"
                  checked={paymentId === method.id}
                  onChange={() => setPaymentId(method.id)}
                  title={method.title}
                  description={method.description}
                  aside={
                    method.marks && (
                      <span className="flex gap-1.5">
                        {method.marks.map((mark) => (
                          <span
                            key={mark}
                            className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-semibold tracking-wide"
                          >
                            {mark}
                          </span>
                        ))}
                      </span>
                    )
                  }
                />
              ))}
            </div>
          </Step>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl bg-card p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl">შეკვეთა</h2>
              <button
                type="button"
                onClick={openCart}
                className="cursor-pointer text-[13px] underline underline-offset-4 hover:text-accent"
              >
                რედაქტირება
              </button>
            </div>
            <ul className="mt-6 space-y-5">
              {lines.map((line) => (
                <li key={line.variantId}>
                  <CartLineItem line={line} readOnly />
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <FreeShippingProgress subtotal={subtotal} />
            </div>

            <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-subtle">ჯამი</dt>
                <dd className="tabular-nums">{formatMoney(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-subtle">მიწოდება</dt>
                <dd className="tabular-nums">
                  {shipping.amount === 0 ? 'უფასო' : formatMoney(shipping)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-border pt-4">
                <dt className="font-medium">სულ</dt>
                <dd className="text-xl font-medium tabular-nums">{formatMoney(total)}</dd>
              </div>
            </dl>

            {notice && (
              <p
                role="status"
                className="mt-6 flex gap-3 rounded-xl bg-accent-soft p-4 text-[13px] leading-relaxed"
              >
                <Info className="mt-0.5 size-4 shrink-0 text-accent" />
                {notice}
              </p>
            )}

            <Button type="submit" size="lg" block className="mt-6" disabled={submitting}>
              {submitting ? 'იგზავნება…' : `გადახდა · ${formatMoney(total)}`}
            </Button>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Lock className="size-3.5" />
              დაცული გადახდა · ბარათის მონაცემებს ჩვენ არ ვინახავთ
            </p>
          </div>
        </aside>
      </form>
    </Container>
  );
}

const INPUT =
  'h-12 w-full rounded-xl border border-border bg-card px-4 text-[15px] outline-none transition-colors placeholder:text-muted-foreground/70 hover:border-foreground/40 focus:border-foreground';

function Field({ label, className, ...props }: ComponentProps<'input'> & { label: string }) {
  return (
    <label className={cn('block', className)}>
      <span className="mb-2 block text-[13px] text-subtle">{label}</span>
      <input className={INPUT} {...props} />
    </label>
  );
}

function Step({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-5 flex items-center gap-3 font-display text-xl">
        <span className="grid size-7 place-items-center rounded-full bg-foreground font-sans text-[13px] text-background">
          {number}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

type OptionCardProps = {
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  description: string;
  aside?: ReactNode;
};

/** A radio choice drawn as a card (shipping, payment). */
function OptionCard({ name, checked, onChange, title, description, aside }: OptionCardProps) {
  return (
    <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-foreground/40 has-checked:border-foreground has-checked:ring-1 has-checked:ring-foreground has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-foreground">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span className="grid size-[18px] shrink-0 place-items-center rounded-full border border-foreground/30 transition-[border] peer-checked:border-[5px] peer-checked:border-foreground" />
      <span className="min-w-0 flex-1">
        <span className="block text-[15px]">{title}</span>
        <span className="mt-0.5 block text-[13px] text-muted-foreground">{description}</span>
      </span>
      {aside && <span className="shrink-0 text-sm font-medium">{aside}</span>}
    </label>
  );
}
