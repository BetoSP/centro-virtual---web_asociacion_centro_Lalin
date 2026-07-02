import Image from 'next/image';
import Eyebrow from '@/components/ui/Eyebrow';
import type { AboutContent } from '@/types/content';

export default function About({ content }: { content: AboutContent }) {
  return (
    <section id="historia" className="py-20 md:py-28">
      <div className="max-w-container mx-auto px-7">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center mb-14">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl mb-6">{content.title}</h2>
            <div className="space-y-5 max-w-xl">
              {content.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-granite leading-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div>
            <div className="relative h-[380px] rounded-xl overflow-hidden shadow-lg bg-paper-2">
              <Image src={content.image} alt={content.imageAlt} fill className="object-cover" />
            </div>
            <p className="text-sm text-granite mt-4">{content.imageCaption}</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {content.features.map((item, index) => (
            <div
              key={item.title}
              className="bg-white rounded-xl border border-line p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="font-mono text-sm font-bold text-gold mb-4 block">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-granite leading-6">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
