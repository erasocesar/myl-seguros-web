# SESSION HANDOFF — MYL Seguros Web

**Date:** 2026-05-25
**Status:** Mobile responsiveness milestone complete. All 6 routes pass QA at 320 / 375 / 390 / 414 / 768 / 1440 px. Final QA: 323 PASS / 0 FAIL.

---

## 1. Project Overview

### Project
**MYL Seguros Web** — marketing and lead-generation website for M&L Seguros, a Colombian insurance broker. The site presents insurance product lines, lets visitors compare options, and routes inquiries to the broker via a contact form backed by Google Apps Script.

### Architecture
Pure static HTML/CSS/JS. No build step, no framework, no bundler. Files are served directly; deployment target is a static host (Cloudflare Pages or equivalent). The Mili AI chatbot is the only component with a backend dependency (Cloudflare Worker proxying the Anthropic API — key never exposed in frontend code).

### Routing Structure

| Route | File | Codepath |
|---|---|---|
| `/` | `index.html` | Standalone — all HTML/CSS/JS inline |
| `/vida/` | `vida/index.html` | Shared layout via `js/shared-layout.js` |
| `/autos/` | `autos/index.html` | Shared layout via `js/shared-layout.js` |
| `/cumplimiento/` | `cumplimiento/index.html` | Shared layout via `js/shared-layout.js` |
| `/generales/` | `generales/index.html` | Shared layout via `js/shared-layout.js` |
| `/comparar/` | `comparar/index.html` | Inline nav — loads `css/shared.css`, does NOT use `shared-layout.js` |
| `/contacto/` | `contacto/index.html` | Inline nav — loads `css/shared.css`, does NOT use `shared-layout.js` |
| `/aliadas/` | `aliadas/index.html` | Inline nav — loads `css/shared.css`, does NOT use `shared-layout.js` |
| `/[product-slug]/` | `[slug]/index.html` | Generated subpages — use `js/subpage-renderer.js` + `js/category-renderer.js` |

### Three Distinct Nav Codepaths

1. **Home (`index.html`)** — does not load `shared.css`. All CSS is inline in `<style>` tags inside `index.html`. Nav, footer, and mobile drawer are all hand-coded HTML in the same file.

2. **Shared-layout pages (vida / autos / cumplimiento / generales)** — load `css/shared.css`. Nav and footer are JS-injected at runtime by `js/shared-layout.js` via `injectLayout()`. The mobile drawer is also injected by this script.

3. **Inline-nav pages (comparar / contacto / aliadas)** — load `css/shared.css` but have their own hand-coded nav HTML in each file. They do NOT use `js/shared-layout.js`. Mobile hamburger, drawer HTML, and toggle JS were added inline to each file during Phase A.

### CSS Architecture

- **`css/shared.css`** — global stylesheet loaded by all pages except `index.html`. Contains nav, footer, mobile drawer, shared component classes (`.subpage-hero`, `.cat-trust-grid`, `.cat-strip`, etc.), and all responsive breakpoints for shared components.
- **`index.html` inline `<style>`** — home-page-only styles. Includes its own nav, hero, carousel, footer, and mobile drawer CSS. Completely independent of `shared.css`.
- **Page-specific inline styles** — `comparar/index.html`, `contacto/index.html`, `aliadas/index.html` each have a `<style>` block for their page-specific layout on top of the shared.css base.

### JS Architecture

| File | Role |
|---|---|
| `js/shared-layout.js` | Injects nav, footer, Mili shell, and mobile drawer HTML into shared-layout pages. Handles hamburger toggle, drawer open/close, scroll-based nav class. |
| `js/mili-chat.js` | Mili AI chatbot UI and API interaction. Routes to Cloudflare Worker. **Frozen — do not modify.** |
| `js/sheets-client.js` | Google Sheets client helper (legacy/unused — verify before touching). |
| `js/subpage-renderer.js` | Renders product subpages dynamically from JSON data. |
| `js/category-renderer.js` | Renders category landing pages. |
| `js/category-meta.js` | Metadata for category pages. |
| `js/gobernanza-data.js` | Data file for gobernanza content. |

