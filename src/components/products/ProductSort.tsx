'use client';

import { WPProduct } from '@/types/wordpress';
import { useSortProducts, type SortOption } from '@/hooks/useSortProducts';
import { useState } from 'react';
import ProductCard from './ProductCard';

interface ProductSortProps {
  products: WPProduct[];
}

export function ProductSort({ products }: ProductSortProps) {
  const [localProducts, setLocalProducts] = useState(products);
  const { sortBy, setSortBy } = useSortProducts(products);

  const handleSort = (option: SortOption) => {
    setSortBy(option);
    const sorted = [...products];

    switch (option) {
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
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            Pokazano {localProducts.length} produktów
          </span>
        </div>
        <select
          className="border rounded-lg px-4 py-2 bg-white"
          value={sortBy}
          onChange={(e) => handleSort(e.target.value as SortOption)}
        >
          <option value="newest">Najnowsze</option>
          <option value="price-asc">Cena: od najniższej</option>
          <option value="price-desc">Cena: od najwyższej</option>
          <option value="name-asc">Nazwa: A-Z</option>
          <option value="name-desc">Nazwa: Z-A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {localProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
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
