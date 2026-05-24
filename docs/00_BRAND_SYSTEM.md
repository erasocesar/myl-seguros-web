# 00_BRAND_SYSTEM.md — Sistema de Diseño Global
## Consultores M&L Seguros

> **Instrucción para Claude Design:** Carga este archivo en TODOS los proyectos antes de generar cualquier diseño. Define los tokens inamovibles de marca.

---

## 1. IDENTIDAD DE MARCA

| Atributo | Valor |
|---|---|
| **Nombre** | Consultores M&L Seguros |
| **Tagline** | "Tu tranquilidad respaldada por más de 10 aseguradoras aliadas" |
| **Voz** | Claro · Confiable · Profesional · Cercano |
| **Estética** | Minimalista premium · Aire editorial · Espacios amplios |

---

## 2. PALETA DE COLORES

```
--color-primary:    #FFFFFF   /* Blanco — fondo principal */
--color-secondary:  #E5F0FA   /* Azul claro — fondos de secciones alternas */
--color-neutral-1:  #F7F7F7   /* Gris muy claro — cards, inputs */
--color-neutral-2:  #4A4A4A   /* Gris oscuro — texto cuerpo */
--color-accent:     #C2185B   /* Magenta — botones, CTAs, detalles, íconos activos */
--color-dark:       #1A1A2E   /* Azul noche — banners hero, overlays, headers oscuros */
--color-text-light: #FFFFFF   /* Blanco — texto sobre fondos oscuros */
```

**Reglas de uso:**
- El magenta `#C2185B` es exclusivo para CTAs, hover states, íconos destacados y detalles de acento. No usarlo como fondo extenso.
- Los fondos de sección alternan entre `#FFFFFF` y `#E5F0FA` para crear ritmo visual sin usar colores llamativos.
- Para banners hero usar `#1A1A2E` (azul noche) con overlay de gradiente suave al magenta `#C2185B`.

---

## 3. TIPOGRAFÍA

| Rol | Fuente | Peso | Uso |
|---|---|---|---|
| Headings H1–H2 | **Inter** | 700–800 | Títulos hero y sección |
| Headings H3–H4 | **Inter** | 600 | Subtítulos y nombres de producto |
| Body | **Inter** | 400 | Párrafos, descripciones |
| Quotes / Subtítulos editoriales | **Lora** | 400–500 italic | Testimonials, taglines, citas |
| Labels / Tags / Badges | **Inter** | 500 | Categorías, etiquetas de card |

**Escala tipográfica:**
```
Hero H1:    56–64px / line-height 1.1 / letter-spacing -0.02em
Section H2: 36–42px / line-height 1.2
Card H3:    20–24px / line-height 1.3
Body:       15–16px / line-height 1.6
Small/Tag:  12–13px / line-height 1.4 / uppercase + letter-spacing 0.08em
```

---

## 4. COMPONENTES GLOBALES

### 4.1 Top Navigation Bar
- Fondo: `#FFFFFF` con sombra sutil `box-shadow: 0 1px 0 rgba(0,0,0,0.08)`
- Logo M&L: esquina superior izquierda
- Menús principales (Header Menus): VIDA · AUTOS · GENERALES · CUMPLIMIENTO · Empresas
- CTA en navbar: botón magenta "Cotiza ahora" — siempre visible en desktop
- Sticky en scroll, con transición suave a fondo blanco sólido

### 4.2 Botones
```
Primary CTA:
  background: #C2185B
  color: #FFFFFF
  border-radius: 6px
  padding: 14px 28px
  font: Inter 600 15px
  hover: background #A31545 + box-shadow 0 4px 16px rgba(194,24,91,0.3)

Secondary CTA:
  background: transparent
  color: #C2185B
  border: 1.5px solid #C2185B
  border-radius: 6px
  hover: background rgba(194,24,91,0.06)

WhatsApp CTA:
  background: #25D366
  color: #FFFFFF
  icon: whatsapp
```

