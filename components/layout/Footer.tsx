import Image from 'next/image';
import Link from 'next/link';
import { getFooterNav, getSiteConfig, getHomeContent } from '@/lib/microsite-data';
import SocialIcons from '@/components/ui/SocialIcons';
import NewsletterMiniForm from '@/components/forms/NewsletterMiniForm';
import { whatsappHref } from '@/lib/whatsapp';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { footerNavSections, footerContactTitle } = getFooterNav();
  const siteConfig = getSiteConfig();
  const homeContent = getHomeContent();
  const whatsappLink = whatsappHref(siteConfig.whatsapp);

  return (
    <footer>
      <div className="max-w-container mx-auto px-7 bg-header-dark text-white pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12">
          {footerNavSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-mono text-[11px] tracking-[0.24em] uppercase text-white/60 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link href={link.href} className="text-white/80 hover:text-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.24em] uppercase text-white/60 mb-4">
              {footerContactTitle}
            </h4>
            <ul className="space-y-3 text-sm mb-5">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="text-white/80 hover:text-gold transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-white/80">{siteConfig.address}</li>
              <li>
                <a
                  href={whatsappLink ?? '#'}
                  target={whatsappLink ? '_blank' : undefined}
                  rel={whatsappLink ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 text-white/80 hover:text-gold transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="#25D366" className="w-8 h-8 shrink-0">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.51 3.63 1.4 5.14L2 22l5.09-1.5a9.87 9.87 0 0 0 4.95 1.33c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.06c-1.6 0-3.13-.43-4.46-1.24l-.32-.19-3.02.89.9-2.94-.21-.3a8.13 8.13 0 0 1-1.32-4.37c0-4.5 3.66-8.16 8.16-8.16s8.16 3.66 8.16 8.16-3.66 8.15-8.16 8.15Zm4.48-6.12c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42-.14 0-.3-.02-.46-.02s-.42.06-.64.3c-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
                  </svg>
                  {siteConfig.whatsapp}
                </a>
              </li>
            </ul>
            <SocialIcons socials={siteConfig.socials} className="text-white/80" />
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.24em] uppercase text-white/60 mb-4">
              Recibí novedades
            </h4>
            <NewsletterMiniForm content={homeContent.joinUs} />
          </div>
        </div>

        <div className="pt-4 pr-20 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/50">
          <span className="flex items-center gap-2">
            © {currentYear}
            <Image
              src={siteConfig.portalStrip.icon}
              alt="Galicia Migrante"
              width={20}
              height={20}
              className="rounded-full bg-white object-cover"
            />
            Galicia Migrante
          </span>
          <span className="flex items-center gap-1.5 text-white/60">
            <span>by</span>
            <span className="font-display font-semibold text-xs text-white/85 tracking-[0.02em]">
              PLM Systems
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
