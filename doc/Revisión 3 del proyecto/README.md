# Handoff: Centro Lalín, Agolada y Silleda — Rediseño de sede virtual

## ⚠️ CUMPLIMIENTO OBLIGATORIO DEL DISEÑO — LEER ANTES DE EMPEZAR
Este diseño **debe respetarse tal cual está especificado, sin el más mínimo desvío**. No es una guía orientativa ni un punto de partida para "interpretar" o "mejorar" — es la especificación final aprobada por el cliente. Esto incluye, sin excepción:
- **Colores**: los valores hex exactos listados en "Design Tokens" — no aproximaciones, no otros tonos de la paleta de Tailwind, no "colores parecidos".
- **Tipografía**: familias, pesos, tamaños y letter-spacing exactos — Fraunces / Work Sans / IBM Plex Mono, en los pesos y tamaños indicados.
- **Espaciado, radios, sombras**: los valores de `border-radius`, `padding`, `gap` y sombras documentados abajo.
- **Estructura y orden de las secciones**: el orden de cada página, el orden del nav, el orden de los pasos del formulario de Asociate, el orden jerárquico de la Comisión Directiva — todo tal cual se detalla acá.
- **Copy exacto**: los textos ya redactados (títulos, CTAs, microcopy) se usan literalmente, no se parafrasean.
- **Comportamiento**: el modo noche automático (no manual), el wizard de 4 pasos, el carrusel del hero, los switches de login — se implementan exactamente como se describen.

Si algo en este documento genera dudas o parece necesitar un ajuste, **se consulta antes de implementar una alternativa** — no se decide unilateralmente en el código. Cualquier desvío del diseño (por pequeño que parezca: un color levemente distinto, un espaciado "parecido", un orden de nav diferente) se considera un defecto de implementación, no una variación aceptable.

## ⚠️ Los "Patrones" NO incluyen Header/Footer — a propósito, no es que esas páginas no los lleven
Las secciones marcadas "Patrón — página /actividades", "Patrón — Comisión Directiva", "Patrón — Asociate", "Patrón — Historia", "Patrón — Novedades", "Patrón — Galería", "Patrón — Contacto", "Patrón — Login y portal" y las subpáginas de portal/admin **muestran solo el contenido específico de esa página**, sin repetir el Header ni el Footer, para no duplicar los mismos elementos doce veces en este documento de revisión y mantener el foco en lo que cada patrón demuestra.

**Esto NO significa que esas páginas vayan sin navegación en el sitio real.** Todas y cada una de esas páginas llevan el mismo Header (con nav, franja de portal y logo del Centro) y el mismo Footer que están completos en las secciones "Home — propuesta" y "Modo noche — propuesta" de este documento. Al implementarlas, envolver el contenido de cada patrón con esos mismos componentes `Header` y `Footer` ya existentes en el código — nunca dejar una página "pelada".

## Overview
Rediseño visual y de UX de la sede virtual del Centro Lalín, Agolada y Silleda (Diáspora Dezana en Buenos Aires), a partir del sitio Next.js ya construido por Claude Code. Cubre: Home, modo noche, patrón de listado de Actividades (con sidebar de Eventos/Novedades), formulario de Asociate como wizard de 4 pasos, y Comisión Directiva / Comisión Revisora de Cuentas.

## About the Design Files
Los archivos de este paquete son **referencias de diseño hechas en HTML** (un Design Component que corre standalone en el navegador) — prototipos que muestran el look & feel y el comportamiento esperado, **no son código de producción para copiar tal cual**. La tarea es **recrear este diseño dentro del código Next.js / Tailwind / TypeScript ya existente** en `centro-virtual/`, reutilizando sus componentes (`Header`, `Footer`, `Hero`, `Activities`, `Board`, `MembershipForm`, etc.), su sistema de contenido en `content/*.ts` y sus tipos en `types/content.ts` — no reescribir el proyecto desde cero.

## Fidelity
**Alta fidelidad (hifi)**: colores, tipografía, espaciado e interacciones están definidos. Los textos de ejemplo (nombres pendientes, noticias de comarca, reseñas de CV) están explícitamente marcados `[PENDIENTE: ...]` y deben mantenerse como placeholders reales hasta tener contenido institucional verdadero — no inventar datos.

## Screens / Views

