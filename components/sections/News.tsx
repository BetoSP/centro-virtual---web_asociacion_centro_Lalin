import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import type { NewsContent } from '@/types/content';

export default function News({ content }: { content: NewsContent }) {
  return (
    <section id="novedades" className="py-20 md:py-28 bg-paper-2">
      <div className="max-w-container mx-auto px-7">
        <div className="max-w-2xl mb-12">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl mb-4">{content.title}</h2>
          <p className="text-granite leading-7">{content.description}</p>
        </div>

        <div className="grid gap-x-8 gap-y-10 md:grid-cols-3">
          {content.items.map((news) => (
            <Link key={news.id} href={news.href} className="group">
              <article className="h-full rounded-xl border border-line bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold mb-3">
                  {news.date}
                </p>
                <h3 className="font-display text-xl mb-3 group-hover:text-gold transition-colors">
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
