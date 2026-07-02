import type { MetadataRoute } from 'next';

// [PENDIENTE: dominio real — hoy se usa NEXT_PUBLIC_SITE_URL o un placeholder hasta contratar]
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://centro-lalin-agolada-silleda.example';

const routes = ['', '/historia', '/actividades', '/novedades', '/galeria', '/asociate', '/contacto'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
