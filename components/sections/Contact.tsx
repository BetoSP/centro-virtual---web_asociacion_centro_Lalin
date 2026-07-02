import Eyebrow from '@/components/ui/Eyebrow';
import { getSiteConfig } from '@/lib/microsite-data';
import type { ContactContent } from '@/types/content';

export default function Contact({ content }: { content: ContactContent }) {
  const siteConfig = getSiteConfig();

  return (
    <section id="contacto" className="py-20 md:py-28">
      <div className="max-w-container mx-auto px-7">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl mb-6">{content.title}</h2>
            <p className="text-granite max-w-xl leading-8 mb-10">{content.description}</p>
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
            </div>
          </div>

          <div className="rounded-xl border border-line bg-white p-8 shadow-sm">
            <h3 className="font-display text-2xl mb-4">{content.sideTitle}</h3>
            <p className="text-sm text-granite leading-6 mb-6">{content.sideDescription}</p>
            <div className="space-y-3 text-sm text-granite">
              <p>
                <span className="text-ink">{content.attentionHoursLabel}:</span> {siteConfig.attentionHours}
              </p>
              <p>
                <span className="text-ink">{content.addressLabel}:</span> {siteConfig.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
