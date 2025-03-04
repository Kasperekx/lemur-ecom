import { getProducts } from '@/lib/getWordpressData';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Heart, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { createSlug } from '@/utils/strings';
import { Product } from '@/components/products/product.type';
import { ProductImageGallery } from '@/components/products/ProductImageGallery';

import { AutoBreadcrumbs } from '@/components/ui/auto-breadcrumbs';
import { AddToCartButton } from '@/components/cart/AddToCartButton';

async function ProductDetailsPage({ params }: { params: { name: string } }) {
  const products: Product[] = await getProducts();
  const product = products.find(
    (p: Product) => createSlug(p.name) === params.name
  );

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-4">
        <AutoBreadcrumbs />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Link
                href="/produkty"
                className="inline-flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Powrót do Produktów
              </Link>
              <ProductImageGallery images={product.images} />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.name}
                </h1>
                <p className="text-2xl font-semibold text-secondary mt-2">
                  {product.price} zł
                </p>
              </div>

              <div className="flex gap-4">
                <AddToCartButton
                  product={{
                    id: product.id,
                    name: product.name,
                    price: Number(product.price) || 0,
                    image: product.images[0]?.src,
                  }}
                />
                <Button variant="outline" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="prose prose-lg max-w-none">
                <h2 className="text-xl font-semibold mb-4">Opis produktu</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">
                  Szczegóły produktu
                </h2>
                {/* <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {product.attributes?.map((attr) => (
                    <div key={attr.name} className="border-b pb-4">
                      <dt className="font-medium text-gray-500">{attr.name}</dt>
                      <dd className="mt-1 text-gray-900">{attr.value}</dd>
                    </div>
                  ))}
                </dl> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Podobne produkty</h2>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
