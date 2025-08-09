import { NextResponse } from 'next/server';
import { wooCommerceClient } from '@/lib/getWordpressData';
import { unstable_cache } from 'next/cache';

export const dynamic = 'force-dynamic';

const getAllProductsCached = unstable_cache(
  async () => {
    try {
      const { data } = await wooCommerceClient.get('/wp-json/wc/v3/products', {
        params: {
          per_page: 100, // Limit for dropdown
          status: 'publish',
          orderby: 'title',
          order: 'asc',
          // Only get necessary fields for dropdown
          _fields: 'id,name,price,regular_price,images,slug,categories'
        },
      });
      return data;
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    }
  },
  ['all_products_dropdown'],
  { revalidate: 300 } // Cache for 5 minutes
);

export async function GET() {
  try {
    const products = await getAllProductsCached();
    return NextResponse.json(products);
  } catch (error) {
    console.error('all-products API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
