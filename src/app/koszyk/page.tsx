'use client';

import { useCartStore } from '@/store/cartStore';
import { Suspense, useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { FaOtter } from 'react-icons/fa';
import { CartItems } from '@/components/cart/CartItems';
import { CartSummary } from '@/components/cart/CartSummary';
import { DeliveryMethod } from '@/components/cart/DeliveryMethod';
import { PaymentMethod } from '@/components/cart/PaymentMethod';
import { PromoCode } from '@/components/cart/PromoCode';
import { cn } from '@/lib/utils';

function LoadingCart() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
      <div className="flex flex-col mb-6 sm:mb-8 md:mb-12">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Skeleton className="w-6 sm:w-8 h-6 sm:h-8 rounded" />
            <Skeleton className="h-7 sm:h-9 w-32 sm:w-40" />
          </div>
          <Skeleton className="h-7 sm:h-9 w-20 sm:w-24 rounded-full" />
        </div>
        <Skeleton className="h-4 w-48 sm:w-64" />
      </div>

      <div className="grid gap-4 sm:gap-6 md:gap-8">
        <div className="space-y-4 sm:space-y-6">
          <Skeleton className="h-[150px] sm:h-[200px] w-full rounded-lg" />
          <Skeleton className="h-[100px] sm:h-[150px] w-full rounded-lg" />
          <Skeleton className="h-[100px] sm:h-[150px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function CartContent() {
  const { items, getTotalPrice } = useCartStore();
  const [deliveryMethod, setDeliveryMethod] = useState('inpost');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [getTotalPrice, items]);

  if (isLoading) {
    return <LoadingCart />;
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
      <div className="flex flex-col mb-6 sm:mb-8 md:mb-12">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <FaOtter className="w-6 sm:w-8 h-6 sm:h-8 text-secondary transition-transform hover:scale-110" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-secondary to-orange-500 bg-clip-text text-transparent">
              Twój Koszyk
            </h1>
          </div>
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-full text-xs sm:text-sm font-medium text-gray-600">
            {items.length} {items.length === 1 ? 'produkt' : 'produkty'}
          </span>
        </div>
        <p className="text-gray-500 text-xs sm:text-sm">
          Dokończ zakupy, aby cieszyć się wybranymi produktami
        </p>
      </div>

      <div
        className={cn(
          'grid gap-4 sm:gap-6 md:gap-8',
          items.length > 0 && 'lg:grid-cols-3'
        )}
      >
        <div
          className={cn(
            'space-y-4 sm:space-y-6',
            items.length > 0 && 'lg:col-span-2'
          )}
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <CartItems />
          </div>

          {items.length > 0 && (
            <>
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <DeliveryMethod
                  selected={deliveryMethod}
                  onSelect={setDeliveryMethod}
                />
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <PaymentMethod
                  selected={paymentMethod}
                  onSelect={setPaymentMethod}
                />
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <PromoCode code={promoCode} onCodeChange={setPromoCode} />
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<LoadingCart />}>
      <CartContent />
    </Suspense>
  );
}
