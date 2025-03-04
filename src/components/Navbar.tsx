'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { CartIndicator } from './cart/CartIndicator';

type NavItem = {
  ID: number;
  title: string;
  slug: string;
};

type NavbarProps = {
  navItems: NavItem[];
};

const NavLink = ({
  href,
  children,
  className,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  isActive: boolean;
}) => (
  <Link
    href={href}
    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200
      ${isActive ? 'text-secondary' : 'text-gray-300 hover:text-white'}
      ${className}
    `}
  >
    {children}
    {isActive && (
      <motion.div
        layoutId="navbar-active"
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    )}
  </Link>
);

const Navbar: React.FC<NavbarProps> = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathName = usePathname();
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
  }, [pathName]);

  return (
    <>
      <nav
        className={`${
          isHomePage ? 'fixed' : 'relative'
        } top-0 z-50 w-full transition-all duration-300  ${
          hasScrolled || pathName !== '/' || isOpen
            ? 'bg-primary/95 backdrop-blur-sm shadow-lg py-4 border-b-2 border-secondary'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="relative z-50 text-2xl font-bold text-white hover:text-secondary transition-colors"
            >
              Vetdesign
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  className={
                    item.slug === 'kontakt'
                      ? 'px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors duration-200 text-sm font-medium'
                      : ''
                  }
                  key={item.ID}
                  href={item.slug === 'strona-glowna' ? '/' : `/${item.slug}`}
                  isActive={pathName === item.slug}
                >
                  {item.title}
                </NavLink>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-50 p-2 text-white hover:text-secondary transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex items-center gap-4">
              <CartIndicator />
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden bg-primary"
          >
            <div className="h-screen pt-24">
              <div className="container mx-auto px-4">
                <div className="flex flex-col space-y-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.ID}
                      href={
                        item.slug === 'strona-glowna' ? '/' : `/${item.slug}`
                      }
                      className={`text-lg font-medium transition-colors duration-200 ${
                        pathName === item.slug
                          ? 'text-secondary'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}

                  <Link
                    href="/contact"
                    className="inline-block px-6 py-3 bg-secondary text-white text-center 
                      rounded-lg hover:bg-secondary/90 transition-colors duration-200"
                  >
                    Kontakt
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
