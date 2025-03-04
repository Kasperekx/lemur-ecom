import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { AddressFormValues } from './schemas/addressFormSchema';

interface SaveAddressCheckboxProps {
  form: UseFormReturn<AddressFormValues>;
}

export function SaveAddressCheckbox({ form }: SaveAddressCheckboxProps) {
  return (
    <FormField
      control={form.control}
      name="defaultAddress"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel>Zapisz jako domyślny adres dostawy</FormLabel>
        </FormItem>
      )}
    />
  );
}
