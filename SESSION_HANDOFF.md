# SESSION HANDOFF — MYL Seguros Web
**Date:** 2026-05-23  
**Status:** Visual asset generation complete. Site fully functional locally.

---

## 1. Architecture Implemented

### Stack
- **Frontend:** Pure static HTML/CSS/JS — no build step, no framework
- **Pages:** 27 insurance subpages (`{slug}/index.html`) + 3 special pages (`comparar/`, `aliadas/`, `contacto/`) + `index.html` home
- **Data source:** Google Sheets (runtime CSV fetch via `gviz/tq` API)
  - Sheet ID: `1YivNd2BoXqwbSrrDEJNmT7ACJ1Z4RTz4YhTTqcgPhbQ`
- **Local dev server:** `npx serve . -p 3000` (or whichever port is free — fell back to 52498 this session)

### Key Files
| File | Purpose |
|---|---|
| `js/subpage-renderer.js` | Fetches Sheets data, renders product cards, logo chips, modals, hero banner |
| `js/gobernanza-data.js` | Static governance config: 27 subcategory entries with banner paths, banner copy, product_types, Mili chips |
| `js/mili-chat.js` | Mili AI chat UI — sends messages to `/api/mili` proxy |
| `css/shared.css` | Site-wide styles |
| `assets/banners/` | 27 hero banner PNGs (1536×1024) |
| `assets/cards/` | 52 product card PNGs (1024×1024) |
| `logos/` | Carrier logo files (copied from `uploads/`) |

### Rendering Flow
1. Subpage HTML loads → `subpage-renderer.js` runs
2. Reads current page slug from URL
3. Looks up `GOBERNANZA_MAP[subcategoryName]` for static config (banner image, copy, coberturas)
4. Fetches `gviz/tq` CSV for live product/carrier data from Sheets
5. Groups products by `product_type` → renders one `product-type-card` per type
6. Each card: card image via `../assets/cards/{slugify(productType)}.png`, logo chips, modal on chip click
7. `renderHero(g)` sets `#heroBannerBg` background-image from `g.banner_image`

### Card Image Slug Convention
```javascript
function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
// "RC Profesional" → "rc-profesional"
// "Híbridos y/o Eléctricos" → "hibridos-y-o-electricos"
```
Card filename = `assets/cards/{slugify(product_type_from_sheets)}.png`

---

## 2. Bugs Fixed This Session

| # | Bug | Fix Applied |
|---|---|---|
| 1 | Carrier logos not showing | `normalizeLogoFilename()` strips `logos_` prefix from Sheets `logo_filename` field |
| 2 | Qualitas badge "2" duplicated | `renderLogoChipsAll()` de-duplicates by `carrier_name` using a `Set` |
| 3 | "Hablar con Mili" button in product cards | Removed `<button class="btn-mili-card">` from `renderProductCard` |
| 4 | Modal not opening on chip click | Rewrote chip click handler: `data-carrier` / `data-type` attributes + `handleChipClick(el)` — no more inline JSON serialization |
| 5 | `aliados_confianza_v3.png` 404 on home | Fixed `src` path to `uploads/aliados_confianza_v3.png`; copied file to root |
| 6 | Welcome section container too narrow | `.welcome-inner { max-width: 900px }` (was 780px) |

---

## 3. Image Generation Pipeline

### Model & Format
- **Model:** `gpt-image-1` (NOT dall-e-3 — does not exist on current API key)
- **Response format:** `data[0].b64_json` decoded with `Buffer.from(b64, 'base64')` — no URL download step
- **Banner size:** `1536x1024` (landscape)
- **Card size:** `1024x1024` (square)
- **Quality param:** omitted (gpt-image-1 does not accept it)

### Scripts
| Script | Purpose |
|---|---|
| `generate-assets-pilot.js` | Original pilot — 3 banners + 3 cards |
| `generate-assets-full.js` | Full batch — 23 banners + 46 cards, skips existing files |

### Assets Generated
| Batch | Banners | Cards | Cost |
|---|---|---|---|
| Pre-existing | 1 (`vehiculos-particulares`) | 1 (`seguro-de-autos`) | — |
| Pilot | 3 | 3 | ~$0.30 |
| Full batch | 23 | 46 | ~$3.22 |
| Hotfixes | 0 | 2 (`responsabilidad-civil-profesional`, `responsabilidad-civil-hidrocarburos`) | ~$0.04 |
| **Total** | **27** | **52** | **~$3.56** |

