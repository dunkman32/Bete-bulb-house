import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import { FacebookIcon, InstagramIcon } from '@/components/icons/social-icons';
import { Logo } from '@/components/shared/logo';
import { Container } from '@/components/ui/container';
import { helpNav, site } from '@/config/site';
import { categoriesQuery } from '@/features/catalog/api/catalog-queries';

const PAYMENT_MARKS = ['VISA', 'Mastercard', 'Apple Pay', 'Google Pay'];
const YEAR = new Date().getFullYear();

export function Footer() {
  const { data: categories } = useQuery(categoriesQuery());
  return (
    <footer className="mt-24 bg-ink text-on-ink sm:mt-32 [&_:focus-visible]:outline-on-ink">
      <Container>
        <Newsletter />

        <div className="grid gap-10 border-t border-on-ink/15 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-xs">
            <Link to="/" aria-label="მთავარი გვერდი" className="text-[22px]">
              <Logo />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-on-ink/65">
              {site.description}. მიწოდება მთელ საქართველოში, მონტაჟი — თბილისში.
            </p>
            <div className="mt-6 flex gap-2">
              <a
                href={site.social.instagram}
                aria-label="Instagram"
                className="grid size-10 place-items-center rounded-full border border-on-ink/20 transition-colors hover:bg-on-ink hover:text-ink"
              >
                <InstagramIcon className="size-[18px]" />
              </a>
              <a
                href={site.social.facebook}
                aria-label="Facebook"
                className="grid size-10 place-items-center rounded-full border border-on-ink/20 transition-colors hover:bg-on-ink hover:text-ink"
              >
                <FacebookIcon className="size-[18px]" />
              </a>
            </div>
          </div>

          <FooterColumn
            title="კატალოგი"
            links={[
              ...(categories ?? []).map((category) => ({
                label: category.title,
                to: `/shop/${category.id}`,
              })),
              { label: 'ფასდაკლება', to: '/shop?tag=sale' },
            ]}
          />
          <FooterColumn title="დახმარება" links={helpNav} />

          <div>
            <h3 className="text-xs tracking-[0.08em] text-on-ink/50 uppercase">კონტაქტი</h3>
            <ul className="mt-5 space-y-3 text-sm text-on-ink/80">
              <li>
                <a
                  href={`tel:${site.contact.phone.replaceAll(' ', '')}`}
                  className="hover:text-on-ink"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="hover:text-on-ink">
                  {site.contact.email}
                </a>
              </li>
              <li>{site.contact.address}</li>
              <li className="text-on-ink/55">{site.contact.hours}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-on-ink/15 py-6 text-xs text-on-ink/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR} {site.name}. ყველა უფლება დაცულია.
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="გადახდის მეთოდები">
            {PAYMENT_MARKS.map((mark) => (
              <li
                key={mark}
                className="rounded border border-on-ink/20 px-2 py-1 font-medium tracking-wide text-on-ink/70"
              >
                {mark}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h3 className="text-xs tracking-[0.08em] text-on-ink/50 uppercase">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-on-ink/80">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="transition-colors hover:text-on-ink">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The sign-up form (visual for now: it only thanks; the mailing service comes later). */
function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <div className="grid gap-8 py-16 lg:grid-cols-2 lg:items-end">
      <div>
        <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.75rem)] leading-tight font-light">
          პირველმა გაიგე სიახლეები
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-on-ink/65">
          სიახლეები, დახურული ფასდაკლებები, განათების იდეები და −10% პირველ შეკვეთაზე.
        </p>
      </div>
      {subscribed ? (
        <p className="text-on-ink/80" role="status">
          მადლობა! დადასტურების წერილი უკვე გზაშია.
        </p>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubscribed(true);
          }}
          className="flex items-center gap-3 border-b border-on-ink/40 pb-3 transition-colors focus-within:border-on-ink"
        >
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="შენი ელფოსტა"
            aria-label="ელფოსტა"
            className="min-w-0 flex-1 bg-transparent py-2 text-lg outline-none placeholder:text-on-ink/45"
          />
          <button
            type="submit"
            className="group inline-flex cursor-pointer items-center gap-2 text-sm font-medium whitespace-nowrap"
          >
            გამოწერა
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </form>
      )}
    </div>
  );
}