### 1. Home
- **Franja de portal**: barra fina azul (`#003B73`) alineada a la derecha, arriba de todo: ícono circular de Galicia Migrante + "Un micrositio del portal Galicia Migrante". Debajo, una franja divisoria oscura de solo 8px (sin texto — reemplaza al viejo aviso "Más de 44 años...").
- **Header**: barra de anuncio oscura (`#081720`, texto oro `#C9A227`) sin mención de años/fecha de fundación. Header sticky con blur (`backdrop-filter: blur(10px)`, fondo `rgba(250,247,240,0.85)`). Logo del Centro **grande (60px)** + nombre completo en 22px — es la identidad principal de esta página, el portal queda como franja secundaria arriba. Nav de 5 links + **"Ingresar"** (link secundario, gris) — el CTA "Asociate" vive únicamente en la barra del hero, no se duplica en el nav. En tablet y móvil (breakpoint antes que hoy: colapsar por debajo de ~1024px, no solo en mobile) el nav se reemplaza por un botón hamburguesa que despliega un panel (incluye el link "Ingresar").
- **Hero**: carrusel real de 3 fotos (auto-avanza c/4.2s + dots clicables) alternando paisaje de Galicia (`banner.jpg`) y fotos del Centro en Buenos Aires (`coro.jpg`, `fiesta-cocido.jpg`), con overlay `linear-gradient(100deg, rgba(8,23,32,0.93) 25%, rgba(8,23,32,0.5) 80%)`. Título "Deza en Bos Aires." (Fraunces 600, 45px, blanco) — el tamaño está calculado para que su ancho renderizado coincida con el ancho del párrafo de abajo (~385px), no es arbitrario. Párrafo con **saltos de línea manuales** (3 líneas fijas, no depende del wrap automático del navegador) y `text-align: justify`, `max-width` igual al ancho del título. Leyenda dinámica ("Ríos y praderas de la comarca de Deza" / etc.) en cápsula verde glass, en flujo normal debajo del párrafo (NO position:absolute — ver nota de bug abajo).
- **Barra de accesos (glass)**: cápsula `rgba(8,23,32,0.62)` + `backdrop-filter: blur(16px)`, con 3 quick-links a la izquierda y **un solo** CTA dorado "Asociate al Centro →" a la derecha (evitar repetir el mismo CTA en header + hero + barra, como hacía el sitio original).
- **Quiénes somos**: eyebrow + título + 2 párrafos cortos (institucional + territorio/paisaje) + 3 tarjetas de pilares (numeradas 01/02/03 en oro) + link "Conocé la historia completa →".
- **Hito destacado — Alfonsín / hermanamiento con Chascomús**: tarjeta en tono óxido/corten (inspirada en los mojones reales del "Paseo Lalín" en Chascomús), año 1981 en grande, título "El asilo de la democracia", texto real e investigado (ver sección dedicada más abajo). Va entre "Quiénes somos" y "Próximas actividades".
- **Próximas actividades**: grid de 3 tarjetas reales (Coro, Fiesta del Cocido, Alas para escribir) con imagen 150px, chip de categoría, título, descripción, fecha. Link "Ver todas las actividades →". La tarjeta de Fiesta del Cocido usa el acento terracota (overlay + tag) en vez del navy genérico — guiño gastronómico/festivo sin salir de la paleta existente.
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

## Galicia Migrante — relación de portal (IMPORTANTE, confirmado por el cliente)
Galicia Migrante es un **portal** sobre la diáspora gallega; el Centro Lalín será uno de varios **micrositios** alojados dentro de ese portal. Por eso:
- El header y el nav siguen siendo 100% del Centro (su propia identidad, su propia navegación) — el portal NO reemplaza al header.
- La relación se muestra únicamente en la franja fina de arriba ("Un micrositio del portal Galicia Migrante") y en el logo del footer — nunca mezclando la marca del portal con el nav o el copy específico del Centro (se probó ponerlo en el header y generaba confusión: nav de Centro Lalín bajo un header que decía "Galicia Migrante").
- Colores reales del portal (de su repo real, no inventados): `--galicia-blue: #0066CC`, `--galicia-dark: #003B73`, `--galicia-gold: #C8A96B` — casi idéntico al oro toxo del Centro, por eso no hay choque de paleta.
- **No recomendado**: adoptar la estética completa de otros productos del portal (ej. un Prode/pronósticos deportivos existente, con fondo oscuro tipo gaming, fotos de estadio, glass agresivo). Esa estética sirve a un producto de entretenimiento, no a una institución cultural — aplicarla al Centro arriesga espantar a socios mayores sin necesariamente ganar más jóvenes.

## Investigación histórica — Alfonsín y el hermanamiento con Chascomús (IMPORTANTE, contenido real verificado)
Esto no estaba en `content/history.ts` (que hoy termina en 1992) y es un diferencial institucional enorme — vale la pena sumarlo al sitio real, no solo dejarlo en este mockup.

