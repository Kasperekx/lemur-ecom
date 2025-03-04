'use client';

import { AuthForm } from '@/components/auth/AuthForm';
import * as z from 'zod';
import { login } from './actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email({
    message: 'Wprowadź poprawny adres email.',
  }),
  password: z.string().min(6, {
    message: 'Hasło musi mieć minimum 6 znaków.',
  }),
});

const loginFields: {
  name: keyof z.infer<LoginSchema>;
  label: string;
  type: string;
  placeholder?: string;
}[] = [
  {
    name: 'email',
    label: 'Login (adres e-mail)',
    type: 'email',
    placeholder: 'email@example.com',
  },
  {
    name: 'password',
    label: 'Hasło',
    type: 'password',
    placeholder: '******',
  },
];

type LoginSchema = typeof loginSchema;

export default function Login() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Logowanie</h2>
            <p className="mb-6">Zaloguj się podając swój login oraz hasło.</p>

            <AuthForm<LoginSchema>
              formSchema={loginSchema}
              onSubmit={login}
              fields={loginFields}
              submitText="Zaloguj się"
              loadingText="Logowanie..."
              redirectPath="/"
              successMessage="Zalogowano pomyślnie! Przekierowywanie..."
            />

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Nie pamiętasz hasła?</h3>
              <p className="mb-4">Podaj swój e-mail, prześlemy Ci nowe.</p>
              <div className="flex gap-2">
                <Input placeholder="Wpisz e-mail" className="h-auto" />
                <Button variant="outline" className="w-full">
                  Wyślij
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Nowy klient</h2>
            <p className="mb-4">
              Rejestrując się w naszym sklepie, masz dostęp do swojego panelu
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
              <Link href="/rejestracja">Rejestracja</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
