'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { splitText } from '@/utils/animations';

interface MagneticLogoProps {
  href: string;
  logoText: string;
  className?: string;
}

export const MagneticLogo: React.FC<MagneticLogoProps> = ({
  href,
  logoText,
  className,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const characters = splitText(logoText);

  const {
    ref: magneticElementRef,
    style: magneticStyle,
    isHovered,
  } = useMagneticEffect<HTMLAnchorElement>({
    strength: prefersReducedMotion ? 0 : 0.2,
    maxDistance: 120,
    restoreSpeed: 0.15,
    scale: 1.08,
  });

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      rotateX: -90,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
    hover: {
      y: -2,
      scale: 1.1,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 400,
      },
    },
  };

  return (
    <Link
      ref={magneticElementRef}
      href={href}
      className={`relative flex items-center gap-3 group ${className}`}
      style={prefersReducedMotion ? {} : magneticStyle}
    >
      {/* Logo Icon */}
      <motion.div
        className="relative w-10 h-10 bg-gradient-to-br from-secondary via-secondary/90 to-secondary/70 rounded-xl flex items-center justify-center overflow-hidden shadow-lg"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 200,
          delay: 0.1,
        }}
        whileHover={{
          scale: 1.1,
          rotate: 5,
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
        }}
      >
        {/* Background glow */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-transparent rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <motion.span
          className="text-white font-bold text-lg relative z-10"
          animate={{
            textShadow: isHovered
              ? '0 0 10px rgba(255,255,255,0.5)'
              : '0 0 0px rgba(255,255,255,0)',
          }}
          transition={{ duration: 0.3 }}
        >
          V
        </motion.span>
      </motion.div>

      {/* Animated Text */}
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex"
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            whileHover={prefersReducedMotion ? {} : 'hover'}
            className="text-xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent group-hover:from-secondary group-hover:via-secondary/80 group-hover:to-secondary/60 transition-all duration-500 inline-block origin-bottom"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d',
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-secondary/10 via-transparent to-transparent rounded-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.2 : 0.8,
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </Link>
  );
};
