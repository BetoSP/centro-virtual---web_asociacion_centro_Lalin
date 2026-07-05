'use client';

import { useState } from 'react';
import Image from 'next/image';
import BackLink from '@/components/ui/BackLink';
import Eyebrow from '@/components/ui/Eyebrow';
import type { GalleryContent } from '@/types/content';

export default function Gallery({ content }: { content: GalleryContent }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex !== null ? content.images[activeIndex] : null;

  const showPrev = () => setActiveIndex((i) => (i === null ? null : (i - 1 + content.images.length) % content.images.length));
  const showNext = () => setActiveIndex((i) => (i === null ? null : (i + 1) % content.images.length));

  return (
    <section className="py-20">
      <div className="max-w-container mx-auto px-7">
        <BackLink label="← Volver al inicio" fallbackHref="/" />
        <div className="max-w-2xl mb-12">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className="font-display text-3xl md:text-4xl mb-4">{content.title}</h1>
          <p className="text-granite leading-7">{content.description}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="relative h-64 rounded-xl overflow-hidden bg-paper-2 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <Image src={image.src} alt={image.alt} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setActiveIndex(null)}
            className="absolute top-6 right-6 text-white text-3xl leading-none"
          >
            ×
          </button>
          <button
            type="button"
            aria-label="Anterior"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-4 md:left-8 text-white text-4xl leading-none"
          >
            ‹
          </button>
          <div className="relative w-full max-w-3xl h-[70vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={activeImage.src} alt={activeImage.alt} fill className="object-contain" />
          </div>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-4 md:right-8 text-white text-4xl leading-none"
          >
            ›
          </button>
          <p className="absolute bottom-6 text-white/90 text-sm">{activeImage.caption}</p>
        </div>
      )}
    </section>
  );
}
