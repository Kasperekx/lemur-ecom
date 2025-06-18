'use client';

import { useEffect, useState, useRef } from 'react';

export interface CursorPosition {
  x: number;
  y: number;
}

export const useCursorPosition = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setPosition({
          x: e.clientX,
          y: e.clientY,
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return position;
};
