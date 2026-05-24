# 01_HOME.md — Página Principal
## Consultores M&L Seguros

> **Instrucción para Claude Design:**
> 1. Carga siempre `00_BRAND_SYSTEM.md` antes de este archivo.
> 2. Este archivo define la estructura completa de la página de inicio.
> 3. Assets disponibles: `hero-family-lion.png` (imagen hero) · `logo-myl-seguros.jpeg` (logo)
> 4. El cliente quiere un diseño **claro, profesional y cálido** — fondo blanco/azul claro, NO dark.

---

## 1. ASSETS DE MARCA

```
Logo:
  archivo: logo-myl-seguros.jpeg
  descripción: escudo magenta + cabeza de león plateada + texto "Consultores de Seguros M&L"
  uso en nav: versión simplificada (escudo + "M&L") o logo completo según espacio
  color de fondo del logo original: #1A1A2E (azul noche)

Imagen hero:
  archivo: hero-family-lion.png
  descripción: familia multigeneracional en terraza al atardecer, escudo magenta y
               cabeza de león en el fondo, luz cálida, composición 1:1
  uso: lado derecho del hero, con leve animación float y sombra magenta sutil
```

---

## 2. NAVEGACIÓN (top nav sticky)

```
layout: barra blanca sticky, sombra sutil al hacer scroll
altura: 64px desktop / 56px mobile

izquierda:
  logo M&L (escudo + texto)

centro (desktop):
  Inicio
  Vida ▾          → despliega mega-menu con subcategorías
  Autos ▾         → despliega mega-menu
  Cumplimiento ▾  → despliega mega-menu
  Generales ▾     → despliega mega-menu
  Comparar        → página de comparador
  Aliadas         → página de aseguradoras

derecha:
  badge "IA 24/7" (magenta suave, pulsante) → abre chat Mili
  botón "Contacto" (magenta sólido)

mobile:
  logo + hamburger
  menu drawer desde la izquierda

estilos:
  fondo scroll: background rgba(255,255,255,0.95) con backdrop-blur 12px
  link activo: color #C2185B + underline magenta
  link hover: color #C2185B, transition 0.2s
```

---

## 3. HERO SECTION

### Layout
```
tipo: dos columnas, texto izquierda / imagen derecha
fondo: #FFFFFF con círculo gradiente sutil detrás de la imagen
       (radial-gradient #E5F0FA → transparent, 420px, esquina derecha)
altura: min-height 520px desktop / auto mobile
padding: 64px 0 56px
```

### Columna izquierda (texto)

```
1. Badge "Ahora con asistente IA 24/7 · Mili"
   background: rgba(194,24,91,0.08)
   border: 1px solid rgba(194,24,91,0.20)
   color: #8a0f3f
   dot pulsante magenta a la izquierda
   animación: badgePop 0.5s delay 0.1s

2. H1: "Proteger a tu familia"
       "nunca fue tan fácil"    ← segunda línea en #C2185B
   font: Inter 800, 52px desktop / 36px mobile
   color: #1A1A2E
   animación: fadeUp 0.55s delay 0.15s

3. Subtexto:
   "Somos tus asesores de confianza. Comparamos las mejores opciones de
   SURA, MAPFRE, Seguros del Estado y AXA Colpatria para encontrar
   el seguro perfecto para ti."
   font: Inter 400, 17px, color #4A4A4A, line-height 1.6
   nombres de aseguradoras en negrita #1A1A2E
   animación: fadeUp 0.55s delay 0.30s

4. CTAs (fila horizontal):
   [Cotizar gratis →]       → botón magenta sólido, pulse ring animation
   [📞 Hablar con asesor]  → botón outline gris
   animación: fadeUp 0.55s delay 0.42s

5. Social proof:
   avatares apilados (4 círculos de colores) +
   estrellas doradas (★★★★★ animadas en secuencia) +
   "+1.000 familias protegidas · 4.9/5 en satisfacción"
   font: Inter 13px, color #4A4A4A
   animación: fadeUp 0.55s delay 0.55s
```

