# 02_SUBPAGE_TEMPLATE.md — Template de Subpáginas
## Consultores M&L Seguros · v3

> **Instrucción para Claude Design y Claude Code:**
> 1. Carga siempre `00_BRAND_SYSTEM.md` antes de este archivo.
> 2. Este template define el diseño y la lógica de generación de las **27 subpáginas** del sitio.
> 3. Cada subpágina corresponde a una `menu_subcategory` con productos activos en el catálogo.
> 4. La fuente de datos es el Google Sheets: https://docs.google.com/spreadsheets/d/1YivNd2BoXqwbSrrDEJNmT7ACJ1Z4RTz4YhTTqcgPhbQ
> 5. Para la implementación de Mili ver `05_MILI_SPEC.md`.
> 6. Este sitio sigue el principio **Data-Driven Design**: el contenido y las cards se generan automáticamente desde el Sheets. Agregar o modificar una póliza en el Sheets se refleja en el sitio sin tocar el código.

---

## 1. ESTRUCTURA DE DATOS (Google Sheets → Subpágina)

### Hoja: Products
```
product_id         → ID único del producto
is_active          → 1 = visible en el sitio
product_name       → Nombre del seguro individual
slug               → URL slug del producto
carrier_name       → Nombre de la aseguradora
menu_category      → Categoría principal (VIDA / AUTOS / CUMPLIMIENTO / GENERALES)
menu_subcategory   → Nombre de la subpágina (ej: Vehículos Particulares)
product_type       → Agrupador de cards (ej: Seguro de Autos)
short_description  → Descripción corta — se muestra en la card grande
long_description   → Descripción larga — se muestra en el chat de Mili
benefits           → Lista de beneficios separados por coma — Mili los presenta como bullets ✓
coverages          → Campo reservado para v2
is_featured        → 1 = carrier destacado (borde magenta visible en chip de logo)
show_in_comparator → 1 = aparece en la página Comparar
form_type          → Tipo de formulario de cotización
whatsapp_template  → Mensaje preconfigurado para el CTA de WhatsApp
cta_label          → Siempre "Cotiza ahora"
image_url          → URL de imagen del producto (vacío usa ícono Lucide de icon_name)
icon_name          → Ícono Lucide para la card (ej: car, heart, home)
clausulado_url     → URL del PDF del clausulado (externo a aseguradora o propio)
clausulado_disponible → 1 = mostrar botón de clausulado / 0 = no mostrar
seo_title          → Meta title de la subpágina
seo_description    → Meta description
```

### Hoja: Subcategories
```
menu_category      → Categoría matriz
menu_subcategory   → Nombre de la subpágina
form_type          → Tipo de formulario por defecto
icon_name          → Ícono Lucide de la subcategoría
subcategory_slug   → URL slug (ej: vehiculos-particulares)
```

### Hoja: Carriers
```
carrier_name       → Nombre oficial de la aseguradora
carrier_slug       → Slug URL
logo_filename      → Nombre del archivo PNG en la carpeta logos/ (ej: estado.png)
is_active          → 1 = activa
```

---

## 2. PRINCIPIO DE AGRUPACIÓN — DATA-DRIVEN DESIGN

> **Una card grande por `product_type`, no por producto individual.**

Si en "Vehículos Particulares" hay 10 productos todos con `product_type = "Seguro de Autos"`, la subpágina muestra **una sola card** que agrupa todos. Cada chip de logo dentro de la card representa un producto/carrier individual.

Si la subcategoría tiene múltiples `product_type` distintos (ej: Individual tiene "Individual", "Vida Deudor", "Auxilios y Respaldos"), se muestran múltiples cards — una por tipo.

### Lógica de generación (pseudocódigo para Claude Code):
```javascript
// 1. Cargar todos los productos activos de la subcategoría
const products = await fetchFromSheets({
  filter: { menu_subcategory: currentSubcategory, is_active: 1 }
});

// 2. Agrupar por product_type para las cards
const cardsByType = groupBy(products, 'product_type');

// 3. Para cada product_type generar una card
for (const [productType, items] of cardsByType) {
  const polizaCount = items.length;
  const carrierCount = new Set(items.map(p => p.carrier_name)).size;
  const featuredCarriers = items.filter(p => p.is_featured == 1);
  const nonFeaturedCarriers = items.filter(p => p.is_featured != 1);
  renderProductTypeCard({ productType, items, polizaCount, carrierCount, featuredCarriers, nonFeaturedCarriers });
}

// 4. Si un product_type existe en 03_GOBERNANZA pero tiene 0 productos → renderizar card-cero
```

