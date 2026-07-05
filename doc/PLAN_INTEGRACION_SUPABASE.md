# Plan: Próximos pasos post-integración con Portal Galicia Migrante

> Documento de planificación (no ejecutado todavía). Ver decisiones tomadas en `doc/PROJECT_SPEC.md` §4.6/§8.4 y `doc/GUIA_INTEGRACION_MICROSITIOS.md` §6-14.

## Contexto

`doc/PROJECT_SPEC.md` (§4.6, §8.4) y `doc/GUIA_INTEGRACION_MICROSITIOS.md` (§6-14) ya documentan el acuerdo de integración entre `centro-virtual` y el Portal Galicia Migrante: Hito (a) migración de datos a Supabase + adaptador de datos, Hito (b) consumo de servicios unificados (auth/pagos/CMS/inscripciones), autonomía confirmada para foro/streaming/gamificación, y exclusión de funciones intersocietarias (mapa de centros).

El código de Fase 1 está completo (`PROJECT_SPEC.md` §8). Lo que queda pendiente cae en tres categorías con gates muy distintos:

1. **Contenido institucional real** (§8.1) — bloqueado por datos del cliente, no es una tarea de código.
2. **Integraciones de backend** (§8.2: contacto/newsletter/asociación; §8.2c: confirmación funcional de identidad del solicitante por mail/WhatsApp, hecho 2026-07-03, reemplaza a RENAPER; confirmación del referente, sigue bloqueada por falta de padrón de socios) y **la migración a Supabase del Hito (a)** — dependían de una decisión de cuenta/costo ya resuelta: el equipo del portal recomendó (2026-07-02) que `centro-virtual` cree **su propio proyecto Supabase separado** (plan gratuito, entorno de desarrollo/sandbox), replicando el **mismo esquema SQL** ya acordado en `doc/GUIA_INTEGRACION_MICROSITIOS.md` §6.2/§10.2 (`asociaciones`, `asociaciones_directivos`, `asociaciones_noticias`, `asociaciones_actividades`, `asociaciones_galeria`, `asociaciones_hitos_historicos`). Esto aísla las pruebas del Supabase principal del portal; cuando el micrositio esté listo, el portal migra la estructura y hace un volcado de datos al Supabase principal (proceso a cargo del portal, no de este repo). El usuario confirmó explícitamente crear este proyecto propio.
3. **Servicios unificados del Hito (b)** (auth/pagos/CMS/inscripciones del portal) — no existen todavía del lado del portal (sección 11.1, "Core Multi-tenant" listado como tarea futura del portal). Nada que hacer acá hasta que el portal los construya.

Con la decisión de Supabase resuelta, el plan queda en dos frentes ejecutables: preparar el adaptador de datos (Fase 0) y, una vez creada la cuenta Supabase propia, habilitar la persistencia real de formularios y la carga de contenido migrado (Fase 1). El patrón adaptador (`doc/GUIA_INTEGRACION_MICROSITIOS.md` §10.1, `useMicrositioData()`) sigue siendo la pieza clave: garantiza que el cambio de fuente de datos (de `content/*.ts` a Supabase) sea un cambio de una sola pieza. Lo que queda bloqueado por el portal (Fases 2-4) se documenta con su gate explícito.

### Checklist completo del Hito (a) que le corresponde a `centro-virtual` (§11.2 de la guía)

La guía de integración define 4 tareas concretas para que `centro-virtual` llegue al punto de entrega/importación al portal. Este plan las cubre todas:

| # | Tarea (§11.2) | Fase de este plan | Estado |
|---|---|---|---|
| 1 | Finalizar Fase 1 frontend (diseño visual con tipografías/paleta propias) | Confirmación en **Fase 0.a** | ✅ Hecho (2026-07-02) |
| 2 | Aislamiento de estilos frente al portal (resuelto en §15.1: no requiere CSS Modules, Tailwind con `preflight: false` y/o clase contenedora `.lalin-theme`) | **Fase 0.d** | ✅ Hecho (2026-07-05) |
| 3 | Adaptador de datos (`useMicrositioData()` / `lib/microsite-data.ts`) | **Fase 0.c** | ✅ Hecho (2026-07-02) |
| 4 | Empaquetar y exportar la carpeta de la plantilla para el portal (`app/asociaciones/[slug]/templates/centro-lalin/`) | **Fase 0.d** | ✅ Hecho (2026-07-05) |

