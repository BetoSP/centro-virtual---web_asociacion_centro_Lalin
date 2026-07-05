import type { SiteConfig } from '@/types/content';

export const siteConfig: SiteConfig = {
  name: 'Centro Lalín, Agolada y Silleda',
  shortName: 'Centro Lalín, Agolada y Silleda',
  description:
    'Comunidad digital para disfrutar la cultura, las actividades y la historia gallega en Argentina.',
  tagline: 'Sede virtual',
  logo: '/imagenes/logo.jpg',
  email: 'secretaria@dezar.org',
  infoEmail: 'info@dezar.org',
  whatsapp: '+54 9 11 1234 5678',
  address: 'Moreno 1949, Ciudad Autónoma de Buenos Aires',
  foundingYear: 1982,
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/lalinagoladasilleda' },
    { label: 'Facebook', href: 'https://www.facebook.com/Dezaba' },
  ],
  portalStrip: {
    icon: '/imagenes/galicia-migrante-icon.png',
    footerText: 'Galicia Migrante — Portal de la Diáspora Gallega',
  },
};
