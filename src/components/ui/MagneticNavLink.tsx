'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MagneticNavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isActive: boolean;
}

export const MagneticNavLink: React.FC<MagneticNavLinkProps> = ({
  href,
  children,
  className,
  isActive,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const {
    ref: magneticElementRef,
    style: magneticStyle,
    isHovered,
  } = useMagneticEffect<HTMLAnchorElement>({
    strength: prefersReducedMotion ? 0 : 0.4,
    maxDistance: 80,
    restoreSpeed: 0.2,
    scale: 1.1,
  });

  return (
    <Link
      ref={magneticElementRef}
      href={href}
      className={`relative px-4 py-3 text-md font-medium transition-all duration-300 group
        ${isActive ? 'text-secondary' : 'text-gray-400 hover:text-gray-900'}
        ${className}
      `}
      style={prefersReducedMotion ? {} : magneticStyle}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-secondary/5 to-secondary/10 rounded-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-secondary/20 via-transparent to-transparent rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Text content */}
      <span className="relative z-10 block">{children}</span>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="navbar-active"
          className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-secondary via-secondary/80 to-secondary rounded-full"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      )}

      {/* Hover effect border */}
      <motion.div
        className="absolute inset-0 border border-secondary/20 rounded-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isHovered && !isActive ? 1 : 0,
          scale: isHovered && !isActive ? 1 : 0.95,
        }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  );
};
