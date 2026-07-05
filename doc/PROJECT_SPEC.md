# Sede Virtual — Centro Lalin, Agolada y Silleda - Social, Cultural y Recreativo

## 1. Resumen del proyecto

Plataforma digital para Centro Lalin, Agolada y Silleda - Social, Cultural y Recreativo, con más de 120 años de historia. El objetivo es crear una "sede virtual" que recupere el vínculo con las nuevas generaciones de descendientes (18-45 años), que mantienen interés en sus raíces culturales pero no encuentran en el formato tradicional del Centro un espacio de expresión adecuado.

El proyecto se construye en **dos fases independientes y secuenciales**:

- **Fase 1 — Sitio web institucional** (MVP, prioridad alta)
- **Fase 2 — Aplicación interactiva / comunidad** (evolución sobre la Fase 1)

Este documento es la especificación funcional y técnica de referencia para el desarrollo. Se recomienda implementar primero la Fase 1 completa, validarla, y recién después iniciar la Fase 2.

---

## 2. Usuarios / audiencia

| Perfil | Descripción | Necesidad principal |
|---|---|---|
| Descendiente joven no socio | 18-45 años, interés cultural, sin vínculo formal | Descubrir el Centro, entender qué se ofrece, contactar/asociarse fácil |
| Socio actual | Mayormente adultos mayores | Información de actividades, cuotas, novedades |
| Comisión directiva | Administra la institución | Publicar contenido, gestionar socios, ver métricas básicas |
| Visitante general | Público interesado en cultura gallega | Ver eventos, historia, contacto |

---

## 3. Fase 1 — Sitio web institucional

### 3.1 Objetivo
Establecer presencia digital profesional, informativa y con captación de contacto/asociación.

### 3.2 Alcance funcional (páginas/secciones)

1. **Home** — presentación institucional, próximos eventos destacados, CTA de asociación.
2. **Institucional / Historia** — reseña histórica (120+ años), autoridades, comisión directiva.
3. **Actividades y calendario de eventos** — listado filtrable por tipo (danza, gaita, idioma, gastronomía, charlas).
4. **Novedades / Blog cultural** — artículos breves (efemérides, música, gastronomía, idioma gallego).
5. **Galería** — fotos históricas y de eventos recientes.
6. **Asociate** — formulario de inscripción de nuevos socios (datos personales, envío por email o guardado en base de datos).
7. **Contacto** — formulario de contacto, ubicación (mapa embebido), redes sociales, WhatsApp/teléfono.
8. **Newsletter** — suscripción por email (integración con proveedor tipo Mailchimp/Brevo, o guardado simple en base de datos para exportar).

### 3.3 Requisitos no funcionales
- Responsive (mobile-first; gran parte del público joven navegará desde celular).
- SEO básico (metatags, sitemap, datos estructurados de organización).
- Panel de administración simple para que la comisión directiva pueda cargar eventos y novedades sin tocar código (CMS headless o panel propio mínimo).
- Tiempo de carga rápido; imágenes optimizadas (muchas fotos históricas y de archivo).
- Accesibilidad básica (contraste, alt en imágenes, navegación por teclado).

### 3.4 Stack sugerido
- **Frontend:** Next.js (React) + Tailwind CSS.
- **CMS de contenido:** opción simple — un CMS headless (ej. Sanity, Strapi) o un panel admin propio con autenticación básica para 2-3 usuarios (comisión directiva).
- **Base de datos:** PostgreSQL (o SQLite si el volumen es bajo y se prioriza simplicidad de hosting).
- **Formularios:** guardado en base de datos + notificación por email (ej. Resend, SendGrid).
- **Hosting:** Vercel (frontend) + proveedor de base de datos gestionado (ej. Supabase, Neon).
- **Redes sociales:** integración liviana — embeber feed de Instagram o simplemente enlazar, sin dependencia técnica pesada.

> Nota: el stack es una sugerencia inicial razonable para un proyecto de este tamaño y presupuesto acotado. Claude Code puede ajustar herramientas concretas según lo que se defina al iniciar el proyecto (por ejemplo, si ya existe hosting o dominio contratado).

### 3.5 Modelo de datos (borrador)

```
Evento
- id, titulo, descripcion, tipo (danza|gaita|idioma|gastronomia|charla|otro)
- fecha_inicio, fecha_fin, ubicacion, imagen, activo

Novedad (blog)
- id, titulo, contenido, imagen_portada, fecha_publicacion, autor

Socio (solicitud de asociación)
- id, nombre, apellido, email, telefono, mensaje, fecha_solicitud, estado (pendiente|aprobado|rechazado)

SuscriptorNewsletter
- id, email, fecha_alta

MensajeContacto
- id, nombre, email, mensaje, fecha
```