---

## 2. Completed Milestone Summary

### Phase A — Mobile Navigation Framework
**Commit:** `b554afa`  
**Date:** 2026-05-25

Implemented a consistent mobile navigation experience across all three nav codepaths:

- **Global mobile drawer** — slide-in panel with logo, nav links grouped by section (Productos / Herramientas), and a Contacto CTA button. Logo uses root-relative path `/Logo_Leon_V2_transparente.png` in all instances.
- **Hamburger button** — three-bar icon in the navbar, transforms to × when the drawer is open via CSS class `.is-open`. Button has `aria-expanded` updated on toggle.
- **`js/shared-layout.js` updates** — `buildMobileDrawer()` function added. `injectLayout()` now inserts the drawer HTML and wires up toggle, close-button, tap-outside, and Escape key event listeners. Body scroll is locked (`body.nav-open`) when drawer is open.
- **Standalone page mobile nav** — `comparar/index.html`, `contacto/index.html`, `aliadas/index.html` each received the same hamburger button HTML inside their inline nav, the full drawer HTML block after `</nav>`, and an inline `<script>` block with the toggle logic (mirroring `shared-layout.js` behavior).
- **Mili mobile FAB fix** — `#miliSideBtn` repositioned to a bottom-right floating action button on mobile via `!important` CSS rules inside the `@media (max-width: 768px)` block in `index.html`. CSS-only, no JS, no desktop regression.
- **44px touch target compliance** — `.nav-mobile-toggle` in `shared.css` set to `min-width: 44px; min-height: 44px`. Drawer close button and all drawer links confirmed ≥ 44px.
- **Desktop regression protection** — `.nav-mobile-overlay` and `.nav-mobile-toggle` set to `display: none` as global base rules, overridden only inside the mobile media query.

**Phase A QA result:** 314 PASS / 9 FAIL (all 9 failures were pre-existing overflow issues on home hero/carousel/footer at 320px — confirmed non-regressions, deferred to Phase B).

---

### Phase B1 — Home Overflow Cleanup
**Commit:** `fce98c4`  
**Date:** 2026-05-25  
**File modified:** `index.html` only

Root-cause diagnosis of horizontal overflow on the home page at mobile breakpoints identified four distinct issues, all in `index.html`:

- **Footer grid not collapsing** — `.footer-main` and `.footer-bottom` responsive rules existed in `shared.css` but `index.html` does not load `shared.css`. Added matching rules to `index.html`'s `@media (max-width: 768px)` block: `grid-template-columns: 1fr`, `flex-direction: column`, `text-align: center`.
- **Carousel-nav overflow at 768px** — `.carousel-nav { display: none }` was placed inside the first `@media (max-width: 768px)` block, but the base `.carousel-nav { display: flex }` rule appeared later in source order and overrode it. Fixed by adding a second targeted `@media (max-width: 768px) { .carousel-nav { display: none; } }` block immediately after the base carousel rules.
- **Mobile drawer visible at 1440px desktop** — `.nav-mobile-overlay { display: none }` was inside the `@media (max-width: 768px)` block, so at 1440px the media query never fires, the overlay div renders as an unstyled block element, and the logo image inside it renders at its natural width (~1666px). Fixed by moving `display: none` for both `.nav-mobile-overlay` and `.nav-mobile-toggle` outside the media query as global base rules.
- **nav-right badge-ai and btn-primary visible at mobile** — hiding rules for these elements exist in `shared.css` but not in `index.html` (which does not load `shared.css`). Added `.nav-right .badge-ai, .nav-right .btn-primary { display: none }` to `index.html`'s mobile media query.

**Phase B1 QA result:** 320 PASS / 3 FAIL (all 3 failures were pre-existing 34px overflows on vida and autos at 320px, and 13px overflow on comparar at 320px — deferred to Phase B2).

---

### Phase B2 — Final Narrow Breakpoint Cleanup
**Commit:** `777bda9`  
**Date:** 2026-05-25  
**Files modified:** `css/shared.css`, `comparar/index.html`

