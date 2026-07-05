import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Eyebrow from '@/components/ui/Eyebrow';
import { getNotFoundContent } from '@/lib/microsite-data';

export default function NotFound() {
  const content = getNotFoundContent();

  return (
    <>
      <Header />
      <section className="py-32">
        <div className="max-w-container mx-auto px-7 text-center">
          <Eyebrow center>{content.eyebrow}</Eyebrow>
          <h1 className="font-display text-3xl md:text-4xl mb-4">{content.title}</h1>
          <p className="text-granite leading-7 mb-8">{content.description}</p>
          <Link href="/" className="font-bold text-atlantic dark:text-[var(--ink)] hover:text-terracotta transition-colors">
            {content.backHomeLabel}
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