### Contadores del banner de subcategoría:
```javascript
const bannerStats = {
  totalPolizas:      products.length,                                    // ej: 10
  totalProductTypes: new Set(products.map(p => p.product_type)).size,   // ej: 1
  totalCarriers:     new Set(products.map(p => p.carrier_name)).size,   // ej: 9 (Qualitas cuenta 1)
};
```

---

## 3. LAYOUT COMPLETO DE SUBPÁGINA

```
┌─────────────────────────────────────────────────────────┐
│  TOP NAV (global, sticky)                               │
├─────────────────────────────────────────────────────────┤
│  HERO BANNER con imagen real                            │
│  Breadcrumb · Categoría badge · H1 + H2 magenta         │
│  Subtexto (copy del 03_GOBERNANZA) · 4 íconos de        │
│  coberturas clave · Contadores: pólizas/tipos/carriers  │
├─────────────────────────────────────────────────────────┤
│  SECCIÓN DE BIENVENIDA (fondo #E5F0FA)                  │
│  titulo_bienvenida · descripcion_subcategoria           │
│  5 badges de features generados desde benefits          │
├─────────────────────────────────────────────────────────┤
│  CARDS DE PRODUCT_TYPE (fondo #FFFFFF)                  │
│  Grid 3 columnas · cards cuadradas verticales           │
│  Imagen real arriba · Nombre · Badges · Descripción     │
│  Chips de logos clicables → abre modal de póliza        │
│  Texto hint "Selecciona una aseguradora para ver detalles"│
├─────────────────────────────────────────────────────────┤
│  MODAL DE PÓLIZA (overlay al hacer clic en logo)        │
│  Header fucsia · logo carrier · nombre · código         │
│  Descripción larga · beneficios con checkmarks          │
│  [Hablar con Mili] · [Ver clausulado]                   │
├─────────────────────────────────────────────────────────┤
│  STRIP DE ASEGURADORAS (logos globales, grayscale)      │
├─────────────────────────────────────────────────────────┤
│  CTA FINAL OSCURO · WhatsApp + Cotizar                  │
├─────────────────────────────────────────────────────────┤
│  FOOTER (global)                                        │
└─────────────────────────────────────────────────────────┘

[ CHAT MILI — overlay centrado, abre desde botón del card o FAB flotante ]
[ FAB MILI FLOTANTE — visible en todas las páginas, bottom-right ]
```

> **Nota:** El modal de póliza se abre al hacer clic en el logo de una aseguradora dentro del card. El botón "Hablar con Mili" vive dentro del modal, no en el card. Ver Sección 5.3 para el modal completo.

---

## 4. SECCIÓN DE BIENVENIDA

Ubicada entre el hero banner y los cards. Fondo `#E5F0FA` para diferenciarse visualmente.

```
fondo: #E5F0FA
border-top: 1px solid rgba(0,0,0,0.05)
border-bottom: 1px solid rgba(0,0,0,0.05)
padding: 48px 0

contenido:
  título       → titulo_bienvenida del 03_GOBERNANZA.md
                 Inter 700 · 28px · #1A1A2E
                 ej: "Bienvenidos a la sección de Pólizas para Vehículos Particulares."

  descripción  → descripcion_subcategoria del 03_GOBERNANZA.md
                 Inter 400 · 15px · #4A4A4A · line-height 1.7
                 párrafo vendedor generado desde análisis de long_descriptions

  5 badges     → generados automáticamente por Claude Code desde los benefits
                 de todos los productos de la subcategoría
                 estilo: chip con ícono temático + texto corto
                 background: #FFFFFF · border: 1px solid rgba(0,0,0,0.08)
                 border-radius: 20px · padding: 6px 14px · font-size: 13px
```

### Generación automática de badges (Claude Code):
```javascript
// Claude Code llama a la API de Claude con todos los long_descriptions
// de los productos de la subcategoría para extraer los 5 badges más relevantes
// Ver HANDOFF_Claude_Code.md función generateIntroSection()
// Fuentes: benefits[] y long_description de cada producto activo
```

---

## 5. CARD DE PRODUCT_TYPE

