'use client';

import { Form } from '@/components/ui/form';
import { AddressTypeSelector } from './AddressTypeSelector';
import { CompanyFields } from './CompanyFields';
import { PersonalFields } from './PersonalFields';
import { SaveAddressCheckbox } from './SaveAddressCheckbox';
import { useAddressForm } from '../../hooks/useAddressForm';

export function AddressForm() {
  const { form, onSubmit } = useAddressForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AddressTypeSelector form={form} />
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Pola oznaczone gwiazdką (*) są wymagane
          </p>
          <CompanyFields form={form} />
          <PersonalFields form={form} />
        </div>
        <SaveAddressCheckbox form={form} />
      </form>
    </Form>
  );
}