### Hotfix Notes
- `rc-profesional.png` was generated but Sheets product type is `"Responsabilidad Civil Profesional"` → slug `responsabilidad-civil-profesional`. Fixed by copying the file.
- `responsabilidad-civil-hidrocarburos.png` was an unlisted product type discovered during QA. Generated fresh.

### Gobernanza Update
All 27 `banner_image` fields in `gobernanza-data.js` are now populated. Zero nulls remain.  
Pattern: `'../assets/banners/{page-slug}.png'`

---

## 4. QA Results (Final Run)

**Tool:** Playwright (`qa-full.js`) — 1440×900 headless Chromium  
**Server:** `http://localhost:52498`  
**Pages tested:** 28 (home + 27 subpages)

### Summary Table

| Page | Banner | Broken imgs | Shields | Chips | Modal |
|---|---|---|---|---|---|
| home | — | ✅ 0 | ✅ | 0 | — |
| individual | ✅ | ✅ 0 | ✅ | 11 | ✅ |
| vida-colectiva | ✅ | ✅ 0 | ✅ | 7 | ✅ |
| ap-accidentes-personales | ✅ | ✅ 0 | ✅ | 4 | ✅ |
| polizas-de-salud-y-medicina-prepagada | ✅ | ✅ 0 | ⚠️ | 5 | ✅ |
| mascotas | ✅ | ✅ 0 | ✅ | 3 | ✅ |
| arl-riesgos-laborales | ✅ | ✅ 0 | ✅ | 4 | ✅ |
| polizas-de-asistencia-en-viajes-internacionales | ✅ | ✅ 0 | ✅ | 1 | ✅ |
| exequial | ✅ | ✅ 0 | ✅ | 1 | ✅ |
| vehiculos-particulares | ✅ | ✅ 0 | ✅ | 9 | ✅ |
| vehiculos-comerciales | ✅ | ✅ 0 | ✅ | 6 | ✅ |
| vehiculos-pesados | ✅ | ✅ 0 | ⚠️ | 5 | ✅ |
| maquinaria-y-equipos-moviles | ✅ | ✅ 0 | ⚠️ | 2 | ✅ |
| movilidad-personal | ✅ | ✅ 0 | ⚠️ | 6 | ✅ |
| credito-de-autos-livianos-publicos-y-pesados | ✅ | ✅ 0 | ✅ | 6 | ✅ |
| polizas-colectivas | ✅ | ✅ 0 | ⚠️ | 2 | ✅ |
| entidades-estatales | ✅ | ✅ 0 | ✅ | 4 | ✅ |
| cumplimiento-particular | ✅ | ✅ 0 | ✅ | 4 | ✅ |
| arrendamiento | ✅ | ✅ 0 | ✅ | 4 | ✅ |
| judiciales | ✅ | ✅ 0 | ✅ | 1 | ✅ |
| empresas-o-persona-natural | ✅ | ✅ 0 | ✅ | 15 | ✅ |
| polizas-de-hogar | ✅ | ✅ 0 | ✅ | 7 | ✅ |
| polizas-todo-riesgo-construccion | ✅ | ✅ 0 | ✅ | 4 | ✅ |
| responsabilidad-civil-profesional | ✅ | ✅ 0 | ⚠️ | 3 | ✅ |
| transporte-de-mercancias | ✅ | ✅ 0 | ✅ | 3 | ✅ |
| educativa | ✅ | ✅ 0 | ✅ | 2 | ✅ |
| polizas-de-copropiedades | ✅ | ✅ 0 | ✅ | 1 | ✅ |
| polizas-todo-riesgo-montaje | ✅ | ✅ 0 | ✅ | 1 | ✅ |

**Headline numbers:**
- Banners: **27/27 ✅**
- Broken images: **0 ✅**
- Modal failures: **0 ✅**
- Pages fully clean: **22/28**
- Pages with ⚠️ shields (data gap — see §6): **6**
- Home console error: **1** (Mili proxy 404 — expected)

### Screenshots
Saved to: `qa-screenshots-full/` — 3 screenshots per page (above-fold, cards, modal)

---

## 5. Remaining Known Issues