Root-cause diagnosis at 320px using Playwright DOM inspection isolated two independent causes:

- **vida & autos overflow (34px each)** — `css/shared.css` `.cat-trust-grid` had `grid-template-columns: repeat(2, 1fr)` at both `@media (max-width: 900px)` and `@media (max-width: 640px)`. No rule collapsed it to a single column below 640px. At 320px with `24px` gap, the second grid item's right edge reached 354px. Fixed by adding `@media (max-width: 480px) { .cat-trust-grid { grid-template-columns: 1fr; } }` to `shared.css` after the 640px block.
- **comparar overflow (13px)** — `comparar/index.html` inline styles had `@media (max-width: 640px) { .product-select-grid { grid-template-columns: 1fr 1fr; gap: 10px; } }`. At 320px, two columns plus 10px gap overflowed by 13px. Fixed by adding `@media (max-width: 480px) { .product-select-grid { grid-template-columns: 1fr; } }` after the 640px block in `comparar/index.html`.

Both fixes use a `480px` breakpoint to avoid disrupting the 640px two-column layout on mid-size phones.

**Phase B2 QA result: 323 PASS / 0 FAIL.**

---

## 3. Files Modified

| File | Purpose of Modification | Architectural Notes |
|---|---|---|
| `css/shared.css` | Phase A: hamburger touch targets, nav hide rules, drawer CSS, footer responsive rules. Phase B2: `cat-trust-grid` single-column at 480px. | Shared by all pages except `index.html`. Changes here affect vida, autos, cumplimiento, generales, comparar, contacto, aliadas simultaneously. |
| `js/shared-layout.js` | Phase A: added `buildMobileDrawer()`, updated `injectLayout()` to inject drawer and wire hamburger/close/tap-outside/Escape events. | Only affects shared-layout pages (vida / autos / cumplimiento / generales). Home and inline-nav pages are unaffected. |
| `index.html` | Phase A: hamburger HTML, drawer HTML, mobile toggle JS, Mili FAB mobile repositioning. Phase B1: footer responsive rules, carousel-nav media query fix, global nav-mobile-overlay/toggle base rules, nav-right hide rules. | Standalone — all CSS/JS inline. Does not load `shared.css` or `shared-layout.js`. Any rule that exists in `shared.css` must be duplicated here if needed on the home page. |
| `comparar/index.html` | Phase A: hamburger HTML, drawer HTML, inline toggle JS. Phase B2: `product-select-grid` single-column at 480px. | Inline-nav page. Loads `shared.css` but not `shared-layout.js`. Mobile drawer JS is duplicated inline. |
| `contacto/index.html` | Phase A: hamburger HTML, drawer HTML, inline toggle JS. | Inline-nav page. Same pattern as comparar. |
| `aliadas/index.html` | Phase A: hamburger HTML, drawer HTML, inline toggle JS. | Inline-nav page. Same pattern as comparar. |
| `qa-mobile-phase-a.js` | Playwright QA script validating mobile nav and overflow across 6 routes × 6 viewports. | Run with `node qa-mobile-phase-a.js`. Requires Playwright and a local server on `http://localhost:8080`. Produces screenshots in `qa-screenshots-phase-a/`. |

---

## 4. QA Methodology

### Tool
Playwright (Node.js) via `qa-mobile-phase-a.js` at the project root.

### Breakpoints Tested

| Viewport | Device category |
|---|---|
| 320px | Smallest supported phone (Galaxy S5, older iPhones) |
| 375px | iPhone SE / iPhone 12 mini |
| 390px | iPhone 14 / 15 standard |
| 414px | iPhone 14 Plus / older Plus models |
| 768px | iPad portrait / boundary of mobile media query |
| 1440px | Desktop regression check |

All mobile viewports used a mobile user agent (`Mozilla/5.0 … Mobile`). Each page was loaded with `networkidle` wait to ensure JS injection (shared-layout.js) completed before measurement.

### PASS Criteria (per route per viewport)

