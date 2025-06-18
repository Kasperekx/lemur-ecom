'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface LiquidButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({
  href,
  children,
  icon = <Phone size={16} />,
  className,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const {
    ref: magneticElementRef,
    style: magneticStyle,
    isHovered,
  } = useMagneticEffect<HTMLAnchorElement>({
    strength: prefersReducedMotion ? 0 : 0.3,
    maxDistance: 100,
    restoreSpeed: 0.15,
    scale: 1.05,
  });

  return (
    <Link
      ref={magneticElementRef}
      href={href}
      className={`relative group ${className}`}
      style={prefersReducedMotion ? {} : magneticStyle}
    >
      {/* Main button background */}
      <motion.div
        className="relative px-6 py-3 bg-secondary text-white rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg overflow-hidden"
        initial={{ borderRadius: 12 }}
        animate={{
          borderRadius: isHovered ? [12, 20, 16, 24, 18] : 12,
        }}
        transition={{
          duration: isHovered ? 0.8 : 0.3,
          ease: 'easeInOut',
          times: isHovered ? [0, 0.2, 0.4, 0.6, 1] : [0, 1],
        }}
      >
        {/* Liquid background effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary to-secondary/90"
          initial={{ x: '-100%', scaleX: 0 }}
          animate={{
            x: isHovered ? '0%' : '-100%',
            scaleX: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%', skewX: -20 }}
          animate={{
            x: isHovered ? '200%' : '-100%',
          }}
          transition={{
            duration: 0.8,
            ease: 'easeInOut',
            delay: isHovered ? 0.1 : 0,
          }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-white/30 via-transparent to-transparent"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1.5 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />

        {/* Icon */}
        <motion.div
          className="relative z-10"
          animate={{
            rotate: isHovered ? [0, -10, 10, 0] : 0,
            scale: isHovered ? [1, 1.1, 0.9, 1] : 1,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut',
          }}
        >
          {icon}
        </motion.div>

        {/* Text */}
        <motion.span
          className="relative z-10"
          animate={{
            y: isHovered ? [0, -2, 1, 0] : 0,
          }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
        >
          {children}
        </motion.span>

        {/* Bubble effects */}
        <motion.div
          className="absolute top-2 right-2 w-1 h-1 bg-white/40 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? [0, 1, 0] : 0,
            opacity: isHovered ? [0, 1, 0] : 0,
            y: isHovered ? [0, -10] : 0,
          }}
          transition={{
            duration: 1,
            ease: 'easeOut',
            delay: 0.2,
          }}
        />

        <motion.div
          className="absolute top-3 right-6 w-0.5 h-0.5 bg-white/30 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? [0, 1, 0] : 0,
            opacity: isHovered ? [0, 1, 0] : 0,
            y: isHovered ? [0, -15] : 0,
          }}
          transition={{
            duration: 1.2,
            ease: 'easeOut',
            delay: 0.4,
          }}
        />
      </motion.div>

      {/* Shadow effect */}
      <motion.div
        className="absolute inset-0 bg-secondary/30 rounded-xl"
        initial={{ scale: 0.8, opacity: 0, y: 0 }}
        animate={{
          scale: isHovered ? 1.1 : 0.8,
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 8 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ filter: 'blur(8px)', zIndex: -1 }}
      />
    </Link>
  );
};
