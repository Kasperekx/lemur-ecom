import { getPostBySlug } from '@/lib/getWordpressData';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';

import { Clock, Tag } from 'lucide-react';
import Image from 'next/image';
import { AutoBreadcrumbs } from '@/components/ui/auto-breadcrumbs';

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const post = await getPostBySlug(params.slug);

    if (!post) {
      notFound();
    }

    const wordCount = post.content.rendered.split(' ').length;
    const readingTime = Math.ceil(wordCount / 300);

    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <AutoBreadcrumbs />
          <article>
            <h1
              className="text-3xl font-bold text-gray-900 mb-6"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-8 pb-8 border-b">
              <div className="flex items-center gap-2">
                <span className="font-medium">Data publikacji:</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Czas czytania:</span>
                <span>{readingTime} min</span>
              </div>

              {post._embedded?.['wp:term']?.[0] && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  <span>Tagi:</span>
                  <div className="flex gap-2">
                    {post._embedded['wp:term'][0].map(
                      (term: { id: number; name: string }) => (
                        <span key={term.id} className="text-primary">
                          {term.name}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Featured Image */}
            {post._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
              <div className="relative aspect-[16/9] mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt={post.title.rendered}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>
            )}

            {/* Content */}
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </article>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }
}
