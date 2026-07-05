'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { HeroContent } from '@/types/content';

const SLIDE_INTERVAL_MS = 4200;

export default function Hero({ content }: { content: HeroContent }) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (content.slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % content.slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [content.slides.length]);

  return (
    <>
      <section id="inicio" className="relative">
        <div className="relative overflow-hidden max-w-container mx-auto px-7 pt-14 pb-10">
          {content.slides.map((s, index) => (
            <Image
              key={s.image}
              src={s.image}
              alt={s.imageAlt}
              fill
              priority={index === 0}
              className="object-cover transition-opacity duration-[1100ms]"
              style={{ opacity: index === activeSlide ? 1 : 0 }}
            />
          ))}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(100deg, rgba(8,23,32,0.93) 25%, rgba(8,23,32,0.5) 80%)',
            }}
          />
          <div className="relative z-10 w-full text-white">
            <h1
              className="font-display leading-[1.1] mb-4 max-w-xl text-white"
              style={{ fontSize: '45px' }}
            >
              {content.title}
            </h1>
            <p
              className="text-[15px] leading-[1.7] text-white/90 text-justify"
              style={{ maxWidth: '390px' }}
            >
              {content.description.split('\n').map((line, index, lines) => (
                <span key={line}>
                  {line}
                  {index < lines.length - 1 && <br />}
                </span>
              ))}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <div
                className="inline-flex items-center gap-2 rounded-[20px] px-4 py-2 backdrop-blur-[8px]"
                style={{
                  backgroundColor: 'rgba(63,107,74,0.55)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: '#7FBE8C' }}
                />
                <span className="grid">
                  {content.slides.map((s, index) => (
                    <span
                      key={s.image}
                      className="[grid-area:1/1] font-mono text-[10px] uppercase tracking-[0.25em] text-white whitespace-nowrap transition-opacity duration-[1100ms]"
                      style={{ opacity: index === activeSlide ? 1 : 0 }}
                      aria-hidden={index !== activeSlide}
                    >
                      {s.caption}
                    </span>
                  ))}
                </span>
              </div>
              <Link
                href={content.primaryCta.href}
                className="inline-block rounded-full bg-gold-2 text-ink px-6 py-2 text-sm font-bold hover:bg-gold transition-colors whitespace-nowrap dark:bg-paper dark:text-gold-2"
              >
                {content.primaryCta.label} →
              </Link>
            </div>

            {content.slides.length > 1 && (
              <div className="mt-6 flex items-center gap-2">
                {content.slides.map((s, index) => (
                  <button
                    key={s.image}
                    type="button"
                    aria-label={`Ver imagen ${index + 1}`}
                    onClick={() => setActiveSlide(index)}
                    className="h-[7px] rounded-full transition-all"
                    style={{
                      width: index === activeSlide ? '18px' : '7px',
                      backgroundColor: index === activeSlide ? '#D9B23C' : 'rgba(255,255,255,0.4)',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