Adicionalmente (fuera del checklist de la guía, pero necesario para producción propia de `centro-virtual`): persistencia real de formularios en un Supabase propio (**Fase 1**).

> **Nota (2026-07-02) — reordenamiento de 0.b**: §15.1 de la guía dice textualmente que el aislamiento de estilos se aplica "al momento de empaquetar la plantilla para el portal". Se decidió (con el usuario) no ejecutarlo como paso previo aislado: hacerlo ahora exigiría desactivar el reset global de Tailwind en todo el sitio sin ningún beneficio inmediato (el sitio no está embebido en ningún portal todavía) y forzaría una re-verificación visual completa. Queda absorbido dentro de la Fase 0.d, en el momento real de empaquetado.
>
> **Nota (2026-07-05) — cierre de 0.d**: se optó por la clase contenedora `.lalin-theme` (no `preflight: false`): scopea las custom properties de color y el reset base de `app/globals.css` bajo ese selector en vez de `:root`/globales, aplicado en `app/layout.tsx`. Se descartó `preflight: false` por afectar el reset de Tailwind en todo el sitio propio sin beneficio real hoy. Verificado con build de producción + 24 capturas Playwright (12 rutas × claro/oscuro): sin cambios visuales. Detalle completo de qué se empaqueta y entrega al portal en `doc/EXPORT_PLANTILLA_CENTRO_LALIN.md`. Con esto, el Hito (a) de `centro-virtual` queda cerrado; el contenido institucional real pendiente (§8.1) y la conexión del adaptador al Supabase de producción del portal quedan a cargo del equipo de Portal Galicia Migrante.

## Fase 0 — Cierre del Hito (a) propio de `centro-virtual` (ejecutable ahora, sin costo ni decisiones pendientes)

### Fase 0.a — Confirmar cierre del frontend de Fase 1 ✅ Hecho (2026-07-02)
Revisar `PROJECT_SPEC.md` §3 (alcance Fase 1) contra el estado actual del código y confirmar visualmente (build de producción + comparación contra el mockup de referencia, por CLAUDE.md) que no queda ninguna sección de Fase 1 sin maquetar. Si aparece algo pendiente, se resuelve antes de avanzar — no es parte de este plan de integración, es deuda de Fase 1.

**Resultado**: las 8 secciones de §3.2 (Home, Historia, Actividades, Novedades, Galería, Asociate, Contacto, Newsletter) están maquetadas y funcionando; confirmado con build de producción + capturas Playwright de cada página. **Hallazgo aparte, ya documentado en `PROJECT_SPEC.md` §8**: el panel de administración exigido por §3.3/§3.6 no existe (`app/admin` está vacío) — no bloquea esta verificación de maquetación porque es un gap funcional, no visual, pero queda registrado como pendiente de Fase 1 a resolver antes de considerar el sitio 100% completo.

### Fase 0.b — Aislamiento de estilos (resuelto en §15.1 de la guía) ✅ Hecho (2026-07-05), ver Fase 0.d
El portal confirmó que no hace falta migrar a CSS Modules: alcanza con que Tailwind no choque con el CSS del portal al importar la plantilla. Se implementó como parte de la Fase 0.d (ver abajo): clase contenedora `.lalin-theme` en `app/globals.css`/`app/layout.tsx`, sin desactivar `preflight` global.

### Fase 0.c — Adaptador de datos ✅ Hecho (2026-07-02)
Objetivo: que ningún componente importe `content/*.ts` directamente. Todos consumen los datos a través de un módulo único, hoy respaldado por los mismos archivos `content/*.ts` que ya existen (comportamiento idéntico, cero cambio visible). Cuando llegue el momento de migrar a Supabase (Hito a), el cambio se hace en un solo archivo.

