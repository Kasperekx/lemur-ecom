'use client';

import { useCartStore } from '@/store/cartStore';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

export function CartIndicator() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Link href="/koszyk" className="relative">
        <ShoppingCart className="h-6 w-6" />
      </Link>
    );
  }

  return (
    <Link href="/koszyk" className="relative">
      <ShoppingCart className="h-6 w-6 text-white" />
      {totalItems > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-secondary"
        >
          {totalItems}
        </Badge>
      )}
    </Link>
  );
}
