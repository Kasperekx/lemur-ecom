import { getLatestBlogPosts, getProducts } from '@/lib/getWordpressData';
import HeroSection from '@/components/home/HeroSection';
import ProductsSection from '@/components/home/ProductsSection';
import AboutSection from '@/components/home/AboutSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import { BlogSection } from '@/components/home/BlogSection';

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
