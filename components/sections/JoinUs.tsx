import Link from 'next/link';
import NewsletterMiniForm from '@/components/forms/NewsletterMiniForm';
import BackLink from '@/components/ui/BackLink';
import type { JoinUsContent } from '@/types/content';

export default function JoinUs({ content }: { content: JoinUsContent }) {
  return (
    <section id="participar">
      <div className="max-w-container mx-auto px-7 py-20 md:py-28 border-t border-line">
        <BackLink label="← Volver al inicio" fallbackHref="#inicio" />
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl mb-4 text-atlantic">{content.title}</h2>
          <p className="text-granite leading-8 mb-8">{content.description}</p>

          <ul className="flex flex-wrap gap-x-8 gap-y-2 mb-10 text-sm">
            {content.benefits.map((benefit) => (
              <li key={benefit} className="text-ink">
                {benefit}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-4">
            <NewsletterMiniForm content={content} className="w-full sm:w-auto sm:max-w-sm" dark={false} />
            <Link
              href="/asociate"
              className="inline-block rounded-btn bg-gold-2 text-black px-6 py-3 text-sm font-bold shadow-sm hover:bg-gold transition-colors whitespace-nowrap"
            >
              Asociate al Centro
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