### 3.6 Criterios de aceptación (MVP)
- [ ] El sitio funciona correctamente en mobile y desktop.
- [ ] La comisión directiva puede publicar un evento o novedad sin ayuda técnica.
- [ ] Un visitante puede completar el formulario de asociación y de contacto, y ambos llegan por email a la institución.
- [ ] El sitio tiene página de historia, actividades y galería con contenido real cargado.
- [x] SEO básico configurado (título, descripción, sitemap). **Hecho (2026-07-03)**: metatags por página + `app/sitemap.ts` + `app/robots.ts` ya existían; se agregó el dato estructurado `schema.org/Organization` (JSON-LD) que faltaba en `app/layout.tsx`, usando solo campos ya cargados en `content/site.config.ts` (sin inventar dirección estructurada calle/ciudad/CP que no existe como tal en el contenido). Verificado: build de producción + Playwright confirmando que el script parsea como JSON válido y que no hay regresión visual en la home.

---

## 4. Fase 2 — Aplicación interactiva / comunidad

### 4.1 Objetivo
Profundizar el vínculo iniciado en la Fase 1, dando a los socios y descendientes un espacio interactivo y regular de participación.

### 4.2 Alcance funcional

> Nota (2026-07-02): tras la definición del punto de encuentro con el **Portal Galicia Migrante** (ver `doc/GUIA_INTEGRACION_MICROSITIOS.md` §6-14), los puntos 1, 3, 5 y 8 se resuelven consumiendo servicios unificados del portal en vez de construirse de forma independiente en este repo; el punto 6 pasa a ser competencia exclusiva del portal y se retira del alcance de `centro-virtual`. El detalle está en la sección 4.6.

1. **Cuenta de usuario / perfil** — registro, login, datos básicos, foto. *(Vía servicio de autenticación unificado del portal — ver 4.6.)*
2. **Comunidad interna** — muro o foro acotado a usuarios registrados (posts, comentarios, moderación). *(Autónomo de `centro-virtual`.)*
3. **Agenda con inscripción** — anotarse a clases/eventos (cupo, lista de espera). *(Vía servicio de inscripciones unificado del portal — ver 4.6.)*
4. **Streaming de eventos** — transmisión en vivo o video bajo demanda de actos institucionales (integración con YouTube Live / Vimeo, no desarrollo propio de streaming). *(Autónomo de `centro-virtual`.)*
5. **Gestión de cuotas societarias** — estado de cuenta y pago online (integración con pasarela de pago local, ej. Mercado Pago). *(Vía pasarela de pagos unificada del portal — ver 4.6.)*
6. ~~**Mapa de centros gallegos** — directorio/mapa de otras instituciones similares en el país.~~ *(Retirado del alcance de `centro-virtual`: cualquier función que conecte o agrupe a más de una asociación es competencia exclusiva del Portal Galicia Migrante — ver 4.6 y `doc/GUIA_INTEGRACION_MICROSITIOS.md` §14.)*
7. **Contenido cultural interactivo** — mini-recursos de idioma gallego, trivia o gamificación ligera vinculada a historia/tradiciones. *(Autónomo de `centro-virtual`.)*
8. **Notificaciones** — push o email ante nuevos eventos/novedades relevantes para el usuario. *(Vía CMS/servicios unificados del portal donde aplique — ver 4.6.)*

### 4.3 Requisitos no funcionales
- Autenticación segura (email+contraseña u OAuth).
- Escalabilidad moderada (no se espera alto volumen, pero sí picos en eventos puntuales con streaming).
- Cumplimiento básico de protección de datos personales (Ley 25.326 en Argentina) para el manejo de datos de socios y pagos.

### 4.4 Stack sugerido
- Reutilizar base de Next.js de la Fase 1, sumando:
  - Autenticación, pagos, CMS e inscripciones a agenda: servicios unificados del Portal Galicia Migrante (ver 4.6) en vez de NextAuth/Mercado Pago propios.
  - Streaming: embeber YouTube Live o Vimeo (evitar infraestructura propia de video) — desarrollo autónomo de `centro-virtual`.
  - Comunidad interna / foro y gamificación cultural: desarrollo autónomo de `centro-virtual`, stack a definir en su momento.
  - Notificaciones: email transaccional (Resend) +, si se justifica, push web.

