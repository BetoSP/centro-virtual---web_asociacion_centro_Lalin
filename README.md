# Centro Galego — Sede Virtual

Plataforma digital para el Centro Social, Cultural y Recreativo de la colectividad gallega en Argentina (Lalín, Agolada y Silleda).

## 🚀 Inicio rápido

### Requisitos
- Node.js 18+
- npm o yarn

### Instalación
```bash
cd centro-virtual
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
│   └── page.tsx                  # Listado completo de actividades, filtrable
├── novedades/
│   └── page.tsx                  # Listado completo de novedades
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
│   └── PhotoCapture.tsx          # Captura de foto por cámara (sustituye la firma)
└── ui/
    ├── Avatar.tsx                 # Avatar por género, reemplazable por foto real
    ├── Eyebrow.tsx
    └── SectionDivider.tsx

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
└── content.ts                    # Interfaces TypeScript de todo el contenido

public/
└── imagenes/                     # Assets (imágenes del Centro)

tailwind.config.ts                # Configuración de Tailwind
```

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
- [ ] Panel de administración básico (`/admin`) — Fase 2, no iniciar sin confirmación
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


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
