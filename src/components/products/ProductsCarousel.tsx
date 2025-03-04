'use client';

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import ProductCard from './ProductCard';
import { WPProduct } from '@/types/wordpress';
type ProductsCarouselProps = {
  products: WPProduct[];
};

const ProductsCarousel = ({ products }: ProductsCarouselProps) => {
  return (
    <Carousel className="relative">
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem
            className="md:basis-1/2 lg:basis-1/3 p-4"
            key={product.id}
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className="hidden md:flex"
        aria-label="View previous products"
      />
      <CarouselNext
        className="hidden md:flex"
        aria-label="View next products"
      />
    </Carousel>
  );
};

export default ProductsCarousel;