### 4.5 Criterios de aceptación (MVP Fase 2)
- [ ] Un socio puede crear cuenta, iniciar sesión y ver su perfil (vía el servicio unificado del portal).
- [ ] Un socio puede inscribirse a una actividad desde la agenda (vía el servicio unificado del portal).
- [ ] Existe un espacio de comunidad con al menos publicaciones y comentarios moderables (desarrollo propio).
- [ ] Es posible ver el estado de cuota y, si se define, pagarla online (vía el servicio unificado del portal).

### 4.6 Integración con Portal Galicia Migrante

`centro-virtual` se integra como micrositio del **Portal Galicia Migrante** (ambos proyectos del mismo propietario). El detalle completo de la negociación de alcance está documentado en `doc/GUIA_INTEGRACION_MICROSITIOS.md` (secciones 6 a 14); acá queda el resumen aplicable a esta spec:

- **Hito (a) — migración de datos y visualización dinámica**: `centro-virtual` termina la maquetación visual de Fase 1 con su identidad propia (tipografías/paleta ya definidas, sin cambios) y migra su contenido de `content/*.ts` a las tablas Supabase del portal (`asociaciones`, `asociaciones_directivos`, `asociaciones_noticias`, más las extendidas `asociaciones_actividades`, `asociaciones_galeria`, `asociaciones_hitos_historicos`), consumido a través de un adaptador de datos para no acoplar los componentes visuales al origen de los datos. Esto habilita el CMS sin depender de que el resto de la Fase 2 esté lista. **Adaptador construido (2026-07-02)** en `lib/microsite-data.ts` — funciones planas, no un hook `useMicrositioData()` (las páginas son Server Components de Next.js, no hace falta un hook de React); detalle y verificación en `doc/PLAN_INTEGRACION_SUPABASE.md` Fase 0.c.
- **Hito (b) — servicios unificados (alcance acotado)**: autenticación de socios, pasarela de pagos/cuotas, CMS unificado e inscripciones a la agenda de eventos se consumen desde el portal, no se desarrollan de forma independiente en este repo. Si el portal se atrasa, `centro-virtual` puede implementar soluciones locales temporales detrás de feature flags para no bloquear su propia salida a producción (válvula de escape).
- **Autonomía confirmada**: comunidad interna/foro, streaming local y gamificación cultural siguen siendo responsabilidad y decisión exclusiva de `centro-virtual`, sin depender del roadmap del portal.
- **Fuera de alcance para `centro-virtual`**: cualquier función que conecte o agrupe a más de una asociación (mapas de centros, mensajería inter-centros, eventos conjuntos) es competencia exclusiva del portal (principio de soberanía, `doc/GUIA_INTEGRACION_MICROSITIOS.md` §14).
- **Gobernanza de medios compartidos**: las fotos/documentos privados de `centro-virtual` no pasan a un archivo colectivo del portal salvo que sean públicos o trasciendan la institución, y todo uso cruzado requiere permiso explícito (`doc/GUIA_INTEGRACION_MICROSITIOS.md` §8).

---

## 5. Fuera de alcance (explícitamente)

- Desarrollo de infraestructura propia de streaming de video.
- Red social genérica de uso masivo (el alcance es acotado a la comunidad del Centro).
- Traducción completa multilenguaje (se prioriza español, con guiños culturales en gallego en contenido puntual).

---

## 6. Roadmap de referencia

| Etapa | Foco | Duración estimada |
|---|---|---|
| Fase 1 — Contenidos | Relevamiento histórico, textos, fotos, identidad de marca | 4-6 semanas |
| Fase 1 — Desarrollo | Sitio web + panel admin | 4-6 semanas |
| Fase 1 — Lanzamiento | Puesta en producción y difusión | 2 semanas |
| Fase 2 — Diseño funcional | Validación de alcance con comisión directiva | 4 semanas |
| Fase 2 — Desarrollo | App/comunidad, pagos, agenda, streaming | 10-14 semanas |
| Fase 2 — Lanzamiento | Producción y capacitación a socios | 2-4 semanas |

---

## 7. Documento de referencia de negocio

Este spec técnico se basa en la propuesta institucional completa: *"Propuesta de Modernización Digital — Centro Social, Cultural y Recreativo"*, que contiene el diagnóstico, objetivos y justificación de negocio detrás de este proyecto.

---

## 8. Pendientes (Fase 1)

Estado al 2026-07-01. Todo lo marcado acá bloquea el lanzamiento a producción; el código y la estructura de la Fase 1 están completos.

### 8.1 Contenido institucional real (a la espera de datos del cliente)

