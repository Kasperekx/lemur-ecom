'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProductSort } from '@/components/products/ProductSort';
import { Package, ChevronDown, Search, Filter } from 'lucide-react';
import { WPProduct } from '@/types/wordpress';
import { SortOption } from '@/hooks/useSortProducts';

interface ProductsPageClientProps {
  products: WPProduct[];
}

export default function ProductsPageClient({
  products,
}: ProductsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  // Handle search input changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          (product.short_description &&
            product.short_description
              .toLowerCase()
              .includes(query.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      {/* Main Content Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        {/* Search & Filters Panel */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-6 mb-10 border border-gray-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* Search Bar */}
            <div className="relative flex-grow max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Wyszukaj produkt..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all"
              />
            </div>

            {/* Mobile Filters Toggle */}
            <button
              className="md:hidden flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 py-3 px-4 rounded-xl transition-colors"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="h-5 w-5 text-gray-700" />
              <span>Filtry i sortowanie</span>
              <ChevronDown
                className={`h-4 w-4 text-gray-600 transition-transform duration-300 ${
                  showMobileFilters ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Desktop Filters */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                <Package className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium">
                  {filteredProducts.length} produktów
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Filters (Collapsible) */}
          <motion.div
            className="md:hidden mt-4"
            initial={false}
            animate={{
              height: showMobileFilters ? 'auto' : 0,
              opacity: showMobileFilters ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pt-4 border-t border-gray-100">
              {/* Mobile filters content here */}
              <div className="grid grid-cols-2 gap-4">
                {/* Category filter example */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategoria
                  </label>
                  <select className="w-full rounded-lg border border-gray-200 py-2 px-3">
                    <option value="">Wszystkie kategorie</option>
                    <option value="diagnostic">Diagnostyka</option>
                    <option value="instruments">Instrumenty</option>
                    <option value="accessories">Akcesoria</option>
                  </select>
                </div>

                {/* Price filter example */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cena
                  </label>
                  <select className="w-full rounded-lg border border-gray-200 py-2 px-3">
                    <option value="">Dowolna cena</option>
                    <option value="0-100">0 - 100 zł</option>
                    <option value="100-500">100 - 500 zł</option>
                    <option value="500+">Powyżej 500 zł</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Wszystkie produkty
              </h2>
              <span className="text-gray-500 text-sm">
                Znaleziono {filteredProducts.length} produktów
              </span>
            </div>
            <div className="w-20 h-1 bg-secondary mt-2 rounded-full"></div>
          </motion.div>

          {/* Sort Controls */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="hidden md:block">
                <div className="flex space-x-2">
                  <button className="px-4 py-2 text-sm bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors">
                    Wszystkie
                  </button>
                  <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Nowości
                  </button>
                  <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    Bestsellery
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-3">
                  Sortuj według:
                </span>
                <select
                  className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-secondary outline-none"
                  defaultValue="newest"
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  value={sortOption}
                >
                  <option value="newest">Najnowsze</option>
                  <option value="price-asc">Cena: od najniższej</option>
                  <option value="price-desc">Cena: od najwyższej</option>
                  <option value="name-asc">Nazwa: A-Z</option>
                  <option value="name-desc">Nazwa: Z-A</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <ProductSort products={filteredProducts} sortOption={sortOption} />
        </motion.div>
      </div>

      {/* Floating Back-to-Top Button */}
      <motion.button
        className="fixed bottom-8 right-8 bg-secondary text-white p-3 rounded-full shadow-lg z-50 hover:bg-secondary/90 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronDown className="h-5 w-5 transform rotate-180" />
      </motion.button>
    </>
  );
}
