import type { NewsPageContent } from '@/types/content';

// Contenido de ejemplo para evaluación visual, aprobado por el cliente — reemplazar por
// novedades reales antes de publicar. Se reutiliza tanto en la preview de la home como
// en el listado completo de /novedades.
export const newsItems: NewsPageContent['items'] = [
  {
    id: '1',
    date: 'Ejemplo',
    title: 'Nueva junta directiva 2025-2027',
    excerpt: 'Se renovaron autoridades en la última Asamblea General Ordinaria.',
    href: '/novedades/1',
  },
  {
    id: '2',
    date: 'Ejemplo',
    title: 'Convenio cultural con Agolada',
    excerpt: 'Actividades conjuntas para fortalecer el vínculo con el ayuntamiento de origen.',
    href: '/novedades/2',
  },
  {
    id: '3',
    date: 'Ejemplo',
    title: 'Aniversario del Centro',
    excerpt: 'Repasamos la historia del Centro a más de cuatro décadas de su fundación.',
    href: '/novedades/3',
  },
];

// Listado completo de /novedades: incluye los 3 items reales (con imagen) más 2 de ejemplo
// marcados [PENDIENTE], igual que el array `novedadesFull` del prototipo de Revisión 3.
export const newsItemsFull: NewsPageContent['items'] = [
  {
    id: '1',
    date: 'Ejemplo',
    title: 'Nueva junta directiva 2025-2027',
    excerpt: 'Se renovaron autoridades en la última Asamblea General Ordinaria.',
    href: '/novedades/1',
    img: '/imagenes/coro.jpg',
  },
  {
    id: '2',
    date: 'Ejemplo',
    title: 'Convenio cultural con Agolada',
    excerpt: 'Actividades conjuntas para fortalecer el vínculo con el ayuntamiento de origen.',
    href: '/novedades/2',
    img: '/imagenes/fiesta-cocido.jpg',
  },
  {
    id: '3',
    date: 'Ejemplo',
    title: 'Aniversario del Centro',
    excerpt: 'Repasamos la historia del Centro a más de cuatro décadas de su fundación.',
    href: '/novedades/3',
    img: '/imagenes/taller-escritura.jpg',
  },
  {
    id: '4',
    date: '[PENDIENTE]',
    title: '[PENDIENTE: título — ej. resultado de un torneo interno]',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder hasta tener contenido real.',
    href: '/novedades/4',
    img: 'https://picsum.photos/seed/centrolalin1/400/300',
  },
  {
    id: '5',
    date: '[PENDIENTE]',
    title: '[PENDIENTE: título — ej. crónica de un evento pasado]',
    excerpt: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Placeholder hasta tener contenido real.',
    href: '/novedades/5',
    img: 'https://picsum.photos/seed/centrolalin2/400/300',
  },
];

export const newsPageContent: NewsPageContent = {
  eyebrow: 'Blog',
  title: 'Historias y novedades para descubrir',
  description:
    'Contenidos culturales, efemérides y noticias pensadas para mantener viva la comunidad gallega en Argentina.',
  items: newsItemsFull,
};