- Número real de WhatsApp — actualmente `+54 9 11 1234 5678` (placeholder de prueba provisto explícitamente por el cliente, no es el número real de la institución).
- Horario real de atención (`siteConfig.attentionHours`).
- 4 fotos reales para la Galería (actualmente placeholders).
- 3 novedades reales de la comarca (Lalín / Agolada / Silleda).
- Reseñas biográficas de los 7 miembros nombrados de la Comisión Directiva.
- 18 nombres reales para vocales y revisores de cuentas.
- 2 novedades de ejemplo que necesitan título y fecha reales.
- Dominio real de producción.
- Imagen y epígrafe reales para la sección "Nosotros" de la Home.

Todos estos ítems están marcados en el código con placeholders explícitos `[PENDIENTE: ...]` en `content/*.ts`, siguiendo la regla de no inventar contenido institucional real.

### 8.2 Integraciones de backend no implementadas

- ~~Persistencia del formulario de contacto (Supabase).~~ **Hecho (2026-07-02)**: tabla `mensajes_contacto` en Supabase propio de `centro-virtual`, probado en producción (build + Playwright) y contra la base real.
- ~~Persistencia de suscriptores del newsletter (Supabase).~~ **Hecho (2026-07-02)**: tabla `suscriptores_newsletter`, ídem verificación.
- ~~Persistencia de solicitudes de asociación (Supabase), incluida la foto de verificación.~~ **Hecho (2026-07-02)**: tabla `solicitudes_socio` + bucket privado `solicitudes-socio-fotos` (Storage), ídem verificación. La verificación en navegador real (no solo `curl`) encontró y corrigió 4 bugs preexistentes que rompían los 3 formularios en producción (ver commit `58fcd22`): reseteo de formulario tras `await` en Contacto y Asociate, pérdida de datos del wizard de Asociate al desmontar pasos anteriores del DOM, captura de foto inválida en `PhotoCapture`, e id duplicado en `NewsletterMiniForm`.
- ~~Notificación por email de contacto y asociación (Resend).~~ **Código hecho (2026-07-03)**, activación pendiente: `lib/email.ts` expone `sendNotificationEmail()` (best-effort, no rompe el flujo del formulario si falla o no está configurado) y se invoca desde `app/api/contact/route.ts` y `app/api/membership/route.ts` tras el insert en Supabase (newsletter no lo requiere, ver §3.6). Destino (`CONTACT_NOTIFICATION_EMAIL`) y remitente (`EMAIL_FROM`) son variables de entorno vacías en `.env.local` — configurables sin tocar código, sin ningún valor real cargado todavía. Verificado con build de producción + POST reales a ambos endpoints (200 OK, no-op de email confirmado) el 2026-07-03. Falta para activarlo: `RESEND_API_KEY` (cuenta gratuita — límite sandbox: sin dominio propio verificado en Resend, solo entrega al email dueño de la cuenta) y decidir `CONTACT_NOTIFICATION_EMAIL` (candidato mencionado por el usuario: `secretaria@dezar.org`, no cargado aún — requiere verificar dominio en Resend para poder enviarle, o usar esa misma dirección como cuenta de Resend).
- Verificación de identidad contra RENAPER usando la foto capturada en el wizard de asociación — descartada, ver §8.2c (biometría contra un DNI de años/décadas de antigüedad es menos confiable que la firma manuscrita que reemplazaría, y RENAPER además requiere convenio oficial no disponible).
- Confirmación por parte del referente/socio que presenta la solicitud — sigue bloqueada: requiere un padrón de socios con contacto real, que cada asociación deberá cargar para poder usar el sistema (Fase 2 / Portal, ver §4.6, Hito b). No se agrega un campo de contacto del referente al formulario como workaround.

### 8.2b Panel de administración (hallazgo 2026-07-02, resuelto 2026-07-03)

`app/admin` existe como carpeta pero está vacía — no hay ningún panel construido. Esto incumple un requisito explícito de §3.3 ("Panel de administración simple para que la comisión directiva pueda cargar eventos y novedades sin tocar código") y el criterio de aceptación de §3.6 ("La comisión directiva puede publicar un evento o novedad sin ayuda técnica"). Hoy todo el contenido vive en `content/*.ts` y cualquier cambio requiere editar código.

