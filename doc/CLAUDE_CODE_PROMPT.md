# Prompt para Claude Code

Copiá este prompt en Claude Code una vez que tengas `PROJECT_SPEC.md` (y opcionalmente `mvp_sitio_centro_gallego.html` como referencia visual) en la raíz del proyecto.

---

```
Actuá como desarrollador full-stack senior. Vas a construir el proyecto descripto en PROJECT_SPEC.md, que está en la raíz de este repo. También hay un archivo mvp_sitio_centro_gallego.html con un prototipo visual de referencia (diseño, paleta de colores, tipografía y estructura de secciones) — usalo como guía de estilo, no como código final.

Instrucciones:
1. Leé PROJECT_SPEC.md completo antes de escribir código. Mirá también mvp_sitio_centro_gallego.html para entender la dirección visual esperada.
2. Empezá únicamente por la Fase 1 (sitio web institucional). No implementes nada de la Fase 2 todavía.
3. Usá el stack sugerido en la sección 3.4 del spec, salvo que me consultes y prefiramos otro.
4. Antes de generar código, proponeme la estructura de carpetas y el esquema de base de datos basado en la sección 3.5, y esperá mi confirmación.
5. Una vez confirmado, andá implementando de a una sección funcional por vez (sección 3.2), mostrándome avances y sin asumir contenido real (usá placeholders claros donde falte texto o fotos reales del Centro).
6. Mantené la identidad visual del prototipo de referencia: paleta atlántica/oro toxo/terracota, tipografía Fraunces + Work Sans + IBM Plex Mono, y el detalle de la silueta de costa como divisor de secciones.
7. Al terminar cada sección, contrastala contra los criterios de aceptación de 3.6 y avisame si alguno queda pendiente.
8. Preguntame antes de tomar decisiones que impliquen costo (ej. contratar un servicio de email transaccional, dominio, hosting).
```

---

## Orden sugerido de archivos a pasarle a Claude Code

1. `PROJECT_SPEC.md` — spec funcional y técnico completo.
2. `mvp_sitio_centro_gallego.html` — referencia visual (colores, tipografía, layout).
3. El logo del Centro, cuando esté listo, para reemplazar los placeholders marcados como "LOGO ACÁ".
