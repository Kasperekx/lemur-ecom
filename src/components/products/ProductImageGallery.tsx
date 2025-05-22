'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

export function ProductImageGallery({ images }: { images: { src: string }[] }) {
  console.log('ProductImageGallery images prop:', images);
  const [selectedImage, setSelectedImage] = useState(0);
  const [open, setOpen] = useState(false);

  const lightboxSlides = images.map((image) => ({ src: image.src }));

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg aspect-square overflow-hidden max-h-[600px] cursor-pointer">
        <Image
          src={images[selectedImage]?.src || '/placeholder.png'}
          alt="Product image"
          className="object-contain"
          fill
          onClick={() => {
            console.log('Główny obraz kliknięty, otwieram lightbox');
            setOpen(true);
          }}
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

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={lightboxSlides}
        index={selectedImage}
        plugins={[Fullscreen, Zoom]}
        styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .9)' } }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 1.5,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: false,
        }}
      />
    </div>
  );
}
