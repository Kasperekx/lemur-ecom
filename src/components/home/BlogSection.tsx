'use client';

import Link from 'next/link';
import { BlogCard } from '@/components/blog/BlogCard';
import { WPPost } from '@/types/wordpress';
import { Button } from '@/components/ui/button';
import { Feather, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogSectionProps {
  posts: WPPost[];
}

export function BlogSection({ posts }: BlogSectionProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-secondary/5 to-slate-50/80"></div>

        {/* Subtle patterns */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(0,0,0,0.2) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        ></div>

        {/* Decorative gradients */}
        <motion.div
          className="absolute top-20 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-secondary/10 to-transparent rounded-full filter blur-3xl"
          animate={{
            x: [0, 30, 0],
            scale: [1, 1.05, 1],
            transition: { duration: 25, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-primary/10 to-transparent rounded-full filter blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
            scale: [1, 1.03, 1],
            transition: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-flex items-center gap-2 text-secondary bg-secondary/10 px-3 py-1 rounded-full text-xs font-medium mb-4">
              <Feather className="h-4 w-4" />
              Wiedza i Porady
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Odkryj naszego{' '}
              <span className="bg-gradient-to-r from-secondary to-blue-500 bg-clip-text text-transparent">
                Bloga
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              Najnowsze artykuły, porady ekspertów i ciekawostki ze świata
              weterynarii i opieki nad zwierzętami.
            </p>
          </motion.div>

          {/* Blog Cards */}
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  custom={index}
                  variants={cardVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="text-center text-gray-500 mb-16 p-10 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm"
            >
              <Feather className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium">
                Brak wpisów do wyświetlenia.
              </p>
              <p className="text-gray-400 mt-2">
                Zapraszamy wkrótce po nowe artykuły.
              </p>
            </motion.div>
          )}

          {/* Call-to-action */}
          <motion.div variants={itemVariants} className="text-center">
            <Link href="/blog">
              <Button
                size="lg"
                className="h-12 px-8 bg-secondary hover:bg-secondary/90 text-white rounded-md shadow-lg transition-all duration-300 group flex items-center gap-2 mx-auto"
              >
                Zobacz wszystkie wpisy
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