**Resuelto (2026-07-03): no se construye en este repo.** `doc/GUIA_INTEGRACION_MICROSITIOS.md` §7.2/§11.1/§13 asigna el CMS/panel de administración — incluida su versión temporal/simplificada de carga inicial (§11.1, Hito a, punto 3) y la definitiva (§11.1, Hito b, punto 2) — como tarea del repositorio del **Portal Galicia Migrante**, no de `centro-virtual` (§11.2, tareas de `centro-virtual`, no lo incluye en ningún punto). El usuario, dueño de ambos proyectos, confirmó explícitamente respetar esa división documentada en vez de pisarla. Este requisito de §3.3/§3.6 queda entonces satisfecho mediante el panel que construya el Portal, no mediante código en este repo — sigue siendo un bloqueante real para producción, pero su resolución depende del lado del Portal, no de trabajo pendiente acá.

### 8.2c Confirmación funcional de identidad del solicitante (hecho 2026-07-03)

Sustituye a la firma manuscrita de la solicitud impresa. No es verificación legal/biométrica — es funcional: confirma que quien completó el formulario controla el mail o el WhatsApp indicado, igual que una firma solo prueba control del propio trazo, no identidad biométrica.

**Decisión de diseño**: se descartó comparar la foto del wizard contra la foto del DNI (face-api.js u otro), porque el DNI suele tener años o décadas de antigüedad — el envejecimiento del rostro produce falsos negativos no relacionados con fraude, lo que vuelve la biometría menos confiable que la firma que reemplazaría. Se optó por confirmación de canal de contacto (mail automático y/o WhatsApp manual), a costo cero.

**Esquema** (migración `supabase/migrations/20260703000000_confirmacion_solicitud_socio.sql`, aplicada): `solicitudes_socio` gana `confirmation_token` (uuid, generado en el insert), `confirmed_at` (timestamptz, null hasta confirmar) y `confirmation_method` (`'email'` | `'whatsapp'`). Mientras `confirmed_at` sea null, la solicitud queda "sujeta a verificación de identidad" — esa leyenda se resuelve en base de datos y en el panel de administración (o la forma que defina cada asociación para aprobar solicitudes en reunión de comisión directiva), no en este repo (ver §8.2b).

**Flujo**:
- Al enviar el formulario (`app/api/membership/route.ts`), además de la notificación a la institución (§8.2), se envía un mail al propio solicitante (`sendApplicantConfirmationEmail`, `lib/email.ts`) con un link a `/asociate/confirmar?token=...`. Al abrirlo, `app/asociate/confirmar/page.tsx` marca `confirmed_at`/`confirmation_method: 'email'` si el token es válido y todavía no fue usado.
- La respuesta del POST también incluye `whatsappConfirmUrl` (`lib/whatsapp.ts`, `whatsappHref` con mensaje prellenado), que la pantalla de éxito de `components/forms/MembershipForm.tsx` muestra como botón alternativo — al enviarlo, la institución lo recibe por WhatsApp y marca `confirmation_method: 'whatsapp'` manualmente (no hay automatización de WhatsApp Business API, es simple `wa.me`).
- Ambos canales son opcionales entre sí: cualquiera de los dos alcanza para confirmar.

**Confirmación alternativa por referente**: si existe un socio que presenta/avala la solicitud, su confirmación de que conoce y avala al solicitante sería, por sí sola, suficiente — pero queda bloqueada por lo mismo que §8.2 ya documentaba: no hay padrón de socios con contacto real. No implementado.

Verificado (2026-07-03): build de producción + POST real al endpoint (200 OK, `whatsappConfirmUrl` presente), página de confirmación con token válido/inválido/ausente vía Playwright, y pantalla de éxito del wizard completo (cámara fake de Chromium) mostrando el botón de WhatsApp.

### 8.2d Tarjeta flotante interactiva en Historia (confirmado por el usuario 2026-07-05)

`components/sections/HistoryMilestoneItem.tsx` (usado por `components/sections/HistoryTimeline.tsx`, página `/historia`) abre una tarjeta flotante con el detalle del hito al pasar el mouse o hacer click sobre su punto/título en la línea de tiempo. Este comportamiento existía en el código sin estar citado en ningún documento de spec/revisión — quedó detectado como posible iniciativa estética no autorizada durante una revisión exhaustiva de bugs (2026-07-05).

**Confirmado por el usuario (2026-07-05): el comportamiento fue solicitado por él.** Se documenta acá para que quede citable a futuro, conforme a la regla de CLAUDE.md de no tomar iniciativa estética sin respaldo en la spec.

Reglas de la interacción: solo un hito puede estar abierto a la vez (fijado por click o mostrado por hover); hacer click en el fondo oscurecido cierra la tarjeta; si la descripción es larga, se trunca con un botón "Leer más" que solo es interactuable/enfocable mientras la tarjeta está abierta.

