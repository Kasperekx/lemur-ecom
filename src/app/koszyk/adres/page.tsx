'use client';

import { AddressForm } from '@/components/checkout/AddressForm';
import { CartSummary } from '@/components/cart/CartSummary';

export default function AddressPage() {
  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
      <div className="flex flex-col mb-6 sm:mb-8 md:mb-12">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-secondary to-orange-500 bg-clip-text text-transparent mb-3 sm:mb-4">
          Dane klienta
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Uzupełnij dane do wysyłki zamówienia
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8">
            <AddressForm />
          </div>
        </div>

        <div className="w-full lg:w-[380px]">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
