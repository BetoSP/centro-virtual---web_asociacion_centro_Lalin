import type { NavItem } from '@/types/content';

export const mainNav: NavItem[] = [
  { label: 'Historia', href: '/historia' },
  { label: 'Actividades', href: '/actividades' },
  { label: 'Novedades', href: '/novedades' },
  { label: 'Galería', href: '/galeria' },
  { label: 'Comisión Directiva', href: '/#comision-directiva' },
  { label: 'Contacto', href: '/contacto' },
  // Placeholder visual: el portal de socios (Fase 2) todavía no existe.
  { label: 'Ingresar', href: '#' },
];

export const footerContactTitle = 'Contacto';

export const footerNavSections: { title: string; links: NavItem[] }[] = [
  {
    title: 'Secciones',
    links: [
      { label: 'Historia', href: '/historia' },
      { label: 'Actividades', href: '/actividades' },
      { label: 'Novedades', href: '/novedades' },
      { label: 'Galería', href: '/galeria' },
      { label: 'Comisión Directiva', href: '/#comision-directiva' },
      { label: 'Asociate', href: '/asociate' },
    ],
  },
];
