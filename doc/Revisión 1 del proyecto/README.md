# Handoff: Centro Lalín, Agolada y Silleda — Rediseño de sede virtual

## Overview
Rediseño visual y de UX de la sede virtual del Centro Lalín, Agolada y Silleda (Diáspora Dezana en Buenos Aires), a partir del sitio Next.js ya construido por Claude Code. Cubre: Home, modo noche, patrón de listado de Actividades (con sidebar de Eventos/Novedades), formulario de Asociate como wizard de 4 pasos, y Comisión Directiva / Comisión Revisora de Cuentas.

## About the Design Files
Los archivos de este paquete son **referencias de diseño hechas en HTML** (un Design Component que corre standalone en el navegador) — prototipos que muestran el look & feel y el comportamiento esperado, **no son código de producción para copiar tal cual**. La tarea es **recrear este diseño dentro del código Next.js / Tailwind / TypeScript ya existente** en `centro-virtual/`, reutilizando sus componentes (`Header`, `Footer`, `Hero`, `Activities`, `Board`, `MembershipForm`, etc.), su sistema de contenido en `content/*.ts` y sus tipos en `types/content.ts` — no reescribir el proyecto desde cero.

## Fidelity
**Alta fidelidad (hifi)**: colores, tipografía, espaciado e interacciones están definidos. Los textos de ejemplo (nombres pendientes, noticias de comarca, reseñas de CV) están explícitamente marcados `[PENDIENTE: ...]` y deben mantenerse como placeholders reales hasta tener contenido institucional verdadero — no inventar datos.

## Screens / Views