### 5.1 Formato — cuadrado vertical, grid 3 columnas

```css
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
@media (max-width: 900px) { .cards-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .cards-grid { grid-template-columns: 1fr; } }
```

**Alineación:** si hay 1 sola card (ej: Vehículos Particulares), se alinea a la izquierda del grid — NO centrada. Esto es consistente con cómo se ve cuando hay 2 o 3 cards.

### 5.2 Estructura visual del card cuadrado

```
┌─────────────────────────────┐
│  IMAGEN SUPERIOR            │  height: 200px
│  image_url del product_type │  object-fit: cover
│  Si image_url vacío →       │  border-radius: 12px 12px 0 0
│  gradiente + ícono Lucide   │
├─────────────────────────────┤
│  Nombre product_type        │  Inter 600 · 16px · #1A1A2E
│  Badges: [N pólizas] [N AS] │  doble badge magenta
│  Descripción corta          │  Inter 400 · 13px · #4A4A4A (3 líneas máx)
├─────────────────────────────┤
│  ASEGURADORAS — label gris  │
│  [logo chips en color]      │  featured primero, non-featured después
│                             │  filter: none · opacity: 0.80
│                             │  hover: opacity 1 + borde magenta
├─────────────────────────────┤
│  "Selecciona una aseg..."   │  texto hint 12px gris centrado
└─────────────────────────────┘
```

### Imagen del card — lógica de prioridad:
```javascript
// 1. Si image_url en el Sheets tiene valor → usar esa imagen
// 2. Si image_url vacío Y existe archivo en assets/cards/{product_type_slug}.png → usar ese
// 3. Fallback: gradiente #E5F0FA → #F7F7F7 + ícono Lucide del icon_name

// Ejemplo para "Seguro de Autos":
// assets/cards/seguro-de-autos.png  ← Imagen_Card_Seguro_de_Autos.png renombrada
```

**Imágenes de cards disponibles:**
```
assets/cards/
  seguro-de-autos.png          ← Imagen_Card_Seguro_de_Autos.png (familia + SUV + escudo)
  [otras por subcategoría]     ← generar con Midjourney usando prompts del 03_GOBERNANZA
```

### Logos en el card — color natural (NO grayscale):
```css
.logo-chip {
  filter: none;
  opacity: 0.80;
  cursor: pointer;
  transition: all 0.2s ease;
}
.logo-chip:hover,
.logo-chip.selected {
  opacity: 1;
  border-color: #C2185B !important;
  box-shadow: 0 2px 8px rgba(194,24,91,0.15);
}
.logo-chip.featured { border: 0.5px solid rgba(194,24,91,0.30); }
.logo-chip.non-featured { border: 0.5px solid rgba(0,0,0,0.10); }
```

**Nota:** Los logos en el STRIP DE ASEGURADORAS (sección inferior) sí van en grayscale → color en hover. Solo los chips dentro del card van en color natural.

### Hint debajo de los logos:
```html
<p class="card-hint">
  <i class="ti ti-hand-click"></i>
  Selecciona una aseguradora para ver los detalles
</p>
```
```css
.card-hint { font-size: 12px; color: #9E9E9E; text-align: center; margin-top: 8px; }
```

### 5.3 Modal de póliza (al hacer clic en logo)

Al hacer clic en cualquier chip de logo se abre un overlay con la información completa
de ese producto específico del Sheets.

```
ESTRUCTURA DEL MODAL:

Header fucsia (#C2185B):
  logo de la aseguradora (de logos/{logo_filename})
  carrier_name · product_name · product_id + product_type

Body (fondo blanco):
  Descripción → long_description del Sheets
  Beneficios  → benefits[] del Sheets (lista con checkmarks magenta)

Footer:
  [💬 Hablar con Mili sobre esta póliza]  → botón fucsia sólido
      → cierra modal + abre chat Mili con contexto específico del producto
  [📄 Ver clausulado completo]             → botón outline fucsia
      → visible si clausulado_disponible = 1
      → abre clausulado_url en nueva pestaña
      → disabled con nota si clausulado_disponible = 0
```

**Caso especial Qualitas Colombia (2 productos bajo mismo product_type):**
```
Chip Qualitas muestra badge "2" superpuesto
Al hacer clic → Mili pregunta: "¿Te interesa el seguro de autos o el SOAT?"
```

