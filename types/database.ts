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

// Refleja 1:1 el wizard de 4 pasos de components/forms/MembershipForm.tsx
// (no el modelo borrador de PROJECT_SPEC.md §3.5, que solo cubría un
// formulario simple de una pantalla). Esquema en
// supabase/migrations/20260702000000_fase1_formularios.sql.
export interface SolicitudAsociacion {
  id: string;
  // Datos personales
  first_name: string;
  last_name: string;
  document_type: string;
  document_number: string;
  marital_status: string | null;
  spouse_name: string | null;
  children: string | null;
  profession: string | null;
  // Domicilio
  street: string;
  street_number: string | null;
  floor: string | null;
  apartment: string | null;
  locality: string;
  postal_code: string | null;
  phone: string | null;
  mobile_phone: string | null;
  email: string;
  // Nacionalidad / origen
  birth_date: string;
  birth_country: string;
  birth_province: string | null;
  birth_concello: string | null;
  birth_locality: string | null;
  galician_origin: string | null;
  spanish_registration: string | null;
  // Socio que presenta (opcional)
  referrer_name: string | null;
  referrer_member_number: string | null;
  // Foto de verificación (Supabase Storage, bucket privado "solicitudes-socio-fotos")
  photo_url: string;
  accepts_statutes: boolean;
  // Completado manualmente por la institución tras aprobar la solicitud
  member_category: string | null;
  member_number: string | null;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  created_at: string;
}

export interface MensajeContacto {
  id: string;
  nombre: string;
  email: string;
  mensaje: string;
  leido: boolean;
  created_at: string;
}

export interface SuscriptorNewsletter {
  id: string;
  email: string;
  activo: boolean;
  created_at: string;
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
