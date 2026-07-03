-- Fase 1 de centro-virtual: persistencia de los 3 formularios ya construidos
-- (solicitud de socio, contacto, newsletter). NO incluye el esquema
-- asociaciones_* del Portal Galicia Migrante: esa migración corresponde al
-- repositorio del Portal (doc/GUIA_INTEGRACION_MICROSITIOS.md §11.1), no a
-- este proyecto ni a esta base de datos.

-- ============================================================
-- solicitudes_socio
-- ============================================================
create table solicitudes_socio (
  id uuid primary key default gen_random_uuid(),

  -- Datos personales
  first_name text not null,
  last_name text not null,
  document_type text not null,
  document_number text not null,
  marital_status text,
  spouse_name text,
  children text,
  profession text,

  -- Domicilio
  street text not null,
  street_number text,
  floor text,
  apartment text,
  locality text not null,
  postal_code text,
  phone text,
  mobile_phone text,
  email text not null,

  -- Nacionalidad / origen
  birth_date date not null,
  birth_country text not null,
  birth_province text,
  birth_concello text,
  birth_locality text,
  galician_origin text,
  spanish_registration text,

  -- Socio que presenta (opcional)
  referrer_name text,
  referrer_member_number text,

  -- Foto de verificación (sustituye la firma; Storage privado, ver bucket
  -- "solicitudes-socio-fotos" más abajo). Campo propio, no mezclado con
  -- otros datos (PROJECT_SPEC.md §8.3).
  photo_url text not null,

  accepts_statutes boolean not null default false,

  -- Completado manualmente por la institución tras aprobar la solicitud
  -- (no lo completa el solicitante). Ver comentario [PENDIENTE] en
  -- app/api/membership/route.ts.
  member_category text,
  member_number text,

  estado text not null default 'pendiente'
    check (estado in ('pendiente', 'aprobado', 'rechazado')),

  created_at timestamptz not null default timezone('utc'::text, now())
);

comment on table solicitudes_socio is
  'Solicitudes de asociación recibidas vía /asociate. Tabla propia de centro-virtual, no forma parte del esquema asociaciones_* del Portal Galicia Migrante.';

alter table solicitudes_socio enable row level security;
-- Sin policies: solo accesible vía service_role key desde los API routes del
-- servidor. El cliente (anon key) no tiene ningún acceso de lectura/escritura.

-- ============================================================
-- mensajes_contacto
-- ============================================================
create table mensajes_contacto (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text not null,
  mensaje text not null,
  leido boolean not null default false,
  created_at timestamptz not null default timezone('utc'::text, now())
);

comment on table mensajes_contacto is
  'Mensajes recibidos vía /contacto. Tabla propia de centro-virtual.';

alter table mensajes_contacto enable row level security;
-- Sin policies: mismo criterio que solicitudes_socio.

-- ============================================================
-- suscriptores_newsletter
-- ============================================================
create table suscriptores_newsletter (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  activo boolean not null default true,
  created_at timestamptz not null default timezone('utc'::text, now())
);

comment on table suscriptores_newsletter is
  'Suscriptores al newsletter. Tabla propia de centro-virtual.';

alter table suscriptores_newsletter enable row level security;
-- Sin policies: mismo criterio que las anteriores.

-- ============================================================
-- Storage: bucket privado para las fotos de verificación
-- ============================================================
insert into storage.buckets (id, name, public)
values ('solicitudes-socio-fotos', 'solicitudes-socio-fotos', false);

-- Sin policies adicionales: el bucket es privado (public = false) y, al
-- igual que las tablas, solo se sube/lee vía service_role key desde el
-- servidor. Para mostrar la foto en el panel de administración (aún no
-- construido, ver PROJECT_SPEC.md §8.2b) se deberán generar signed URLs
-- de corta duración en el momento, no URLs públicas permanentes.