```
height: 440px desktop / 320px mobile
fondo: imagen real de la subcategoría con overlay gradiente
       linear-gradient(to right, rgba(10,10,20,0.92) 0%, rgba(10,10,20,0.75) 45%, rgba(10,10,20,0.15) 100%)

estructura (columna izquierda sobre overlay oscuro):
  breadcrumb    Inter 13px · blanco 60% · "Inicio > AUTOS > Vehículos Particulares"
  
  badge         ícono Lucide (icon de la categoría) + nombre CATEGORÍA en mayúsculas
                background: rgba(194,24,91,0.20) · border: rgba(194,24,91,0.40)
                color: #FFFFFF · border-radius: 20px
  
  H1            Inter 800 · 52px desktop / 34px mobile · #FFFFFF
                ej: "Seguros de"
  
  H2 magenta    Inter 800 · 52px desktop / 34px mobile · #C2185B
                ej: "Vehículos Particulares"
  
  separador     línea horizontal magenta 40px, 2px
  
  subtexto      copy de descripción de la subcategoría (03_GOBERNANZA.md)
                Inter 400 · 18px · rgba(255,255,255,0.80)
  
  íconos de coberturas clave (4 íconos en fila):
                ícono Lucide 24px magenta + texto blanco 14px
                sin fondo, separados con gap 28px
                (definir 4 coberturas representativas por subcategoría)
  
  contadores (fila de stats, separados con línea vertical):
                número grande Inter 700 28px #FFFFFF
                label Inter 400 13px rgba(255,255,255,0.60)
                ej: "10 · Productos | 1 · Categorías | 9 · Aseguradoras"
```

### Copy de banners por subcategoría (del 03_GOBERNANZA.md):

| Subcategoría | H1 | H2 | Subtexto banner |
|---|---|---|---|
| Vehículos Particulares | "Seguros de" | "Vehículos Particulares" | "Tu carro, protegido en cada kilómetro." |
| Vehículos Pesados | "Seguros para" | "Vehículos Pesados" | "Cobertura robusta para tu flota pesada y de carga." |
| Movilidad Personal | "Seguros de" | "Movilidad Personal" | "Muévete por la ciudad con toda la protección." |
| Individual | "Seguros de" | "Vida Individual" | "Tu familia, protegida para siempre." |
| Mascotas | "Seguros para" | "Mascotas" | "Ellos también son familia. Protégelos." |
| Pólizas de Hogar | "Seguros de" | "Hogar y Patrimonio" | "Tu hogar y patrimonio, protegidos ante cualquier imprevisto." |
| Entidades Estatales | "Seguros de" | "Cumplimiento Estatal" | "Cumplimiento garantizado en cada contrato con el Estado." |
| Arrendamiento | "Seguros de" | "Arrendamiento" | "Garantiza el pago de tu arriendo, siempre." |

> **Subcategorías con múltiples product_types sin descripción propia:** agregar en `03_GOBERNANZA.md` una sección por subcategoría con su descripción banner. Pendiente para: Vida Colectiva, AP, Vehículos Comerciales, Crédito de Autos, Pólizas Colectivas, Empresas y/o Persona Natural, Cumplimiento Particular.

---

## 6. CARD CON CERO PÓLIZAS

Para product_types que existen en la taxonomía (03_GOBERNANZA.md) pero no tienen productos en el Sheets:

```
┌──────────────────────────────────────────────────────────────┐
│  [Ícono 130×168px]        │  Nombre del product_type          │
│  fondo gris claro         │  Inter 600 · 17px · #9E9E9E       │
│  ícono 48px gris          │                                    │
│                           │  Descripción del product_type      │
│                           │  (del 03_GOBERNANZA.md)            │
│                           │  Inter 400 · 14px · #9E9E9E        │
│                           │                                    │
│                           │  [badge gris] 0 pólizas disponibles│
│                           ├──────────────────────────────────│
│                           │  Por ahora no tenemos este         │
│                           │  producto — estamos trabajando     │
│                           │  en incorporarlo pronto.           │
│                           ├──────────────────────────────────│
│                           │  [💬 Hablar con Mili — puedo      │
│                           │   conseguirte una cotización]      │
└──────────────────────────────────────────────────────────────┘

CSS diferencial:
  .product-type-card.empty { opacity: 0.7; }
  .badge-stat.empty { color: #9E9E9E; background: rgba(0,0,0,0.05); }
  botón Mili: mismo estilo pero texto alternativo
```

