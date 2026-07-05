import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackLink from '@/components/ui/BackLink';
import { getNewsItemsFull, getNewsById } from '@/lib/microsite-data';

export function generateStaticParams() {
  return getNewsItemsFull().map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const news = getNewsById(id);
  return { title: news?.title ?? 'Novedad' };
}

export default async function NovedadDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = getNewsById(id);
  if (!news) notFound();

  return (
    <>
      <Header />
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-7">
          <div className="rounded-frame bg-paper-warm border border-line shadow-frame p-7 md:p-10">
            <BackLink label="← Volver a novedades" fallbackHref="/novedades" />

            <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#B9B3A4] mb-2">
              {news.date}
            </p>
            <h1 className="font-display text-2xl md:text-3xl text-atlantic dark:text-[var(--ink)] mb-4">{news.title}</h1>
            <p className="text-[14px] leading-[1.75] text-granite max-w-[600px]">{news.excerpt}</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
