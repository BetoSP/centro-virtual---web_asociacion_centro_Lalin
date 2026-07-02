import Link from 'next/link';
import type { FeaturedMilestoneContent } from '@/types/content';

export default function FeaturedMilestone({ content }: { content: FeaturedMilestoneContent }) {
  return (
    <section className="py-4 md:py-4 pt-2">
      <div className="max-w-container mx-auto px-7">
        <div
          className="max-w-4xl mx-auto rounded-card-lg text-white px-7 py-8 md:px-9 md:py-9"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #8B4A2E, #5E3220), repeating-conic-gradient(from 45deg, rgba(255,255,255,0.05) 0deg 90deg, transparent 90deg 180deg)',
            backgroundSize: 'cover, 26px 26px',
          }}
        >
          <div className="flex items-baseline gap-4 flex-wrap mb-3.5">
            <span className="font-display font-bold text-[44px] leading-none text-white/90">
              {content.year}
            </span>
            <div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#F0C878] mb-1">
                {content.eyebrow}
              </div>
              <div className="font-display font-semibold text-xl">{content.title}</div>
            </div>
          </div>
          <p className="text-[13.5px] leading-7 text-white/90 max-w-2xl mb-4">{content.paragraph}</p>
          <Link href={content.ctaHref} className="text-[12.5px] font-bold text-white underline underline-offset-4">
            {content.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
