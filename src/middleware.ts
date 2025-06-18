import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/zaloguj-sie') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname === '/rejestracja') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (pathname === '/koszyk') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
