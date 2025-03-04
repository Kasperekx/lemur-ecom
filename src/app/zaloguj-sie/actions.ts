'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';

const WORDPRESS_URL = process.env.WORDPRESS_URL;

const LoginSchema = z.object({
  email: z.string().email({
    message: 'Wprowadź poprawny adres email.',
  }),
  password: z.string().min(6, {
    message: 'Hasło musi mieć minimum 6 znaków.',
  }),
});

type LoginInput = z.infer<typeof LoginSchema>;

export async function login(data: LoginInput) {
  try {
    const validatedData = LoginSchema.parse(data);

    const response = await fetch(`${WORDPRESS_URL}/wp-json/jwt-auth/v1/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: validatedData.email,
        password: validatedData.password,
      }),
    });

    const responseData = await response.json();
    console.log('WordPress response:', responseData);

    if (!response.ok) {
      if (responseData.code === '[jwt_auth] invalid_username') {
        throw new Error('Użytkownik o podanym adresie email nie istnieje.');
      }
      if (responseData.code === '[jwt_auth] incorrect_password') {
        throw new Error('Nieprawidłowe hasło.');
      }
      if (responseData.message?.includes('password you entered')) {
        throw new Error('Nieprawidłowe hasło.');
      }
      if (responseData.message?.includes('Invalid username')) {
        throw new Error('Użytkownik o podanym adresie email nie istnieje.');
      }

      throw new Error(
        responseData.message || 'Wystąpił błąd podczas logowania.'
      );
    }

    if (!responseData.token) {
      throw new Error('Nie otrzymano tokenu uwierzytelniającego.');
    }

    const cookieStore = cookies();
    cookieStore.set('auth_token', responseData.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return {
      success: true,
      data: {
        email: responseData.user_email || validatedData.email,
      },
    };
  } catch (error) {
    console.error('Szczegóły błędu:', error);

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
          : 'Wystąpił nieoczekiwany błąd podczas logowania.',
    };
  }
}
