import type { MetadataRoute } from 'next';
import { getActivityItems, getNewsItemsFull } from '@/lib/microsite-data';

// [PENDIENTE: dominio real — hoy se usa NEXT_PUBLIC_SITE_URL o un placeholder hasta contratar]
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://centro-lalin-agolada-silleda.example';

const routes = ['', '/historia', '/actividades', '/novedades', '/galeria', '/asociate', '/contacto'];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const activityEntries = getActivityItems().map((activity) => ({
    url: `${baseUrl}/actividades/${activity.id}`,
    lastModified: new Date(),
  }));

  const newsEntries = getNewsItemsFull().map((news) => ({
    url: `${baseUrl}/novedades/${news.id}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...activityEntries, ...newsEntries];
}