---

## 7. INTEGRACIÓN DE MILI

El botón "Hablar con Mili" en cada card inyecta contexto automáticamente. Ver `05_MILI_SPEC.md` para la implementación completa del agente.

```javascript
// Contexto que se inyecta al abrir Mili desde el card
const miliContext = {
  entry_point:       'card',                    // 'card' | 'fab' | 'hero'
  menu_category:     'AUTOS',
  menu_subcategory:  'Vehículos Particulares',
  product_type:      'Seguro de Autos',
  available_products: products,                 // array completo del product_type
  // Mili consulta los campos: product_name, long_description, benefits,
  // whatsapp_template, clausulado_url, clausulado_disponible, is_featured
};

openMili(miliContext);
```

**Botón Mili en el card:**
```css
.btn-mili-card {
  background: #C2185B;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  padding: 11px 18px;
  font: Inter 600 13px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  margin-top: 8px;
  transition: background 0.2s ease;
}
.btn-mili-card:hover { background: #A31545; }
/* ícono: MessageCircle 16px Lucide */
```

---

## 8. STRIP DE ASEGURADORAS (global, debajo de cards)

```
fondo: #F7F7F7
padding: 48px 0

headline: "Respaldados por las mejores aseguradoras de Colombia"
subheadline: "Comparamos para que tú elijas con confianza."

grid logos: 4 columnas desktop / 3 tablet / 2 mobile
logos: todos los carriers activos de esa subcategoría
estilo: grayscale(100%) opacity(0.6) → hover: grayscale(0%) opacity(1)
```

---

## 9. CTA FINAL OSCURO

```
fondo: linear-gradient(135deg, #1A1A2E, #2D1B4E)
padding: 64px 0
color texto: #FFFFFF

centrado:
  badge: "Sin costo · Sin compromiso"
  headline: "¿Listo para proteger tu [vehículo/familia/negocio]?"
  subheadline: "Un asesor M&L te ayuda a comparar y elegir en minutos."

  CTAs lado a lado:
    [WhatsApp — Hablar con asesor]   background: #25D366
    [Cotizar ahora]                  background: #C2185B
```

---

## 10. FAB MILI (flotante global)

```css
.mili-fab {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 900;
  background: #C2185B;
  color: #FFFFFF;
  border-radius: 28px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font: Inter 600 14px;
  box-shadow: 0 4px 20px rgba(194,24,91,0.40);
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
}
.mili-fab:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(194,24,91,0.50);
}
@media (max-width: 480px) {
  .mili-fab {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    padding: 0;
    justify-content: center;
  }
  .mili-fab span { display: none; }
}
/* Contexto del FAB: sin product_type → Mili saluda genéricamente
   openMili({ entry_point: 'fab', menu_subcategory: currentSubcategory }) */
```

---

## 11. DATOS YAML — Vehículos Particulares (datos reales del Sheets)

