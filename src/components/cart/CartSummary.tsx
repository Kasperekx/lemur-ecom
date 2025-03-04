'use client';

import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useEffect, useState } from 'react';

export function CartSummary() {
  const router = useRouter();
  const pathname = usePathname();
  const { getTotalPrice, items } = useCartStore();
  const { address, deliveryMethod, promoCode } = useCheckoutStore();

  // Dodajemy stany lokalne do kontroli renderowania
  const [mounted, setMounted] = useState(false);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);

  // Aktualizujemy wartości po zamontowaniu komponentu
  useEffect(() => {
    const currentSubtotal = getTotalPrice();
    const currentDiscount = promoCode ? currentSubtotal * 0.1 : 0;
    const currentDeliveryCost = deliveryMethod === 'courier' ? 14.99 : 0;

    setSubtotal(currentSubtotal);
    setDiscount(currentDiscount);
    setDeliveryCost(currentDeliveryCost);
    setTotal(currentSubtotal - currentDiscount + currentDeliveryCost);
    setMounted(true);
  }, [getTotalPrice, promoCode, deliveryMethod, items]);

  // Nie renderujemy nic dopóki komponent nie jest zamontowany
  if (!mounted) {
    return null;
  }

  const getButtonConfig = () => {
    switch (pathname) {
      case '/koszyk':
        return {
          text: 'Przejdź do dostawy',
          action: () => router.push('/koszyk/adres'),
          disabled: subtotal === 0,
        };
      case '/koszyk/adres':
        return {
          text: 'Przejdź do płatności',
          action: () => router.push('/koszyk/platnosc'),
          disabled: false,
        };
      case '/koszyk/platnosc':
        return {
          text: 'Złóż zamówienie',
          action: () => router.push('/koszyk/potwierdzenie'),
          disabled: false,
        };
      default:
        return {
          text: 'Dalej',
          action: () => router.push('/koszyk/adres'),
          disabled: false,
        };
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6 w-full md:sticky md:top-6 shadow-sm mx-auto max-w-screen-sm md:max-w-none">
      <h2 className="text-base md:text-lg font-medium mb-3 md:mb-4">
        Podsumowanie
      </h2>

      <div className="space-y-2 md:space-y-3 text-xs sm:text-sm md:text-base">
        <div className="flex flex-wrap justify-between text-gray-600 gap-2">
          <span>Wartość produktów</span>
          <span className="font-medium">
            {new Intl.NumberFormat('pl-PL', {
              style: 'currency',
              currency: 'PLN',
            }).format(subtotal)}
          </span>
        </div>

        {promoCode && discount > 0 && (
          <div className="flex flex-wrap justify-between text-green-600 gap-2">
            <span>Zniżka</span>
            <span className="font-medium">
              -
              {new Intl.NumberFormat('pl-PL', {
                style: 'currency',
                currency: 'PLN',
              }).format(discount)}
            </span>
          </div>
        )}

        <div className="flex flex-wrap justify-between text-gray-600 gap-2">
          <span>Dostawa</span>
          {deliveryCost === 0 ? (
            <span className="text-green-600 font-medium">Za darmo</span>
          ) : (
            <span className="font-medium">
              {new Intl.NumberFormat('pl-PL', {
                style: 'currency',
                currency: 'PLN',
              }).format(deliveryCost)}
            </span>
          )}
        </div>

        {address && (
          <div className="border-t border-b py-3 my-3 space-y-2">
            <h3 className="font-medium">Dane dostawy:</h3>
            <div className="text-sm text-gray-600">
              <p>
                {address.firstName} {address.lastName}
              </p>
              <p>
                {address.street} {address.houseNumber}
                {address.apartmentNumber ? `/${address.apartmentNumber}` : ''}
              </p>
              <p>
                {address.postalCode} {address.city}
              </p>
            </div>
          </div>
        )}

        <div className="border-t pt-3 mt-3">
          <div className="flex flex-wrap justify-between gap-2">
            <span className="text-sm sm:text-base md:text-lg font-medium">
              Razem
            </span>
            <span className="text-sm sm:text-base md:text-lg font-medium">
              {new Intl.NumberFormat('pl-PL', {
                style: 'currency',
                currency: 'PLN',
              }).format(total)}
            </span>
          </div>
        </div>
      </div>

      <Button
        onClick={buttonConfig.action}
        disabled={buttonConfig.disabled}
        className="w-full bg-secondary hover:bg-secondary/90 mt-4 md:mt-6 py-4 sm:py-5 md:py-6 text-xs sm:text-sm md:text-base font-medium"
      >
        {buttonConfig.text}
      </Button>

      <p className="text-center text-[10px] sm:text-xs md:text-sm text-gray-500 mt-2 sm:mt-3 md:mt-4">
        Darmowy zwrot do 30 dni
      </p>
    </div>
  );
}
