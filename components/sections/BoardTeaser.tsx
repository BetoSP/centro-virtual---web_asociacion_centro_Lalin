import Link from 'next/link';
import type { BoardTeaserContent } from '@/types/content';

const CIRCLE_COLORS = ['#0E2A38', '#3F6B4A', '#B4502E', '#C9A227'];

export default function BoardTeaser({ content }: { content: BoardTeaserContent }) {
  return (
    <section className="py-12 text-center">
      <div className="max-w-container mx-auto px-7 flex flex-col items-center gap-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-terracotta">
          {content.eyebrow}
        </p>
        <h2 className="font-display font-semibold text-[22px] text-atlantic -mt-1">{content.title}</h2>
        <div className="flex items-center">
          {CIRCLE_COLORS.map((color, index) => (
            <span
              key={color}
              className="w-11 h-11 rounded-full border-[3px] border-paper-warm"
              style={{ backgroundColor: color, marginLeft: index === 0 ? 0 : '-14px' }}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="text-[13.5px] text-granite max-w-[360px]">{content.text}</p>
        <Link href={content.linkHref} className="text-sm font-bold text-atlantic hover:text-terracotta transition-colors">
          {content.linkLabel}
        </Link>
      </div>
    </section>
  );
}
