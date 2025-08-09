import { getLatestBlogPosts, getProducts } from '@/lib/getWordpressData';
import HeroSection from '@/components/home/HeroSection';
import ProductsSection from '@/components/home/ProductsSection';
import AboutSection from '@/components/home/AboutSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import dynamic from 'next/dynamic';

export const revalidate = 300;

const BlogSection = dynamic(
  () => import('@/components/home/BlogSection').then((m) => m.BlogSection),
  { ssr: false }
);

export default async function Home() {
  const products = await getProducts();
  const posts = await getLatestBlogPosts();

  return (
    <main className="bg-white">
      <HeroSection />
      <ProductsSection products={products} />
      <AboutSection />
      <WhyChooseUsSection />
      <BlogSection posts={posts} />
    </main>
  );
}
