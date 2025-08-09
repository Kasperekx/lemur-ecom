import { NextResponse } from 'next/server';
import { wooCommerceClient } from '@/lib/getWordpressData';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').trim();

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const { data } = await wooCommerceClient.get('/wp-json/wc/v3/products', {
      params: { search: q, per_page: 10 },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('search-products error', error);
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    );
  }
}
