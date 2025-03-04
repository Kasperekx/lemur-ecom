'use server';

import { z } from 'zod';

const WORDPRESS_URL = process.env.WORDPRESS_URL;
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRETS;

const RegisterSchema = z.object({
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

type RegisterInput = z.infer<typeof RegisterSchema>;

export async function register(data: RegisterInput) {
  try {
    const validatedData = RegisterSchema.parse(data);

    const response = await fetch(`${WORDPRESS_URL}/wp-json/wc/v3/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' +
          Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64'),
      },
      body: JSON.stringify({
        email: validatedData.email,
        username: validatedData.username,
        password: validatedData.password,
        role: 'customer',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          'Błąd podczas rejestracji. Sprawdź czy użytkownik o podanym emailu już nie istnieje.'
      );
    }

    const userData = await response.json();
    return {
      success: true,
      data: userData,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: 'Nieprawidłowe dane formularza',
        validationErrors: error.errors,
      };
    }

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Wystąpił błąd podczas rejestracji',
    };
  }
}
