'use client';

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CartItems() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const handleQuantityChange = (
    id: number,
    currentQuantity: number,
    change: number
  ) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0 && newQuantity <= 99) {
      updateQuantity(id, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg p-4 sm:p-6 text-center">
        <p className="text-gray-500 text-sm sm:text-base">
          Twój koszyk jest pusty
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      <div className="p-4 sm:p-6 flex justify-between items-center">
        <h2 className="text-base sm:text-lg font-medium">Produkty</h2>

        <Button
          variant="link"
          className="text-secondary underline hover:text-orange-500 text-sm sm:text-base px-0 sm:px-2"
          onClick={clearCart}
        >
          Wyczyść koszyk
        </Button>
      </div>
      <div className="p-4 sm:p-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[auto,1fr,auto] gap-3 sm:gap-4 py-4 border-b border-gray-100 last:border-0"
          >
            <div className="relative w-20 sm:w-24 h-20 sm:h-24 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
              <Image
                src={item.image || '/placeholder.png'}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">
                  {item.name}
                </h3>
                <p className="text-orange-500 font-medium text-sm sm:text-base mt-1">
                  {new Intl.NumberFormat('pl-PL', {
                    style: 'currency',
                    currency: 'PLN',
                  }).format(item.price)}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2 sm:hidden">
                <div className="flex items-center rounded-lg overflow-hidden border border-gray-200">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity, -1)
                    }
                    className="p-1.5 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <div className="w-8 text-center py-1 text-sm font-medium bg-white">
                    {item.quantity}
                  </div>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity, 1)
                    }
                    className="p-1.5 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-right text-sm font-medium">
                  {new Intl.NumberFormat('pl-PL', {
                    style: 'currency',
                    currency: 'PLN',
                  }).format(item.price * item.quantity)}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between gap-2">
              <button
                onClick={() => removeItem(item.id)}
                className="p-1.5 sm:p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="hidden sm:flex items-center gap-4">
                <div className="flex items-center rounded-lg overflow-hidden border border-gray-200">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity, -1)
                    }
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="w-12 text-center py-1 text-base font-medium bg-white">
                    {item.quantity}
                  </div>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity, 1)
                    }
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-right min-w-[80px] sm:w-24 font-medium">
                  {new Intl.NumberFormat('pl-PL', {
                    style: 'currency',
                    currency: 'PLN',
                  }).format(item.price * item.quantity)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
