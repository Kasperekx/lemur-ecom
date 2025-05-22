'use client';

import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, ShoppingBag, ArrowRight, Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

interface AddToCartButtonProps {
  product: Product;
  children?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline' | 'subtle';
}

export function AddToCartButton({
  product,
  className = '',
  size = 'md',
  variant = 'primary',
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  // Check if product is already in cart
  const isInCart = items.some((item) => item.id === product.id);

  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => {
        setIsAdded(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  const handleClick = () => {
    if (isAdding || isAdded) return;

    setIsAdding(true);

    // Visual feedback animations
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });

      setIsAdding(false);
      setIsAdded(true);
      setShowPopup(true);
    }, 600);
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5',
    lg: 'px-6 py-3 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary:
      'bg-gradient-to-r from-secondary to-orange-500 hover:from-secondary/90 hover:to-orange-400 text-white shadow-md hover:shadow-lg shadow-secondary/10',
    outline:
      'bg-white border-2 border-secondary text-secondary hover:bg-secondary/5',
    subtle: 'bg-secondary/10 text-secondary hover:bg-secondary/20',
  };

  return (
    <>
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative overflow-hidden rounded transition-all duration-300 flex items-center justify-center gap-2 font-medium ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        disabled={isAdding}
        id={`add-to-cart-${product.id}`}
      >
        {/* Button background animation */}
        {isAdding && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-orange-300/20"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        )}

        {/* Icon animation */}
        <AnimatePresence mode="wait">
          {isAdded ? (
            <motion.div
              key="checkIcon"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="w-5 h-5 text-green-500"
            >
              <Check className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="cartIcon"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className={`w-5 h-5 ${isAdding ? 'animate-bounce' : ''}`}
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text animation */}
        <AnimatePresence mode="wait">
          {isAdded ? (
            <motion.span
              key="addedText"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Dodano do koszyka
            </motion.span>
          ) : isInCart ? (
            <motion.span
              key="againText"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Dodaj ponownie
            </motion.span>
          ) : (
            <motion.span
              key="addText"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Dodaj do koszyka
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {showPopup && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              {/* Popup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-2xl p-8 w-full max-w-md m-4 shadow-xl border border-gray-100"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="text-center">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                      }}
                    >
                      <Check className="w-10 h-10 text-green-500" />
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Produkt dodany!
                  </h3>

                  <div className="flex items-center justify-center gap-3 mb-6">
                    {product.image && (
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-col items-start text-left">
                      <p className="text-gray-800 font-medium">
                        {product.name}
                      </p>
                      <p className="text-orange-500 font-medium text-sm">
                        {new Intl.NumberFormat('pl-PL', {
                          style: 'currency',
                          currency: 'PLN',
                        }).format(product.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        router.push('/koszyk');
                        setShowPopup(false);
                      }}
                      className="bg-gradient-to-r from-secondary to-orange-500 hover:from-secondary/90 hover:to-orange-400 text-white px-4 py-3.5 rounded
                               shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20
                               flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      Przejdź do koszyka
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowPopup(false)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3.5 
                               flex items-center justify-center gap-2 transition-colors mt-2"
                    >
                      <ArrowRight className="w-5 h-5" />
                      Kontynuuj zakupy
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
