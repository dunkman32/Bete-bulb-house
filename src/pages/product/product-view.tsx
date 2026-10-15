import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ShieldCheck, Truck, Wrench } from 'lucide-react';
import { useId, useState, type ReactNode } from 'react';
import { Link } from 'react-router';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Drawer } from '@/components/ui/drawer';
import { PageTitle } from '@/components/ui/page-title';
import { Price } from '@/components/ui/price';
import { QuantityStepper } from '@/components/ui/quantity-stepper';
import { site } from '@/config/site';
import { MAX_QUANTITY, useCartStore } from '@/features/cart/store/cart-store';
import { categoriesQuery, productsQuery } from '@/features/catalog/api/catalog-queries';
import { KelvinScale } from '@/features/catalog/components/kelvin-scale';
import { ProductBadges } from '@/features/catalog/components/product-badges';
import { ProductRail } from '@/features/catalog/components/product-rail';
import { variantTitle } from '@/features/catalog/lib/facets';
import { isKelvinValue, kelvinGlow } from '@/features/catalog/lib/kelvin';
import { bulbLight } from '@/features/catalog/lib/light';
import type { Product } from '@/features/catalog/types';
import { cn } from '@/lib/cn';
import { formatMoney, multiplyMoney } from '@/lib/money';

import { ProductGallery } from './product-gallery';

