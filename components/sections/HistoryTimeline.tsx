import BackLink from '@/components/ui/BackLink';
import Eyebrow from '@/components/ui/Eyebrow';
import type { HistoryContent } from '@/types/content';

export default function HistoryTimeline({ content }: { content: HistoryContent }) {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-container mx-auto px-7">
        <BackLink label="← Volver al inicio" fallbackHref="/" />
        <div className="max-w-2xl mb-14">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className="font-display text-3xl md:text-4xl mb-4">{content.title}</h1>
          <p className="text-granite leading-7">{content.intro}</p>
        </div>

        <ol className="relative border-l border-line pl-8 space-y-10 max-w-2xl">
          {content.milestones.map((milestone, index) => (
            <li key={`${milestone.year}-${index}`} className="relative">
              <span
                className={
                  milestone.accent
                    ? 'absolute -left-[calc(2rem+7px)] top-0.5 w-3.5 h-3.5 rounded-full bg-gold-2'
                    : 'absolute -left-[calc(2rem+5px)] top-1 w-2.5 h-2.5 rounded-full bg-gold'
                }
              />
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold mb-2">
                {milestone.year}
              </p>
              <h2 className="font-display text-xl mb-2">{milestone.title}</h2>
              <p className="text-sm text-granite leading-6">{milestone.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
