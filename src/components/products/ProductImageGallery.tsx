'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function ProductImageGallery({ images }: { images: { src: string }[] }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage]?.src || '/placeholder.png'}
          alt="Product image"
          fill
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={image.src}
            onClick={() => setSelectedImage(index)}
            className={cn(
              'relative aspect-square rounded-md overflow-hidden',
              selectedImage === index && 'ring-2 ring-secondary'
            )}
          >
            <Image
              src={image.src}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
