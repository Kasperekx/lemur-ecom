import { Button } from '@/components/ui/button';
import ProductsCarousel from '@/components/products/ProductsCarousel';
import Link from 'next/link';
import { WPProduct } from '@/types/wordpress';

interface ProductsSectionProps {
  products: WPProduct[];
}

const ProductsSection = ({ products }: ProductsSectionProps) => (
  <section className="py-28 container mx-auto">
    <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-12">
      Nasze produkty
    </h2>
    <ProductsCarousel products={products} />
    <div className="flex justify-end mt-8">
      <Link href="/produkty">
        <Button>Zobacz wszystkie produkty</Button>
      </Link>
    </div>
  </section>
);

export default ProductsSection;