### 8.2e Fondo exterior al ancho de diseño (hecho 2026-07-05, pedido explícito del usuario)

El sitio tiene un ancho de diseño fijo (`max-w-container` = 1180px, `tailwind.config.ts`). En monitores más anchos, el usuario pidió que la zona fuera de ese ancho se vea de un color uniforme, tenue y distinto del fondo de la página (no el mismo `bg-paper`, que antes se aplicaba también a esa zona sin distinción).

Implementación en `app/layout.tsx`: el `<body>` (ancho completo de la ventana) usa `bg-paper-2` (el tono "arena" ya definido como color secundario en `tailwind.config.ts`/`globals.css`, antes solo usado dentro de secciones puntuales) como fondo exterior; un `<div>` interno con `max-w-container mx-auto` contiene todo el contenido (`children`) y mantiene el `bg-paper` original — visualmente idéntico a como se veía todo el sitio antes de este cambio dentro del ancho de diseño. **Actualización (2026-07-05, ver §8.2f)**: las variantes `dark:bg-[var(--paper-2)]`/`dark:bg-[var(--paper)]` agregadas originalmente en este punto quedaron redundantes y se retiraron una vez que `paper`/`paper-2` pasaron a resolverse directamente contra sus custom properties en `tailwind.config.ts` — `bg-paper`/`bg-paper-2` ya son dark-mode-aware sin variante explícita.

Verificado visualmente con Playwright (build de producción, puerto 3100): 1920×1080 y 1440×900 en home/`/historia`/`/politica-de-privacidad` (franjas exteriores visibles, contenido interior sin cambios), 390×844 mobile (sin franja, como se espera), y 1920×1080 con `colorScheme: 'dark'` en `/politica-de-privacidad` (fondo oscuro correcto, texto legible).

**Nota resuelta (ver §8.2f):** el problema de `WhatsAppButton` flotando sobre la franja exterior en vez de alinearse con el borde del contenido en monitores anchos fue corregido — el usuario confirmó explícitamente que quería este arreglo.

### 8.2f Corrección integral de modo oscuro y alineación del botón de WhatsApp (hecho 2026-07-05, confirmado por el usuario)

Al corregir el fondo exterior (§8.2e) se detectaron dos problemas colaterales, ninguno pedido explícitamente en un principio. Consultado el usuario vía pregunta directa, confirmó **corregir ambos**:

**1. `WhatsAppButton` no se alineaba con el borde de la columna de contenido en monitores anchos.** Corregido en `components/ui/WhatsAppButton.tsx`: el `right` fijo (`right-6`, relativo al viewport) pasó a `right-[max(1.5rem,calc((100vw-1180px)/2+1.5rem))]` — en pantallas más angostas que 1180px+3rem el botón se comporta igual que antes (24px del borde de ventana); en pantallas más anchas, el botón se ancla al borde derecho de la columna de contenido + 24px, en vez de quedar flotando sobre la franja exterior. Verificado visualmente en 1920×1080.

**2. El modo oscuro nunca se activaba realmente en todo el sitio antes de este arreglo.** El fix de fondo exterior (§8.2e) fue la primera vez que el `<body>` respondió de verdad a `@media (prefers-color-scheme: dark)`; eso expuso que casi ningún componente tenía soporte real de modo oscuro — la mayoría de las tarjetas (`bg-white` literal) y textos quedaban ilegibles o con contraste roto. Consultado el usuario sobre el alcance real del problema (no era solo 3 archivos, era prácticamente todo el sitio), confirmó **encarar la corrección completa ahora**, no diferirla ni desactivar el modo oscuro.

**Principio de diseño aplicado, dado explícitamente por el usuario**: *"cuando hay un fondo claro las letras y demás han de ser más oscuras, cuando el fondo es oscuro las letras y demás han de ser claras. Cambia una cosa y cambia la otra"* — fondo y color de texto emparejado deben cambiar siempre juntos, nunca por separado.

**Arquitectura elegida — tokens ruteados por variable CSS en vez de parches por archivo**: en `tailwind.config.ts`, los tokens compartidos que son genuinamente neutrales al modo (`ink`, `gold`, `granite`, `granite-light`, `paper`, `paper-2`, `line`, `paper-warm`) pasaron de valor hex literal a referencia `var(--x)` contra las custom properties ya definidas en `globals.css` (que ya tenían su contraparte oscura bajo `@media (prefers-color-scheme: dark)`, pero sin efecto porque el config las pisaba con literales). Esto hace que **cualquier clase existente que use esos tokens** (`bg-paper`, `text-ink`, etc., en cualquier componente) responda a modo oscuro automáticamente, sin tocar cada archivo uno por uno. `--paper-warm` no tenía custom property propia — se agregó (`#faf7f0` claro / `#13272f` oscuro).

