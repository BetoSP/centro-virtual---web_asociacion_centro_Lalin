import Link from 'next/link';
import NewsletterMiniForm from '@/components/forms/NewsletterMiniForm';
import type { JoinUsContent } from '@/types/content';

export default function JoinUs({ content }: { content: JoinUsContent }) {
  return (
    <section id="participar" className="py-20 md:py-28 bg-header-dark text-white text-center">
      <div className="max-w-container mx-auto px-7">
        <h2 className="font-display text-3xl md:text-4xl text-white mb-4">{content.title}</h2>
        <p className="text-white max-w-xl mx-auto leading-8 mb-8">{content.description}</p>

        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-10 text-sm">
          {content.benefits.map((benefit) => (
            <li key={benefit} className="text-white">
              {benefit}
            </li>
          ))}
        </ul>

        <Link
          href="/asociate"
          className="inline-block mb-10 rounded-btn bg-gold-2 text-black px-8 py-4 text-sm font-bold shadow-sm hover:bg-gold transition-colors"
        >
          Asociate al Centro
        </Link>

        <NewsletterMiniForm content={content} className="max-w-md mx-auto" />
      </div>
    </section>
  );
}
