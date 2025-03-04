import axios from 'axios';
import { agent } from './utils';

export async function getWordpressMenuItems() {
  try {
    const response = await fetch(
      'http://vetdesign.local/wp-json/menus/v1/menus/main',
      {
        cache: 'no-cache',
      }
    );
    const data = await response.json();

    return data.items;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch menu items');
  }
}

export const wooCommerceClient = axios.create({
  baseURL: process.env.WORDPRESS_URL,
  auth: {
    username:
      process.env.CONSUMER_KEY || 'ck_8b846bd2824584b87c1aec20a76eb507886c400a',
    password:
      process.env.CONSUMER_SECRET ||
      'cs_3df4de37542575f3fe5d8ec67a91f351de8d1a09',
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
    console.log(posts);
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
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
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
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
    return posts[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// login