**Excepción documentada — `atlantic` (#0E2A38, navy)**: se dejó como hex literal a propósito, porque se usa con dos roles incompatibles: como color de texto de títulos/links (`text-atlantic`, querría volverse claro en oscuro) y como fondo sólido de estado seleccionado/hover (`bg-atlantic`, debe seguir siendo navy siempre, porque lleva texto blanco encima en ambos modos). Un mismo token no puede tener dos comportamientos de modo distintos según el uso, así que los usos de TEXTO de `text-atlantic` recibieron overrides puntuales `dark:text-[var(--ink)]` archivo por archivo (`app/actividades/[id]/page.tsx`, `app/novedades/[id]/page.tsx`, `HistoryMilestoneCard.tsx`, `BoardTeaser.tsx`, `not-found.tsx`, `News.tsx`, `NewsList.tsx`, `ContactForm.tsx`), dejando `bg-atlantic` intacto.

**Convención de tarjetas extendida**: el patrón `bg-white dark:bg-[#13272F]` (ya preexistente en `MembershipForm.tsx`/`ActivitiesList.tsx`/`PhotoCapture.tsx`) se aplicó a todo `bg-white` restante sin variante oscura: `Activities.tsx`, `ComarcaNews.tsx`, `About.tsx`, `ContactPage.tsx`, `News.tsx`, `NewsList.tsx`, más los inputs de `ContactForm.tsx`/`NewsletterMiniForm.tsx`.

**Regresión propia detectada y corregida**: 7 botones "píldora siempre clara" (`Header.tsx` ×2, `Hero.tsx`, `JoinUs.tsx`, `MembershipForm.tsx` ×2, `NewsletterMiniForm.tsx`) usaban `dark:bg-paper` para forzar un fondo claro fijo en modo oscuro, aprovechando que `paper` antes era un literal fijo. Al rutear `paper` por variable CSS, `dark:bg-paper` empezó a resolver al valor OSCURO de `--paper` — el botón se volvía casi invisible contra el fondo de página, también oscuro. Corregido reemplazando por el literal explícito `dark:bg-[#F6F4EE]` (el hex claro original de `paper`), restaurando el comportamiento de píldora siempre clara independiente del nuevo carácter dinámico del token.

**Verificación**: build de producción + servidor en `:3100` + Playwright, captura full-page en 1440×900 de las 11 rutas del sitio (`/`, `/historia`, `/actividades`, `/actividades/1`, `/novedades`, `/novedades/1`, `/galeria`, `/directiva`, `/contacto`, `/asociate`, `/politica-de-privacidad`) en `colorScheme: 'light'` y `'dark'` — 22 capturas en total, todas revisadas una por una. Modo oscuro: contraste correcto en todas las rutas. Modo claro: sin ningún cambio visible respecto al diseño previo a esta sesión.

### 8.3 Relacionado con Fase 2 (no implementar aún, solo a tener en cuenta al diseñar el modelo de datos de Fase 1)

- La foto de verificación capturada en el wizard de asociación deberá guardarse en un campo propio en la futura base de datos de socios.
- El editor de Historia deberá permitir al administrador marcar/estilizar hitos destacados vía CMS.

### 8.3b Política de Privacidad y seguridad de datos personales (hecho 2026-07-05, con pendientes)

A raíz de una consulta del usuario sobre qué recaudo legal se toma al pedir datos personales (incluida foto de verificación) en `/asociate` y `/contacto`, se implementó:

- `content/privacyPolicy.ts` + `app/politica-de-privacidad/page.tsx`: Política de Privacidad completa, redactada como borrador profesional conforme a la Ley 25.326, con placeholders `[PENDIENTE: ...]` en los datos propios de la institución que no están confirmados. Sigue el mismo patrón "content as data" que el resto del sitio (nunca hardcodeado en componentes: los links a la política en `ContactForm`, `MembershipForm`, `NewsletterMiniForm` y `Footer` toman el título desde `getPrivacyPolicyContent()`, no un string fijo). Pendiente de revisión por un asesor legal antes de considerarse definitiva. **Aclaración 2026-07-05**: el texto completo (no solo los 3 placeholders) es contenido propio de cada institución y debe terminar siendo editable desde el futuro panel de administración del Portal, igual que noticias/actividades/hitos — ver `doc/PLAN_INTEGRACION_SUPABASE.md` Fase 1.b para el detalle y el gap de esquema (falta tabla tipo `asociaciones_legales` del lado del Portal).
- Checkbox de consentimiento obligatorio (con link a la política) en `ContactForm` y `MembershipForm`; aviso de texto (sin checkbox, por tratarse solo de un email en un formulario compacto de newsletter) en `NewsletterMiniForm`.
- Link a la política en la barra inferior del Footer.
- Migración `supabase/migrations/20260705000000_consentimiento_privacidad.sql` (columna `accepts_privacy_policy` en `mensajes_contacto` y `solicitudes_socio`) — **aplicada contra la base real (2026-07-05)** mediante conexión Postgres directa (ver `doc/PLAN_INTEGRACION_SUPABASE.md` Fase 1.b para el detalle de por qué el `supabase` CLI no pudo usarse y cómo se aplicó igual).

**Estado de seguridad relevado en esta misma revisión** (bueno, ya construido, y re-verificado por SQL directo el 2026-07-05):
- La `service_role` key de Supabase solo se usa server-side (`lib/supabase.ts`), nunca llega al navegador.
- La foto de verificación se guarda en un bucket privado de Storage (no público, confirmado por `select public from storage.buckets`), solo se persiste el path.
- Los 3 API routes no exponen ningún dato sensible en las respuestas de error.
- Las 9 tablas de `public` tienen RLS habilitada y **cero policies públicas** (`pg_policies` vacío) — confirmado por SQL directo, no solo por `supabase-js`, que podría dar falso positivo si RLS bloqueara la lectura sin avisar.
- Verificación end-to-end real (2026-07-05): POST de prueba a `/api/contact` contra el servidor corriendo en `:3000` con `acceptsPrivacyPolicy: 'on'` devolvió `200 OK`; se confirmó la fila en `mensajes_contacto` con `accepts_privacy_policy: true` vía SQL directo, y se borró el dato de prueba inmediatamente después.

**Gaps de seguridad y compliance pendientes (no implementados en esta sesión, quedan documentados para una próxima)**:
- Sin rate limiting ni protección anti-bot en `/api/contact`, `/api/newsletter/subscribe` y `/api/membership` — expuestos a spam/abuso masivo de envíos.
- Sin mecanismo funcional para que una persona ejerza sus derechos ARCO (acceso/rectificación/supresión) más allá de escribir por email — aceptable como punto de partida, pero no hay proceso ni panel para tramitarlo (depende del panel de administración, todavía no construido, ver §8.2b).
- Retención/borrado de datos vencidos no está automatizado: hoy no hay ningún proceso que borre solicitudes rechazadas o mensajes de contacto antiguos según el plazo que finalmente se defina en la política.
- Ley 25.326 exige que las bases de datos que registren datos personales estén inscriptas en el Registro Nacional de Bases de Datos (RNBD) de la Agencia de Acceso a la Información Pública — trámite institucional, no de código; no hecho ni verificado si aplica al volumen/tipo de datos de este Centro. Queda como pregunta para el asesor legal, junto con la revisión del texto.
- El texto actual no incluye un procedimiento de notificación de brechas de seguridad (qué hacer, a quién avisar y en qué plazo si los datos se filtran) — común en políticas de referencia pero no confirmado como exigencia legal puntual para esta institución; también a validar con el asesor legal.

### 8.4 Integración con Portal Galicia Migrante (decidida, no implementada)

Ver `PROJECT_SPEC.md` §4.6 y `doc/GUIA_INTEGRACION_MICROSITIOS.md` §6-14 para el detalle completo. Resumen de lo que queda pendiente de ejecutar (nada de esto está construido todavía):

- Migración de `content/*.ts` a las tablas Supabase del portal (Hito a), incluyendo las 3 tablas nuevas a crear en el repo del portal (`asociaciones_actividades`, `asociaciones_galeria`, `asociaciones_hitos_historicos`).
- ~~Construcción del adaptador de datos en `centro-virtual` para desacoplar los componentes visuales del origen de datos.~~ **Hecho (2026-07-02)**: `lib/microsite-data.ts`, ver §4.6 arriba.
- Consumo de los servicios unificados del portal para auth, pagos, CMS e inscripciones (Hito b), una vez que existan.
- Retiro definitivo de "Mapa de centros gallegos" del alcance de `centro-virtual` (queda en el portal).