| Issue | Severity | Blocker? | Notes |
|---|---|---|---|
| Mili `/api/mili` proxy returns 404 | Medium | No | Cloudflare Worker not deployed. Chat UI is complete; just needs the worker. |
| WhatsApp number is placeholder `57XXXXXXXXXX` | Medium | No | Needs real number from client before launch |
| 6 pages show zero-card shields | Low | No | Sheets data gap, not asset gap (see §6) |
| `estado.png` card file exists with no matching product type | Low | No | Orphan file from an older dataset — harmless |
| Home page 1 console 404 | Low | No | Mili proxy — filtered in QA but still fires |

---

## 6. Data Gaps in Google Sheets

The following 6 subpages have at least one product type defined in `gobernanza-data.js` that returns **no rows from Sheets**. The renderer shows a `renderZeroCard` (shield icon, empty state) for those slots. These will resolve automatically when the Sheets are populated — no code change needed.

| Page | Product types missing from Sheets |
|---|---|
| `/polizas-de-salud-y-medicina-prepagada/` | ≥1 of: Pólizas de Salud, Medicina Prepagada |
| `/vehiculos-pesados/` | ≥1 of: Seguro de Autos Pesados, Camiones, Tractocamiones, Flotas Pesadas |
| `/maquinaria-y-equipos-moviles/` | ≥1 of: Maquinaria Amarilla, Retroexcavadoras, Bulldozers, Maquinaria de Contratistas |
| `/movilidad-personal/` | ≥1 of: Motos, Bicicletas, Movilidad Urbana |
| `/polizas-colectivas/` | ≥1 of: Híbridos y/o Eléctricos, Convencionales, Todo Tipo de Motor |
| `/responsabilidad-civil-profesional/` | RC Profesional and/or related subtypes |

**To fix:** Add rows to the Google Sheet with the matching `product_type` column values (exact string match — `slugify()` is case-sensitive after lowercasing). The correct product type names are in `gobernanza-data.js` under each entry's `product_types` array.

---

## 7. Mili AI Chat Status

### What's done
- Full chat window UI in `index.html` (floating button, slide-up panel, message bubbles, send button)
- `js/mili-chat.js` sends POST to `/api/mili` with `{ message, context }` and renders the response
- Per-subcategory quick-chip suggestions wired from `MILI_CHIPS` in `gobernanza-data.js`
- Graceful fallback UI when proxy is unavailable

### What's missing — Cloudflare Worker
The worker must:
1. Accept `POST /api/mili` with JSON body `{ message: string, context: string }`
2. Call Anthropic API (`claude-haiku-4-5` or similar) with a system prompt scoped to insurance advisory
3. Return `{ reply: string }`
4. Store `ANTHROPIC_API_KEY` as a Cloudflare secret — **never expose it in frontend code**

**Security constraint:** The Anthropic API key must live exclusively in the Worker. It must never appear in any frontend JS file.

### Deployment steps (when ready)
```bash
# 1. Create worker
wrangler generate myl-mili-worker

# 2. Add secret
wrangler secret put ANTHROPIC_API_KEY

# 3. Wire route in wrangler.toml
# routes = [{ pattern = "yourdomain.com/api/mili", zone_name = "yourdomain.com" }]

# 4. Deploy
wrangler deploy
```

---

## 8. Next Implementation Priorities

### Priority 1 — Launch blockers
1. **Replace WhatsApp placeholder** — find `57XXXXXXXXXX` in all HTML files and replace with real number
2. **Deploy Cloudflare Worker for Mili** — see §7 above
3. **Populate Sheets data gaps** — 6 pages with zero-card shields (see §6)

### Priority 2 — Pre-launch quality
4. **Image compression** — generated PNGs are 1.3–3 MB each; run `sharp` or `squoosh` to produce WebP at ~200–400 KB per image. This will significantly improve LCP scores.
5. **SEO audit** — verify `<title>`, `<meta description>`, `<og:image>` on all 30 pages
6. **Canonical URLs** — ensure trailing-slash consistency across all internal links
7. **robots.txt / sitemap.xml** — not yet present in project root

