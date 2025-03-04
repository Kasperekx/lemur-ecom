import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCheckoutStore } from '@/store/checkoutStore';
import {
  addressFormSchema,
  AddressFormValues,
} from '../components/checkout/schemas/addressFormSchema';

export function useAddressForm() {
  const { address, setAddress } = useCheckoutStore();

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      type: address?.type || 'private',
      country: address?.country || 'PL',
      firstName: address?.firstName || '',
      lastName: address?.lastName || '',
      email: address?.email || '',
      street: address?.street || '',
      houseNumber: address?.houseNumber || '',
      apartmentNumber: address?.apartmentNumber || '',
      postalCode: address?.postalCode || '',
      city: address?.city || '',
      phone: address?.phone || '',
      defaultAddress: address?.defaultAddress || false,
      companyName: address?.companyName || '',
      nip: address?.nip || '',
    },
  });

  const onSubmit = (data: AddressFormValues) => {
    setAddress(data);
  };

  return { form, onSubmit };
}
