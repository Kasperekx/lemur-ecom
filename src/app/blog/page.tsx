'use client';

import { getBlogPosts } from '@/lib/getWordpressData';
import { BlogCard } from '@/components/blog/BlogCard';
import { WPPost } from '@/types/wordpress';
import { AutoBreadcrumbs } from '@/components/ui/auto-breadcrumbs';
import { useState, useEffect } from 'react';
import { ChevronDown, Search, Tag, Calendar, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlogPage() {
  // This needs to be client component for filtering/search functionality,
  // but we'll still fetch data on the server (see below with useEffect)
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<WPPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // We'll add some state for potential category filtering
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);

  // This effect fetches the blog posts on component mount
  useEffect(() => {
    async function loadPosts() {
      try {
        const fetchedPosts = await getBlogPosts();
        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []);

  // Extract all categories from posts for our filter
  const allCategories = posts.reduce((categories: string[], post) => {
    const postCategories =
      post._embedded?.['wp:term']?.[0]?.map(
        (term: { name: string }) => term.name
      ) || [];

    postCategories.forEach((category: string) => {
      if (!categories.includes(category)) {
        categories.push(category);
      }
    });

    return categories;
  }, []);

  // Filter posts when search term changes
  useEffect(() => {
    filterPosts();
  }, [searchTerm, selectedCategory, posts]);

  const filterPosts = () => {
    let filtered = [...posts];

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((post) => {
        return (
          post.title.rendered.toLowerCase().includes(term) ||
          post.excerpt.rendered.toLowerCase().includes(term)
        );
      });
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((post) => {
        const postCategories =
          post._embedded?.['wp:term']?.[0]?.map(
            (term: { name: string }) => term.name
          ) || [];
        return postCategories.includes(selectedCategory);
      });
    }

    setFilteredPosts(filtered);
  };

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

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero section */}
      <div className="relative bg-secondary/5 py-24 mb-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(0,0,0,0.2) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-20 -left-20 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 15, 0],
            scale: [1, 1.05, 1],
            transition: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
        <motion.div
          className="absolute -bottom-32 -right-20 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
            transition: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
          }}
        />

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <AutoBreadcrumbs className="justify-center mb-6 text-sm" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Blog{' '}
              <span className="bg-gradient-to-r from-secondary to-blue-500 bg-clip-text text-transparent">
                Weterynaryjny
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Poznaj najnowsze trendy, porady i ciekawostki ze świata zwierząt
              domowych i diagnostyki weterynaryjnej.
            </p>

            {/* Search and filter controls */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Szukaj artykułów..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-secondary focus:ring-secondary"
                />
              </div>

              <div className="relative">
                <Button
                  variant="outline"
                  className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 hover:border-gray-300 w-full md:w-auto flex items-center gap-2"
                  onClick={() => setShowCategories(!showCategories)}
                >
                  <Tag className="h-4 w-4" />
                  <span>{selectedCategory || 'Wszystkie kategorie'}</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>

                <AnimatePresence>
                  {showCategories && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-10 mt-2 w-56 right-0 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden"
                    >
                      <div className="p-2">
                        <button
                          onClick={() => {
                            setSelectedCategory(null);
                            setShowCategories(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                            !selectedCategory
                              ? 'bg-secondary/10 text-secondary'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          Wszystkie kategorie
                        </button>
                        {allCategories.map((category) => (
                          <button
                            key={category}
                            onClick={() => {
                              setSelectedCategory(category);
                              setShowCategories(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                              selectedCategory === category
                                ? 'bg-secondary/10 text-secondary'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Blog posts grid */}
      <div className="container max-w-7xl mx-auto px-4 py-8 mb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          {/* Status indicators for search */}
          {searchTerm || selectedCategory ? (
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 mb-6"
            >
              <div className="text-gray-500">
                {searchTerm && (
                  <span>
                    Wyniki dla:{' '}
                    <span className="font-semibold text-gray-800">
                      &ldquo;{searchTerm}&rdquo;
                    </span>
                  </span>
                )}
                {selectedCategory && (
                  <span>
                    {' '}
                    w kategorii:{' '}
                    <span className="font-semibold text-gray-800">
                      {selectedCategory}
                    </span>
                  </span>
                )}
                {filteredPosts.length === 0 && <span> - Brak wyników</span>}
                {filteredPosts.length > 0 && (
                  <span>
                    {' '}
                    - Znaleziono {filteredPosts.length}{' '}
                    {filteredPosts.length === 1
                      ? 'artykuł'
                      : filteredPosts.length < 5
                      ? 'artykuły'
                      : 'artykułów'}
                  </span>
                )}
              </div>
              {(searchTerm || selectedCategory) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Wyczyść
                </Button>
              )}
            </motion.div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                <Rss className="h-4 w-4 text-secondary" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Wszystkie artykuły
              </h2>
              <div className="h-px bg-gray-200 flex-grow ml-4"></div>
              <div className="text-sm text-gray-500">
                {filteredPosts.length}{' '}
                {filteredPosts.length === 1
                  ? 'artykuł'
                  : filteredPosts.length < 5
                  ? 'artykuły'
                  : 'artykułów'}
              </div>
            </motion.div>
          )}

          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-xl overflow-hidden"
                >
                  <div className="bg-gray-200 aspect-[16/9] w-full"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post: WPPost, index) => (
                <motion.div
                  key={post.id}
                  custom={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-lg border border-gray-200 p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Brak wyników
              </h3>
              <p className="text-gray-500 mb-4">
                Nie znaleziono żadnych artykułów pasujących do podanych
                kryteriów.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                }}
              >
                Resetuj filtry
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Newsletter subscription - nice addition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: '-100px' }}
          className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-xl p-8 md:p-12 mt-16"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Zapisz się do newslettera
              </h3>
              <p className="text-gray-600 mb-6">
                Otrzymuj najnowsze artykuły, porady i informacje o produktach
                bezpośrednio na swoją skrzynkę.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Twój adres email"
                  className="sm:w-64 h-12 bg-white/80 backdrop-blur-sm"
                />
                <Button className="h-12 bg-secondary hover:bg-secondary/90">
                  Zapisz się
                </Button>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
                <Calendar className="h-10 w-10 text-secondary" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