### Priority 3 — Post-launch
8. **Analytics** — wire Google Analytics or Cloudflare Web Analytics
9. **Domain + DNS** — point custom domain, configure Cloudflare SSL
10. **Sheets → CDN cache** — the `gviz/tq` calls are unauthenticated; consider a nightly cache-bust strategy for stale data
11. **Multi-product modal polish** — currently shows all products for a carrier; could add filtering by coverage type

---

## Quick Reference

```bash
# Start dev server
npx serve . -p 3000

# Generate missing assets (skips existing)
OPENAI_API_KEY="sk-proj-..." node generate-assets-full.js

# Run full QA (requires server running)
node qa-full.js

# Check for remaining banner_image nulls
grep -n "banner_image.*null" js/gobernanza-data.js
```

**Google Sheet ID:** `1YivNd2BoXqwbSrrDEJNmT7ACJ1Z4RTz4YhTTqcgPhbQ`  
**Sheets URL:** `https://docs.google.com/spreadsheets/d/1YivNd2BoXqwbSrrDEJNmT7ACJ1Z4RTz4YhTTqcgPhbQ`

---
## 9. Session Update — 2026-05-24

### Carrier Strip Improvements

#### Bug Fix — Missing Insurer Logos

Root cause:
`renderCarriersStrip()` only depended on `logoMap[name]`, causing missing insurer logos when carrier names did not exactly match the logo map keys.

Fix applied:
Added fallback to product-level logo filenames:

```javascript
normalizeLogoFilename(
  logoMap[name] ||
  product?.logo_filename ||
  ''
)
```

Also corrected subpage logo asset paths to:

```text
/logos/{filename}
```

---

#### UX Upgrade

Enhanced insurer strip interaction across all subpages.

Implemented:

* full-color logos (removed grayscale default)
* hover elevation
* hover scale animation
* pointer cursor
* improved visual affordance

---

#### Insurer Click Interaction

Added:

```javascript
handleCarrierStripClick(el)
```

Behavior:

* clicking an insurer logo opens filtered modal content for that insurer within the current subcategory
* single product → policy detail modal
* multiple products → filtered multi-product modal

---

#### Dynamic Messaging

Headline now dynamically renders:

```text
Explora también las pólizas disponibles por empresa para {CATEGORY} > {SUBCATEGORY}
```

Supporting subcopy:

```text
Haz clic en una aseguradora para ver sus productos disponibles.
```

---

#### Product Count Badges

Added insurer-level product count badges.

Logic:

```javascript
products.filter(p => p.carrier_name === name).length
```

Badge overlays on each insurer logo.

---

### Cards Section UX Improvement

Kept existing contextual eyebrow:

```text
{CATEGORY} · {SUBCATEGORY}
```

Replaced previous generic headline:

```text
Elige tu aseguradora ideal
```

With centralized contextual messaging:

Default:

```text
Explora el tipo de protección que necesitas y compara las opciones disponibles.
```

Credit-related subcategories:

```text
Explora el tipo de crédito que necesitas y compara las opciones disponibles.
```

Detection logic:

```javascript
/credito|leasing|cartera/i.test(currentSlug)
```

Implementation notes:

* centralized in `js/subpage-renderer.js`
* no HTML files modified
* layout preserved
* responsive behavior preserved

---

### Clausulado Discovery Experiment

Attempted automated discovery of clausulado URLs from insurer websites using sitemap crawling and Google Sheets product data.

Experimental scripts created:

```text
Scripts/clausulado-step1-matrix.js
Scripts/clausulado-step2-discovery-v2.js
```

Outcome:
Automated discovery produced noisy low-quality matches because insurer websites expose inconsistent document structures, generic legal pages, and non-standard document repositories.

Decision:
Manual / hybrid clausulado URL population is preferred over automated crawling for accuracy and better ROI.

---

### Files Changed

```text
js/subpage-renderer.js
```

### Experimental Artifacts

```text
Scripts/clausulado-step1-matrix.js
Scripts/clausulado-step2-discovery-v2.js
```

---

## Session Update — 2026-05-24 (Category Landing Pages Phase 1)

### Context

Implemented architectural expansion based on:

`docs/03_GOBERNANZA.md`

New governance chapter:

`11. CATEGORY LANDING PAGE GOVERNANCE (v2.1)`

Official hierarchy:

HOME
→ CATEGORY LANDING PAGE
→ SUBCATEGORY PAGE
→ PRODUCT TYPE
→ PRODUCT DETAIL / MODAL

---

