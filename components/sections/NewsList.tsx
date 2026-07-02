import Image from 'next/image';
import Link from 'next/link';
import BackLink from '@/components/ui/BackLink';
import Eyebrow from '@/components/ui/Eyebrow';
import type { NewsPageContent } from '@/types/content';

export default function NewsList({ content }: { content: NewsPageContent }) {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-container mx-auto px-7">
        <BackLink label="← Volver al inicio" fallbackHref="/" />
        <div className="max-w-2xl mb-12">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className="font-display text-3xl md:text-4xl mb-4">{content.title}</h1>
          <p className="text-granite leading-7">{content.description}</p>
        </div>

        <div className="grid gap-x-8 gap-y-10 md:grid-cols-3">
          {content.items.map((news) => (
            <Link key={news.id} href={news.href} className="group">
              <article className="h-full rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                {news.img && (
                  <div className="relative h-[130px]">
                    <Image src={news.img} alt="" fill className="object-cover saturate-[.9]" />
                  </div>
                )}
                <div className="p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#B9B3A4] mb-1.5">
                    {news.date}
                  </p>
                  <h2 className="font-display text-[15px] font-semibold text-atlantic mb-1.5 leading-tight group-hover:text-gold transition-colors">
                    {news.title}
                  </h2>
                  <p className="text-[12.5px] text-granite leading-[1.55]">{news.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
