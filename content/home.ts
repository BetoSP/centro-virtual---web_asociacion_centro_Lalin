import type { HomeContent } from '@/types/content';
import { activityItems } from '@/content/activities';
import { newsItems } from '@/content/news';

export const homeContent: HomeContent = {
  hero: {
    title: 'Deza en Bos Aires.',
    description:
      'El lugar de quienes llegaron a estas tierras desde\nsu querida comarca - de sus hijos y nietos que\nheredaron toda la morriña por la tierra do seus pais.',
    primaryCta: { label: 'Asociate al Centro', href: '/asociate' },
    secondaryCta: { label: 'Ver actividades', href: '#actividades' },
    quickLinks: [
      { label: 'Historia del Centro', href: '#historia' },
      { label: 'Próximas actividades', href: '#actividades' },
      { label: 'Novedades', href: '#novedades' },
    ],
    slides: [
      {
        image: '/imagenes/banner.jpg',
        imageAlt: 'Banner institucional del Centro Lalín, Agolada y Silleda',
        captionEyebrow: 'Galicia actual',
        caption: 'Un lugar de encuentro que combina tradición, paisaje y comunidad digital.',
      },
      {
        image: '/imagenes/coro.jpg',
        imageAlt: 'Ensayo del Coro Lalín',
        captionEyebrow: 'Vida del Centro',
        caption: 'El Coro Lalín mantiene viva la música tradicional gallega en cada encuentro.',
      },
      {
        image: '/imagenes/fiesta-cocido.jpg',
        imageAlt: 'Fiesta del Cocido en el salón principal',
        captionEyebrow: 'Encuentros',
        caption: 'La Fiesta del Cocido reúne cada año a socios y visitantes en una jornada gastronómica.',
      },
    ],
  },
  about: {
    eyebrow: 'Quiénes somos',
    title: 'Una institución centenaria que se pone al día.',
    paragraphs: [
      'Centro fundado el 25 de julio de 1982. El propósito que animó a sus fundadores fue el de agrupar en un solo centro las distintas sociedades del partido judicial de Lalín constituidas en Buenos Aires.',
      'En la Asamblea General Ordinaria celebrada el 25 de agosto de 1984 se aprobó por unanimidad la integración de cuatro asociaciones: la Asociación Hijos del Partido de Lalín (fundada el 7 de agosto de 1908, la más antigua de su tipo en Argentina), la Asociación Hijos de Silleda (15 de agosto de 1908), la Asociación Unión del Partido de Lalín (30 de enero de 1921) y la Sociedad Hijos del Ayuntamiento de Agolada y sus contornos (20 de julio de 1930).',
      'El 17 de septiembre de 1992 el Centro recibió el reconocimiento oficial de la galleguidad, y está afiliado a la Unión de Asociaciones Gallegas de la República Argentina.',
    ],
    features: [
      {
        title: 'Amistad y camaradería',
        description: 'Fomentar los vínculos de amistad y camaradería entre los asociados.',
      },
      {
        title: 'Vínculos culturales',
        description:
          'Establecer relaciones con las entidades que practiquen la ayuda al pueblo gallego o se interesen por las distintas manifestaciones de la cultura.',
      },
      {
        title: 'Compromiso cívico',
        description:
          'Inculcar a los asociados el amor a las instituciones de Argentina, el respeto a sus leyes, usos y costumbres.',
      },
    ],
    image: '/imagenes/banner.jpg',
    imageAlt: 'Banner institucional del Centro Lalín, Agolada y Silleda',
    imageCaption: '[PENDIENTE: ubicación/leyenda real]',
  },
  featuredMilestone: {
    year: '1981',
    eyebrow: 'Historia · 1981–1988',
    title: 'El asilo de la democracia',
    paragraph:
      'En los años de la dictadura, cuando reunirse era un riesgo, el Centro abrió sus puertas a Raúl Alfonsín —nieto de gallego— para que se encontrara con su partido en la clandestinidad. Cumplió su promesa: al asumir la presidencia, Lalín fue su primer viaje oficial al exterior. Desde el 19 de marzo de 1988, Chascomús (su ciudad natal) y Lalín son ciudades hermanas.',
    ctaLabel: 'Conocé la historia completa →',
    ctaHref: '/historia',
  },
  activities: {
    eyebrow: 'Agenda',
    title: 'Próximas actividades',
    viewAllLabel: 'Ver todas',
    viewAllHref: '/actividades',
    items: activityItems,
  },
  comarcaNews: {
    eyebrow: 'La comarca',
    title: 'Noticias de la comarca',
    items: [
      { municipality: 'Lalín', text: '[PENDIENTE: noticia real del concello de Lalín]' },
      { municipality: 'Agolada', text: '[PENDIENTE: noticia real del concello de Agolada]' },
      { municipality: 'Silleda', text: '[PENDIENTE: noticia real del concello de Silleda]' },
    ],
  },
  news: {
    eyebrow: 'Blog',
    title: 'Historias y novedades para descubrir',
    description:
      'Contenidos culturales, efemérides y noticias pensadas para mantener viva la comunidad gallega en Argentina.',
    items: newsItems,
  },
  joinUs: {
    eyebrow: 'Participá',
    title: 'Sumate a la comunidad digital del Centro',
    description:
      'Asociarte te permite estar al día con las actividades, recibir novedades exclusivas y apoyar la continuidad de la cultura gallega en Argentina.',
    benefits: [
      'Acceso a eventos especiales',
      'Novedades mensuales por email',
      'Participación en charlas y talleres',
      'Conexión con la comunidad',
    ],
    formEyebrow: 'Formulario de contacto',
    formTitle: '¿Querés recibir novedades?',
    formDescription:
      'Dejanos tu email y te avisamos cuando haya nuevos eventos, noticias y lanzamientos para la comunidad.',
    emailLabel: 'Email',
    emailPlaceholder: 'tucorreo@dominio.com',
    submitLabel: 'Suscribirme',
    submitLoadingLabel: 'Enviando...',
    successMessage: '¡Gracias! Te escribiremos pronto.',
    errorMessage: 'Hubo un error. Intentá nuevamente.',
  },
  boardTeaser: {
    eyebrow: 'Autoridades',
    title: 'Comisión Directiva',
    text: '24 socios elegidos por la asamblea conducen la institución.',
    photo: '/imagenes/comision-directiva-reunion.png',
    linkLabel: 'Ver la Comisión Directiva completa →',
    linkHref: '/directiva',
  },
  board: {
    eyebrow: 'Autoridades',
    title: 'Comisión Directiva',
    directivaSubtitle: 'Elegida en asambleas de socios 2024/2025.',
    revisorsTitle: 'Comisión Revisora de Cuentas',
    revisoraSubtitle: 'Fiscaliza el ejercicio de la Comisión Directiva.',
    members: [
      { role: 'Presidente', name: 'José González Costa', term: '2025-2027', gender: 'male', bio: '[PENDIENTE: reseña breve]' },
      { role: 'Vicepresidente', name: 'Manuel Montero Taboada', term: '2024-2026', gender: 'male', bio: '[PENDIENTE: reseña breve]' },
      { role: 'Tesorero', name: 'Julian Seoane Arceo', term: '2025-2027', gender: 'male', bio: '[PENDIENTE: reseña breve]' },
      { role: 'Secretario', name: 'Fernando López Pereyra', term: '2024-2026', gender: 'male', bio: '[PENDIENTE: reseña breve]' },
      { role: 'Secretaria de Actas', name: 'Mirta Lagama Gómez', term: '2025-2027', gender: 'female', bio: '[PENDIENTE: reseña breve]' },
      { role: 'Protesorera', name: 'Nelida Jorge Conde', term: '2024-2026', gender: 'female', bio: '[PENDIENTE: reseña breve]' },
      { role: 'Prosecretaria', name: 'Alicia Cuñarro', term: '2025-2027', gender: 'female', bio: '[PENDIENTE: reseña breve]' },
      { role: 'Vocal Titular', name: '[PENDIENTE: nombre real]', term: '2024-2026', gender: 'male' },
      { role: 'Vocal Titular', name: '[PENDIENTE: nombre real]', term: '2024-2026', gender: 'male' },
      { role: 'Vocal Titular', name: '[PENDIENTE: nombre real]', term: '2024-2026', gender: 'male' },
      { role: 'Vocal Titular', name: '[PENDIENTE: nombre real]', term: '2024-2026', gender: 'male' },
      { role: 'Vocal Titular', name: '[PENDIENTE: nombre real]', term: '2025-2027', gender: 'male' },
      { role: 'Vocal Titular', name: '[PENDIENTE: nombre real]', term: '2025-2027', gender: 'male' },
      { role: 'Vocal Titular', name: '[PENDIENTE: nombre real]', term: '2025-2027', gender: 'male' },
      { role: 'Vocal Titular', name: '[PENDIENTE: nombre real]', term: '2025-2027', gender: 'male' },
      { role: 'Revisor de Cuentas Titular', name: '[PENDIENTE: nombre real]', term: '2026-2027', gender: 'male' },
      { role: 'Revisor de Cuentas Suplente', name: '[PENDIENTE: nombre real]', term: '2026-2027', gender: 'male' },
      { role: 'Revisor de Cuentas Suplente', name: '[PENDIENTE: nombre real]', term: '2026-2027', gender: 'male' },
      { role: 'Vocal Suplente', name: '[PENDIENTE: nombre real]', term: '2026-2027', gender: 'male' },
      { role: 'Vocal Suplente', name: '[PENDIENTE: nombre real]', term: '2026-2027', gender: 'male' },
      { role: 'Vocal Suplente', name: '[PENDIENTE: nombre real]', term: '2026-2027', gender: 'male' },
      { role: 'Vocal Suplente', name: '[PENDIENTE: nombre real]', term: '2026-2027', gender: 'male' },
      { role: 'Vocal Suplente', name: '[PENDIENTE: nombre real]', term: '2026-2027', gender: 'male' },
      { role: 'Vocal Suplente', name: '[PENDIENTE: nombre real]', term: '2026-2027', gender: 'male' },
    ],
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Estamos para ayudarte',
    description:
      'Escribinos si querés saber más sobre actividades, asociarte o participar de la comunidad.',
    sideTitle: '¿Tenés una consulta?',
    sideDescription:
      'Mandanos un mensaje con tu consulta y te responderemos lo antes posible.',
    emailLabel: 'Email',
    whatsappLabel: 'WhatsApp',
    addressLabel: 'Dirección',
  },
};
