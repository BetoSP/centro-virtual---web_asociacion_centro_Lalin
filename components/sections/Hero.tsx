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

  const slide = content.slides[activeSlide];

  return (
    <>
      <section id="inicio" className="relative">
        <div className="relative overflow-hidden max-w-container mx-auto px-7 py-28 md:py-36">
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

            <div className="mt-8 inline-flex items-center gap-4 rounded-full border border-green/40 bg-green/25 backdrop-blur-md px-5 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-2">
                {slide.captionEyebrow}
              </span>
              <span className="text-sm text-white/90">{slide.caption}</span>
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

      <div className="relative -mt-11 z-20">
        <div className="max-w-container mx-auto px-7">
          <div className="rounded-frame border border-white/20 bg-[rgba(8,23,32,0.62)] backdrop-blur-[16px] shadow-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between text-white overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {content.quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-bold px-7 py-5 border-b md:border-b-0 md:border-r border-white/25 hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link
              href={content.primaryCta.href}
              className="text-sm font-bold px-7 py-5 bg-gold-2 text-black hover:bg-white transition-colors text-center md:ml-auto"
            >
              Asociate al Centro →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