### Columna derecha (imagen)

```
archivo: hero-family-lion.png
dimensiones: 460px × 500px desktop
border-radius: 20px
animación: floatY 5s ease-in-out infinite (sube/baja 10px)
sombra: 0 20px 60px rgba(194,24,91,0.15), 0 8px 24px rgba(0,0,0,0.10)

floating cards sobre la imagen:
  Card 1 — esquina superior derecha:
    ícono shield-check verde
    label "Pólizas activas"
    valor "+1.000"
    animación: badgePop delay 0.7s

  Card 2 — esquina inferior izquierda:
    ícono building azul
    label "Aseguradoras aliadas"
    valor "+10"
    animación: badgePop delay 0.9s

  estilo cards flotantes:
    background: #FFFFFF
    border-radius: 10px
    box-shadow: 0 4px 20px rgba(0,0,0,0.12)
    padding: 10px 14px
    display: flex, gap: 10px
```

### Marquee de aseguradoras (debajo del hero)

```
fondo: #F7F7F7
border-top: 0.5px solid rgba(0,0,0,0.06)
padding: 14px 0
contenido: logos o nombres de aseguradoras en loop infinito
velocidad: 18s linear infinite
items: SURA · MAPFRE · Seguros Bolívar · AXA Colpatria · Seguros del Estado
       · Equidad Seguros · Previsora · Mundial de Seguros (repetido x2)
separador: punto magenta 4px entre cada item
texto: Inter 500 11px uppercase letter-spacing 0.04em color #9E9E9E
```

---

## 4. SECCIÓN PROBLEMA / SOLUCIÓN

```
fondo: #E5F0FA
padding: 80px 0

layout: centrado, max-width 800px

headline: "Elegir un seguro puede ser confuso y desgastante"
subheadline: "Las opciones son muchas y la información no siempre es clara."
font headline: Inter 700 36px color #1A1A2E
font sub: Inter 400 18px color #4A4A4A

3 íconos de problema (fila):
  [❓ Demasiadas opciones]
  [📄 Información poco clara]
  [⏰ Proceso lento]

flecha o divisor visual →

headline solución: "M&L hace el trabajo por ti"
3 beneficios (cards blancas, sombra suave):
  ✓ Comparación transparente entre aseguradoras
  ✓ Asesoría personalizada sin costo
  ✓ Respaldo de las principales compañías en Colombia
```

---

## 5. SECCIÓN DE CATEGORÍAS / FEATURES

```
fondo: #FFFFFF
padding: 80px 0

headline: "Seguros para cada momento de tu vida"
subheadline: "Vida · Autos · Hogar · Empresas · Cumplimiento y más"

grid: 3 columnas desktop / 2 tablet / 1 mobile
gap: 24px

cards de categoría (6 cards):

  1. Vida y Protección
     ícono: Heart (magenta)
     descripción: "Cuida a tu familia ante lo inesperado."
     CTA: "Ver seguros de vida →"
     link: /vida/individual

  2. Autos y Movilidad
     ícono: Car (magenta)
     descripción: "Protección total para tu vehículo."
     CTA: "Ver seguros de autos →"
     link: /autos/vehiculos-particulares

  3. Hogar y Patrimonio
     ícono: Home (magenta)
     descripción: "Tu vivienda y bienes, siempre seguros."
     CTA: "Ver seguros de hogar →"
     link: /generales/polizas-de-hogar

  4. Empresas
     ícono: Building2 (magenta)
     descripción: "Soluciones corporativas y para PYMES."
     CTA: "Ver seguros empresariales →"
     link: /generales/empresas

  5. Salud
     ícono: ShieldPlus (magenta)
     descripción: "Pólizas de salud y medicina prepagada."
     CTA: "Ver pólizas de salud →"
     link: /vida/polizas-de-salud

  6. Cumplimiento
     ícono: FileCheck (magenta)
     descripción: "Pólizas para contratos y entidades."
     CTA: "Ver seguros de cumplimiento →"
     link: /cumplimiento/entidades-estatales

estilo cards:
  background: #FFFFFF
  border: 1px solid rgba(0,0,0,0.07)
  border-radius: 16px
  padding: 28px 24px
  hover: translateY(-4px) + border-color rgba(194,24,91,0.25) + sombra
  ícono: 40px, color #C2185B, background rgba(194,24,91,0.08), border-radius 10px
```