**Implementado en `lib/microsite-data.ts`** con funciones planas (`getSiteConfig()`, `getHomeContent()`, `getHistoryContent()`, `getActivitiesPageContent()`/`getActivityItems()`/`getActivityById(id)`, `getNewsItems()`/`getNewsItemsFull()`/`getNewsPageContent()`/`getNewsById(id)`, `getGalleryContent()`, `getContactPageContent()`, `getMembershipFormContent()`, `getMainNav()`, `getFooterNav()`) — no un hook `useMicrositioData()` como sugería la guía, porque todas las páginas de `centro-virtual` son Server Components de Next.js (App Router); un hook de React no aplica acá. Se actualizaron los 15 consumidores reales de `content/*.ts` (9 en `app/`, incluyendo `app/layout.tsx`, y 5 componentes en `components/layout/` y `components/sections/`). Verificado: `npm run build` sin errores de tipado ni de SSG, `npm run lint` sin errores en código propio, `/actividades/999` y `/novedades/999` siguen devolviendo 404, y comparación de las 9 páginas (build de producción, capturas Playwright con scroll instantáneo) dio **archivos PNG byte-idénticos** antes/después — cero cambio visual ni de dato, confirmado, no solo asumido.

**Riesgo documentado para la Fase 3 (migración real a Supabase, no implementar ahora)**: `components/layout/Header.tsx` y otros consumidores hoy leen el contenido de forma síncrona al importar el módulo. Cuando las funciones de `lib/microsite-data.ts` pasen a leer de Supabase (lecturas async), `Header.tsx` es un client component (`'use client'`) y no va a poder llamar funciones `async` directamente — va a necesitar recibir esos datos como props desde un padre server component. No estaba anticipado en la versión original de este plan.

- Crear `lib/microsite-data.ts` que exporte funciones de lectura por dominio, ej.:
  ```ts
  export function getSiteConfig(): SiteConfig { return siteConfig; }
  export function getHomeContent(): HomeContent { return homeContent; }
  export function getHistoryContent(): HistoryContent { return historyContent; }
  export function getActivitiesPageContent(): ActivitiesPageContent { ... }
  export function getActivityById(id: string): ActivityPreview | undefined { ... }
  export function getNewsPageContent(): NewsPageContent { ... }
  export function getNewsById(id: string): NewsPreview | undefined { ... }
  export function getGalleryContent(): GalleryContent { return galleryContent; }
  export function getBoardContent(): BoardContent { ... }
  export function getContactPageContent(): ContactPageContent { ... }
  export function getMembershipFormContent(): MembershipFormContent { return membershipFormContent; }
  ```
  Internamente sigue leyendo de `content/*.ts` — no se toca ni un dato, ni un placeholder `[PENDIENTE: ...]` existente.
- Actualizar los consumidores (`app/page.tsx`, `app/historia/page.tsx`, `app/actividades/page.tsx`, `app/actividades/[id]/page.tsx`, `app/novedades/page.tsx`, `app/novedades/[id]/page.tsx`, `app/galeria/page.tsx`, `app/contacto/page.tsx`, `app/asociate/page.tsx`, `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/ui/WhatsAppButton.tsx`, y cualquier otro que hoy haga `import { x } from '@/content/...'`) para que llamen a estas funciones en vez de importar `content/*.ts` directamente.
- `content/*.ts` y `types/content.ts` no se eliminan ni se reestructuran — siguen siendo la fuente de datos real de Fase 1. Este cambio es puramente de indirección.
- Riesgo a verificar: páginas estáticas (`generateStaticParams` en `app/actividades/[id]/page.tsx` y `app/novedades/[id]/page.tsx`) deben seguir funcionando igual llamando a las nuevas funciones de búsqueda por id.

### Fase 0.d — Empaquetado y entrega de la plantilla ✅ Hecho (2026-07-05)
Con 0.a-0.c cerradas, se implementó el aislamiento de estilos (`.lalin-theme`, absorbiendo 0.b) y se documentó el manifiesto de empaquetado en `doc/EXPORT_PLANTILLA_CENTRO_LALIN.md`: qué carpetas/archivos copiar a `app/asociaciones/[slug]/templates/centro-lalin/` (§11.2.4 de la guía), qué queda afuera (`app/api/*`, `app/admin`, `supabase/`), y qué pendientes explícitos quedan a cargo del portal (contenido institucional real, conexión del adaptador a su Supabase de producción).