### Completed Today

#### 1. Navbar bug fix

Issue:
Header mega-menu subcategory links worked only after returning to home.

Root cause:
Comparar / Aliadas / Contacto lacked mega-menu click wiring.

Fix:
Centralized navbar mega-menu wiring in:

```text
js/gobernanza-data.js
```

Implemented:

* `.mega-menu-title` click routing via `SLUG_MAP`
* category route entries:

```javascript
SLUG_MAP['Vida'] = '/vida/';
SLUG_MAP['Autos'] = '/autos/';
SLUG_MAP['Cumplimiento'] = '/cumplimiento/';
SLUG_MAP['Generales'] = '/generales/';
```

Also rewired navbar category anchors:

```text
#vida → /vida/
#autos → /autos/
#cumplimiento → /cumplimiento/
#generales → /generales/
```

Status:
DONE

---

#### 2. Cards section messaging UX improvement

Updated:

```text
Elige tu aseguradora ideal
```

Replaced with dynamic centralized logic:

Default:

```text
Explora el tipo de protección que necesitas y compara las opciones disponibles.
```

Credit-related subcategories:

```text
Explora el tipo de crédito que necesitas y compara las opciones disponibles.
```

Detection:

```javascript
/credito|leasing|cartera/i.test(currentSlug)
```

File:

```text
js/subpage-renderer.js
```

Status:
DONE

---

#### 3. Category Landing Pages architecture design approved

Governance updated successfully.

File:

```text
docs/03_GOBERNANZA.md
```

Added:

```text
Chapter 11 — CATEGORY LANDING PAGE GOVERNANCE (v2.1)
```

---

### Architecture decisions approved

#### Shared renderer architecture

Approved files:

```text
js/category-meta.js
js/category-renderer.js
js/shared-layout.js
```

Category routes:

```text
/vida/
/autos/
/cumplimiento/
/generales/
```

Architecture principle:

* NO duplicated full page HTML
* NO 4 cloned pages
* shared layout injection
* shared renderer
* shared metadata
* backward compatible

---

#### category-meta.js approved scope

Allowed:

* slug
* banner_image
* icon
* theme_class
* eyebrow
* headline
* subcopy
* short_pitch
* CTA routing

NOT allowed:

* long governance strategic definitions duplicated from docs

---

#### category-renderer.js approved architecture

Approved behavior:

* single `window.sheetsClient.getProducts()` fetch
* local aggregation only
* dynamic counts:

  * product count
  * insurer count
  * subcategory count
* dynamic rendering:

  * hero
  * overview
  * subcategory showcase
  * trust section
  * CTA dark
* uses:

  * `SUBCATEGORY_MAP`
  * `GOBERNANZA_MAP`
  * `CATEGORY_META`

---

#### shared-layout.js approved architecture

Critical corrections made:

DO:

* derive mega-menu dynamically from `SUBCATEGORY_MAP`
* reuse existing Mili invocation contract
* inject shared navbar
* inject shared footer
* inject shared Mili shell
* inject floating FAB
* keep reusable architecture

DO NOT:

* hardcode mega-menu taxonomy
* invent new Mili API
* create 4 duplicated navbars/footers

---

### Implementation completed — 2026-05-24 (Session 3)

All pending items from the previous session crash were completed.

---

#### 4. `js/shared-layout.js` — Created and validated

Injects navbar, footer, and Mili shell for all category pages.

Architecture:
- IIFE pattern (no global scope pollution)
- Derives mega-menu columns dynamically from `SUBCATEGORY_MAP` at runtime — no hardcoded taxonomy
- Guards double-injection (`if (document.getElementById('navbar')) return`)
- Logo path: root-relative `/Logo_Leon_V2_transparente.png`
- Footer: 3-column layout — branding + social / NAVEGACIÓN / CONTACTO
- Mili shell: FAB + slide-up window (delegates behavior to `mili-chat.js`)

Script load order (all category shells):
```text
sheets-client.js → gobernanza-data.js → category-meta.js →
shared-layout.js → mili-chat.js → category-renderer.js → inline init
```

Syntax validation:
```bash
node --check "js/shared-layout.js"  # no output = pass
```

Status: **DONE**

---

#### 5. 4 category landing pages created

```text
vida/index.html
autos/index.html
cumplimiento/index.html
generales/index.html
```

