import * as z from 'zod';

export const addressFormSchema = z
  .object({
    type: z.enum(['private', 'company'], {
      required_error: 'Wybierz typ zamówienia',
    }),
    country: z.string({
      required_error: 'Wybierz kraj',
    }),
    companyName: z
      .string()
      .min(2, 'Nazwa firmy musi mieć minimum 2 znaki')
      .optional(),
    nip: z
      .string()
      .regex(/^\d{10}$/, 'Nieprawidłowy NIP (10 cyfr)')
      .optional(),
    firstName: z.string().min(2, 'Imię musi mieć minimum 2 znaki'),
    lastName: z.string().min(2, 'Nazwisko musi mieć minimum 2 znaki'),
    email: z.string().email('Nieprawidłowy adres email'),
    street: z.string().min(2, 'Nazwa ulicy jest wymagana'),
    houseNumber: z.string().min(1, 'Numer domu jest wymagany'),
    apartmentNumber: z.string().optional(),
    postalCode: z
      .string()
      .regex(/^\d{2}-\d{3}$/, 'Nieprawidłowy kod pocztowy (XX-XXX)'),
    city: z.string().min(2, 'Nazwa miejscowości jest wymagana'),
    phone: z.string().regex(/^\d{9}$/, 'Nieprawidłowy numer telefonu (9 cyfr)'),
    defaultAddress: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.type === 'company') {
        return !!data.companyName && !!data.nip;
      }
      return true;
    },
    {
      message: 'Pola firmowe są wymagane',
      path: ['companyName'],
    }
  );

export type AddressFormValues = z.infer<typeof addressFormSchema>;