export function ProductView({ product }: { product: Product }) {
  const [colorId, setColorId] = useState(product.colors[0]?.id ?? '');
  const [option, setOption] = useState(product.option?.values[0]);
  const [quantity, setQuantity] = useState(1);
  const [guideOpen, setGuideOpen] = useState(false);
  const optionLabelId = useId();
  const addToCart = useCartStore((state) => state.add);

  const { data: categories } = useQuery(categoriesQuery());
  const { data: related } = useQuery(
    productsQuery({ category: product.categoryId, exclude: product.slug, limit: 8 }),
  );

  const category = categories?.find((candidate) => candidate.id === product.categoryId);
  const color = product.colors.find((candidate) => candidate.id === colorId);
  const variant = product.variants.find(
    (candidate) => candidate.colorId === colorId && candidate.option === option,
  );
  const stockOf = (value: string) =>
    product.variants.find(
      (candidate) => candidate.colorId === colorId && candidate.option === value,
    )?.stock ?? 0;
  const stock = variant?.stock ?? 0;
  // Switching to a variant with less stock keeps the quantity within it.
  const amount = Math.max(1, Math.min(quantity, stock));
  const kelvinOption = product.option?.values.every(isKelvinValue) ?? false;
  const images = product.colorImages?.[colorId] ?? product.images;
  const warranty = product.specs.find((spec) => spec.label === 'გარანტია')?.value ?? '2 წელი';

  const add = () => {
    if (!variant) return;
    addToCart(
      {
        variantId: variant.id,
        productSlug: product.slug,
        title: product.title,
        image: images[0] ?? product.images[0]!,
        variantTitle: variantTitle(product, colorId, option),
        unitPrice: variant.price,
      },
      amount,
    );
  };

  return (
    <>
      <PageTitle title={product.title} />
      <Container className="pt-6 sm:pt-10">
        <Breadcrumbs
          items={[
            {
              label: category?.title ?? 'მაღაზია',
              to: category ? `/shop/${category.id}` : '/shop',
            },
            { label: product.title },
          ]}
        />
      </Container>

      <Container className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          {/* A new finish starts its photos from the first one. */}
          <ProductGallery key={colorId} images={images} light={bulbLight(product)} />
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <ProductBadges product={product} className="[&>li]:border [&>li]:border-border" />
            <h1 className="mt-4 font-display text-[clamp(1.9rem,3vw,2.6rem)] leading-tight font-light">
              {product.title}
            </h1>
            <Price
              price={variant?.price ?? product.price}
              compareAtPrice={variant?.compareAtPrice ?? product.compareAtPrice}
              className="mt-3 text-xl font-medium"
            />
            <p className="mt-5 text-[15px] leading-[1.75] text-subtle">{product.description}</p>

            <fieldset className="mt-8">
              <legend className="text-sm">
                ფერი: <span className="text-muted-foreground">{color?.name}</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {product.colors.map((candidate) => (
                  <label key={candidate.id} title={candidate.name} className="cursor-pointer">
                    <input
                      type="radio"
                      name="color"
                      className="peer sr-only"
                      checked={candidate.id === colorId}
                      onChange={() => setColorId(candidate.id)}
                    />
                    <span className="sr-only">{candidate.name}</span>
                    <span
                      aria-hidden
                      className="block size-9 rounded-full ring-1 ring-foreground/15 ring-offset-3 ring-offset-background transition-shadow ring-inset peer-checked:ring-2 peer-checked:ring-foreground peer-checked:ring-offset-0 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-foreground"
                      style={{ background: candidate.swatch }}
                    />
                  </label>
                ))}
              </div>
            </fieldset>

            {product.option && (
              // Not a <legend>: it shares its row with the guide's button.
              <fieldset className="mt-7" aria-labelledby={optionLabelId}>
                <div className="flex items-center justify-between">
                  <span id={optionLabelId} className="text-sm">
                    {product.option.name}
                    {option && <span className="text-muted-foreground">: {option}</span>}
                  </span>
                  {kelvinOption && (
                    <button
                      type="button"
                      onClick={() => setGuideOpen(true)}
                      className="cursor-pointer text-[13px] underline underline-offset-4 hover:text-accent"
                    >
                      რომელი ავირჩიო?
                    </button>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.option.values.map((value) => {
                    const soldOut = stockOf(value) === 0;
                    return (
                      <label key={value} className="cursor-pointer">
                        <input
                          type="radio"
                          name="option"
                          className="peer sr-only"
                          checked={value === option}
                          onChange={() => setOption(value)}
                        />
                        <span
                          className={cn(
                            'flex h-11 min-w-16 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 text-sm transition-colors peer-checked:border-foreground peer-checked:ring-1 peer-checked:ring-foreground peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-foreground hover:border-foreground',
                            soldOut && 'text-muted-foreground',
                          )}
                        >
                          {kelvinOption && (
                            <span
                              aria-hidden
                              className="size-3 rounded-full ring-1 ring-foreground/10"
                              style={{ background: kelvinGlow(value) }}
                            />
                          )}
                          {value}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            )}

            <p className="mt-6 flex items-center gap-2 text-[13px]" aria-live="polite">
              <span
                aria-hidden
                className={cn(
                  'size-2 rounded-full',
                  stock === 0 ? 'bg-muted-foreground' : stock <= 3 ? 'bg-glow' : 'bg-success',
                )}
              />
              {stock === 0
                ? 'მარაგში არ არის — მოგწერთ, როცა შემოვა'
                : stock <= 3
                  ? `დარჩა მხოლოდ ${stock} ცალი`
                  : 'მარაგშია · მიწოდება 1–2 დღეში'}
            </p>

            <div className="mt-4 flex gap-3">
              <QuantityStepper
                value={amount}
                onChange={setQuantity}
                max={Math.max(1, Math.min(MAX_QUANTITY, stock))}
                className="h-13"
              />
              <Button size="lg" className="flex-1" onClick={add} disabled={stock === 0}>
                {stock === 0
                  ? 'მარაგში არ არის'
                  : `კალათაში · ${formatMoney(multiplyMoney(variant!.price, amount))}`}
              </Button>
            </div>

            <ul className="mt-8 space-y-3 rounded-2xl bg-muted/60 p-5 text-[13px] text-subtle">
              <li className="flex items-center gap-3">
                <Truck className="size-[18px] shrink-0 text-foreground" strokeWidth={1.5} />
                უფასო მიწოდება თბილისში {formatMoney(site.freeShippingFrom)}-დან
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="size-[18px] shrink-0 text-foreground" strokeWidth={1.5} />
                გარანტია {warranty} · ოფიციალური პროდუქცია
              </li>
              <li className="flex items-center gap-3">
                <Wrench className="size-[18px] shrink-0 text-foreground" strokeWidth={1.5} />
                მონტაჟი სერტიფიცირებული ელექტრიკოსით — 30 ₾-დან
              </li>
            </ul>

            <div className="mt-8 border-t border-border">
              <Disclosure title="ტექნიკური მახასიათებლები" defaultOpen>
                <dl className="divide-y divide-border">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between gap-6 py-2.5">
                      <dt>{spec.label}</dt>
                      <dd className="text-right text-foreground">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </Disclosure>
              <Disclosure title="მონტაჟი">
                <p>
                  ელექტროსამონტაჟო სამუშაო უნდა შეასრულოს კვალიფიციურმა ელექტრიკოსმა. ჩვენი
                  ელექტრიკოსი მოვა შენთვის სასურველ დროს — შეკვეთისას მონიშნე „მონტაჟი“.{' '}
                  <Link to="/pages/services" className="underline underline-offset-4">
                    დეტალურად
                  </Link>
                </p>
              </Disclosure>
              <Disclosure title="მიწოდება და დაბრუნება">
                <p>
                  თბილისში 1–2 სამუშაო დღეში, რეგიონებში 2–4 დღეში. გამოუყენებელი პროდუქტის
                  დაბრუნება შესაძლებელია 14 დღის განმავლობაში.{' '}
                  <Link to="/pages/delivery" className="underline underline-offset-4">
                    დეტალურად
                  </Link>
                </p>
              </Disclosure>
            </div>
            {variant && (
              <p className="mt-4 text-xs text-muted-foreground">არტიკული: {variant.sku}</p>
            )}
          </div>
        </div>
      </Container>

      <Container className="mt-24 sm:mt-32">
        <ProductRail
          eyebrow={category?.title}
          title="ამასთან ერთად ყიდულობენ"
          link={category && { label: 'ყველა', to: `/shop/${category.id}` }}
          products={related}
        />
      </Container>

      <Drawer open={guideOpen} onClose={() => setGuideOpen(false)} title="ფერის ტემპერატურა">
        <div className="px-5 py-6 sm:px-6">
          <p className="text-sm leading-relaxed text-subtle">
            კელვინი (K) აჩვენებს, რამდენად თბილია თეთრი სინათლე: რაც ნაკლებია, მით უფრო ყვითელი და
            მყუდროა; რაც მეტია — მით უფრო ცივი და ფხიზელი.
          </p>
          <KelvinScale compact className="mt-6" />
          <p className="mt-6 text-[13px] leading-relaxed text-muted-foreground">
            ერთ ოთახში ერთი ტემპერატურა გამოიყენე — შერეული სინათლე სივრცეს ჭრელს ხდის.
          </p>
        </div>
      </Drawer>
    </>
  );
}

/** A native <details> row with a rotating chevron. */
function Disclosure({
  title,
  defaultOpen,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group border-b border-border">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown
          className="size-4 transition-transform duration-300 group-open:rotate-180"
          strokeWidth={1.5}
        />
      </summary>
      <div className="pb-5 text-[13px] leading-relaxed text-subtle">{children}</div>
    </details>
  );
}
