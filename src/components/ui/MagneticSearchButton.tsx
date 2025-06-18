'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MagneticSearchButtonProps {
  onClick: () => void;
  isActive?: boolean;
  className?: string;
}

export const MagneticSearchButton: React.FC<MagneticSearchButtonProps> = ({
  onClick,
  isActive = false,
  className,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const {
    ref: magneticElementRef,
    style: magneticStyle,
    isHovered,
  } = useMagneticEffect<HTMLButtonElement>({
    strength: prefersReducedMotion ? 0 : 0.4,
    maxDistance: 60,
    restoreSpeed: 0.2,
    scale: 1.15,
  });

  return (
    <motion.button
      ref={magneticElementRef}
      onClick={onClick}
      className={`relative p-3 rounded-full transition-all duration-300 group ${className}`}
      style={prefersReducedMotion ? {} : magneticStyle}
      aria-label="Search"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: 'spring',
        damping: 15,
        stiffness: 200,
        delay: 0.3,
      }}
    >
      {/* Background morphing effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: isHovered || isActive ? 1 : 0.8,
          opacity: isHovered || isActive ? 1 : 0.7,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-secondary/30 via-secondary/10 to-transparent rounded-full"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: isHovered ? 1.4 : 0.5,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      {/* Border effect */}
      <motion.div
        className="absolute inset-0 border-2 border-secondary/30 rounded-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: isActive ? 1 : 0.9,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Icon container */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        animate={{
          rotate: isHovered ? 90 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            color:
              isHovered || isActive
                ? 'hsl(var(--secondary))'
                : 'hsl(120, 5%, 45%)',
          }}
          transition={{ duration: 0.2 }}
        >
          <Search size={18} className="drop-shadow-sm" />
        </motion.div>
      </motion.div>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 bg-secondary/20 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          isActive
            ? {
                scale: [0, 1.2, 1],
                opacity: [0, 0.6, 0],
              }
            : {}
        }
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />

      {/* Pulse effect */}
      {isActive && (
        <motion.div
          className="absolute inset-0 border border-secondary/40 rounded-full"
          initial={{ scale: 1, opacity: 1 }}
          animate={{
            scale: [1, 1.3],
            opacity: [1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      )}
    </motion.button>
  );
};
