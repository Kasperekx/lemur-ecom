'use client';
import { AuthForm } from '@/components/auth/AuthForm';
import React from 'react';
import { z } from 'zod';
import { register } from './actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const RegisterPage = () => {
  const registerSchema = z.object({
    email: z.string().email({
      message: 'Wprowadź poprawny adres email.',
    }),
    username: z.string().min(3, {
      message: 'Nazwa użytkownika musi mieć minimum 3 znaki.',
    }),
    password: z.string().min(6, {
      message: 'Hasło musi mieć minimum 6 znaków.',
    }),
  });

  const registerFields: {
    name: keyof z.infer<typeof registerSchema>;
    label: string;
    type: string;
    placeholder?: string;
  }[] = [
    {
      name: 'email',
      label: 'Adres e-mail',
      type: 'email',
      placeholder: 'email@example.com',
    },
    {
      name: 'username',
      label: 'Nazwa użytkownika',
      type: 'text',
      placeholder: 'marian.dopper12',
    },
    {
      name: 'password',
      label: 'Hasło',
      type: 'password',
      placeholder: '••••••',
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Rejestracja</h2>
            <p className="mb-6">Zarejestruj się podając swoje dane.</p>

            <AuthForm<typeof registerSchema>
              formSchema={registerSchema}
              onSubmit={register}
              fields={registerFields}
              submitText="Zarejestruj się"
              loadingText="Rejestracja..."
              redirectPath="/zaloguj-sie"
            />
          </div>

          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Posiadasz już konto?</h2>
            <p className="mb-4">
              Logując się w naszym sklepie, masz dostęp do swojego panelu
              klienta, gdzie w każdej chwili możesz:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>sprawdzić status Twojego zamówienia</li>
              <li>Sprawdzić historię swoich zamówień</li>
              <li>
                Przeglądać wszystkie zamówienia złożone do tej pory w naszym
                sklepie
              </li>
              <li>Zmienić dane osobiste (nazwę, NIP, e-mail)</li>
              <li>Dodawać własne adresy do książki adresowej</li>
              <li>Sklep zapamiętuje dodane do koszyka produkty</li>
            </ul>
            <Button variant="outline" className="w-full">
              <Link href="/zaloguj-sie">Zaloguj się</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
