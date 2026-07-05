import BackLink from '@/components/ui/BackLink';
import Eyebrow from '@/components/ui/Eyebrow';
import ContactForm from '@/components/forms/ContactForm';
import { getSiteConfig } from '@/lib/microsite-data';
import type { ContactPageContent } from '@/types/content';

export default function ContactPage({ content }: { content: ContactPageContent }) {
  const siteConfig = getSiteConfig();

  return (
    <section className="py-20">
      <div className="max-w-container mx-auto px-7">
        <BackLink label="← Volver al inicio" fallbackHref="/" />
        <div className="max-w-2xl mb-12">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className="font-display text-3xl md:text-4xl mb-4">{content.title}</h1>
          <p className="text-granite leading-7">{content.description}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] items-start">
          <div className="rounded-xl border border-line bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl mb-4">{content.sideTitle}</h2>
            <p className="text-sm text-granite leading-6 mb-6">{content.sideDescription}</p>
            <ContactForm content={content} />
          </div>

          <div className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="border-t border-line pt-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold mb-2">
                  {content.emailLabel}
                </p>
                <p className="text-sm text-ink">{siteConfig.email}</p>
                <p className="text-sm text-ink">{siteConfig.infoEmail}</p>
              </div>
              <div className="border-t border-line pt-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold mb-2">
                  {content.whatsappLabel}
                </p>
                <p className="text-sm text-ink">{siteConfig.whatsapp}</p>
              </div>
              <div className="border-t border-line pt-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold mb-2">
                  {content.addressLabel}
                </p>
                <p className="text-sm text-ink">{siteConfig.address}</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-line shadow-sm h-72">
              <iframe
                title={content.addressLabel}
                src={content.mapEmbedSrc}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