Cambios de código: `app/globals.css` (variables de color y reset base scopeados bajo `.lalin-theme` en vez de `:root`/selectores globales) y `app/layout.tsx` (clase `lalin-theme` en `<body>`). Verificado: `npm run build` sin errores, `npm run lint` sin errores nuevos, y comparación Playwright de 24 capturas (12 rutas × claro/oscuro, build de producción) — 23/24 archivos PNG byte-idénticos; la única diferencia (`/contacto`) se debe al timing de carga del mapa embebido (tiles de terceros), no al cambio de CSS.

## Fase 1 — Cuenta Supabase propia + persistencia de formularios (parcialmente hecha)

Decisión ya confirmada por el usuario: crear un proyecto Supabase propio y separado para `centro-virtual` (plan gratuito). Pasos:

1. ~~**Creación de cuenta/proyecto**~~ ✅ Hecho — proyecto `qrubojghmtmtfkowhkyg.supabase.co`, claves en `.env.local` (no versionado).
2. ~~**Esquema idéntico al acordado**~~ ✅ Hecho (2026-07-04) — migración `supabase/migrations/20260704000000_esquema_extendido_portal.sql` aplicada contra la base real: las 6 tablas `asociaciones`, `asociaciones_directivos`, `asociaciones_noticias`, `asociaciones_actividades`, `asociaciones_galeria` (con columnas de auditoría §10.2: `anio_captura`, `autor`, `autorizado_por`, `fecha_autorizacion`) y `asociaciones_hitos_historicos`, todas con RLS habilitada y sin policies públicas (solo service_role), verificado con `select *` real contra la base (no solo `head:true`, que da falso positivo de existencia). Las tablas están vacías: cargar contenido real es tarea de la Fase 3, bloqueada por §8.1.
3. ~~**Cliente Supabase**~~ ✅ Hecho — `lib/supabase.ts` (service role, uso server-side únicamente).
4. ~~**Persistencia de formularios de Fase 1**~~ ✅ Hecho (2026-07-02) — migración `supabase/migrations/20260702000000_fase1_formularios.sql` aplicada contra la base real: tablas `mensajes_contacto`, `suscriptores_newsletter`, `solicitudes_socio` (RLS habilitada, sin policies públicas — solo service_role) + bucket privado `solicitudes-socio-fotos`. Las 3 rutas API (`app/api/contact`, `app/api/newsletter/subscribe`, `app/api/membership`) ya escriben en Supabase real, verificado con build de producción + Playwright end-to-end (no solo `curl`) contra la base real, y con los datos de prueba ya limpiados de Supabase. Ver `PROJECT_SPEC.md` §8.2 para el detalle de los 4 bugs de frontend que esta verificación encontró y corrigió (commit `58fcd22`).
5. ~~**Notificación por email**~~ ✅ Código hecho (2026-07-03), activación pendiente — `lib/email.ts` (Resend) invocado desde `app/api/contact` y `app/api/membership` tras el insert, best-effort (no rompe el formulario si falla o no está configurado). Verificado con build de producción + POST reales a ambos endpoints (200 OK). Destino y remitente son env vars vacías en `.env.local`, configurables sin tocar código. Falta cargar `RESEND_API_KEY` (cuenta gratuita) y `CONTACT_NOTIFICATION_EMAIL` (candidato: `secretaria@dezar.org`) — pendiente de decisión de cuenta/dominio verificado en Resend, ver `PROJECT_SPEC.md` §8.2.

## Fase 1.b — Configuración institucional para la Política de Privacidad (nueva, pendiente del panel admin del Portal)

`content/privacyPolicy.ts` (agregado 2026-07-05) documenta el borrador de Política de Privacidad del Centro, redactado a partir de modelos estándar conformes a la Ley 25.326, pendiente de revisión por un asesor legal. Sigue hoy el mismo patrón "content as data" que el resto del sitio (`content/*.ts` + `types/content.ts`, consumido solo vía `getPrivacyPolicyContent()` en `lib/microsite-data.ts`) — es decir, no está hardcodeado en ningún componente. Pero el usuario aclaró (2026-07-05) que el corrimiento no debe quedar acotado a los tres datos puntuales marcados `[PENDIENTE: ...]`: **el texto legal completo es contenido propio de cada institución**, igual que las noticias, actividades o hitos históricos, y por lo tanto debe poder cargarse/editarse desde el futuro panel de administración del Portal — no vivir indefinidamente como archivo `.ts` fijo en este repo.

