'use client';

import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

interface AutoBreadcrumbsProps {
  className?: string;
}

export function AutoBreadcrumbs({ className }: AutoBreadcrumbsProps) {
  const items = useBreadcrumbs();

  return <Breadcrumbs items={items} className={className} />;
}
