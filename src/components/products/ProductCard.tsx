'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { WPProduct } from '@/types/wordpress';
import Link from 'next/link';
import { createSlug } from '@/utils/strings';
import { ArrowRight, Tag } from 'lucide-react';

interface ProductCardProps {
  product: WPProduct;
  priority?: boolean;
  index?: number;
}

const ProductCard = ({
  product,
  priority = false,
  index = 0,
}: ProductCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-50, 50], [5, -5]);
  const rotateY = useTransform(mouseX, [-50, 50], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const resetMouse = () => {
    x.set(0);
    y.set(0);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
    }).format(price);
  };

  const category =
    product.categories && product.categories.length > 0
      ? product.categories[0].name
      : 'Produkt';

  // Truncate description to ensure consistent card height
  const truncateDescription = (text: string, maxLength = 120) => {
    if (!text) return '';
    text = text.replace(/<[^>]*>/g, '');
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const shortDescription = truncateDescription(product.short_description || '');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 80,
                damping: 20,
                delay: index * 0.1,
              },
            }
          : {}
      }
      className="h-full group"
    >
      <Link
        href={`/produkty/${createSlug(product.name)}`}
        className="h-full block"
        onClick={(e) => e.currentTarget.blur()}
      >
        <motion.div
          className="relative h-full rounded-xl overflow-hidden bg-white flex flex-col shadow-sm
            transition-all duration-500 hover:shadow-xl border border-gray-100 group"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            resetMouse();
          }}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
              className="bg-secondary/10 px-3 py-1 rounded-full flex items-center gap-1"
            >
              <Tag className="h-3 w-3 text-secondary" />
              <span className="text-xs font-medium text-secondary">
                {category}
              </span>
            </motion.div>
          </div>

          {/* Product Image Container */}
          <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Image */}
            <motion.div className="relative w-full h-full z-10">
              <Image
                src={product.images[0]?.src || '/placeholder.png'}
                alt={product.name}
                fill
                className="object-contain p-6 transition-all duration-500 group-hover:scale-105"
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                priority={priority}
              />
            </motion.div>

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/60 to-white/0 z-20 opacity-0"
              animate={{
                opacity: isHovered ? 0.5 : 0,
                left: isHovered ? '100%' : '-100%',
              }}
              transition={{ duration: 0.8 }}
            />
          </div>

          {/* Content Section */}
          <div
            className="flex-1 p-6 flex flex-col justify-between z-10"
            style={{ transform: 'translateZ(10px)' }}
          >
            {/* Product Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 line-clamp-2 group-hover:text-secondary transition-colors duration-300">
                {product.name}
              </h3>

              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {shortDescription}
              </p>
            </div>

            {/* Footer with Price and CTA */}
            <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-100">
              <span className="font-bold text-lg text-gray-900">
                {formatPrice(Number(product.price) || 0)}
              </span>

              <motion.div
                className="flex items-center gap-1.5 text-secondary font-medium text-sm"
                animate={{ x: isHovered ? 3 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative">
                  Zobacz szczegóły
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
              </motion.div>
            </div>
          </div>

          {/* Bottom accent line with gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary/40 via-blue-400/60 to-secondary/40 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