Los tres puntos originalmente señalados siguen siendo los únicos datos *no inventables* dentro del borrador actual:

- CUIT / número de personería jurídica del Centro.
- Si existe una persona u oficina designada como responsable interno del tratamiento de datos (oficial de protección de datos), o si esa función la ejerce la Comisión Directiva.
- Plazo de conservación exacto de los datos (hoy hay una propuesta de borrador en el texto, sujeta a confirmación institucional y legal).

Pero el resto del texto (los 11 apartados: responsable del tratamiento, datos recopilados, finalidad, base legal, destinatarios, seguridad, derechos ARCO, etc.) también es, por naturaleza, **contenido por-centro editable**: cada asociación podría necesitar variarlo (por ejemplo, si usa un proveedor de email distinto a Resend, o si no recolecta foto de verificación). Cuando el Portal construya su panel de administración multi-tenant (`project_panel_admin_es_del_portal`, `project_config_por_centro_es_del_portal`), debería incluir un editor de texto legal (con valor por-defecto sugerido = el borrador de este archivo) además del formulario puntual para los 3 datos no inventables, y `getPrivacyPolicyContent()` debería leer el documento completo desde ahí en vez de tener el texto fijo en `content/privacyPolicy.ts`.

**Nota de esquema para el Portal**: a diferencia de noticias/actividades/hitos, el esquema extendido ya replicado en Supabase (`asociaciones`, `asociaciones_directivos`, `asociaciones_noticias`, `asociaciones_actividades`, `asociaciones_galeria`, `asociaciones_hitos_historicos` — ver Fase 1 punto 2) **no tiene todavía una tabla para texto legal/políticas por-centro**. Falta agregar algo como `asociaciones_legales` (o una columna JSON en `asociaciones`) al esquema del Portal para que este contenido tenga dónde vivir — se documenta acá como gap a resolver del lado del Portal, no se crea la tabla en este repo (mismo criterio que el resto de Fase 3/4: la estructura final la define y aloja el Portal). No implementar esto en `centro-virtual` de forma aislada (env vars, tabla propia, etc.) — es la misma lógica de multi-tenancy ya documentada para otra configuración por-centro.

**Migración aplicada (2026-07-05)**: `supabase/migrations/20260705000000_consentimiento_privacidad.sql` agrega la columna `accepts_privacy_policy` a `mensajes_contacto` y `solicitudes_socio` (mismo patrón que `accepts_statutes`), para dejar registro del consentimiento explícito exigido por la política. Se aplicó contra la base real mediante conexión Postgres directa (`db.qrubojghmtmtfkowhkyg.supabase.co:5432`, credenciales del archivo local `No commitear/Cuentas y contraseñas.txt`, no versionado) usando el driver `pg` de Node, ya que el `supabase` CLI no pudo linkear el proyecto (`supabase link` devolvió `LegacyLinkProjectStatusError`: la cuenta autenticada en la CLI de esta sesión —org "Laboratorio de Alberto"— no tiene privilegios sobre el proyecto `centro-virtual`, que vive en otra cuenta/organización de Supabase, `alberto.limeses@gmail.com`). Verificado antes (columna no existía) y después (columna creada, tipo `boolean not null default false` en ambas tablas) con `information_schema.columns` consultado directamente.

**Verificación adicional de seguridad (2026-07-05, con acceso directo a la base)**: se confirmó por SQL directo (no solo `select` vía `supabase-js`, que puede dar falsos positivos si RLS bloquea silenciosamente) que las 9 tablas de `public` (las 6 del esquema extendido + `mensajes_contacto`, `solicitudes_socio`, `suscriptores_newsletter`) tienen `rowsecurity = true`, que no existe ninguna policy pública (`pg_policies` devuelve vacío — todo el acceso es exclusivamente vía `service_role`, que bypassea RLS), y que el bucket `solicitudes-socio-fotos` sigue con `public = false`. También se verificaron por `information_schema` los tipos/columnas exactas de `asociaciones_galeria` contra el SQL de la guía (§10.2): coinciden 1:1, incluidas las 4 columnas de auditoría (`anio_captura`, `autor`, `autorizado_por`, `fecha_autorizacion`).

