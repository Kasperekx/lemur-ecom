import { getProducts } from '@/lib/getWordpressData';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Package,
  Star,
  Clock,
  ShieldCheck,
  CheckCircle,
  ChevronDown,
  Info,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';

import { createSlug } from '@/utils/strings';
import { Product } from '@/components/products/product.type';
import { ProductImageGallery } from '@/components/products/ProductImageGallery';

import { AutoBreadcrumbs } from '@/components/ui/auto-breadcrumbs';
import Image from 'next/image';

async function ProductDetailsPage({ params }: { params: { name: string } }) {
  const products: Product[] = await getProducts();
  const product = products.find(
    (p: Product) => createSlug(p.name) === params.name
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="border-b border-gray-200 backdrop-blur-md bg-white/80 sticky top-0 z-20">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <AutoBreadcrumbs />
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16">
        <div className="mb-8">
          <Link
            href="/produkty"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-secondary transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded shadow-sm hover:shadow-md border border-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Wróć do listy produktów
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="relative backdrop-blur-sm bg-white/5 rounded-3xl overflow-hidden border border-gray-100">
            <div className="absolute top-6 left-6 z-10 flex  gap-2">
              <span className="bg-secondary/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                NOWOŚĆ
              </span>
              {Number(product.price) > 100 && (
                <span className="bg-amber-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  BESTSELLER
                </span>
              )}
            </div>

            <div className="relative group p-4">
              <ProductImageGallery images={product.images} />
            </div>
          </div>

          <div className="flex flex-col space-y-8">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <div className="inline-block px-3 py-1 border border-green-200 text-green-700 text-xs font-medium rounded-full bg-green-50">
                  <span className="flex items-center gap-1">
                    {product.stock_status === 'instock' ? (
                      <>
                        <CheckCircle className="w-3 h-3" />
                        Dostępny
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" /> Niedostępny
                      </>
                    )}
                  </span>
                </div>
                {/* <div className="inline-block px-3 py-1 border border-blue-200 text-blue-700 text-xs font-medium rounded-full bg-blue-50">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3" /> Darmowa dostawa
                  </span>
                </div> */}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating stars */}
              <div className="flex items-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= 4
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-2 hover:text-secondary cursor-pointer underline-offset-2 hover:underline transition-colors">
                  (16 opinii)
                </span>
              </div>

              <div className="flex items-end gap-3 pb-6 border-b border-gray-100">
                <p className="text-4xl font-bold text-secondary">
                  {product.price} zł
                </p>
                <p className="text-sm text-gray-500 line-through mb-1">
                  {(Number(product.price) * 1.15).toFixed(2)} zł
                </p>
                <span className="bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-2 py-1 rounded-full mb-1">
                  -15%
                </span>
              </div>

              {/* Stock information */}
              {/* <div className="flex items-center gap-2  mt-6">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                    product.stock_status === 'instock'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      product.stock_status === 'instock'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  />
                  <span>
                    {product.stock_status === 'instock'
                      ? `Dostępny (${product.stock_quantity || '✓'})`
                      : 'Niedostępny'}
                  </span>
                </div>
                {product.stock_status === 'instock' &&
                  product.stock_quantity &&
                  product.stock_quantity < 5 && (
                    <span className="text-amber-600 text-sm">
                      Zostało tylko {product.stock_quantity} sztuk!
                    </span>
                  )}
              </div> */}
            </div>

            {/* Shipping info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 hover:shadow-sm transition-shadow">
                <div className="bg-secondary/10 p-2 rounded-full">
                  <Truck className="w-5 h-5 text-secondary" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Darmowa dostawa</p>
                  <p className="text-gray-500">Dla zamówień &gt; 200 zł</p>
                </div>
              </div> */}
              <div className="flex items-center justify-center gap-3 p-4 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 hover:shadow-sm transition-shadow">
                <div className="bg-secondary/10 p-2 rounded-full">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Szybka dostawa</p>
                  <p className="text-gray-500">Wysyłka w 24h</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 hover:shadow-sm transition-shadow">
                <div className="bg-secondary/10 p-2 rounded-full">
                  <ShieldCheck className="w-5 h-5 text-secondary" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">Gwarancja zwrotu</p>
                  <p className="text-gray-500">14 dni na zwrot</p>
                </div>
              </div>
            </div>

            {/* Add to cart section */}
            <div className="flex flex-col sm:flex-row gap-4 py-6 border-y border-gray-100">
              {/* <AddToCartButton
                className={`flex-grow bg-gradient-to-r from-secondary to-secondary/90 text-white font-medium flex items-center justify-center gap-2 py-4 px-8 rounded-full transition-all hover:shadow-lg hover:shadow-secondary/20 active:scale-[0.98] `}
                product={{
                  id: product.id,
                  name: product.name,
                  price: Number(product.price) || 0,
                  image: product.images?.[0]?.src,
                }}
              >
                <ShoppingCart className="w-5 h-5" />
              </AddToCartButton> */}
              <Button variant="default" className="w-full">
                <Link
                  href={`/kontakt?product=${product.slug}`}
                  className="w-full"
                >
                  Zapytaj o produkt
                </Link>
              </Button>
              {/* <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Dodaj do ulubionych"
                  className="h-14 w-14 rounded-full border-gray-200 hover:bg-pink-50 hover:border-pink-200 hover:text-pink-500 transition-all active:scale-[0.95]"
                >
                  <Heart className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Udostępnij"
                  className="h-14 w-14 rounded-full border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-500 transition-all active:scale-[0.95]"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div> */}
            </div>

            {/* FAQ Accordion */}
            <div className="rounded-xl border border-gray-100 overflow-hidden">
              <h3 className="px-6 py-4 font-medium text-gray-900 bg-gradient-to-r from-gray-50 to-white">
                Często zadawane pytania
              </h3>

              <div className="divide-y divide-gray-100">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h4 className="font-medium text-gray-900">
                      Jaki jest czas dostawy?
                    </h4>
                    <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-gray-600">
                    <p>
                      Standardowy czas dostawy wynosi 1-3 dni robocze. W
                      przypadku zamówień złożonych przed godziną 12:00, wysyłka
                      odbywa się tego samego dnia.
                    </p>
                  </div>
                </details>

                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h4 className="font-medium text-gray-900">
                      Czy produkt posiada gwarancję?
                    </h4>
                    <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-gray-600">
                    <p>
                      Tak, wszystkie nasze produkty objęte są 24-miesięczną
                      gwarancją producenta.
                    </p>
                  </div>
                </details>
              </div>
            </div>

            {product.attributes && product.attributes.length > 0 && (
              <div className="hidden">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 inline-flex items-center gap-2">
                  <Package className="w-5 h-5 text-secondary" /> Szczegóły
                  produktu
                </h2>
                <dl className="grid grid-cols-1 gap-4 bg-gray-50 p-5 rounded-lg">
                  {product.attributes.map((attr) => (
                    <div
                      key={attr.name}
                      className="flex flex-col sm:flex-row sm:items-center py-2"
                    >
                      <dt className="font-medium text-gray-500 w-full sm:w-1/3 flex-shrink-0">
                        {attr.name}
                      </dt>
                      <dd className="mt-1 sm:mt-0 text-gray-700 w-full sm:w-2/3 font-medium">
                        {attr.options?.join(', ') || 'N/A'}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New full-width product description section */}
      <div className="mt-16 border-t border-gray-100 pt-16 container mx-auto px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Opis produktu
              </h2>
              <p className="text-gray-500">
                Poznaj szczegóły i specyfikację produktu
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary/5 rounded-full">
                <Package className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium text-gray-700">
                  Specyfikacja
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary/5 rounded-full">
                <Info className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium text-gray-700">
                  Informacje
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="prose prose-lg max-w-none text-gray-600">
                <div
                  className="space-y-2"
                  dangerouslySetInnerHTML={{
                    __html: product.description || '<p>Brak opisu.</p>',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products section */}
      <div className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Może Cię zainteresować
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Sprawdź inne produkty z naszej kolekcji, które mogą Cię
            zainteresować
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {relatedProducts.length > 0
              ? relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/produkty/${createSlug(relatedProduct.name)}`}
                    className="group block relative"
                  >
                    <div className="aspect-square mb-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden relative">
                      {relatedProduct.images &&
                      relatedProduct.images.length > 0 ? (
                        <Image
                          src={relatedProduct.images[0].src}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          fill
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                          <span>Brak zdjęcia</span>
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-800 px-5 py-2.5 rounded-full font-medium shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          Zobacz produkt
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= 4
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">
                          (4.0)
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-800 group-hover:text-secondary transition-colors line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-secondary font-bold">
                        {relatedProduct.price} zł
                      </p>
                    </div>
                  </Link>
                ))
              : [1, 2, 3, 4].map((i) => (
                  <div key={i} className="group block relative">
                    <div className="aspect-square mb-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-300">
                        Placeholder Obrazka
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-800 px-5 py-2.5 rounded-full font-medium shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          Zobacz produkt
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              Math.random() > 0.3
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">
                          (4.{i})
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-800 group-hover:text-secondary transition-colors">
                        Nazwa Produktu {i}
                      </h3>
                      <p className="text-secondary font-bold">
                        {(99 + i * 20).toFixed(2)} zł
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
