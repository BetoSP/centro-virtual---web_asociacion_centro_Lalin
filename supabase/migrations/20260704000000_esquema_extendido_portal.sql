-- Esquema extendido del Portal Galicia Migrante (doc/GUIA_INTEGRACION_MICROSITIOS.md
-- §3, §6.2 y §10.2), replicado 1:1 en el Supabase propio de centro-virtual
-- (sandbox de Fase 1, §15.2 de la guía). Cuando se ejecute la migración del
-- Hito (a) en el repositorio del Portal, este esquema se vuelca al Supabase
-- principal por ser idéntico.
--
-- Estrategia de i18n (§6.2, punto 4): centro-virtual solo carga las columnas
-- _es por ahora; _gl/_en quedan NULL y el portal resuelve el fallback.
--
-- Contenido real todavía no migrado a estas tablas: sigue viviendo en
-- content/*.ts hasta que el adaptador (lib/microsite-data.ts) se conecte a
-- Supabase (PROJECT_SPEC.md §8.1 — bloqueado por datos institucionales
-- reales del cliente).

-- ============================================================
-- asociaciones
-- ============================================================
create table asociaciones (
  id uuid primary key default gen_random_uuid(),
  nombre varchar(255) not null,
  slug varchar(255) unique not null,
  fundacion integer,
  descripcion_es text,
  descripcion_gl text,
  descripcion_en text,
  historia_es text,
  historia_gl text,
  historia_en text,
  finalidades_es text,
  finalidades_gl text,
  finalidades_en text,
  email varchar(255),
  telefono varchar(100),
  direccion varchar(255),
  ciudad varchar(100),
  pais varchar(100),
  logo_url text,
  banner_url text,
  activa boolean default true,
  reclamada boolean default false,
  admin_id uuid references auth.users(id),
  created_at timestamptz default timezone('utc'::text, now())
);

comment on table asociaciones is
  'Datos institucionales generales, esquema del Portal Galicia Migrante (GUIA_INTEGRACION_MICROSITIOS.md §3). Replicado en el Supabase propio de centro-virtual para la Fase 1 (§15.2).';

alter table asociaciones enable row level security;
-- Sin policies: solo accesible vía service_role key, igual que las tablas de
-- formularios (mensajes_contacto, suscriptores_newsletter, solicitudes_socio).

-- ============================================================
-- asociaciones_directivos
-- ============================================================
create table asociaciones_directivos (
  id serial primary key,
  asociacion_id uuid references asociaciones(id) on delete cascade,
  nombre varchar(255) not null,
  cargo_es varchar(100),
  cargo_gl varchar(100),
  cargo_en varchar(100),
  orden integer default 0
);

comment on table asociaciones_directivos is
  'Comisión Directiva y cargos, esquema del Portal Galicia Migrante (§3).';

alter table asociaciones_directivos enable row level security;

-- ============================================================
-- asociaciones_noticias
-- ============================================================
create table asociaciones_noticias (
  id uuid primary key default gen_random_uuid(),
  asociacion_id uuid references asociaciones(id) on delete cascade,
  titulo_es varchar(255) not null,
  titulo_gl varchar(255),
  titulo_en varchar(255),
  contenido_es text not null,
  contenido_gl text,
  contenido_en text,
  publicado boolean default true,
  created_at timestamptz default timezone('utc'::text, now())
);

comment on table asociaciones_noticias is
  'Novedades y publicaciones dinámicas, esquema del Portal Galicia Migrante (§3).';

alter table asociaciones_noticias enable row level security;

-- ============================================================
-- asociaciones_actividades (esquema extendido, propuesta de centro-virtual §6.2)
-- ============================================================
create table asociaciones_actividades (
  id uuid primary key default gen_random_uuid(),
  asociacion_id uuid references asociaciones(id) on delete cascade,
  titulo_es varchar(255) not null,
  titulo_gl varchar(255),
  titulo_en varchar(255),
  descripcion_es text,
  descripcion_gl text,
  descripcion_en text,
  tipo varchar(50), -- danza | gaita | idioma | gastronomia | charla | otro
  kind varchar(20), -- actividad | evento
  fecha_inicio timestamptz,
  fecha_fin timestamptz,
  imagen_url text,
  activo boolean default true
);

comment on table asociaciones_actividades is
  'Actividades y calendario de eventos. Tabla extendida propuesta por centro-virtual (§6.2), no forma parte del esquema base original del Portal (§3).';

alter table asociaciones_actividades enable row level security;

-- ============================================================
-- asociaciones_galeria (esquema extendido §6.2, columnas de auditoría §10.2)
-- ============================================================
create table asociaciones_galeria (
  id uuid primary key default gen_random_uuid(),
  asociacion_id uuid references asociaciones(id) on delete cascade,
  imagen_url text not null,
  epigrafe_es varchar(255),
  epigrafe_gl varchar(255),
  epigrafe_en varchar(255),
  -- Gobernanza de medios compartidos (orden taxativa, guía §8): por defecto
  -- privado — nada pasa a uso colectivo del portal sin marcarse explícito.
  visibilidad varchar(50) default 'privado' -- privado | publico | colectivo_autorizado
    check (visibilidad in ('privado', 'publico', 'colectivo_autorizado')),
  orden integer default 0,
  anio_captura integer,
  autor varchar(255),
  autorizado_por uuid references auth.users(id),
  fecha_autorizacion timestamptz
);

comment on table asociaciones_galeria is
  'Galería de fotos con auditoría de consentimiento para uso colectivo (§8 y §10.2). visibilidad=privado por defecto: ninguna foto pasa a la fototeca compartida del portal sin autorización explícita.';

alter table asociaciones_galeria enable row level security;

-- ============================================================
-- asociaciones_hitos_historicos (esquema extendido, propuesta §6.2)
-- ============================================================
create table asociaciones_hitos_historicos (
  id uuid primary key default gen_random_uuid(),
  asociacion_id uuid references asociaciones(id) on delete cascade,
  anio varchar(20) not null, -- permite rangos como "1976-1983"
  titulo_es varchar(255) not null,
  titulo_gl varchar(255),
  titulo_en varchar(255),
  descripcion_es text,
  descripcion_gl text,
  descripcion_en text,
  destacado boolean default false,
  orden integer default 0
);

comment on table asociaciones_hitos_historicos is
  'Línea de tiempo institucional estructurada (año/título/descripción/destacado). Tabla extendida propuesta por centro-virtual (§6.2) porque historia_es TEXT en asociaciones no permite estructurar hitos cronológicos.';

alter table asociaciones_hitos_historicos enable row level security;