---

## 6. SECCIÓN TESTIMONIALES

```
fondo: #F7F7F7
padding: 80px 0

headline: "Lo que dicen nuestras familias"

3 cards de testimonial:

  1. "Gracias a M&L encontré el seguro perfecto para mi familia."
     — Laura G., madre de familia
     estrellas: ★★★★★
     ícono: avatar circle con inicial "L"

  2. "La asesoría fue clara y rápida. Me ahorró tiempo y dinero."
     — Andrés M., empresario
     estrellas: ★★★★★
     ícono: avatar circle con inicial "A"

  3. "Me sentí acompañado en todo el proceso. Totalmente recomendado."
     — Diana R., profesional independiente
     estrellas: ★★★★★
     ícono: avatar circle con inicial "D"

estilo:
  background: #FFFFFF
  border-radius: 16px
  padding: 28px
  border: 1px solid rgba(0,0,0,0.07)
  texto testimonial: Lora italic 400 16px color #1A1A2E
  nombre: Inter 600 14px color #C2185B
  rol: Inter 400 13px color #9E9E9E
```

---

## 7. SECCIÓN ASEGURADORAS ALIADAS

```
fondo: #FFFFFF
padding: 64px 0

headline: "Respaldados por las mejores aseguradoras de Colombia"
subheadline: "Comparamos para que tú elijas con confianza."

grid de logos: 4 columnas, centrado
logos: SURA · MAPFRE · Seguros Bolívar · AXA Colpatria
       Seguros del Estado · Equidad Seguros · Previsora · Mundial de Seguros

estilo logos:
  filter: grayscale(100%) opacity 0.6
  hover: grayscale(0%) opacity 1 + transition 0.25s
  padding: 16px 24px
  border: 0.5px solid rgba(0,0,0,0.08)
  border-radius: 10px
```

---

## 8. SECCIÓN PRICING / CTA COTIZACIÓN

```
fondo: #E5F0FA
padding: 80px 0

layout: centrado

badge: "Sin costo · Sin compromiso"
headline: "Tu cotización gratis en menos de 5 minutos"
subheadline: "Planes desde $50.000/mes según aseguradora."
disclaimer: "* Precios sujetos a aseguradora y cobertura."

CTA principal: "Solicitar cotización gratuita" (botón magenta grande)
CTA secundario: "Hablar con Mili — nuestra IA" (botón outline)

trust badges (fila):
  🔒 Datos seguros · 📞 Asesoría sin costo · ⭐ 4.9/5 satisfacción
```

---

## 9. SECCIÓN MILI (chat IA)

```
fondo: linear-gradient(135deg, #1A1A2E, #2D1B4E)
padding: 80px 0
color texto: #FFFFFF

layout: dos columnas

izquierda:
  badge: "Nuevo · Asistente IA"
  headline: "Conoce a Mili, tu asesora virtual"
  subheadline: "Resuelve tus dudas sobre seguros al instante.
                Disponible 24/7, sin esperas."
  bullet points:
    ✓ Conoce todo el catálogo de M&L
    ✓ Te ayuda a comparar opciones
    ✓ Te conecta con un asesor humano cuando lo necesites
  CTA: "Hablar con Mili ahora" (botón magenta)

derecha:
  preview del chat Mili (card oscura con burbujas de ejemplo):
    Mili: "¡Hola! ¿En qué te puedo ayudar hoy?"
    Usuario: "¿Cuál es el mejor seguro de autos?"
    Mili: "Depende de tu vehículo y presupuesto. Cuéntame más y te ayudo a comparar opciones."
```

