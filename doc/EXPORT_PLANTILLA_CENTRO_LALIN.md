# Manifiesto de exportación — Plantilla Centro Lalín, Agolada y Silleda

Preparado por `centro-virtual` para el equipo de **Portal Galicia Migrante**, cierre del Hito (a) del lado de `centro-virtual` (`doc/GUIA_INTEGRACION_MICROSITIOS.md` §11.2). Describe qué copiar, dónde, y qué queda pendiente del lado del portal.

## 1. Destino en el repositorio del portal

Según §11.2.4 y §15.3 de la guía, la plantilla se integra como una de las 2-3 opciones del catálogo cerrado, copiada a:

```
app/asociaciones/[slug]/templates/centro-lalin/
```

## 2. Qué copiar

| Origen (`centro-virtual`) | Destino sugerido dentro de `templates/centro-lalin/` | Notas |
|---|---|---|
| `components/` | `components/` | Todos los componentes de layout/sections/forms/ui. Sin dependencias externas al repo fuera de `content/` y `lib/microsite-data.ts`. |
| `content/*.ts` + `types/content.ts` | `content/` + `types/content.ts` | Contenido institucional actual (real + placeholders `[PENDIENTE: ...]`, ver §4 de este documento). |
| `lib/microsite-data.ts` | `lib/microsite-data.ts` | Único punto de lectura de datos (`getSiteConfig()`, `getHomeContent()`, etc.). El portal reemplaza su implementación interna para leer de su propio Supabase — **sin tocar los componentes consumidores**. |
| `app/*/page.tsx` (todas las rutas visuales: `/`, `/historia`, `/actividades`, `/actividades/[id]`, `/novedades`, `/novedades/[id]`, `/galeria`, `/contacto`, `/asociate`, `/directiva`, `/politica-de-privacidad`) | páginas equivalentes dentro de la plantilla, adaptadas al layout del portal | El portal decide cómo enrutarlas bajo `/asociaciones/[slug]/...`; no viajan como rutas Next.js de nivel raíz, sino como componentes de página dentro de la plantilla. |
| `app/globals.css` (bloque `.lalin-theme`, ver §3) | estilos de la plantilla | Solo el bloque de variables y reset scopeado — no el resto del archivo (ver §3). |
| `tailwind.config.ts` (bloque `colors`, `fontFamily`, `borderRadius`, `boxShadow`) | tokens de la plantilla | Paleta Atlántica/Oro Toxo/Terracota + tipografías Fraunces/Work Sans/IBM Plex Mono. |
| Fuentes (`next/font/google`: Fraunces, Work Sans, IBM Plex Mono) en `app/layout.tsx` | configuración de fuentes de la plantilla | Mismo patrón `next/font`, variables CSS `--font-fraunces`, `--font-work-sans`, `--font-ibm-plex`. |

**No viaja al portal** (específico de la operación autónoma de `centro-virtual`, no de la plantilla visual):
- `app/api/*` (contacto, membership, newsletter) — el portal usa sus propios servicios unificados (Hito b).
- `app/admin` (vacío, sin uso).
- `supabase/` (esquema y migraciones propias de desarrollo — el portal ya tiene su propio esquema extendido, ver §15.2 de la guía: exporta un volcado SQL/CSV en vez de copiar este directorio).

## 3. Aislamiento de estilos (`.lalin-theme`)

Resuelto (§15.1 de la guía): no se migró a CSS Modules ni se desactivó el *preflight* global de Tailwind. En su lugar, `app/globals.css` scopea las variables de color y el reset base bajo el selector `.lalin-theme` (commit del [fecha de hoy]), y `app/layout.tsx` aplica esa clase al `<body>`.

**Al integrar en el portal**: envolver el contenedor raíz de la plantilla (el nodo donde se monta el `children` de esta plantilla) en un elemento con `className="lalin-theme"`. Todo el CSS de colores/tipografía/reset de Centro Lalín queda confinado a ese subárbol y no compite con el tema propio del portal.

Las reglas a nivel `html` (`scroll-behavior: smooth`, `-webkit-font-smoothing`, `prefers-reduced-motion`) **no viajan** — son responsabilidad de quien monta el `<html>` raíz real (el propio root layout del portal), igual que hoy son responsabilidad de `app/layout.tsx` de `centro-virtual`.

Verificado visualmente (Playwright, build de producción, 12 rutas × claro/oscuro = 24 capturas): el scoping no introdujo ningún cambio visual respecto del estado anterior.

## 4. Contenido institucional real — pendiente, a cargo del portal

Varios campos de `content/*.ts` siguen con placeholders explícitos `[PENDIENTE: ...]` (fotos de galería, algunos textos históricos, datos de contacto de ejemplo). Por decisión del cliente (2026-07-05), completar este contenido real queda a cargo del equipo de **Portal Galicia Migrante** de acá en adelante, no de `centro-virtual`. El adaptador (`lib/microsite-data.ts`) no requiere cambios de código para recibir contenido real — solo reemplazar los valores en `content/*.ts` (o, una vez migrado a Supabase, las filas de las tablas `asociaciones_*`).

## 5. Conexión a Supabase — pendiente, fuera de esta entrega

`lib/microsite-data.ts` hoy lee de forma síncrona desde `content/*.ts`. Migrar su implementación interna para leer desde el Supabase del portal (esquema extendido ya definido en `doc/PLAN_INTEGRACION_SUPABASE.md` Fase 3 / `doc/GUIA_INTEGRACION_MICROSITIOS.md` §6.2 y §10.2) implica:
- Volver `async` las funciones `getX()` del adaptador.
- `components/layout/Header.tsx` y `components/ui/WhatsAppButton.tsx` son *client components* que hoy llaman al adaptador de forma síncrona en el cuerpo del componente — al volverse async, necesitan recibir esos datos como props desde un padre *server component*, no llamarlos directamente.

Este trabajo no está hecho todavía y queda fuera del alcance de esta entrega; se aborda cuando el portal esté listo para conectar su propio Supabase de producción.

## 6. Estado del Hito (a) — checklist final (`centro-virtual`)

| # | Tarea (§11.2) | Estado |
|---|---|---|
| 1 | Finalizar Fase 1 frontend | ✅ Hecho (2026-07-02) |
| 2 | Aislamiento de estilos (`.lalin-theme`) | ✅ Hecho (ver §3) |
| 3 | Adaptador de datos (`lib/microsite-data.ts`) | ✅ Hecho (2026-07-02) |
| 4 | Empaquetar y exportar la plantilla (este documento) | ✅ Hecho |

Con esto, el Hito (a) del lado de `centro-virtual` queda cerrado. Lo que sigue (§11.1 de la guía: migración SQL en el esquema del portal, RLS, enrutamiento dinámico `/asociaciones/[slug]`, carga de contenido real) es responsabilidad del equipo de Portal Galicia Migrante.
