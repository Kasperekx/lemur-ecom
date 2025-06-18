'use client';

import { useRef, useEffect, useState } from 'react';
import { useCursorPosition } from './useCursorPosition';

interface MagneticConfig {
  strength: number;
  maxDistance: number;
  restoreSpeed: number;
  scale: number;
}

const defaultConfig: MagneticConfig = {
  strength: 0.3,
  maxDistance: 100,
  restoreSpeed: 0.15,
  scale: 1.05,
};

export const useMagneticEffect = <T extends HTMLElement = HTMLElement>(
  config: Partial<MagneticConfig> = {}
) => {
  const elementRef = useRef<T>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const cursorPosition = useCursorPosition();
  const rafRef = useRef<number>();

  const finalConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(cursorPosition.x - elementCenterX, 2) +
          Math.pow(cursorPosition.y - elementCenterY, 2)
      );

      if (isHovered && distance < finalConfig.maxDistance) {
        const magnetStrength = Math.max(
          0,
          1 - distance / finalConfig.maxDistance
        );

        const moveX =
          (cursorPosition.x - elementCenterX) *
          finalConfig.strength *
          magnetStrength;
        const moveY =
          (cursorPosition.y - elementCenterY) *
          finalConfig.strength *
          magnetStrength;

        setTransform({
          x: moveX,
          y: moveY,
          scale: 1 + (finalConfig.scale - 1) * magnetStrength,
        });
      } else {
        // Restore to original position
        setTransform((prev) => ({
          x: prev.x * (1 - finalConfig.restoreSpeed),
          y: prev.y * (1 - finalConfig.restoreSpeed),
          scale: 1 + (prev.scale - 1) * (1 - finalConfig.restoreSpeed),
        }));
      }
    });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [cursorPosition, isHovered, finalConfig]);

  return {
    ref: elementRef,
    style: {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
      transition: isHovered
        ? 'none'
        : 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
    },
    isHovered,
  };
};