**Hechos verificados por búsqueda web** (fuentes: diariodepontevedra.es, cronicasdelaemigracion.com, chascomus.gob.ar, laregion.es, fundacionrrojas.org.ar — diciembre 2024 a marzo 2023):
- Raúl Ricardo Alfonsín (primer presidente de la restauración democrática argentina, 1983) era nieto de un gallego emigrado desde Ribadumia, y su ciudad natal es Chascomús (provincia de Buenos Aires).
- Durante la última dictadura militar, cuando las reuniones políticas estaban prohibidas y eran riesgosas, el Centro Lalín, Agolada y Silleda le abrió sus puertas a Alfonsín para reunirse en la clandestinidad con su partido y simpatizantes.
- Alfonsín prometió que, si llegaba a presidente, visitaría Lalín (Galicia) en su primer viaje oficial al exterior — y lo cumplió.
- Chascomús y Lalín están oficialmente hermanadas (ciudades hermanas) desde el **19 de marzo de 1988**. Existe un Cruceiro gallego en Chascomús, un "Parque Chascomús" en Lalín (Galicia) y un "Paseo Lalín" en Chascomús (una serie de mojones de acero corten con hitos históricos año por año — la inspiración visual de la tarjeta que armé).
- El Centro tiene una **"Sala Presidente Raúl Alfonsín"** (inaugurada en 2023, 40° aniversario del retorno de la democracia) y una placa conmemorativa en la entrada.
- Cada año se celebra la "Fiesta del Cocido" en el Centro, evento al que asisten autoridades de Chascomús en el marco de este vínculo.

**Recomendación**: sumar estos hitos (1981, 1983, 1988, 2023) a `content/history.ts` junto a los ya existentes (1908–1992), y considerar una sección o página dedicada a "Alfonsín y la democracia" — es un contenido único que ningún otro centro gallego en Argentina puede contar. Verificar los datos con la Comisión Directiva antes de publicar (esto es investigación de fuentes públicas, no información oficial del Centro).

## Modo noche — activación automática (no manual)
No hay switch de "día/noche" en la UI a propósito: debe activarse solo, siguiendo la preferencia del sistema operativo/navegador del usuario, vía la media query CSS `prefers-color-scheme: dark` (en Tailwind: variante `dark:` con `darkMode: 'media'`, o `class` + un listener de `matchMedia` si más adelante se quiere permitir override manual). No pedirle al usuario que elija entre día/noche como acción explícita — es fricción innecesaria cuando el sistema operativo ya sabe la preferencia.

## Páginas nuevas agregadas (con lorem ipsum / lorem picsum donde no había contenido real — marcado explícitamente)
Se agregaron todas las páginas de destino que faltaban, para que ningún link del nav quede sin pantalla:
- **/historia**: timeline vertical con los hitos reales (1908–1992) + los de Alfonsín/Chascomús (1981, 1988, 2023) integrados cronológicamente.
- **/novedades**: listado completo — 3 ítems reales + 2 de ejemplo con lorem ipsum e imágenes de lorem picsum, marcados `[PENDIENTE]`.
- **/galería**: grid con las 4 fotos reales del Centro + 4 de relleno con lorem picsum, marcadas `[PENDIENTE: foto real]`.
- **/contacto**: formulario (Nombre, Email, Mensaje) + datos reales de contacto (email, dirección) + placeholder de mapa.
- **/actividades/:id** y **/novedades/:id**: un ejemplo de cada detalle, con lorem ipsum en el cuerpo extendido.
- **Portal del socio — subpáginas** (Fase 2, concepto): Pagar cuota, Mi carnet (versión completa), Reservar salón/restó — con datos de ejemplo.
- **Panel del autorizado — subpáginas** (Fase 2, concepto): Solicitudes de socio (aprobar/rechazar), Socios y estado de cuotas, Cargar actividad o novedad — con nombres de ejemplo (lorem ipsum, no socios reales).

Todo el contenido de ejemplo/placeholder está marcado explícitamente (`[PENDIENTE]`, "Ejemplo", "lorem ipsum") — no reemplaza investigación real, es solo para completar la maqueta visual.

## Bugs fijados durante la revisión (importante para no repetirlos)
1. La leyenda del hero (cápsula verde con el nombre del lugar) **no debe ir en `position: absolute` pegada al fondo del hero** — si el párrafo de arriba crece (pantallas angostas), se superpone con el texto. Debe ir en flujo normal, después del párrafo, con `margin-top`.
2. El swatch de modo noche mostraba una sola tarjeta de actividad angosta dejando un vacío enorme al lado — debe mostrar las 3 actividades reales en grid, igual que en modo día.
3. Nunca duplicar el mismo CTA en dos lugares muy próximos (ej. "Asociate" en el nav Y en la barra del hero a la vez) — un solo CTA dorado por vista.
4. No mezclar la marca del portal (Galicia Migrante) con el header/nav del Centro — probado y descartado, ver sección de arriba.

## Files
- `Revisión de diseño.dc.html` — el diseño completo (Design Component). Ábrelo en el navegador para ver/interactuar con todos los patrones descriptos arriba.
- Carpeta `assets/` con las imágenes reales usadas.
- `support.js` — runtime necesario para que el `.dc.html` corra standalone en el navegador (no es parte del diseño en sí, es infraestructura del prototipo).
