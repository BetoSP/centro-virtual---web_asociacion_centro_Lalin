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
- [ ] SEO básico configurado (título, descripción, sitemap).

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

- Persistencia/notificación del formulario de contacto (Supabase o servicio de email).
- Persistencia de suscriptores del newsletter (Supabase).
- Persistencia/notificación de solicitudes de asociación (Supabase/email).
- Verificación de identidad contra RENAPER usando la foto capturada en el wizard de asociación.
- Búsqueda de referente/número de socio en el formulario de asociación.

Ninguna de estas integraciones está construida todavía; los formularios existen en el frontend pero no persisten datos en un backend real.

### 8.2b Panel de administración (hallazgo 2026-07-02, no registrado antes en este documento)

`app/admin` existe como carpeta pero está vacía — no hay ningún panel construido. Esto incumple un requisito explícito de §3.3 ("Panel de administración simple para que la comisión directiva pueda cargar eventos y novedades sin tocar código") y el criterio de aceptación de §3.6 ("La comisión directiva puede publicar un evento o novedad sin ayuda técnica"). Hoy todo el contenido vive en `content/*.ts` y cualquier cambio requiere editar código.

No se resuelve en esta iteración — requiere su propia decisión de alcance (CMS headless vs. panel propio mínimo, autenticación para 2-3 usuarios, qué entidades administra) antes de escribir código, por la regla de CLAUDE.md de proponer estructura y esperar OK. El usuario confirmó (2026-07-02) que es un pendiente real que debe resolverse antes del lanzamiento a producción (todos los requisitos de Fase 1 deben cumplirse al 100%), pero decidió que se planifique como tarea aparte, después de cerrar el adaptador de datos de la integración con el Portal (§4.6, §8.4).

### 8.3 Relacionado con Fase 2 (no implementar aún, solo a tener en cuenta al diseñar el modelo de datos de Fase 1)

- La foto de verificación capturada en el wizard de asociación deberá guardarse en un campo propio en la futura base de datos de socios.
- El editor de Historia deberá permitir al administrador marcar/estilizar hitos destacados vía CMS.

### 8.4 Integración con Portal Galicia Migrante (decidida, no implementada)

Ver `PROJECT_SPEC.md` §4.6 y `doc/GUIA_INTEGRACION_MICROSITIOS.md` §6-14 para el detalle completo. Resumen de lo que queda pendiente de ejecutar (nada de esto está construido todavía):

- Migración de `content/*.ts` a las tablas Supabase del portal (Hito a), incluyendo las 3 tablas nuevas a crear en el repo del portal (`asociaciones_actividades`, `asociaciones_galeria`, `asociaciones_hitos_historicos`).
- ~~Construcción del adaptador de datos en `centro-virtual` para desacoplar los componentes visuales del origen de datos.~~ **Hecho (2026-07-02)**: `lib/microsite-data.ts`, ver §4.6 arriba.
- Consumo de los servicios unificados del portal para auth, pagos, CMS e inscripciones (Hito b), una vez que existan.
- Retiro definitivo de "Mapa de centros gallegos" del alcance de `centro-virtual` (queda en el portal).