### 4.3 Cards de Producto
```
background: #FFFFFF
border: 1px solid rgba(0,0,0,0.07)
border-radius: 12px
padding: 24px
box-shadow: 0 2px 12px rgba(0,0,0,0.06)
hover: transform translateY(-4px) + box-shadow 0 8px 24px rgba(0,0,0,0.10)
transition: all 0.25s ease

Estructura interna:
  — Ícono (Lucide icon, color #C2185B), 32px
  — Nombre del producto: Inter 600 17px #1A1A2E
  — Carrier badge: tag pequeño gris claro con nombre de aseguradora
  — Descripción corta: Inter 400 14px #4A4A4A (max 2 líneas)
  — CTA: texto link magenta "Cotiza ahora →"
```

### 4.4 Banners Hero (todas las páginas)
```
height: 420–520px (desktop) / 300px (mobile)
background: linear-gradient(135deg, #1A1A2E 0%, #2D1B4E 60%, #C2185B 100%)
  — o imagen de fondo con overlay: rgba(26,26,46,0.72)
layout: contenido centrado a la izquierda, imagen decorativa a la derecha
elementos: breadcrumb sutil + H1 blanco + subtexto blanco 70% + CTA magenta
animación: fade-in suave del texto (0.4s ease-out) al cargar página
```

### 4.5 Sección de Aseguradoras Aliadas
- Strip horizontal con logos en escala de grises
- hover: color completo + elevación sutil
- Orden: Seguros del Estado · SURA · MAPFRE · AXA Colpatria · Seguros Bolívar · Equidad Seguros · Previsora · Mundial de Seguros + 2 más

### 4.6 Footer
```
background: #1A1A2E
color: #FFFFFF
secciones: Logo + tagline | Links menú | Contacto | Legal
contacto: WhatsApp flotante magenta | correo | dirección Bogotá
aviso: políticas de privacidad | aviso legal
```

---

## 5. ESPACIADO Y GRID

```
Section padding vertical: 80–100px desktop / 48–56px mobile
Container max-width: 1200px, centrado, padding lateral 24px
Column grid: 12 columnas, gap 24px
Card grids: 3 columnas desktop / 2 tablet / 1 mobile
```

---

## 6. ICONOGRAFÍA

- **Librería:** Lucide Icons (trazo limpio, weight consistente)
- **Color activo:** `#C2185B` (magenta)
- **Color inactivo:** `#9E9E9E`
- **Tamaño en cards:** 28–32px
- **Stroke width:** 1.5px

**Mapeo de categorías a íconos:**
```
VIDA              → Heart / Shield
AUTOS             → Car / Truck
GENERALES / HOGAR → Home / Building
CUMPLIMIENTO      → FileCheck / Scale
SALUD             → ShieldPlus / Stethoscope
MASCOTAS          → PawPrint
EDUCACIÓN         → GraduationCap
EMPRESAS          → Building2 / Briefcase
ARL               → UserCheck
TRANSPORTE        → Truck
```

---

## 7. MICROINTERACCIONES Y ANIMACIONES

- **Hover cards:** `transform: translateY(-4px)` + sombra aumentada, `transition: 0.25s ease`
- **Aparición de secciones:** fade-in + slide-up sutil al entrar en viewport (`opacity 0→1`, `translateY 20px→0`, `0.4s ease-out`)
- **CTA botón:** pulse sutil en magenta al hover (no agresivo)
- **Banner hero:** partículas o gradiente animado muy sutil (no distraer del copy)
- **Sin animaciones pesadas** que afecten el rendimiento en mobile

---

## 8. TONO DEL COPY EN LA UI

- Encabezados: directos, orientados al beneficio del cliente. Ej: "Protección real para lo que más importa."
- Subtextos: empáticos y claros. Sin tecnicismos innecesarios.
- CTAs: acción clara. Siempre "Cotiza ahora" o "Solicita asesoría gratis" — nunca "Click aquí".
- Labels de categoría: en mayúsculas, cortos. Ej: "VIDA · SURA"
- Precios: siempre con disclaimer "Sujeto a aseguradora y cobertura."