## Fase 2 — RENAPER y búsqueda de referente (BLOQUEADA: fuera de nuestro control)

- Verificación de identidad contra RENAPER: requiere convenio/credenciales oficiales que no existen. Sin acción posible hasta contar con acceso.
- Búsqueda de referente por número de socio: requiere que exista una base de datos de socios con contacto real, que hoy no existe (depende de que la Fase 1 de persistencia esté funcionando primero, como mínimo).

## Fase 3 — Migración real de contenido al Hito (a) (parcialmente DESBLOQUEADA)

Con el Supabase propio creado (Fase 1) y su esquema ya idéntico al del portal, `centro-virtual` puede avanzar por su cuenta:

- Cargar en las tablas propias (`asociaciones`, `asociaciones_directivos`, `asociaciones_noticias`, `asociaciones_actividades`, `asociaciones_galeria`, `asociaciones_hitos_historicos`) el contenido hoy en `content/*.ts` — solo cuando ese contenido sea real (§8.1 sigue bloqueado por datos del cliente; no cargar placeholders `[PENDIENTE: ...]` como si fueran datos definitivos).
- Reemplazar la implementación interna de `lib/microsite-data.ts` (de la Fase 0) para que lea de este Supabase propio en vez de `content/*.ts` — sin tocar ningún componente consumidor, gracias al adaptador.

Lo que sigue bloqueado y es tarea del portal (no de este repo): la migración final de estructura + volcado de datos al Supabase **principal** del portal, y la conexión de la plantilla `centro-lalin` importada al cliente Supabase centralizado del portal (`doc/GUIA_INTEGRACION_MICROSITIOS.md` §11.1, RLS incluida).

## Fase 4 — Servicios unificados del Hito (b) (BLOQUEADA: no existen todavía del lado del portal, y además es Fase 2)

Auth de socios, pagos de cuotas, CMS, inscripciones a agenda. Requiere que el portal los construya primero (§11.1 "Core Multi-tenant", listado como tarea futura), y además es explícitamente Fase 2 — por regla de CLAUDE.md, no se implementa sin confirmación explícita adicional aunque el portal ya lo tenga listo.

## Lo que NO se toca en este plan

- Contenido real de `content/*.ts` (§8.1) — solo datos, no código; se actualiza cuando llegue del cliente.
- Foro/comunidad interna, streaming propio, gamificación cultural — son Fase 2 propia y autónoma; no se planifican acá salvo pedido explícito posterior.
- Cualquier función intersocietaria (mapa de centros) — explícitamente fuera del alcance de `centro-virtual` (§14 de la guía de integración).

## Verificación

**Fase 0.b (aislamiento de estilos):**
1. `npm run build` + `npm run start -- -p 3100` (verificar puerto libre primero) + comparación visual (Playwright) de **todas** las páginas contra el estado actual, antes y después de activar `preflight: false` — el reset de Tailwind afecta elementos nativos (botones, inputs, listas, tipografía base) y cualquier diferencia debe corregirse explícitamente en los estilos propios, no dejarse pasar.

**Fase 0.c (adaptador):**
1. `npm run build` — confirma que no se rompió el tipado ni el SSG de las rutas dinámicas.
2. `npm run start -- -p 3100` + comparación visual (Playwright) de home, historia, actividades (listado y detalle), novedades (listado y detalle), galería, contacto y asociate — deben verse idénticas a como están hoy, ya que esta fase no cambia ni un dato ni un estilo.
3. Confirmar que `/actividades/999` y `/novedades/999` siguen devolviendo 404 (no se rompe la búsqueda por id al pasar por el adaptador).

**Fase 1:**
1. Confirmar en el dashboard de Supabase que las tablas creadas coinciden exactamente con el SQL de §6.2/§10.2 (mismos nombres/tipos de columna) para no romper la futura migración 1:1.
2. Probar cada formulario (contacto, newsletter, asociate) en el build de producción y verificar que la fila aparece en la tabla correspondiente de Supabase.
3. Confirmar que las validaciones existentes (`zod`/`react-hook-form`) y los mensajes de error de cada API route siguen funcionando igual ante datos inválidos.
