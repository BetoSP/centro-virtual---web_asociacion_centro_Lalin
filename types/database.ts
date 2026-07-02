export interface Evento {
  id: string;
  titulo: string;
  descripcion: string | null;
  tipo: 'danza' | 'gaita' | 'idioma' | 'gastronomia' | 'charla' | 'otro';
  fecha_inicio: string;
  fecha_fin: string | null;
  ubicacion: string | null;
  imagen_url: string | null;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Novedad {
  id: string;
  titulo: string;
  contenido: string;
  imagen_portada: string | null;
  fecha_publicacion: string;
  autor: string | null;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface SolicitudAsociacion {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string | null;
  mensaje: string | null;
  fecha_solicitud: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  created_at: string;
}

export interface MensajeContacto {
  id: string;
  nombre: string;
  email: string;
  mensaje: string;
  fecha: string;
  leido: boolean;
}

export interface SuscriptorNewsletter {
  id: string;
  email: string;
  fecha_suscripcion: string;
  activo: boolean;
}

export interface UsuarioAdmin {
  id: string;
  email: string;
  nombre: string | null;
  rol: 'admin' | 'editor' | 'viewer';
  activo: boolean;
  created_at: string;
}

export interface GaleriaItem {
  id: string;
  titulo: string | null;
  imagen_url: string;
  categoria: string | null;
  orden: number | null;
  created_at: string;
}
