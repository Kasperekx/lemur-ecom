'use client';

import { WPProduct } from '@/types/wordpress';
import { SortOption } from '@/hooks/useSortProducts';
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

interface ProductSortProps {
  products: WPProduct[];
  sortOption?: SortOption;
}

export function ProductSort({
  products,
  sortOption = 'newest',
}: ProductSortProps) {
  const [localProducts, setLocalProducts] = useState(products);

  // Apply sorting when products or sortOption changes
  useEffect(() => {
    const sorted = [...products];

    switch (sortOption) {
      case 'price-asc':
        setLocalProducts(
          sorted.sort((a, b) => Number(a.price) - Number(b.price))
        );
        break;
      case 'price-desc':
        setLocalProducts(
          sorted.sort((a, b) => Number(b.price) - Number(a.price))
        );
        break;
      case 'name-asc':
        setLocalProducts(sorted.sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case 'name-desc':
        setLocalProducts(sorted.sort((a, b) => b.name.localeCompare(a.name)));
        break;
      case 'newest':
      default:
        setLocalProducts(
          sorted.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        );
    }
  }, [products, sortOption]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {localProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {localProducts.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2">
            Nie znaleziono produktów
          </h2>
          <p className="text-gray-600">Spróbuj zmienić kryteria wyszukiwania</p>
        </div>
      )}
    </>
  );
}