### 1. Home
- **Header**: barra de anuncio oscura (`#081720`, texto oro `#C9A227`) sin mención de años/fecha de fundación. Header sticky con blur (`backdrop-filter: blur(10px)`, fondo `rgba(250,247,240,0.85)`). Logo circular 42px sin texto debajo. Nav de 5 links + **"Ingresar"** (link secundario, gris) — el CTA "Asociate" vive únicamente en la barra del hero, no se duplica en el nav. En tablet y móvil (breakpoint antes que hoy: colapsar por debajo de ~1024px, no solo en mobile) el nav se reemplaza por un botón hamburguesa que despliega un panel (incluye el link "Ingresar").
- **Hero**: carrusel real de 3 fotos (auto-avanza c/4.2s + dots clicables) alternando paisaje de Galicia (`banner.jpg`) y fotos del Centro en Buenos Aires (`coro.jpg`, `fiesta-cocido.jpg`), con overlay `linear-gradient(100deg, rgba(8,23,32,0.93) 25%, rgba(8,23,32,0.5) 80%)`. Título "Deza en Bos Aires." (Fraunces 600, 38px, blanco). Párrafo de bajada. Leyenda dinámica ("Ríos y praderas de la comarca de Deza" / etc.) en cápsula verde glass, en flujo normal debajo del párrafo (NO position:absolute — ver nota de bug abajo).
- **Barra de accesos (glass)**: cápsula `rgba(8,23,32,0.62)` + `backdrop-filter: blur(16px)`, con 3 quick-links a la izquierda y **un solo** CTA dorado "Asociate al Centro →" a la derecha (evitar repetir el mismo CTA en header + hero + barra, como hacía el sitio original).
- **Quiénes somos**: eyebrow + título + 2 párrafos cortos (institucional + territorio/paisaje) + 3 tarjetas de pilares (numeradas 01/02/03 en oro) + link "Conocé la historia completa →".
- **Próximas actividades**: grid de 3 tarjetas reales (Coro, Fiesta del Cocido, Alas para escribir) con imagen 150px, chip de categoría, título, descripción, fecha. Link "Ver todas las actividades →".
- **Noticias de la comarca**: 3 tarjetas (una por municipio: Lalín, Agolada, Silleda), acento verde, contenido marcado `[PENDIENTE]` — pensada para conectar a la diáspora con lo que pasa "allá".
- **CTA de asociación**: banda oscura de ancho completo, un solo botón dorado.
- **Autoridades (teaser)**: NO mostrar solo al presidente — mostrar un grupo genérico de 4 círculos de color + "24 socios elegidos por la asamblea conducen la institución" + link "Ver la Comisión Directiva completa →".
- **Footer**: 3 columnas (Secciones, Contacto, Newsletter). Iconos de Instagram (gradiente oficial) y Facebook (#1877F2) en círculos 42px con sus colores de marca reales, no monocromo. Línea de créditos: "© 2026 Galicia Migrante" + "by PLM Systems" (wordmark de texto, sin logo real todavía).

### 2. Modo noche (propuesta)
Fondo `#0B1A20`, superficies `#13272F`, texto `#F3EFE3`, oro más luminoso `#E0BB4E` para mantener contraste. No es una simple inversión de colores — mismo sistema tipográfico y de jerarquía.

### 3. Patrón — Actividades (listado)
- Vista "agenda" (lista cronológica, no grid de tarjetas): franja "Cuándo" a la izquierda, thumbnail 56px, categoría + tag Actividad (verde)/Evento (terracota), título, descripción.
- **Layout de 2 columnas en desktop**: agenda a la izquierda (2fr), sidebar a la derecha (1fr) con "Próximos eventos" arriba (destacado, fondo oscuro) y "Novedades" debajo (con "Leer más →" por ítem). En tablet/móvil se apilan en una columna.

### 4. Patrón — Asociate (formulario en 4 pasos)
Wizard con stepper (puntos + labels), en este orden: **Datos personales → Domicilio → Nacionalidad → Confirmación**.
- Datos personales: Nombres, Apellidos, Tipo de documento (select), Número de documento, Estado civil (select), Cónyuge, Hijos, Profesión.
- Domicilio: Calle, Número, Piso, Depto., Localidad, Código postal, Teléfono, Teléfono móvil, Mail.
- Nacionalidad: País de nacimiento (select), Provincia (select), **Concello / Municipio** (select — renombrado desde "Concello" para claridad en Argentina), Localidad, Fecha de nacimiento (con ícono de calendario), ¿Nativo/hijo/nieto de gallego? (select), **Empadronamiento en España** como toggle Sí/No de un solo tap (no dropdown — es más rápido para un campo binario).
- Confirmación: Socio que presenta (opcional), captura de foto, checkbox de declaración (con tilde real, clicable), botón "Enviar solicitud".
- Botones: "← Atrás" (texto) y "Continuar →" (dorado) en cada paso salvo el último, que muestra "Enviar solicitud" (negro).

### 5. Comisión Directiva / Comisión Revisora de Cuentas
Dos cuerpos separados (no mezclados bajo "Autoridades" genérico):
- **Comisión Directiva** (21 cargos), orden jerárquico: Presidente, Vicepresidente, Secretario, Tesorero, Prosecretaria, Protesorera, Secretaria de Actas, Vocales Titulares (8), Vocales Suplentes (6).
- **Comisión Revisora de Cuentas** (3 cargos): Revisor de Cuentas Titular, Revisor de Cuentas Suplente (x2).
- Sin tarjetas: filas con avatar circular 64px (ícono de silueta genérica en blanco sobre fondo de color — no vacío ni foto real todavía), nombre completo + cargo + mandato al centro, reseña breve `[PENDIENTE: reseña breve]` a la derecha.
- **2 columnas en desktop, 1 en tablet/móvil**, llenado por columna (no por fila): la columna izquierda se llena primero con los cargos de mayor jerarquía, los vocales quedan debajo y en la columna derecha.
- Nunca destacar solo al presidente por separado del resto (evitar la teaser "individual" que sí existía en la primera versión).

## Interactions & Behavior
- **Carrusel del hero**: auto-avanza cada 4.2s (`setInterval`), dots clicables para saltar manualmente.
- **Selector de viewport** (herramienta de la revisión, no del sitio final): Escritorio (1180px) / Tablet (834px) / Móvil (390px) — cambia el ancho del frame y colapsa el nav a hamburguesa por debajo de desktop.
- **Wizard de Asociate**: navegación Atrás/Continuar sin recargar, solo el paso activo visible.
- **Toggle Empadronamiento en España**: Sí/No, un tap, estado visual claro (fondo oscuro = seleccionado).
- **Checkbox de declaración**: clicable, se llena de verde con tilde blanca al marcar.

## Bug fijado (importante para no repetirlo)
La leyenda del hero (cápsula verde con el nombre del lugar) **no debe ir en `position: absolute` pegada al fondo del hero** — si el párrafo de arriba crece (por ejemplo en pantallas angostas), se superpone con el texto. Debe ir en flujo normal, después del párrafo, con `margin-top`.

## Design Tokens

### Colores (modo día)
- `--paper: #FAF7F0` (fondo principal)
- `--paper-2: #F0EBDD` (fondo alterno de secciones)
- `--surface: #FFFFFF` (tarjetas)
- `--ink: #1C2321` (texto principal)
- `--text-secondary: #6E6A5E` / `#4A473E` (párrafos)
- `--atlantic: #0E2A38` (marca, headers, footer)
- `--atlantic-deep: #081720` (anuncio, footer oscuro, overlays)
- `--gold: #C9A227` (eyebrows, chips) / `--gold-bright: #D9B23C` (CTAs sobre fondo oscuro)
- `--terracota: #B4502E` (eyebrows secundarios — del README original, no usado hasta ahora)
- `--green: #3F6B4A` (acento de "territorio"/paisaje, Comisión Revisora)
- `--line: #DCD6C6` / `#E4DECD` (bordes)

### Colores (modo noche)
- `--bg: #0B1A20`, `--surface: #13272F`, `--ink: #F3EFE3`, `--text-secondary: #9CA39D` / `#C7C4B8`, `--gold: #E0BB4E`, `--line: rgba(255,255,255,0.12)`

### Tipografía
- Display/headings: **Fraunces** 500/600/700 (Google Fonts)
- Cuerpo: **Work Sans** 400/500/600/700
- Eyebrows/mono/labels: **IBM Plex Mono** 400/500, uppercase, letter-spacing ~0.2–0.3em

### Radios y sombras
- Tarjetas: `border-radius: 10–12px`
- Botones: `border-radius: 7–8px`
- Frame/contenedores grandes: `border-radius: 16px`
- Sombra de tarjeta: `0 4px 16px rgba(14,42,56,0.08)`
- Sombra de frame: `0 30px 70px rgba(14,42,56,0.18)`

## Assets
- `assets/banner.jpg` — paisaje real de la comarca de Deza (río, praderas, casas con techos de tejas).
- `assets/logo.jpg` — escudo/crest del Centro (fondo blanco).
- `assets/coro.jpg`, `assets/fiesta-cocido.jpg`, `assets/taller-literario.jpg` — fotos reales de actividades del Centro en Buenos Aires.
- Iconos de Instagram y Facebook: SVG inline con los colores/gradientes de marca oficiales (no requieren archivo externo).

### 6. Login y portal de socios (Fase 2 — concepto, NO implementar sin confirmación)
Marcado explícitamente como propuesta conceptual, no como spec cerrado — el propio `PROJECT_SPEC.md` dice que Fase 2 (app, pagos, streaming) no arranca sin confirmación explícita del cliente.
- **Configuración del administrador**: panel con 3 switches reales (Biométrico / Número de socio + DNI / Email y contraseña) — el admin decide qué métodos de login están habilitados. La pantalla de login de abajo reacciona a estos switches (si ninguno está activo, muestra un aviso).
- **Pantalla de login**: logo + "Ingresá a tu cuenta", con hasta 3 bloques según los métodos habilitados: botón "Ingresar con Face ID / huella", formulario Número de socio + DNI, formulario Email + contraseña. Link inferior "¿Todavía no sos socio? Asociate →".
- **Entry point real**: link "Ingresar" en el header (desktop y menú móvil), separado del CTA "Asociate" — antes no existía ningún punto de entrada al login.
- **Portal del socio** (preview): saludo personalizado, **carnet digital** (tarjeta con gradiente atlántico, nombre, N° de socio, categoría, vigencia y un QR placeholder), y 2 accesos: "Pagar cuota" (con estado "Al día"), "Reservar salón/restó".
- **Panel del autorizado** (preview): "Solicitudes de socio pendientes" (con badge de cantidad), "Socios y estado de cuotas" (resumen), "Cargar actividad o novedad" (acceso directo).
- Funciones priorizadas para socio: pago de cuotas, carnet digital, reserva de salón/restó. Funciones priorizadas para admin: aprobar/rechazar solicitudes, ver listado de socios y cuotas, cargar actividades/novedades. El resto (streaming, mapa de centros, gamificación cultural, etc. del spec original de Fase 2) queda fuera de este alcance por ahora.

## Bugs fijados durante la revisión (importante para no repetirlos)
1. La leyenda del hero (cápsula verde con el nombre del lugar) **no debe ir en `position: absolute` pegada al fondo del hero** — si el párrafo de arriba crece (pantallas angostas), se superpone con el texto. Debe ir en flujo normal, después del párrafo, con `margin-top`.
2. El swatch de modo noche mostraba una sola tarjeta de actividad angosta dejando un vacío enorme al lado — debe mostrar las 3 actividades reales en grid, igual que en modo día.
3. Nunca duplicar el mismo CTA en dos lugares muy próximos (ej. "Asociate" en el nav Y en la barra del hero a la vez) — un solo CTA dorado por vista.

## Files
- `Revisión de diseño.dc.html` — el diseño completo (Design Component). Ábrelo en el navegador para ver/interactuar con todos los patrones descriptos arriba.
- Carpeta `assets/` con las imágenes reales usadas.
- `support.js` — runtime necesario para que el `.dc.html` corra standalone en el navegador (no es parte del diseño en sí, es infraestructura del prototipo).
