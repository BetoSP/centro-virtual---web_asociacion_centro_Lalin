import { siteConfig } from '@/content/site.config';
import { mainNav, footerNavSections, footerContactTitle } from '@/content/nav';
import { homeContent } from '@/content/home';
import { historyContent } from '@/content/history';
import { activitiesPageContent, activityItems } from '@/content/activities';
import { newsItems, newsItemsFull, newsPageContent } from '@/content/news';
import { galleryContent } from '@/content/gallery';
import { contactPageContent } from '@/content/contactPage';
import { membershipFormContent } from '@/content/membership';
import type {
  SiteConfig,
  NavItem,
  HomeContent,
  HistoryContent,
  ActivitiesPageContent,
  ActivityPreview,
  NewsPreview,
  NewsPageContent,
  GalleryContent,
  ContactPageContent,
  MembershipFormContent,
} from '@/types/content';

/**
 * Único punto de lectura de contenido del micrositio. Hoy respalda cada función con
 * `content/*.ts`; cuando se migre a Supabase (Hito a, `doc/PLAN_INTEGRACION_SUPABASE.md`
 * Fase 3), el cambio de origen de datos se hace acá sin tocar los componentes consumidores.
 */

export function getSiteConfig(): SiteConfig {
  return siteConfig;
}

export function getMainNav(): NavItem[] {
  return mainNav;
}

export function getFooterNav(): { footerNavSections: typeof footerNavSections; footerContactTitle: string } {
  return { footerNavSections, footerContactTitle };
}

export function getHomeContent(): HomeContent {
  return homeContent;
}

export function getHistoryContent(): HistoryContent {
  return historyContent;
}

export function getActivitiesPageContent(): ActivitiesPageContent {
  return activitiesPageContent;
}

export function getActivityItems(): ActivityPreview[] {
  return activityItems;
}

export function getActivityById(id: string): ActivityPreview | undefined {
  return activityItems.find((item) => item.id === id);
}

export function getNewsItems(): NewsPreview[] {
  return newsItems;
}

export function getNewsItemsFull(): NewsPreview[] {
  return newsItemsFull;
}

export function getNewsPageContent(): NewsPageContent {
  return newsPageContent;
}

export function getNewsById(id: string): NewsPreview | undefined {
  return newsItemsFull.find((item) => item.id === id);
}

export function getGalleryContent(): GalleryContent {
  return galleryContent;
}

export function getContactPageContent(): ContactPageContent {
  return contactPageContent;
}

export function getMembershipFormContent(): MembershipFormContent {
  return membershipFormContent;
}
