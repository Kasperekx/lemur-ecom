'use client';

import { usePathname } from 'next/navigation';

interface Breadcrumb {
  label: string;
  href: string;
}

export function useBreadcrumbs(): Breadcrumb[] {
  const pathname = usePathname();
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      return {
        href: `/${segment}`,
        label: segment,
      };
    });

  return [{ href: '/', label: 'Strona Główna' }, ...segments];
}
