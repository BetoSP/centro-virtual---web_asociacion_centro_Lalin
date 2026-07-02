'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BackLink from '@/components/ui/BackLink';
import Eyebrow from '@/components/ui/Eyebrow';
import type { ActivitiesPageContent, ActivityType, NewsPreview } from '@/types/content';

export default function ActivitiesList({
  content,
  newsItems,
}: {
  content: ActivitiesPageContent;
  newsItems: NewsPreview[];
}) {
  const [filter, setFilter] = useState<ActivityType | 'all'>('all');
  const items = filter === 'all' ? content.items : content.items.filter((item) => item.type === filter);
  const typesInUse = Array.from(new Set(content.items.map((item) => item.type)));
  const upcomingEvents = content.items.filter((item) => item.kind === 'evento');

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-container mx-auto px-7">
        <BackLink label="← Volver al inicio" fallbackHref="/" />
        <div className="max-w-2xl mb-10">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className="font-display text-3xl md:text-4xl mb-4">{content.title}</h1>
          <p className="text-granite leading-7">{content.description}</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-black text-white border-black' : 'border-line text-ink hover:border-gold'
            }`}
          >
            {content.filterAllLabel}
          </button>
          {typesInUse.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === type ? 'bg-black text-white border-black' : 'border-line text-ink hover:border-gold'
              }`}
            >
              {content.typeLabels[type]}
            </button>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-6">
            {items.map((activity) => (
              <Link key={activity.id} href={activity.href} className="group">
                <article className="flex items-center gap-5 rounded-card-lg border border-line bg-white dark:bg-[#13272F] px-5 py-5 shadow-card hover:shadow-card-lg transition-shadow">
                  <div className="w-20 flex-shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-terracotta">
                    {activity.dateLabel ?? activity.date}
                  </div>
                  <div className="w-px self-stretch bg-line" />
                  <div className="relative w-14 h-14 flex-shrink-0 rounded-card-sm overflow-hidden bg-paper-2">
                    <Image src={activity.image} alt={activity.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                        {content.typeLabels[activity.type]}
                      </span>
                      {activity.kind && (
                        <span
                          className={`font-mono text-[10px] uppercase tracking-[0.18em] rounded-full px-2 py-0.5 ${
                            activity.kind === 'evento'
                              ? 'bg-terracotta/10 text-terracotta'
                              : 'bg-green/10 text-green'
                          }`}
                        >
                          {activity.kind === 'evento' ? 'Evento' : 'Actividad'}
                        </span>
                      )}
                    </div>
                    <h2 className="font-display text-lg leading-tight mt-1">{activity.title}</h2>
                    <p className="text-sm text-granite leading-6 mt-1">{activity.description}</p>
                  </div>
                  <span className="text-granite group-hover:text-gold transition-colors flex-shrink-0" aria-hidden="true">
                    →
                  </span>
                </article>
              </Link>
            ))}
          </div>

          <aside className="flex flex-col gap-10">
            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-granite mb-4">
                Próximos eventos
              </h3>
              <div className="flex flex-col gap-4">
                {upcomingEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={event.href}
                    className="relative block h-32 rounded-card-lg overflow-hidden group"
                  >
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-2">
                        {event.dateLabel ?? event.date}
                      </span>
                      <p className="text-white font-display text-base leading-tight">{event.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-granite mb-4">Novedades</h3>
              <div className="flex flex-col gap-4">
                {newsItems.map((news) => (
                  <Link key={news.id} href={news.href} className="block group">
                    <span className="text-xs text-granite">{news.date}</span>
                    <p className="font-display text-base leading-tight group-hover:text-gold transition-colors">
                      {news.title}
                    </p>
                    <span className="text-xs font-medium text-gold">Leer más →</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
