import type { ActivitiesPageContent, ActivityType } from '@/types/content';

// Contenido de ejemplo para evaluación visual, aprobado por el cliente — reemplazar por
// actividades reales antes de publicar. Se reutiliza tanto en la preview de la home como
// en el listado completo de /actividades.
export const activityItems: ActivitiesPageContent['items'] = [
  {
    id: '1',
    label: 'Coro',
    title: 'Ensayo abierto del Coro Lalín',
    description: 'Encuentro mensual del coro del Centro, abierto a nuevos integrantes.',
    image: '/imagenes/coro.jpg',
    date: 'Ejemplo · próximo sábado',
    dateLabel: 'Próximo sábado',
    href: '/actividades/1',
    type: 'gaita',
    kind: 'actividad',
  },
  {
    id: '2',
    label: 'Fiesta',
    title: 'Fiesta del Cocido',
    description:
      'Jornada gastronómica y de música tradicional gallega en el salón principal. La fiesta suele ser visitada por autoridades de Chascomús, ciudad hermanada con Lalín.',
    image: '/imagenes/fiesta-cocido.jpg',
    date: 'Ejemplo · próximo mes',
    dateLabel: 'Próximo mes',
    href: '/actividades/2',
    type: 'gastronomia',
    kind: 'evento',
  },
  {
    id: '3',
    label: 'Taller',
    title: 'Alas para escribir',
    description: 'Taller de lectura y escritura sobre literatura e historia gallega.',
    image: '/imagenes/taller-escritura.jpg',
    date: 'Ejemplo · quincenal, los viernes',
    dateLabel: 'Quincenal, los viernes',
    href: '/actividades/3',
    type: 'idioma',
    kind: 'actividad',
  },
];

const typeLabels: Record<ActivityType, string> = {
  danza: 'Danza',
  gaita: 'Coro y música',
  idioma: 'Idioma',
  gastronomia: 'Gastronomía',
  charla: 'Charlas',
  otro: 'Otras',
};

export const activitiesPageContent: ActivitiesPageContent = {
  eyebrow: 'Agenda',
  title: 'Actividades del Centro',
  description:
    'Encuentros culturales, gastronómicos y educativos abiertos a socios y a toda la comunidad gallega en Argentina.',
  filterAllLabel: 'Todas',
  typeLabels,
  items: activityItems,
};
