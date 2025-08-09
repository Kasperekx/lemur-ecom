'use client';

import { useCartStore } from '@/store/cartStore';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface CartIndicatorProps {
  className?: string;
}

export function CartIndicator({ className }: CartIndicatorProps) {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Link 
        href="/koszyk" 
        className={cn('relative flex items-center justify-center cursor-pointer', className)}
      >
        <ShoppingCart className="h-6 w-6" />
      </Link>
    );
  }

  return (
    <Link 
      href="/koszyk" 
      className={cn('relative flex items-center justify-center cursor-pointer', className)}
    >
      <ShoppingCart className="h-6 w-6" />
      {totalItems > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-secondary pointer-events-none"
        >
          {totalItems}
        </Badge>
      )}
    </Link>
  );
}
