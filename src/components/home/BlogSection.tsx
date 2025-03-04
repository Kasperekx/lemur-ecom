import Link from 'next/link';
import { BlogCard } from '@/components/blog/BlogCard';
import { WPPost } from '@/types/wordpress';
import { Button } from '@/components/ui/button';

interface BlogSectionProps {
  posts: WPPost[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Najnowsze wpisy na blogu
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Poznaj najnowsze trendy, porady i ciekawostki ze świata zwierząt
            domowych
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="default">
            <Link href="/blog">Zobacz wszystkie wpisy</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