```yaml
menu_category: AUTOS
menu_subcategory: Vehículos Particulares
subcategory_slug: vehiculos-particulares
icon_name: car
banner_image: assets/banners/vehiculos-particulares.png
banner_h1: "Seguros de"
banner_h2: "Vehículos Particulares"
banner_subtexto: "Tu carro, protegido en cada kilómetro."
titulo_bienvenida: "Bienvenidos a la sección de Pólizas para Vehículos Particulares."
descripcion_subcategoria: "Encuentra el seguro ideal para tu automóvil, camioneta o
  campero familiar entre 10 pólizas de 9 aseguradoras líderes. Desde planes básicos
  con responsabilidad civil hasta coberturas Premium 360 con deducible desde 0%,
  vehículo de reemplazo hasta 30 días, conciliación en sitio y asistencia en
  carretera 24/7."
banner_coberturas:
  - icono: shield        | texto: "Daños propios y a terceros"
  - icono: lock          | texto: "Protección contra robo"
  - icono: user-check    | texto: "Responsabilidad civil"
  - icono: truck         | texto: "Asistencias en carretera"
banner_stats:
  polizas: 10
  categorias: 1
  aseguradoras: 9

card_image: assets/cards/seguro-de-autos.png   # Imagen_Card_Seguro_de_Autos.png

product_types:
  - product_type: "Seguro de Autos"
    icon_name: car
    card_image: assets/cards/seguro-de-autos.png
    descripcion: "Póliza todo riesgo estándar para automóviles, camionetas y camperos
      de servicio particular familiar."
    polizas_count: 10
    carriers_count: 9
    carriers:
      # featured = 1 — logos en color natural, borde magenta sutil
      - carrier: "Seguros del Estado"  | logo: logos/estado.png       | featured: true  | productos: 1
      - carrier: "SURA"                | logo: logos/sura.png         | featured: true  | productos: 1
      - carrier: "MAPFRE"              | logo: logos/mapfre.png       | featured: true  | productos: 1
      - carrier: "AXA Colpatria"       | logo: logos/axa-colpatria.png| featured: true  | productos: 1
      - carrier: "Seguros Bolívar"     | logo: logos/bolivar.png      | featured: true  | productos: 1
      - carrier: "Qualitas Colombia"   | logo: logos/qualitas.png     | featured: true  | productos: 2  # badge "2"
      # featured = 0 — logos en color natural, borde gris
      - carrier: "Equidad Seguros"     | logo: logos/equidad.png      | featured: false | productos: 1
      - carrier: "Previsora Seguros"   | logo: logos/previsora.png    | featured: false | productos: 1
      - carrier: "HDI Colombia"        | logo: logos/hdi.png          | featured: false | productos: 1

# Logos disponibles en la carpeta logos/ (16 archivos):
logos_disponibles:
  - logos/estado.png
  - logos/sura.png
  - logos/mapfre.png
  - logos/axa-colpatria.png
  - logos/bolivar.png
  - logos/equidad.png
  - logos/previsora.png
  - logos/qualitas.png
  - logos/hdi.png
  - logos/mundial.png
  - logos/finesa.png
  - logos/medicos.png
  - logos/sufi.png
  - logos/Bancolombia.png
  - logos/Banco de Bogota.png
  - logos/Banco de Occidente.png
```

---

## 12. GUÍA DE GENERACIÓN MASIVA — 27 SUBPÁGINAS (para Claude Code)

### Arquitectura de archivos
```
/
├── index.html                          ← Home (ya existe)
├── logos/                              ← Logos de carriers (compartido)
├── assets/
│   ├── banners/                        ← Imágenes hero de cada subcategoría
│   └── icons/                          ← Íconos adicionales
├── [subcategory_slug]/
│   └── index.html                      ← Una por cada subcategoría
│       ej: /vehiculos-particulares/index.html
│           /individual/index.html
│           /polizas-de-hogar/index.html
└── js/
    ├── sheets-client.js                ← Fetch y caché del Google Sheets
    ├── subpage-renderer.js             ← Renderiza cards dinámicamente
    └── mili-chat.js                    ← Ver 05_MILI_SPEC.md
```

### Proceso de generación por subcategoría
```javascript
// Para cada fila de la hoja Subcategories:
async function generateSubpage(subcategoryRow) {
  const slug = subcategoryRow.subcategory_slug;
  const category = subcategoryRow.menu_category;
  const subcategory = subcategoryRow.menu_subcategory;

  // 1. Fetch de productos activos
  const products = await sheetsClient.getProducts({
    menu_subcategory: subcategory,
    is_active: 1
  });

  // 2. Agrupar por product_type
  const cardGroups = groupBy(products, 'product_type');

  // 3. Obtener product_types de la taxonomía (03_GOBERNANZA)
  //    para detectar los que tienen count = 0
  const allTypesForSubcat = TAXONOMY[category][subcategory] ?? [];

  // 4. Merge: tipos con productos + tipos con cero
  const allCards = allTypesForSubcat.map(type => ({
    product_type: type,
    products: cardGroups[type] ?? [],
    isEmpty: !cardGroups[type] || cardGroups[type].length === 0
  }));

  // 5. Calcular stats del banner
  const stats = {
    polizas: products.length,
    product_types: Object.keys(cardGroups).length,
    carriers: new Set(products.map(p => p.carrier_name)).size
  };

  // 6. Renderizar el template HTML
  return renderSubpageTemplate({ slug, category, subcategory, allCards, stats });
}
```

