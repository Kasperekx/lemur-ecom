'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { WPProduct } from '@/types/wordpress';
import Link from 'next/link';
import { createSlug } from '@/utils/strings';

interface ProductCardProps {
  product: WPProduct;
  priority?: boolean;
}

const ProductCard = ({ product, priority = false }: ProductCardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 8; // Max 8 degrees
    const rotateY = ((x - centerX) / centerX) * 8; // Max 8 degrees

    setRotateX(-rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
    }).format(price);
  };

  return (
    <div className="group">
      <Link href={`/produkty/${createSlug(product.name)}`}>
        <motion.div
          className="rounded-xl border border-gray-200 shadow-sm p-6 h-full flex flex-col 
            bg-white transition-all duration-300 hover:shadow-xl cursor-pointer"
          style={{ perspective: 1000 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{
            rotateX,
            rotateY,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 30,
            },
          }}
        >
          <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg group">
            <Image
              src={product.images[0]?.src || '/placeholder.png'}
              alt={product.name}
              fill
              className="object-cover rounded-lg transition-transform duration-500 
                group-hover:scale-105"
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              priority={priority}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
              opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] 
              transition-all duration-1000"
            />
          </div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            <span className="text-primary font-medium">
              {formatPrice(Number(product.price) || 0)}
            </span>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              {product.name}
            </h3>
            <div
              className="prose prose-sm max-w-none text-gray-600"
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            />
          </div>
        </motion.div>
      </Link>
    </div>
  );
};
export default ProductCard;
