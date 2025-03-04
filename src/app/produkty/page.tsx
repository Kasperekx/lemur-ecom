import { getProducts } from '@/lib/getWordpressData';
import { ProductHeader } from '@/components/products/ProductHeader';
import { ProductSort } from '@/components/products/ProductSort';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="bg-gray-50 min-h-screen">
      <ProductHeader
        title="Nasze Produkty"
        description="Odkryj naszą kolekcję wyjątkowych produktów stworzonych z myślą o Tobie"
        breadcrumbItems={[{ label: 'Produkty', href: '/produkty' }]}
      />
      <div className="container mx-auto px-4 py-8">
        <ProductSort products={products} />
      </div>
    </div>
  );
}