Architecture:
- Minimal shell only — no duplicated navbar/footer/Mili markup
- Each page differs only by: `<meta name="category">`, `<title>`, `<meta name="description">`, and `initCategoryPage('<slug>')`
- All layout injected at runtime by `shared-layout.js`
- All content rendered at runtime by `category-renderer.js`

Status: **DONE**

---

#### 6. Banner images populated

Source images (`images/Vida.png`, `Autos.png`, `Cumplimiento.png`, `Generales.png`) — existing homepage category visuals — copied into:

```text
assets/banners/vida.png
assets/banners/autos.png
assets/banners/cumplimiento.png
assets/banners/generales.png
```

No renderer or `category-meta.js` changes required.

Status: **DONE**

---

#### 7. Smoke test — PASSED

Tool: Playwright headless Chromium (1440×900)
Server: `http://localhost:5173`

| Page | Loads | Navbar | Hero | Cards | Footer | Mili FAB | JS Errors | 404s |
|---|---|---|---|---|---|---|---|---|
| `/vida/` | ✅ | ✅ | ✅ | 8 | ✅ | ✅ | 0 | 0 |
| `/autos/` | ✅ | ✅ | ✅ | 7 | ✅ | ✅ | 0 | 0 |
| `/cumplimiento/` | ✅ | ✅ | ✅ | 4 | ✅ | ✅ | 0 | 0 |
| `/generales/` | ✅ | ✅ | ✅ | 8 | ✅ | ✅ | 0 | 0 |

Status: **DONE**

---

#### 8. Visual QA — `/vida/` at 1440px

| Check | Result | Notes |
|---|---|---|
| Navbar alignment | ✅ Pass | Logo, all nav items, IA 24/7 badge, Contacto button — clean |
| Hero spacing + banner | ✅ Pass | Banner image fills full width; headline and CTA legible |
| Mega-menu behavior | ⚠️ Unconfirmed | CSS `:hover` only — cannot screenshot headless. DOM structure verified (4 items, 4 menus, columns populated). **Verify in live browser before go-live.** |
| Subcategory cards | ✅ Pass | 4-column grid at 1440px, live data from Sheets, all fields rendered |
| Footer layout | ✅ Pass | 3-column layout, contact info, social icons, copyright bar — correct |
| Mili FAB | ✅ Pass | Fixed position (bottom: 28px, right: 28px, z-index: 900) — no overlap |
| Mobile (390px) | ⚠️ Pre-existing backlog | See note below |

---

#### Mobile nav — Pre-existing backlog item (non-blocker)

At 390px, nav items (Vida, Autos, etc.) are hidden but no hamburger/mobile menu toggle exists in `shared.css`. Mobile users cannot access category navigation.

This is a **pre-existing gap**, not a regression introduced by the category landing page work. It was not present before shared-layout.js because no shared navbar existed for category pages.

Backlog item: Add hamburger toggle + mobile nav drawer to `css/shared.css` and `js/shared-layout.js`.

Not a blocker for desktop demo.

---

### Files changed this phase

```text
js/shared-layout.js         (new)
js/category-meta.js         (new — created earlier, approved this session)
js/category-renderer.js     (new — created earlier, approved this session)
vida/index.html             (new)
autos/index.html            (new)
cumplimiento/index.html     (new)
generales/index.html        (new)
assets/banners/vida.png     (new — copied from images/Vida.png)
assets/banners/autos.png    (new — copied from images/Autos.png)
assets/banners/cumplimiento.png  (new — copied from images/Cumplimiento.png)
assets/banners/generales.png    (new — copied from images/Generales.png)
```

---

### Updated next priorities

| Priority | Item | Status |
|---|---|---|
| 1 | **Git init + GitHub + Vercel deploy** | Next session |
| 2 | **Mega-menu live browser verification** | Before go-live |
| 3 | **Mobile nav hamburger** | Post-demo backlog |
| 4 | Replace WhatsApp placeholder `57XXXXXXXXXX` | Pre-launch |
| 5 | Deploy Cloudflare Worker for Mili | Pre-launch |
| 6 | Image compression (PNGs → WebP) | Pre-launch |
| 7 | SEO audit (title, og:image, canonical) | Pre-launch |
| 8 | robots.txt / sitemap.xml | Pre-launch |

---