---

## 10. FOOTER

```
fondo: #1A1A2E
color texto: #FFFFFF

4 columnas:
  1. Logo M&L + tagline "Tu tranquilidad respaldada por +10 aseguradoras aliadas"
     íconos sociales

  2. Menú rápido:
     Inicio · Vida · Autos · Cumplimiento · Generales · Aliadas · Contacto

  3. Contacto:
     WhatsApp: +57 xxx xxx xxxx
     Email: info@consultoresmyl.com
     Dirección: Bogotá, Colombia

  4. Legal:
     Aviso legal
     Políticas de privacidad
     NIT: 901331365-1

copyright: "© 2025 Consultores de Seguros M&L — Todos los derechos reservados"
```

---

## 11. BOTÓN FLOTANTE MILI (global)

```
position: fixed, bottom 28px right 28px
background: #C2185B
color: #FFFFFF
border-radius: 28px
padding: 14px 20px
texto: [ícono MessageCircle] "Hablar con Mili"
box-shadow: 0 4px 20px rgba(194,24,91,0.40)
hover: translateY(-2px) + sombra más intensa
mobile: solo ícono, círculo 52px
```

---

## 12. ANIMACIONES GENERALES

```
Entrada de secciones al scroll:
  cada sección usa IntersectionObserver
  animación: opacity 0→1 + translateY(24px→0)
  duration: 0.5s ease-out
  stagger: 0.1s entre elementos del mismo grupo

Hero específico (secuencia de entrada):
  delay 0.1s → badge IA
  delay 0.15s → H1
  delay 0.30s → subtexto
  delay 0.42s → CTAs
  delay 0.55s → social proof
  delay 0.70s → floating card 1
  delay 0.90s → floating card 2

Continuas:
  imagen hero: floatY 5s ease-in-out infinite
  badge dot: pulseRing 2s ease infinite
  botón CTA: pulseRing 2.5s ease infinite (subtle)
  marquee aseguradoras: translateX -50% en 18s linear infinite
  estrellas social proof: starPop en secuencia (delay 0.1s cada una)
```

---

## 13. PROMPT ONE-SHOT PARA CLAUDE DESIGN

```
Carga los archivos 00_BRAND_SYSTEM.md y 01_HOME.md.
Assets adjuntos: hero-family-lion.png, logo-myl-seguros.jpeg

Diseña la página de inicio completa de Consultores M&L Seguros.
El cliente quiere un diseño CLARO y CÁLIDO — fondo blanco y azul suave, NO dark.

Estructura requerida (en orden):
1. Navbar sticky: logo M&L + menús con dropdown + badge Mili + botón Contacto
2. Hero: texto izquierda (badge IA · H1 · subtexto · 2 CTAs · social proof)
         imagen hero-family-lion.png derecha con float + 2 floating cards de stats
3. Marquee de aseguradoras animado
4. Sección problema/solución (fondo azul claro)
5. Grid de 6 categorías de seguros (cards con hover)
6. 3 testimoniales
7. Grid de logos de aseguradoras aliadas (grayscale → color en hover)
8. CTA de cotización (fondo azul claro)
9. Sección Mili con preview del chat (fondo oscuro)
10. Footer oscuro
11. Botón flotante de Mili (magenta, fixed bottom-right)

Animaciones requeridas:
- Entrada escalonada en hero (fadeUp con delays)
- Imagen flotando suavemente
- Floating cards con pop al cargar
- Marquee infinito de aseguradoras
- Scroll reveal en todas las secciones
- Hover effects en cards y logos

Paleta, tipografía y componentes: según 00_BRAND_SYSTEM.md
```
