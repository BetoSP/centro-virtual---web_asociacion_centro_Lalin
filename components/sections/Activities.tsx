import Image from 'next/image';
import Link from 'next/link';
import Eyebrow from '@/components/ui/Eyebrow';
import type { ActivitiesContent } from '@/types/content';

export default function Activities({ content }: { content: ActivitiesContent }) {
  return (
    <section id="actividades" className="py-20 md:py-28">
      <div className="max-w-container mx-auto px-7">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl">{content.title}</h2>
          </div>
          <Link
            href={content.viewAllHref}
            className="inline-flex items-center text-sm text-ink underline underline-offset-4 decoration-line hover:text-gold hover:decoration-gold transition-colors"
          >
            {content.viewAllLabel}
          </Link>
        </div>

        <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
          {content.items.map((activity) => (
            <Link key={activity.id} href={activity.href} className="group">
              <article className="flex h-full flex-col rounded-xl border border-line bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative h-56 bg-paper-2 overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold">
                    {activity.label}
                  </span>
                  <h3 className="font-display text-xl">{activity.title}</h3>
                  <p className="text-sm text-granite leading-6 flex-1">{activity.description}</p>
                  <span className="text-xs text-granite">{activity.date}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
