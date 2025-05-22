import axios from 'axios';
import { agent } from './utils';
import { WPPost } from '@/types/wordpress';

const samplePosts: WPPost[] = [
  {
    id: 1,
    title: {
      rendered: 'Nowoczesne metody diagnostyki weterynaryjnej',
    },
    slug: 'nowoczesne-metody-diagnostyki-weterynaryjnej',
    excerpt: {
      rendered:
        'Poznaj najnowsze technologie i metody diagnostyczne, które rewolucjonizują współczesną medycynę weterynaryjną.',
    },
    content: {
      rendered:
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio.</p>',
    },
    date: '2023-11-15T10:00:00',
    _embedded: {
      'wp:featuredmedia': [
        {
          source_url:
            'https://images.unsplash.com/photo-1581093196277-9f853940008b?q=80&w=2070&auto=format&fit=crop',
        },
      ],
      'wp:term': [
        [
          {
            id: 1,
            name: 'Diagnostyka',
            slug: 'diagnostyka',
          },
          {
            id: 2,
            name: 'Innowacje',
            slug: 'innowacje',
          },
        ],
      ],
      author: [
        {
          name: 'Dr Jan Kowalski',
          description:
            'Specjalista diagnostyki weterynaryjnej z 15-letnim doświadczeniem',
          avatar_urls: {
            '96': 'https://randomuser.me/api/portraits/men/32.jpg',
          },
        },
      ],
    },
  },
  {
    id: 2,
    title: {
      rendered: 'Opieka nad zwierzętami w okresie zimowym',
    },
    slug: 'opieka-nad-zwierzetami-w-okresie-zimowym',
    excerpt: {
      rendered:
        'Dowiedz się, jak odpowiednio zadbać o swoje zwierzęta podczas zimowych miesięcy. Porady i wskazówki od ekspertów.',
    },
    content: {
      rendered:
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.</p>',
    },
    date: '2023-12-03T14:30:00',
    _embedded: {
      'wp:featuredmedia': [
        {
          source_url:
            'https://images.unsplash.com/photo-1564937863220-6a6214033988?q=80&w=2070&auto=format&fit=crop',
        },
      ],
      'wp:term': [
        [
          {
            id: 3,
            name: 'Porady',
            slug: 'porady',
          },
          {
            id: 4,
            name: 'Opieka',
            slug: 'opieka',
          },
        ],
      ],
      author: [
        {
          name: 'Dr Anna Nowak',
          description:
            'Lekarz weterynarii z pasją do edukacji właścicieli zwierząt',
          avatar_urls: {
            '96': 'https://randomuser.me/api/portraits/women/32.jpg',
          },
        },
      ],
    },
  },
  {
    id: 3,
    title: {
      rendered: 'Znaczenie badań laboratoryjnych w medycynie weterynaryjnej',
    },
    slug: 'znaczenie-badan-laboratoryjnych-w-medycynie-weterynaryjnej',
    excerpt: {
      rendered:
        'Badania laboratoryjne stanowią fundamentalny element współczesnej diagnostyki weterynaryjnej. W tym artykule omawiamy ich kluczowe znaczenie.',
    },
    content: {
      rendered:
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>',
    },
    date: '2023-12-10T09:15:00',
    _embedded: {
      'wp:featuredmedia': [
        {
          source_url:
            'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop',
        },
      ],
      'wp:term': [
        [
          {
            id: 1,
            name: 'Diagnostyka',
            slug: 'diagnostyka',
          },
          {
            id: 5,
            name: 'Laboratorium',
            slug: 'laboratorium',
          },
        ],
      ],
      author: [
        {
          name: 'Dr Tomasz Malinowski',
          description:
            'Kierownik laboratorium weterynaryjnego z doświadczeniem w diagnostyce',
          avatar_urls: {
            '96': 'https://randomuser.me/api/portraits/men/44.jpg',
          },
        },
      ],
    },
  },
];

export async function getWordpressMenuItems() {
  try {
    const response = await fetch(
      `${process.env.WORDPRESS_URL}/wp-json/menus/v1/menus/main`,
      {
        cache: 'no-cache',
      }
    );
    const data = await response.json();
    if (data.items.length > 0) {
      return data.items;
    }

    return [];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch menu items');
  }
}

export const wooCommerceClient = axios.create({
  baseURL: process.env.WORDPRESS_URL,
  auth: {
    username:
      process.env.CONSUMER_KEY || 'ck_9b11d25e0451e3845bf540cba172f10488286ed5',
    password:
      process.env.CONSUMER_SECRET ||
      'cs_095dce40a7a20b4734106db771f626e1f1096ea4',
  },
  httpsAgent: agent,
});

export async function getProducts() {
  try {
    const { data: products } = await wooCommerceClient.get(
      '/wp-json/wc/v3/products'
    );
    return products;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
    throw new Error('Failed to fetch products: An unknown error occurred');
  }
}

export async function getProductById(id: number) {
  try {
    const { data: product } = await wooCommerceClient.get(
      `/wp-json/wc/v3/products/${id}`
    );
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function getLatestBlogPosts(count: number = 3) {
  try {
    const response = await fetch(
      `${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts?_embed&per_page=${count}`,
      { next: { revalidate: 1 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts = await response.json();
    return posts.length > 0 ? posts : samplePosts.slice(0, count);
  } catch (error) {
    console.error('Error fetching latest blog posts:', error);
    return samplePosts.slice(0, count);
  }
}

export async function getBlogPosts() {
  try {
    const response = await fetch(
      `${process.env.WORDPRESS_URL}/wp-json/wp/v2/posts?_embed`,
      { next: { revalidate: 1 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts = await response.json();
    return posts.length > 0 ? posts : samplePosts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return samplePosts;
  }
}

export async function getPostBySlug(slug: string) {
  const WP_URL = process.env.WORDPRESS_URL;

  if (!WP_URL) {
    throw new Error('NEXT_PUBLIC_WORDPRESS_URL is not defined');
  }

  try {
    const response = await fetch(
      `${WP_URL}/wp-json/wp/v2/posts?slug=${slug}&_embed`,
      { next: { revalidate: 1 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }

    const posts = await response.json();
    if (posts && posts.length > 0) {
      return posts[0];
    }

    // If the post doesn't exist, return a sample post that matches the slug
    const samplePost = samplePosts.find((post) => post.slug === slug);
    return samplePost || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    // If there's an error, try to return a matching sample post
    const samplePost = samplePosts.find((post) => post.slug === slug);
    return samplePost || null;
  }
}

// login
