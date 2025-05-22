import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AddressData {
  type: 'private' | 'company';
  country: string;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  houseNumber: string;
  apartmentNumber?: string;
  postalCode: string;
  city: string;
  phone: string;
  defaultAddress: boolean;
  companyName?: string;
  nip?: string;
}

export interface PaymentData {
  method: string;

  // TODO: Add new payment data here!
}

interface CheckoutState {
  address: AddressData | null;
  payment: PaymentData | null;

  deliveryMethod: string;
  promoCode: string;
  setAddress: (data: AddressData) => void;
  setPayment: (data: PaymentData) => void;
  setDeliveryMethod: (method: string) => void;
  setPromoCode: (code: string) => void;
  clearCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      address: null,
      payment: null,
      deliveryMethod: 'inpost',
      promoCode: '',
      setAddress: (data) => set({ address: data }),
      setPayment: (data) => set({ payment: data }),
      setDeliveryMethod: (method) => set({ deliveryMethod: method }),
      setPromoCode: (code) => set({ promoCode: code }),
      clearCheckout: () =>
        set({
          address: null,
          payment: null,
          deliveryMethod: 'inpost',
          promoCode: '',
        }),
    }),
    {
      name: 'checkout-storage',
    }
  )
);