- **No horizontal overflow** — `document.documentElement.scrollWidth <= window.innerWidth`
- **Hamburger visible** at ≤ 768px — element exists and `getBoundingClientRect().width > 0`
- **Desktop nav-menu hidden** at ≤ 768px
- **Drawer opens** on hamburger click — overlay receives `.open` class
- **Nav links visible** inside open drawer
- **Close button touch target ≥ 44 × 44px**
- **Each drawer nav link height ≥ 44px**
- **Drawer closes** via close button click
- **Drawer closes** via tap-outside (overlay click)
- **Hamburger touch target ≥ 44 × 44px**
- **Mili FAB in lower half** (home only — `bottom > viewport_height / 2`)
- **Desktop regression** at 1440px: hamburger hidden, desktop nav-menu visible, no overflow

### Overflow Detection Methodology

`scrollWidth` was read on `document.documentElement`. A page passes if `scrollWidth <= window.innerWidth`. The QA script also ran an ancestry-filtered diagnostic (`getBoundingClientRect().right > viewport`) to identify specific offending elements, filtering out elements contained within an `overflow: hidden` ancestor (which affect `getBoundingClientRect` but not actual page `scrollWidth`).

### False Positive Filtering

Elements reported by `getBoundingClientRect().right > viewport` were cross-checked for `overflow: hidden` ancestors. The `.cat-strip` section has `overflow: hidden`, so `.cat-strip-pill` elements that visually clip do not contribute to `document.scrollWidth`. These were excluded from root-cause analysis.

### Desktop Regression Validation

At 1440px, the QA script verified:
- Hamburger is hidden (`display: none` or not rendered)
- Desktop `.nav-menu` is visible
- No horizontal overflow

All three checks passed across all 6 routes on the final run.

### Final QA Result

**323 PASS / 0 FAIL** (commit `777bda9`, 2026-05-25)

---

## 5. Known Technical Debt

### Duplicated mobile drawer markup
The mobile drawer HTML block (overlay, drawer panel, logo, nav links, close button, Contacto CTA) is copy-pasted into three files: `comparar/index.html`, `contacto/index.html`, `aliadas/index.html`. If nav links change (add/remove a route), all three files must be updated manually — and in `js/shared-layout.js` too.

### Duplicated mobile toggle JS
The inline `<script>` that wires the hamburger toggle, close button, tap-outside handler, and Escape key is copy-pasted verbatim into comparar, contacto, and aliadas. Any bug fix or behavior change must be applied to all three files and to `shared-layout.js`.

### Home page CSS entirely inline
`index.html` contains approximately 1,500+ lines of inline CSS. Any shared design token change (colors, spacing, font sizes) must be applied both to `shared.css` and separately to `index.html`. This creates a persistent risk of visual inconsistency.

### Home page JS entirely inline
Mobile toggle JS, carousel JS, and other interactive behaviors are embedded in `<script>` blocks inside `index.html`. No module system, no imports.

### Responsive CSS fragmentation
The mobile breakpoints for shared components are spread across: `shared.css` (for shared-layout pages), `index.html` inline styles (for home), and each inline-nav page's `<style>` block. There is no single source of truth for breakpoint values.

### Opportunity to unify inline-nav pages with shared layout
`comparar`, `contacto`, and `aliadas` could load `shared-layout.js` and remove their inline nav/footer/drawer markup entirely, eliminating the duplication. This would require restructuring their existing nav HTML to match what `shared-layout.js` injects — a moderate refactor.

### Untracked test files at project root
`test-contacto.js`, `test-prod.js`, `test-contacto-e2e.js`, `test-prod-e2e.js`, `test-visual-polish.js`, `test-prod-polish.js` are untracked by git. Their purpose overlaps partially with `qa-mobile-phase-a.js` and `qa-full.js`. These should either be committed or deleted to keep the working tree clean.

---

## 6. Recommended Next Priorities

1. **Layout architecture cleanup** — Migrate `comparar`, `contacto`, and `aliadas` to use `shared-layout.js`. This eliminates the three copies of drawer markup and toggle JS, and ensures future nav changes only require editing one file.

2. **Component standardization** — Extract the home page's inline CSS for the nav, footer, and drawer into `shared.css`, then load `shared.css` from `index.html`. This closes the CSS duplication gap and gives the home page access to shared design tokens.

