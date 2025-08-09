'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDebounce } from 'use-debounce';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ArrowRight, Loader2 } from 'lucide-react';
import { createSlug } from '@/utils/strings';
import { WPProduct } from '@/types/wordpress';
import { MagneticNavLink } from '@/components/ui/MagneticNavLink';
import { MagneticLogo } from '@/components/ui/MagneticLogo';
import { MagneticSearchButton } from '@/components/ui/MagneticSearchButton';
import { LiquidButton } from '@/components/ui/LiquidButton';

type NavItem = {
  ID: number;
  title: string;
  slug: string;
};

type NavbarProps = {
  navItems: NavItem[];
};

const Navbar: React.FC<NavbarProps> = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [searchResults, setSearchResults] = useState<WPProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const cacheRef = useRef<Map<string, WPProduct[]>>(new Map());
  const pathName = usePathname();
  const router = useRouter();
  const isHomePage = pathName === '/';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setSearchActive(false);
    setSearchQuery('');
    setSearchResults([]);
  }, [pathName]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (debouncedSearchQuery.length >= 2) {
      setIsSearching(true);

      const cached = cacheRef.current.get(debouncedSearchQuery);
      if (cached) {
        setSearchResults(cached);
        setIsSearching(false);
        return;
      }

      const controller = new AbortController();
      const run = async () => {
        try {
          const res = await fetch(
            `/api/search-products?q=${encodeURIComponent(
              debouncedSearchQuery
            )}`,
            { signal: controller.signal }
          );
          const data: WPProduct[] = await res.json();
          setSearchResults(Array.isArray(data) ? data : []);
          cacheRef.current.set(
            debouncedSearchQuery,
            Array.isArray(data) ? data : []
          );
        } catch (err: any) {
          if (err?.name !== 'AbortError') {
            console.error('Search error:', err);
          }
        } finally {
          setIsSearching(false);
        }
      };
      run();
      return () => controller.abort();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim().length > 0) {
      router.push(`/produkty?search=${encodeURIComponent(searchQuery)}`);
      setSearchActive(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <nav
        className={`
        ${
          isHomePage ? 'fixed' : 'relative'
        } top-0 z-50 w-full transition-all duration-500 ${
          hasScrolled || pathName !== '/' || isOpen
            ? 'bg-white/95 backdrop-blur-md py-6 border-b border-gray-200 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <MagneticLogo
              href="/"
              logoText="etdesign"
              className="relative z-50"
            />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <MagneticNavLink
                  key={item.ID}
                  href={item.slug === 'strona-glowna' ? '/' : `/${item.slug}`}
                  isActive={
                    (item.slug === 'strona-glowna' && pathName === '/') ||
                    (item.slug !== 'strona-glowna' &&
                      pathName === `/${item.slug}`)
                  }
                >
                  {item.title}
                </MagneticNavLink>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-2">
              {/* Search Button */}
              <MagneticSearchButton
                onClick={() => setSearchActive(!searchActive)}
                isActive={searchActive}
              />

              {/* Cart Button */}
              {/* <div className="relative group">
                <Link
                  href="/koszyk"
                  className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ShoppingBag size={18} />
                  <span className="absolute -top-1 -right-1 bg-secondary text-[10px] text-white rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-sm">
                    3
                  </span>
                </Link> */}

              {/* Mini Cart Preview */}
              {/* <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg backdrop-blur-md p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="text-sm font-medium text-gray-800 mb-2">
                    Twój koszyk (3)
                  </div>
                  <div className="divide-y divide-gray-100">
                    <div className="py-2 flex gap-2">
                      <div className="w-10 h-10 bg-gray-100 rounded"></div>
                      <div className="flex-1">
                        <div className="text-xs text-gray-800">Produkt 1</div>
                        <div className="text-xs text-gray-500">1 × 120 zł</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between">
                    <span className="text-xs text-gray-800">Suma:</span>
                    <span className="text-xs font-medium text-secondary">
                      360 zł
                    </span>
                  </div>
                  <Link
                    href="/koszyk"
                    className="mt-3 block w-full py-2 bg-secondary text-white text-center rounded-lg text-xs font-medium hover:bg-secondary/90 transition-colors shadow-sm"
                  >
                    Przejdź do koszyka
                  </Link>
                </div>
              </div> */}

              {/* Contact Button */}
              <LiquidButton href="/kontakt" className="ml-2">
                Kontakt
              </LiquidButton>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 lg:hidden">
              {/* <Link
                href="/koszyk"
                className="relative text-gray-500 hover:text-gray-800"
              >
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 bg-secondary text-[10px] text-white rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-sm">
                  3
                </span>
              </Link> */}

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50 p-1 rounded-md hover:bg-gray-100 text-gray-600 transition-colors"
                aria-label="Toggle Menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar - Fixed Height Issues */}
        <AnimatePresence>
          {searchActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-md z-30"
            >
              <div className="container mx-auto px-4 py-4">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Szukaj produktów..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/30"
                    value={searchQuery}
                    onChange={handleSearch}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-secondary/80 transition-colors"
                  >
                    {isSearching ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Search size={18} />
                    )}
                  </button>
                </form>

                {/* Search Results - Fixed Positioning */}
                {searchResults.length > 0 && (
                  <div className="relative mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-40 overflow-hidden">
                    <div className="max-h-[400px] overflow-y-auto py-2 scroll-smooth">
                      <div className="sticky top-0 px-4 py-3 bg-gray-50 border-b border-gray-200 backdrop-blur-sm">
                        <p className="text-sm font-medium text-gray-700 flex items-center justify-between">
                          <span>
                            Znaleziono {searchResults.length} produktów
                          </span>
                          <button
                            onClick={() => setSearchActive(false)}
                            className="text-gray-400 hover:text-gray-700 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </p>
                      </div>

                      <div className="p-2">
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            href={`/produkty/${createSlug(product.name)}`}
                            className="block rounded-lg hover:bg-gray-50 transition-colors group"
                            onClick={() => setSearchActive(false)}
                          >
                            <div className="flex items-center gap-4 p-3">
                              {product.images && product.images.length > 0 ? (
                                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200 group-hover:border-secondary/30 transition-colors">
                                  <Image
                                    src={product.images[0].src}
                                    alt={product.name}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                                  <span className="text-gray-400 text-xs">
                                    Brak zdjęcia
                                  </span>
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-gray-800 font-medium line-clamp-2 group-hover:text-secondary transition-colors">
                                  {product.name}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <p className="text-secondary font-bold">
                                    {product.price} zł
                                  </p>
                                  {product.regular_price !== product.price && (
                                    <p className="text-sm text-gray-500 line-through">
                                      {product.regular_price} zł
                                    </p>
                                  )}
                                </div>
                              </div>
                              <span className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-secondary/10 flex items-center justify-center transition-colors">
                                <ArrowRight
                                  size={16}
                                  className="text-gray-400 group-hover:text-secondary"
                                />
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <div className="sticky bottom-0 px-4 py-3 bg-gray-50 border-t border-gray-200 backdrop-blur-sm">
                        <Link
                          href="/produkty"
                          className="block w-full py-2 bg-white border border-gray-200 hover:border-secondary/30 text-center rounded-lg text-sm font-medium text-gray-700 hover:text-secondary transition-colors group"
                          onClick={() => setSearchActive(false)}
                        >
                          <span className="flex items-center justify-center gap-1">
                            Zobacz wszystkie wyniki
                            <ArrowRight
                              size={14}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* No results state */}
                {searchQuery.length >= 2 &&
                  searchResults.length === 0 &&
                  !isSearching && (
                    <div className="mt-3 bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                        <Search size={24} className="text-gray-400" />
                      </div>
                      <p className="text-gray-700 font-medium mb-2">
                        Nie znaleziono produktów dla &quot;{searchQuery}&quot;
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        Spróbuj innej frazy lub przeglądaj wszystkie produkty
                      </p>
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => setSearchQuery('')}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                        >
                          Wyczyść
                        </button>
                        <Link
                          href="/produkty"
                          className="px-4 py-2 bg-secondary text-white text-sm font-medium rounded-lg hover:bg-secondary/90 transition-colors"
                          onClick={() => setSearchActive(false)}
                        >
                          Wszystkie produkty
                        </Link>
                      </div>
                    </div>
                  )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden bg-gradient-to-b from-white to-gray-50 backdrop-blur-md overflow-hidden"
          >
            <motion.div
              className="h-full pt-24 pb-8 px-4 flex flex-col overflow-y-auto"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <div className="container mx-auto px-4">
                {/* Account Section */}
                {/* <motion.div
                  variants={childVariants}
                  className="mb-8 border-b border-gray-200 pb-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center shadow-sm">
                      <User size={24} className="text-gray-600" />
                    </div>
                    <div>
                      <div className="text-gray-800 font-medium">Witaj!</div>
                      <div className="text-sm text-gray-500">
                        Zaloguj się lub zarejestruj
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href="/logowanie"
                      className="flex-1 py-2.5 border border-gray-300 text-gray-700 text-center rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm"
                    >
                      Logowanie
                    </Link>
                    <Link
                      href="/rejestracja"
                      className="flex-1 py-2.5 bg-secondary text-white text-center rounded-lg text-sm font-medium hover:bg-secondary/90 shadow-sm"
                    >
                      Rejestracja
                    </Link>
                  </div>
                </motion.div> */}

                {/* Navigation Links */}
                <motion.div variants={childVariants} className="space-y-1 mb-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.ID}
                      href={
                        item.slug === 'strona-glowna' ? '/' : `/${item.slug}`
                      }
                      className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
                        (item.slug === 'strona-glowna' && pathName === '/') ||
                        (item.slug !== 'strona-glowna' &&
                          pathName === `/${item.slug}`)
                          ? 'bg-secondary/10 text-secondary font-medium'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </motion.div>

                {/* Search */}
                <motion.div variants={childVariants} className="mb-8">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Szukaj produktów..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary/30 shadow-sm"
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                      <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary transition-colors"
                      >
                        <Search size={18} />
                      </button>
                    </div>
                  </form>

                  {/* Mobile search results */}
                  {searchQuery.length >= 2 && searchResults.length > 0 && (
                    <div className="mt-4 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                      <div className="max-h-60 overflow-y-auto">
                        <div className="divide-y divide-gray-100">
                          {searchResults.slice(0, 5).map((product) => (
                            <Link
                              key={product.id}
                              href={`/produkty/${createSlug(product.name)}`}
                              className="block p-3 hover:bg-gray-50 transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              <div className="flex items-center gap-3">
                                {product.images && product.images.length > 0 ? (
                                  <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                                    <Image
                                      src={product.images[0].src}
                                      alt={product.name}
                                      width={40}
                                      height={40}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                                    <span className="text-gray-400 text-xs">
                                      Brak
                                    </span>
                                  </div>
                                )}
                                <div>
                                  <h4 className="text-sm font-medium text-gray-800 line-clamp-1">
                                    {product.name}
                                  </h4>
                                  <p className="text-xs text-secondary font-semibold">
                                    {product.price} zł
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                        <Link
                          href={`/produkty?search=${encodeURIComponent(
                            searchQuery
                          )}`}
                          className="text-sm text-secondary hover:underline flex items-center justify-center gap-1"
                          onClick={() => setIsOpen(false)}
                        >
                          Zobacz wszystkie wyniki
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Contact Button */}
                <motion.div variants={childVariants} className="mt-auto py-4">
                  <Link
                    href="/kontakt"
                    className="block w-full py-3.5 bg-secondary text-white text-center rounded-lg font-medium hover:bg-secondary/90 transition-colors shadow-sm"
                  >
                    Skontaktuj się z nami
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
