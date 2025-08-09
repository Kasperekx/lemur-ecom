import { getProducts } from '@/lib/getWordpressData';
import { ProductHeader } from '@/components/products/ProductHeader';
import ProductsPageClient from '@/components/products/ProductsPageClient';

export const revalidate = 300;

export default async function ProductsPage() {
  // Fetch products server-side
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-20">
      {/* Hero Header */}
      <ProductHeader
        title="Odkryj Nasze Produkty"
        products={products}
        description="Zaawansowane rozwiązania diagnostyczne dla nowoczesnej praktyki weterynaryjnej"
        breadcrumbItems={[{ label: 'Produkty', href: '/produkty' }]}
      />

      {/* Pass products to client component for interactive elements */}
      <ProductsPageClient products={products} />
    </div>
  );
}
