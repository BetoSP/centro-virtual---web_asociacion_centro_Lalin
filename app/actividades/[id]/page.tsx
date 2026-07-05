import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackLink from '@/components/ui/BackLink';
import { getActivityItems, getActivityById, getSiteConfig } from '@/lib/microsite-data';
import { whatsappHref } from '@/lib/whatsapp';

export function generateStaticParams() {
  return getActivityItems().map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const activity = getActivityById(id);
  return { title: activity?.title ?? 'Actividad' };
}

export default async function ActividadDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activity = getActivityById(id);
  if (!activity) notFound();

  const participateHref = whatsappHref(getSiteConfig().whatsapp);

  return (
    <>
      <Header />
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-7">
          <div className="rounded-frame bg-paper-warm border border-line shadow-frame p-7 md:p-10">
            <BackLink label="← Volver a actividades" fallbackHref="/actividades" />

            <div className="relative h-[220px] rounded-card-lg overflow-hidden mb-6">
              <Image src={activity.image} alt={activity.title} fill className="object-cover" />
            </div>

            <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-gold font-semibold mb-2">
              {activity.label}
              {activity.dateLabel ? ` · ${activity.dateLabel}` : ''}
            </p>
            <h1 className="font-display text-2xl md:text-3xl text-atlantic dark:text-[var(--ink)] mb-4">{activity.title}</h1>
            <p className="text-[14px] leading-[1.75] text-granite max-w-[600px] mb-6">
              {activity.description}
            </p>

            <a
              href={participateHref ?? '#'}
              target={participateHref ? '_blank' : undefined}
              rel={participateHref ? 'noopener noreferrer' : undefined}
              aria-disabled={!participateHref}
              className={`inline-block text-[13px] font-bold text-[#141414] bg-gold-2 rounded-btn px-6 py-3 ${
                participateHref ? '' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              Quiero participar
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
