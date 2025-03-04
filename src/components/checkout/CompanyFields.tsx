import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { AddressFormValues } from './schemas/addressFormSchema';

interface CompanyFieldsProps {
  form: UseFormReturn<AddressFormValues>;
}

export function CompanyFields({ form }: CompanyFieldsProps) {
  if (form.watch('type') !== 'company') return null;

  return (
    <div className="grid gap-4">
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nazwa firmy *</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nip"
        render={({ field }) => (
          <FormItem>
            <FormLabel>NIP *</FormLabel>
            <FormControl>
              <Input {...field} placeholder="0000000000" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
