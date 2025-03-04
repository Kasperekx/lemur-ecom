import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';
import { AddressFormValues } from './schemas/addressFormSchema';

interface AddressTypeSelectorProps {
  form: UseFormReturn<AddressFormValues>;
}

export function AddressTypeSelector({ form }: AddressTypeSelectorProps) {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private" />
                <FormLabel htmlFor="private">
                  Zamawiam jako osoba prywatna
                </FormLabel>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="company" />
                <FormLabel htmlFor="company">
                  Zamawiam jako firma lub jednostka budżetowa
                </FormLabel>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
