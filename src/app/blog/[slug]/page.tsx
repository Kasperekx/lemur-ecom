import { getPostBySlug, getBlogPosts } from '@/lib/getWordpressData';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { Clock, Tag, Calendar, ArrowLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { AutoBreadcrumbs } from '@/components/ui/auto-breadcrumbs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WPPost } from '@/types/wordpress';

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

    // Get recent posts for the "Related Posts" section
    const allPosts = await getBlogPosts();
    const relatedPosts = allPosts
      .filter((p: WPPost) => p.id !== post.id)
      .slice(0, 3);

    const wordCount = post.content.rendered.split(' ').length;
    const readingTime = Math.ceil(wordCount / 300);

    return (
      <main className="min-h-screen bg-white">
        {/* Hero section with featured image */}
        <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
            <>
              <Image
                src={post._embedded['wp:featuredmedia'][0].source_url}
                alt={post.title.rendered}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-primary/50"></div>
          )}

          {/* Back to blog button */}
          <div className="absolute top-8 left-8 z-10">
            <Link href="/blog">
              <Button
                variant="outline"
                size="sm"
                className="gap-1 bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Powrót do bloga
              </Button>
            </Link>
          </div>
        </div>

        <div className="container max-w-4xl mx-auto px-4 -mt-24 relative z-10">
          {/* Card-like post header */}
          <div className="bg-white rounded-xl shadow-xl p-8 mb-12">
            <AutoBreadcrumbs className="mb-6 text-sm" />

            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-8 pb-8 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <span className="block text-xs text-gray-400">
                    Data publikacji
                  </span>
                  <time
                    dateTime={post.date}
                    className="font-medium text-gray-600"
                  >
                    {formatDate(post.date)}
                  </time>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="block text-xs text-gray-400">
                    Czas czytania
                  </span>
                  <span className="font-medium text-gray-600">
                    {readingTime} min
                  </span>
                </div>
              </div>

              {post._embedded?.['wp:term']?.[0] && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Tag className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <span className="block text-xs text-gray-400">Tagi</span>
                    <div className="flex flex-wrap gap-2">
                      {post._embedded['wp:term'][0].map(
                        (term: { id: number; name: string }) => (
                          <span key={term.id} className="text-primary">
                            {term.name}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <article>
            <div
              className="prose prose-lg max-w-none 
                prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-4 prose-headings:mt-8
                prose-h2:text-2xl prose-h3:text-xl 
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80
                prose-img:rounded-lg prose-img:shadow-md 
                prose-ul:text-gray-600 prose-ol:text-gray-600
                prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-secondary/50 prose-blockquote:bg-gray-50 prose-blockquote:rounded-r-lg prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-gray-600
              "
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />

            {/* Author box */}
            {post._embedded?.['author']?.[0] && (
              <div className="mt-16 mb-16 bg-gray-50 rounded-xl p-8 border border-gray-100">
                <div className="flex items-center gap-4">
                  {post._embedded['author'][0].avatar_urls?.['96'] && (
                    <Image
                      src={post._embedded['author'][0].avatar_urls['96']}
                      alt={post._embedded['author'][0].name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {post._embedded['author'][0].name}
                    </h3>
                    {post._embedded['author'][0].description && (
                      <p className="text-gray-600 mt-1">
                        {post._embedded['author'][0].description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </article>

          {/* Related posts section */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 mb-16">
              <h2 className="text-2xl font-bold mb-8 text-gray-900 flex items-center">
                <span className="mr-2">Zobacz również</span>
                <div className="h-px bg-gray-200 flex-grow ml-4"></div>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost: WPPost) => (
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    key={relatedPost.id}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-md h-full flex flex-col">
                      {relatedPost._embedded?.['wp:featuredmedia']?.[0]
                        ?.source_url && (
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <Image
                            src={
                              relatedPost._embedded['wp:featuredmedia'][0]
                                .source_url
                            }
                            alt={relatedPost.title.rendered}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 300px"
                          />
                        </div>
                      )}
                      <div className="p-4 flex-grow flex flex-col">
                        <h3
                          className="font-semibold text-gray-900 mb-2 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: relatedPost.title.rendered,
                          }}
                        />
                        <time className="text-xs text-gray-500 mb-2">
                          {formatDate(relatedPost.date)}
                        </time>
                        <div className="mt-auto pt-2 flex items-center text-sm text-primary font-medium">
                          <span>Czytaj więcej</span>
                          <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Bottom navigation */}
          <div className="flex justify-between items-center pb-16 pt-8 border-t border-gray-100">
            <Link href="/blog">
              <Button variant="outline" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Powrót do bloga
              </Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" className="gap-1">
                Strona główna
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }
}
