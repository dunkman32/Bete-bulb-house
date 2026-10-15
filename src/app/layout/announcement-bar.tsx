import { useQuery } from '@tanstack/react-query';

import { announcementQuery } from '@/features/content/api/content-queries';

/** The thin strip above the header: the CMS's messages (one on phones, all on wider screens). */
export function AnnouncementBar() {
  const { data } = useQuery(announcementQuery());
  return (
    <div className="bg-ink text-on-ink">
      <ul className="mx-auto flex h-9 max-w-[1440px] items-center justify-center gap-10 px-4 text-xs tracking-wide">
        {data?.messages.map((message, index) => (
          <li key={message} className={index > 0 ? 'hidden md:block' : undefined}>
            {message}
          </li>
        ))}
      </ul>
    </div>
  );
}
