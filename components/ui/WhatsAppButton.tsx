import { getSiteConfig } from '@/lib/microsite-data';
import { whatsappHref } from '@/lib/whatsapp';

export default function WhatsAppButton() {
  const siteConfig = getSiteConfig();
  const href = whatsappHref(siteConfig.whatsapp);

  return (
    <a
      href={href ?? '#'}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      aria-label="Escribinos por WhatsApp"
      title={href ? 'Escribinos por WhatsApp' : `WhatsApp (${siteConfig.whatsapp})`}
      aria-disabled={!href}
      className={`fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform ${
        href ? 'bg-[#25D366] hover:scale-105' : 'bg-granite-light cursor-not-allowed'
      }`}
    >
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.51 3.63 1.4 5.14L2 22l5.09-1.5a9.87 9.87 0 0 0 4.95 1.33c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.06c-1.6 0-3.13-.43-4.46-1.24l-.32-.19-3.02.89.9-2.94-.21-.3a8.13 8.13 0 0 1-1.32-4.37c0-4.5 3.66-8.16 8.16-8.16s8.16 3.66 8.16 8.16-3.66 8.15-8.16 8.15Zm4.48-6.12c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42-.14 0-.3-.02-.46-.02s-.42.06-.64.3c-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
      </svg>
    </a>
  );
}
