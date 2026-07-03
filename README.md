# Centro Galego — Sede Virtual

Plataforma digital para el Centro Social, Cultural y Recreativo de la colectividad gallega en Argentina (Lalín, Agolada y Silleda).

Repositorio: [github.com/BetoSP/centro-virtual---web_asociacion_centro_Lalin](https://github.com/BetoSP/centro-virtual---web_asociacion_centro_Lalin)

## 🚀 Inicio rápido

### Requisitos
- Node.js 18+
- npm o yarn

### Instalación
```bash
git clone https://github.com/BetoSP/centro-virtual---web_asociacion_centro_Lalin.git
cd centro-virtual---web_asociacion_centro_Lalin
npm install
```

### Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para producción
```bash
npm run build
npm run start
```

## 📁 Estructura del proyecto

```
app/
├── layout.tsx                    # Layout raíz, metadata base, tipografía y config
├── page.tsx                      # Home (hero, historia, actividades, novedades, directiva, contacto)
├── globals.css                   # Estilos globales y design tokens
├── sitemap.ts                    # Sitemap SEO
├── robots.ts                     # Robots.txt SEO
├── asociate/
│   └── page.tsx                  # Formulario de solicitud de socio
├── actividades/
│   ├── page.tsx                  # Listado completo de actividades, filtrable
│   └── [id]/page.tsx             # Detalle de actividad (SSG con generateStaticParams)
├── novedades/
│   ├── page.tsx                  # Listado completo de novedades
│   └── [id]/page.tsx             # Detalle de novedad (SSG con generateStaticParams)
├── historia/
│   └── page.tsx                  # Timeline histórico
├── galeria/
│   └── page.tsx                  # Galería de imágenes con lightbox
├── contacto/
│   └── page.tsx                  # Formulario de contacto + mapa
└── api/
    ├── newsletter/
    │   └── subscribe/route.ts    # Endpoint de suscripción [PENDIENTE: Supabase]
    ├── membership/route.ts       # Endpoint de solicitud de socio [PENDIENTE: Supabase/email/RENAPER]
    └── contact/route.ts          # Endpoint de mensajes de contacto [PENDIENTE: Supabase/email]

components/
├── layout/
│   ├── Header.tsx                # Navegación sticky
│   └── Footer.tsx                # Footer con enlaces
├── sections/
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Activities.tsx
│   ├── ActivitiesList.tsx        # Listado filtrable de /actividades
│   ├── News.tsx
│   ├── NewsList.tsx              # Listado completo de /novedades
│   ├── HistoryTimeline.tsx       # Timeline de /historia
│   ├── Gallery.tsx               # Galería con lightbox de /galeria
│   ├── ContactPage.tsx           # Página completa de /contacto (form + mapa)
│   ├── JoinUs.tsx
│   ├── Board.tsx                 # Comisión Directiva
│   └── Contact.tsx
├── forms/
│   ├── MembershipForm.tsx        # Formulario de solicitud de socio
│   ├── ContactForm.tsx           # Formulario de contacto
│   ├── NewsletterMiniForm.tsx    # Suscripción a novedades (footer/home)
│   └── PhotoCapture.tsx          # Captura de foto por cámara (sustituye la firma)
└── ui/
    ├── Avatar.tsx                 # Avatar por género, reemplazable por foto real
    ├── BackLink.tsx               # Link "Volver" en páginas de detalle
    ├── Eyebrow.tsx
    ├── SectionDivider.tsx         # Divisor de secciones (silueta de costa)
    ├── SocialIcons.tsx
    └── WhatsAppButton.tsx         # Botón flotante fixed bottom-right, en toda la app

lib/                               # Lógica compartida, no ligada a la UI
├── microsite-data.ts             # Adaptador de datos: única puerta de entrada al contenido
│                                  # (content/*.ts hoy, Supabase a futuro — ver doc/PLAN_INTEGRACION_SUPABASE.md)
└── whatsapp.ts                    # Helper para armar links de WhatsApp

content/                          # Datos y textos (separados de los componentes)
├── site.config.ts                # Datos de contacto/redes del Centro
├── nav.ts                        # Navegación (header/footer)
├── home.ts                       # Contenido de la home (hero, directiva, etc.)
├── membership.ts                 # Contenido del formulario de socios
├── activities.ts                 # Items de actividades (reusados en home y /actividades)
├── news.ts                       # Items de novedades (reusados en home y /novedades)
├── history.ts                    # Hitos históricos reales de las asociaciones fundadoras
├── gallery.ts                    # Imágenes de la galería
└── contactPage.ts                # Contenido de /contacto (incluye embed de mapa)

types/
├── content.ts                    # Interfaces TypeScript de todo el contenido
└── database.ts                   # Borrador de esquema Supabase (Fase 1, aún no conectado)

public/
└── imagenes/                     # Assets (imágenes del Centro)

tailwind.config.ts                # Configuración de Tailwind
```

> Ningún componente ni página debe importar `content/*.ts` directamente — todo pasa por `lib/microsite-data.ts`. Ver `doc/PLAN_INTEGRACION_SUPABASE.md` (Fase 0.c).

## 🎨 Paleta de colores

Basada en el design system del MVP (`mvp_sitio_centro_gallego.html`):

```
--ink:              #1C2321   (texto principal)
--atlantic:         #16333A   (headings, acento)
--atlantic-2:       #0F262B   (footer, oscuro)
--granite:          #6E6A5E   (párrafos)
--granite-light:    #B9B3A4   (text light)
--paper:            #F3EFE3   (fondo)
--paper-2:          #EAE4D4   (fondo alternativo)
--toxo:             #D2A03C   (oro)
--terracota:        #B4502E   (acento cálido)
```

## 📚 Tipografía

- **Display (headings)**: Fraunces (serif)
- **Body**: Work Sans (sans-serif)
- **Mono**: IBM Plex Mono

## 🔧 Stack actual

- **Frontend**: Next.js 16 (App Router), TypeScript
- **CSS**: Tailwind CSS 4
- **Fonts**: Google Fonts (Fraunces, Work Sans, IBM Plex Mono)
- **Base de datos**: [PENDIENTE] — a definir (Supabase u otra), decisión con costo a confirmar
- **Email/WhatsApp**: [PENDIENTE] — servicio a contratar, decisión con costo a confirmar
- **Verificación de identidad**: [PENDIENTE] — integración con RENAPER (reconocimiento facial), requiere convenio/acceso oficial
- **Hosting**: [PENDIENTE] — decisión con costo a confirmar

## 📋 Estado y tareas pendientes (Fase 1)

### Componentes & Páginas
- [x] Home: hero, historia, actividades preview, novedades, comisión directiva, contacto
- [x] Página `/asociate` (formulario de solicitud de socio, con captura de foto por cámara)
- [x] Página `/actividades` (listado completo, filtrable por tipo)
- [x] Página `/novedades` (listado completo)
- [x] Página `/historia` (timeline con los hitos reales de las asociaciones fundadoras)
- [x] Página `/galeria` (galería con lightbox — imágenes de ejemplo, reemplazar por fotos reales)
- [x] Página `/contacto` (formulario + mapa embebido con la dirección real)

### Base de datos & API
- [ ] Definir y conectar base de datos (persistencia de solicitudes de socio, contacto, newsletter) — **decisión con costo, pendiente de confirmación**
- [ ] Notificación a la Comisión Directiva por cada solicitud de socio nueva — requiere servicio de email/WhatsApp (costo)
- [ ] Envío de aval al socio que presenta (requiere base de socios real con contacto verificado — no existe todavía)
- [ ] Verificación de identidad contra RENAPER (requiere convenio oficial)

### Admin & CMS
- [ ] Panel de administración (`/admin`) — **gap detectado, no construido todavía**: PROJECT_SPEC.md §3.3/§3.6 lo exige como criterio de aceptación de Fase 1, pero requiere su propio ciclo de definición (CMS headless vs. panel a medida, autenticación) antes de escribir código. Ver `doc/PROJECT_SPEC.md` §8.2b.
- [ ] Autenticación para comisión directiva
- [ ] Carga de nombres reales de la Comisión Directiva (actualmente con placeholders `[PENDIENTE]`)

### Optimizaciones
- [x] SEO básico (metadata por página, `sitemap.ts`, `robots.ts`) — dominio real pendiente de contratación
- [ ] Imágenes optimizadas (compresión/WebP de fotos reales una vez que existan)
- [ ] Analíticas (Vercel Analytics o similar) — decisión pendiente
- [ ] Tests básicos

### Contenido real pendiente de reemplazo
- [ ] Fotos reales del Centro y sus actividades (galería usa imágenes de ejemplo)
- [ ] Actividades y novedades reales (actualmente contenido de ejemplo aprobado para evaluación visual)
- [ ] Nombres reales de la Comisión Directiva
- [ ] Dominio propio (hoy se usa un placeholder vía `NEXT_PUBLIC_SITE_URL`)

## 📖 Documentación

Ver archivos en `/doc`:
- `PROJECT_SPEC.md` — Especificación funcional y técnica completa
- `PLAN_INTEGRACION_SUPABASE.md` — Plan de integración con el Portal Galicia Migrante (proyecto hermano, mismo dueño)
- `GUIA_INTEGRACION_MICROSITIOS.md` — Guía técnica del Portal para micrositios asociados
- `mvp_sitio_centro_gallego.html` — Referencia visual y design system
- `CLAUDE.md` — Reglas de trabajo del proyecto

## 🎯 Criterios de aceptación (MVP)

- [x] Compilación sin errores
- [x] Home con hero, historia, actividades preview, novedades, directiva, contacto
- [x] Header y footer navegables, con enlaces a todas las páginas reales
- [x] Formulario de solicitud de socio
- [x] Páginas completas: actividades, novedades, historia, galería, contacto
- [x] SEO básico (metadata, sitemap, robots.txt)
- [ ] Funcionalidad de BD conectada (suscripción, contacto, solicitudes de socio)
- [ ] Panel admin para comisión directiva
- [ ] Testing en mobile y desktop

## 📝 Licencia

Proyecto privado — Centro Social, Cultural y Recreativo, Colectividad Gallega.
