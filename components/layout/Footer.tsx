import Image from 'next/image';
import Link from 'next/link';
import { getFooterNav, getSiteConfig, getHomeContent } from '@/lib/microsite-data';
import SocialIcons from '@/components/ui/SocialIcons';
import NewsletterMiniForm from '@/components/forms/NewsletterMiniForm';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { footerNavSections, footerContactTitle } = getFooterNav();
  const siteConfig = getSiteConfig();
  const homeContent = getHomeContent();

  return (
    <footer className="bg-header-dark text-white pt-16 pb-10">
      <div className="max-w-container mx-auto px-7">
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
