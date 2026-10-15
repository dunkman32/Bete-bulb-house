import { isRouteErrorResponse, useRouteError } from 'react-router';

import { Button } from '@/components/ui/button';

/** Shown instead of the app when a page throws (outside the layout, so it can't break too). */
export function RouteError() {
  const error = useRouteError();
  const detail = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : undefined;

  return (
    <div className="grid min-h-dvh place-items-center px-6 text-center">
      <div className="max-w-md">
        <p className="font-display text-3xl font-light">რაღაც არასწორად წავიდა</p>
        <p className="mt-3 text-[15px] text-subtle">გვერდი ვერ ჩაიტვირთა. სცადე თავიდან.</p>
        {import.meta.env.DEV && detail && (
          <pre className="mt-6 overflow-x-auto rounded-xl bg-muted p-4 text-left text-xs">
            {detail}
          </pre>
        )}
        <Button className="mt-8" onClick={() => window.location.reload()}>
          თავიდან ჩატვირთვა
        </Button>
      </div>
    </div>
  );
}
