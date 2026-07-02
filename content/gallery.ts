import type { GalleryContent } from '@/types/content';

// Usa las imágenes ya provistas en public/imagenes. Reemplazar/ampliar con fotos históricas
// y de eventos reales cuando la institución las facilite.
export const galleryContent: GalleryContent = {
  eyebrow: 'Recuerdos',
  title: 'Galería',
  description: 'Una selección de imágenes de nuestras actividades y espacios.',
  images: [
    { src: '/imagenes/coro.jpg', alt: 'Ensayo del coro del Centro', caption: 'Coro Lalín' },
    { src: '/imagenes/fiesta-cocido.jpg', alt: 'Fiesta del Cocido', caption: 'Fiesta del Cocido' },
    { src: '/imagenes/taller-escritura.jpg', alt: 'Taller de escritura "Alas para escribir"', caption: 'Alas para escribir' },
    { src: '/imagenes/banner.jpg', alt: 'Banner institucional del Centro', caption: 'Comarca de Deza' },
    { src: 'https://picsum.photos/seed/centrolalin3/400/400', alt: '[PENDIENTE: foto real]', caption: '[PENDIENTE: foto real]' },
    { src: 'https://picsum.photos/seed/centrolalin4/400/400', alt: '[PENDIENTE: foto real]', caption: '[PENDIENTE: foto real]' },
    { src: 'https://picsum.photos/seed/centrolalin5/400/400', alt: '[PENDIENTE: foto real]', caption: '[PENDIENTE: foto real]' },
    { src: 'https://picsum.photos/seed/centrolalin6/400/400', alt: '[PENDIENTE: foto real]', caption: '[PENDIENTE: foto real]' },
  ],
};
