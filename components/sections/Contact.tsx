import Eyebrow from '@/components/ui/Eyebrow';
import BackLink from '@/components/ui/BackLink';
import { getSiteConfig } from '@/lib/microsite-data';
import type { ContactContent } from '@/types/content';

export default function Contact({ content }: { content: ContactContent }) {
  const siteConfig = getSiteConfig();

  return (
    <section id="contacto">
      <div className="max-w-container mx-auto px-7 py-20 md:py-28 border-t border-line">
        <BackLink label="← Volver al inicio" fallbackHref="#inicio" />
        <div>
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl mb-6 text-gold">{content.title}</h2>
          <p className="text-granite max-w-xl leading-8 mb-10">{content.description}</p>
          <div className="grid gap-6 sm:grid-cols-3">
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
        </div>
      </div>
    </section>
  );
}
