import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { WPPost } from '@/types/wordpress';

interface BlogCardProps {
  post: WPPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const stripHtml = (html: string) => {
    return html.replace(/<\/?[^>]+(>|$)/g, '');
  };

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        <Image
          src={
            post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
            '/placeholder-blog.jpg'
          }
          alt={stripHtml(post.title.rendered)}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-200"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post._embedded?.author?.[0] && (
            <div className="flex items-center gap-2">
              {post._embedded.author[0].avatar_urls?.['48'] && (
                <Image
                  src={post._embedded.author[0].avatar_urls['48']}
                  alt={post._embedded.author[0].name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span>{post._embedded.author[0].name}</span>
            </div>
          )}
        </div>

        <h3
          className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        <p className="text-gray-600 line-clamp-2 mb-4">
          {stripHtml(post.excerpt.rendered)}
        </p>

        <div className="flex items-center text-primary font-medium">
          Czytaj więcej
          <svg
            className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
