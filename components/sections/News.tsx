import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import BackLink from '@/components/ui/BackLink';
import type { NewsContent } from '@/types/content';

export default function News({ content }: { content: NewsContent }) {
  return (
    <section id="novedades">
      <div className="max-w-container mx-auto px-7 py-20 border-t border-line">
        <BackLink label="← Volver al inicio" fallbackHref="#inicio" />
        <div className="max-w-2xl mb-12">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl mb-4">{content.title}</h2>
          <p className="text-granite leading-7">{content.description}</p>
        </div>

        <div className="grid gap-x-8 gap-y-10 md:grid-cols-3">
          {content.items.map((news) => (
            <Link key={news.id} href={news.href} className="group">
              <article className="h-full rounded-xl border border-line bg-white dark:bg-[#13272F] p-6 shadow-sm hover:shadow-md transition-shadow">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold mb-3">
                  {news.date}
                </p>
                <h3 className="font-display text-xl mb-3 text-gold group-hover:text-atlantic dark:group-hover:text-[var(--ink)] transition-colors">
                  {news.title}
                </h3>
                <p className="text-sm text-granite leading-6">{news.excerpt}</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
