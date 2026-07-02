# CLAUDE.md

Contexto persistente para Claude Code en este proyecto. Mantenelo corto — agregá una regla acá solo si Claude no puede inferirla del código.

## Qué es esto

Sede virtual del Centro Lalin, Agolada y Silleda - Social, Cultural y Recreativo (120+ años de historia). Fase 1: sitio institucional. Fase 2 (futura, no arrancar todavía): app de comunidad.

Spec funcional y técnico completo: **`PROJECT_SPEC.md`** (leerlo siempre antes de tocar código).
Referencia visual: **`mvp_sitio_centro_gallego.html`** — paleta atlántica/oro toxo/terracota, tipografía Fraunces + Work Sans + IBM Plex Mono, divisor de secciones con silueta de costa.

## Reglas de trabajo

- No implementar nada de la Fase 2 (app, pagos, streaming) sin confirmación explícita.
- Antes de generar código nuevo, proponer estructura de carpetas / esquema de datos y esperar OK.
- No inventar contenido institucional real (textos históricos, fotos, datos de contacto). Usar placeholders explícitos tipo `[PENDIENTE: texto histórico real]`.
- Cambios de stack respecto a la sección 3.4 del spec: preguntar primero.
- Decisiones con costo (dominio, hosting, servicio de email) se consultan antes de contratarse.
- **Cero iniciativa estética/de diseño**: cada decisión visual debe poder citarse contra una línea explícita de la spec/revisión vigente. Si algo no está definido, preguntar — nunca decidir por criterio propio.
- **Leer la spec en el punto de implementación, no de memoria**: releer el documento (o el `.dc.html` renderizado) al momento de tocar cada detalle puntual, no una sola vez al planificar y después parafrasear. Leer una vez y programar de memoria equivale, en la práctica, a no haber leído.
- **No se declara nada "hecho"/"corregido"/"verificado" sin verificación visual real**: renderizar la página (build de producción + captura de pantalla, ej. con Playwright) y mirar el resultado antes de afirmar que algo está bien. Comparación explícita imagen contra imagen contra el prototipo/mockup de referencia, no solo lectura de código.
- **Chequeo exhaustivo, no superficial**: antes de dar una tarea por terminada, revisar el archivo completo y sus consumidores relacionados, no solo el primer punto que confirma la hipótesis. Si algo parece raro o no cuadra con la spec, detenerse y preguntar antes de actuar — nunca tomar el atajo.
- **Código limpio, sin parches ni hardcodeo**: nada de mockups ni valores fijos en el código. Todo contenido/parámetro debe vivir en `content/*.ts` o `types/content.ts` (arquitectura "content as data"), pensando en que a futuro un admin sin acceso al código deberá poder editarlo vía CMS.

## Comandos

```
npm run dev              # dev server (Turbopack), puerto 3000
npm run build             # build de producción
npm run start -- -p 3100  # sirve el build de producción en el puerto 3100 (usado para verificación visual)
npm run lint               #
```

## Gotchas

- **Puerto 3100 puede quedar ocupado por un `next start` de una sesión anterior.** Antes de levantar el server de verificación, chequear `netstat -ano | grep ":3100.*LISTENING"` y matar el proceso viejo (`taskkill //PID <pid> //F`) — si no, `next start -p 3100` falla en silencio (log: `EADDRINUSE`) mientras el proceso viejo sigue sirviendo un build stale, dando falsos positivos/negativos en la verificación visual.
- **`ripgrep` (tool Grep) a veces devuelve "No files found" en `doc/Revisión 3 del proyecto/Revisión de diseño.dc.html`** para texto verificablemente presente — posible interacción con el acento en el nombre del archivo. Si un grep da "sin resultados" en ese archivo específico, confirmar con `Read` directo antes de asumir que el contenido no existe.
- **El `<html>` tiene `scroll-smooth`** (ver `app/layout.tsx`), lo que rompe scripts de verificación con Playwright que usan `window.scrollTo(x, y)` sin more: el scroll queda a medio animar cuando se toma el screenshot. Usar `window.scrollTo({ top, behavior: 'instant' })` en cualquier script de captura.
- **`WhatsAppButton`** es `position:fixed; bottom-6 right-6` en toda la app — cualquier elemento nuevo que se agregue en la esquina inferior derecha de una sección (ej. crédito del footer) puede quedar tapado. Verificar visualmente el scroll natural hasta el final de la página, no solo un scroll sintético.
