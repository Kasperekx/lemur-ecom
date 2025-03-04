import { WPProduct } from '@/types/wordpress';
import { useState, useMemo } from 'react';

export type SortOption =
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc';

export function useSortProducts(products: WPProduct[]) {
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const sortedProducts = useMemo(() => {
    const productsToSort = [...products];

    switch (sortBy) {
      case 'price-asc':
        return productsToSort.sort((a, b) => Number(a.price) - Number(b.price));
      case 'price-desc':
        return productsToSort.sort((a, b) => Number(b.price) - Number(a.price));
      case 'name-asc':
        return productsToSort.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return productsToSort.sort((a, b) => b.name.localeCompare(a.name));
      case 'newest':
      default:
        return productsToSort.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }
  }, [products, sortBy]);

  return { sortedProducts, sortBy, setSortBy };
}
