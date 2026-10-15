import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

import { FacebookIcon, InstagramIcon } from '@/components/icons/social-icons';
import { Logo } from '@/components/shared/logo';
import { Drawer } from '@/components/ui/drawer';
import { Picture } from '@/components/ui/picture';
import { helpNav, site } from '@/config/site';
import { categoriesQuery } from '@/features/catalog/api/catalog-queries';

/** The phone's navigation: a sheet from the left with every category. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { data: categories } = useQuery(categoriesQuery());
  return (
    <Drawer open={open} onClose={onClose} side="left" title={<Logo className="text-lg" />}>
      <nav aria-label="მთავარი" className="px-5 py-4">
        <ul className="divide-y divide-border">
          {categories?.map((category) => (
            <li key={category.id}>
              <Link
                to={`/shop/${category.id}`}
                onClick={onClose}
                className="group flex items-center gap-4 py-3"
              >
                <span className="size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Picture image={category.image} sizes="48px" maxWidth={320} />
                </span>
                <span className="flex-1 text-[17px]">{category.title}</span>
                <ChevronRight className="size-4 opacity-40" strokeWidth={1.5} />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-2">
          <Link
            to="/shop?tag=new"
            onClick={onClose}
            className="flex-1 rounded-xl bg-muted px-4 py-3 text-center text-sm"
          >
            სიახლეები
          </Link>
          <Link
            to="/shop?tag=sale"
            onClick={onClose}
            className="flex-1 rounded-xl bg-accent-soft px-4 py-3 text-center text-sm text-accent"
          >
            ფასდაკლება
          </Link>
        </div>
        <ul className="mt-8 space-y-3 text-sm text-subtle">
          {helpNav.map((link) => (
            <li key={link.to}>
              <Link to={link.to} onClick={onClose} className="hover:text-foreground">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex gap-2">
          <a
            href={site.social.instagram}
            aria-label="Instagram"
            className="grid size-10 place-items-center rounded-full border border-border"
          >
            <InstagramIcon className="size-[18px]" />
          </a>
          <a
            href={site.social.facebook}
            aria-label="Facebook"
            className="grid size-10 place-items-center rounded-full border border-border"
          >
            <FacebookIcon className="size-[18px]" />
          </a>
        </div>
      </nav>
    </Drawer>
  );
}