### Mapa de las 27 subpáginas activas
```
VIDA (8):
  individual               | Individual
  vida-colectiva           | Vida Colectiva
  ap-accidentes-personales | AP (Accidentes Personales)
  polizas-de-salud-...     | Pólizas de Salud y Medicina Prepagada
  mascotas                 | Mascotas
  arl-riesgos-laborales    | ARL (Riesgos Laborales)
  polizas-de-asistencia-.. | Pólizas de Asistencia en Viajes Internacionales
  exequial                 | Exequial

AUTOS (7):
  vehiculos-particulares   | Vehículos Particulares  ← PROTOTIPO DE DISEÑO
  vehiculos-comerciales    | Vehículos Comerciales
  credito-de-autos-...     | Crédito de Autos
  movilidad-personal       | Movilidad Personal
  vehiculos-pesados        | Vehículos Pesados
  maquinaria-y-equipos-... | Maquinaria y Equipos Móviles
  polizas-colectivas       | Pólizas Colectivas

CUMPLIMIENTO (4):
  entidades-estatales      | Entidades Estatales
  cumplimiento-particular  | Cumplimiento Particular
  arrendamiento            | Arrendamiento
  judiciales               | Judiciales

GENERALES (8):
  empresas-o-persona-...   | Empresas y/o Persona Natural
  polizas-de-hogar         | Pólizas de Hogar
  polizas-todo-riesgo-cons | Pólizas Todo Riesgo Construcción
  responsabilidad-civil-.. | Responsabilidad Civil Profesional
  transporte-de-mercancias | Transporte de Mercancías
  educativa                | Educativa
  polizas-de-copropiedades | Pólizas de Copropiedades
  polizas-todo-riesgo-mont | Pólizas Todo Riesgo Montaje
```

---

## 13. PROMPT ONE-SHOT PARA CLAUDE DESIGN

```
Carga 00_BRAND_SYSTEM.md y 02_SUBPAGE_TEMPLATE.md.

Assets a subir al proyecto:
  - Logo_Leon_V2_transparente.png (logo M&L)
  - Banner_Seguros_Particulares.png (imagen hero)
  - logos/ (carpeta completa con todos los logos de carriers)

Diseña la subpágina "Vehículos Particulares" (menú: AUTOS) para M&L Seguros.
Esta subpágina es el PROTOTIPO que se usará como base visual para las 27 subpáginas restantes.
El diseño debe reflejar el principio Data-Driven Design: cada elemento dinámico está
etiquetado con su campo del Sheets para que Claude Code lo implemente.

Estructura requerida:
1. Navbar global sticky (igual al home)
2. Hero banner con Banner_Seguros_Particulares.png como fondo
   - breadcrumb: Inicio > AUTOS > Vehículos Particulares
   - badge: ícono car + "AUTOS"
   - H1 blanco: "Seguros de" / H2 magenta: "Vehículos Particulares"
   - separador magenta
   - subtexto: "Tu carro, protegido en cada kilómetro."
   - 4 íconos de coberturas: shield "Daños propios y a terceros" · lock "Protección contra robo"
     · user-check "Responsabilidad civil" · truck "Asistencias en carretera"
   - contadores: "10 · Productos | 1 · Categorías | 9 · Aseguradoras"
3. Sección de cards (fondo #FFFFFF, padding 80px):
   UNA card de product_type "Seguro de Autos":
   - Izquierda: área 130×168px con gradiente #E5F0FA→#F7F7F7 + ícono car 48px magenta
   - Derecha: nombre "Seguro de Autos" · descripción del 03_GOBERNANZA
   - 2 badges: "10 pólizas" + "9 aseguradoras" (color magenta)
   - Chips de logos: featured primero (borde magenta sutil), non-featured después (borde gris)
     Qualitas con badge "2" superpuesto
   - Botón magenta: "💬 ¿Cuál es la mejor para mí? — Hablar con Mili"
4. Strip de logos de aseguradoras (fondo #F7F7F7)
5. CTA final oscuro (gradiente #1A1A2E → #2D1B4E) con botones WhatsApp verde + Cotizar magenta
6. Footer oscuro (igual al home)
7. FAB Mili flotante (magenta, fixed bottom-right)

Etiqueta cada campo dinámico con comentario HTML: <!-- [campo: nombre_campo del Sheets] -->
Diseño: claro, profesional, fondo blanco con acentos magenta. Según 00_BRAND_SYSTEM.md.
Animaciones: scroll-reveal en cards, hover en chips de logos.
```
