'use client';

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { WPProduct } from '@/types/wordpress';
import { useEffect, useState } from 'react';

interface HeaderProductProps {
  title: string;
  description: string;
  products: WPProduct[];
  breadcrumbItems: Array<{ label: string; href: string }>;
}

export function ProductHeader({
  title,
  description,
  products,
  breadcrumbItems,
}: HeaderProductProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden h-[500px]">
      <div
        className="absolute inset-0 h-[150%] -top-[25%]"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat w-full h-full"
          style={{
            backgroundImage: 'url("/products-bg.jpg")',
          }}
        />
        {/* Ciemna nakładka */}
        <div className="absolute inset-0 bg-gray-900/40" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent" />

      <div className="relative h-full">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-4xl">
            <div className="w-20 h-1 bg-secondary mb-8 rounded-full" />
            <h1 className="text-5xl font-bold mb-6 text-white">{title}</h1>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl leading-relaxed">
              {description}
            </p>

            <div className="flex items-center space-x-4">
              <Breadcrumbs
                items={breadcrumbItems}
                className="text-white bg-secondary/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
              />

              <div className="text-sm text-gray-200 flex items-center gap-4 ml-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  <span>{products.length} produktow +</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  <span>Najwyższa jakość</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
