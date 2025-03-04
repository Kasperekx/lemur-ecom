'use client';

import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export function AddToCartButton({
  product,
  className = '',
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setTimeout(() => {
      setIsAdding(false);
      setShowPopup(true);
    }, 500);
  };

  return (
    <>
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
        className={`bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-lg 
                   transition-colors duration-200 flex items-center justify-center gap-2 ${className}`}
        id={`add-to-cart-${product.id}`}
      >
        <ShoppingCart
          className={`w-5 h-5 ${isAdding ? 'animate-bounce' : ''}`}
        />
        <span>Dodaj do koszyka</span>
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
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center"
            >
              {/* Popup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gray-900 rounded-xl p-6 w-full max-w-md m-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="bg-green-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Produkt dodany do koszyka!
                  </h3>
                  <p className="text-gray-400 mb-6">{product.name}</p>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => {
                        router.push('/koszyk');
                        setShowPopup(false);
                      }}
                      className="bg-secondary hover:bg-secondary/90 text-white px-4 py-3 rounded-lg 
                               flex items-center justify-center gap-2 transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Przejdź do koszyka
                    </button>

                    <button
                      onClick={() => setShowPopup(false)}
                      className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg 
                               flex items-center justify-center gap-2 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                      Kontynuuj zakupy
                    </button>
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