3. **Performance optimization** — Audit image formats and sizes (hero banners, insurer logos, video autoplay). Add `loading="lazy"` to below-fold images. Review render-blocking resources.

4. **Accessibility audit** — Full keyboard navigation pass (focus trapping in mobile drawer, skip-to-content link, ARIA roles on carousel). Verify color contrast ratios across all product category pages.

5. **SEO technical pass** — Verify `<title>`, `<meta description>`, `<h1>` uniqueness across all routes. Add `canonical` tags. Check that generated subpages have unique meta content.

6. **Analytics / conversion instrumentation** — Wire up form submission events, CTA click events, and WhatsApp button clicks to an analytics provider. The contact form already submits to Apps Script — add a GA4 or equivalent event on success.

7. **Visual polish / animation cleanup** — Hero banner transitions, card hover states, and loading states on the comparar filter. Audit for any remaining layout shift (CLS) caused by JS-injected content from `shared-layout.js`.

---

## 7. AI-Assisted Development Workflow

This project is developed using a hybrid human-AI workflow:

**Human (Cesar Eraso)** — product decisions, architecture approvals, scope definition, final commit authorization, visual review, client relationship. All edits require human approval before committing.

**Claude Code** — implementation of approved plans: writing and editing HTML/CSS/JS, creating QA automation scripts, running Playwright diagnostics, identifying root causes, producing diff previews for human review.

**ChatGPT** — architecture review, debugging strategy, QA interpretation, patch validation, and session planning. Used as a second opinion layer before handing implementation tasks to Claude Code.

**Established workflow for future sessions:**
1. Define scope and constraints in plain language (human).
2. Claude Code performs root-cause analysis or reads relevant files — no edits yet.
3. Claude Code produces a diff preview or patch plan.
4. Human reviews and approves (or adjusts scope).
5. Claude Code applies approved edits.
6. Claude Code runs QA and reports failures only.
7. Human approves commit with exact message; Claude Code commits.

---

## 8. Recovery Instructions

### Run local dev server

From the project root, start any static file server on port 8080. Examples:

```bash
# Python (available on most systems)
python -m http.server 8080

# Node (if http-server is installed globally)
npx http-server -p 8080

# VS Code Live Server extension
# Right-click index.html → Open with Live Server (default port 5500 — update QA script port if used)
```

The QA script expects `http://localhost:8080`.

### Run QA script

```bash
# From project root
node qa-mobile-phase-a.js
```

Requires:
- Node.js installed
- Playwright installed (`npm install` in project root, or `npm install playwright`)
- Local server running on port 8080
- Chromium browser available to Playwright (`npx playwright install chromium` if needed)

Screenshots are written to `qa-screenshots-phase-a/` at the project root.

### Verify before new work

Before starting any new feature or fix:

1. Run `node qa-mobile-phase-a.js` — confirm 323 PASS / 0 FAIL baseline.
2. Run `git status` — confirm working tree is clean except known untracked test files.
3. Read the relevant codepath section in this document (§1) to determine which files will be affected.

### Continue from current stable baseline

The current stable commit is `777bda9` on branch `main`.

```bash
git log --oneline -5
# 777bda9 Phase B2: eliminate final 320px overflow regressions
# fce98c4 Phase B1: home mobile overflow fixes + nav stabilization
# b554afa Phase A: mobile navigation + global mobile framework
# 4d087f5 Visual polish: hero height consistency + aliadas stats copy
# 52c3de3 Wire Apps Script URL into contact form
```

All three nav codepaths are fully responsive. The next logical work is the layout architecture cleanup described in §6.

### Key credentials and endpoints (do not expose publicly)

- **Apps Script endpoint** — wired into `contacto/index.html`. Update `NOTIFY_EMAIL` in `docs/contact-form.gs` and redeploy when the client email is confirmed.
- **WhatsApp number** — `573186517626` is Cesar's personal number. Replace with the client's number before go-live.
- **Anthropic API key** — lives exclusively in the Cloudflare Worker. Never expose in any frontend JS file.
