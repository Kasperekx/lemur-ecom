import { getBlogPosts } from '@/lib/getWordpressData';
import { BlogCard } from '@/components/blog/BlogCard';

import { WPPost } from '@/types/wordpress';
import { AutoBreadcrumbs } from '@/components/ui/auto-breadcrumbs';

export default async function BlogPage() {
  const posts: WPPost[] = await getBlogPosts();

  return (
    <main className="min-h-screen bg-white">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-12">
          <AutoBreadcrumbs className="mb-8" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Poznaj najnowsze trendy, porady i ciekawostki ze świata zwierząt
            domowych.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts &&
            posts.map((post: WPPost) => <BlogCard key={post.id} post={post} />)}
        </div>{' '}
      </div>
    </main>
  );
}
