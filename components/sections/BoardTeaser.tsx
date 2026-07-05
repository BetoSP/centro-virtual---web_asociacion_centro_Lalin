import Image from 'next/image';
import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import BackLink from '@/components/ui/BackLink';
import type { BoardTeaserContent } from '@/types/content';

const CIRCLE_COLORS = ['#0E2A38', '#3F6B4A', '#B4502E', '#C9A227'];

export default function BoardTeaser({ content }: { content: BoardTeaserContent }) {
  return (
    <section id="directiva">
      <div className="max-w-container mx-auto px-7 py-20 border-t border-line">
        <BackLink label="← Volver al inicio" fallbackHref="#inicio" />
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl mb-6">{content.title}</h2>
            <div className="flex items-center mb-4">
              {CIRCLE_COLORS.map((color, index) => (
                <span
                  key={color}
                  className="w-11 h-11 rounded-full border-[3px] border-paper-warm"
                  style={{ backgroundColor: color, marginLeft: index === 0 ? 0 : '-14px' }}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="text-granite leading-8">{content.text}</p>
            <Link
              href={content.linkHref}
              className="inline-block mt-4 text-[13.5px] font-bold text-atlantic hover:text-terracotta transition-colors"
            >
              {content.linkLabel}
            </Link>
          </div>
          <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden shadow-sm bg-paper-2">
            <Image src={content.photo} alt="" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
