import type { HistoryContent } from '@/types/content';

// Hitos reconstruidos a partir de los mismos datos históricos ya cargados en content/home.ts
// (about.paragraphs), sin agregar información institucional nueva.
export const historyContent: HistoryContent = {
  eyebrow: 'Institucional',
  title: 'Historia del Centro',
  intro:
    'Más de un siglo de historia de las asociaciones que dieron origen al Centro Lalín, Agolada y Silleda, y su trayectoria como institución unificada desde 1982.',
  milestones: [
    {
      year: '1908',
      title: 'Asociación Hijos del Partido de Lalín',
      description: 'Fundada el 7 de agosto de 1908, la más antigua de su tipo en Argentina.',
    },
    {
      year: '1908',
      title: 'Asociación Hijos de Silleda',
      description: 'Fundada el 15 de agosto de 1908.',
    },
    {
      year: '1921',
      title: 'Asociación Unión del Partido de Lalín',
      description: 'Fundada el 30 de enero de 1921.',
    },
    {
      year: '1930',
      title: 'Sociedad Hijos del Ayuntamiento de Agolada y sus contornos',
      description: 'Fundada el 20 de julio de 1930.',
    },
    {
      year: '1981',
      title: 'El asilo de la democracia',
      description:
        'El abuelo gallego de Raúl Alfonsín era oriundo de Ribadumia (Pontevedra); Alfonsín nació en Chascomús, provincia de Buenos Aires. Durante la dictadura militar, el Centro le abrió sus puertas para reunirse en la clandestinidad con su partido.',
      accent: true,
    },
    {
      year: '1982',
      title: 'Fundación del Centro',
      description:
        'El Centro se funda el 25 de julio de 1982 con el propósito de agrupar en un solo centro las distintas sociedades del partido judicial de Lalín constituidas en Buenos Aires.',
    },
    {
      year: '1983',
      title: 'Primer viaje oficial de Alfonsín a Lalín',
      description:
        'Ya como presidente electo, Alfonsín cumplió su promesa de visitar Lalín, siendo este su primer viaje oficial al exterior.',
    },
    {
      year: '1984',
      title: 'Integración de las cuatro asociaciones',
      description:
        'En la Asamblea General Ordinaria del 25 de agosto de 1984 se aprobó por unanimidad la integración de las cuatro asociaciones fundadoras.',
    },
    {
      year: '1988',
      title: 'Hermanamiento Chascomús-Lalín',
      description:
        'El 19 de marzo de 1988 se formalizó el hermanamiento oficial entre las ciudades de Chascomús y Lalín.',
      accent: true,
    },
    {
      year: '1992',
      title: 'Reconocimiento oficial de la galleguidad',
      description:
        'El 17 de septiembre de 1992 el Centro recibió el reconocimiento oficial de la galleguidad, y está afiliado a la Unión de Asociaciones Gallegas de la República Argentina.',
    },
    {
      year: '2023',
      title: 'Sala Presidente Raúl Alfonsín',
      description:
        'El Centro inauguró la "Sala Presidente Raúl Alfonsín" en homenaje a su vínculo histórico con la institución.',
      accent: true,
    },
  ],
};
