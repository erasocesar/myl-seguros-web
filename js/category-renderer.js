/* ============================================================
   category-renderer.js — Renderer compartido para category landing pages
   Depende de: gobernanza-data.js, category-meta.js, sheets-client.js
   ============================================================ */

/* ── CTA label por categoría (patrón de subpage-renderer.js) ── */
var _CAT_CTA_LABELS = {
  VIDA:         'lo que más te importa',
  AUTOS:        'tu vehículo',
  CUMPLIMIENTO: 'tus contratos',
  GENERALES:    'tu patrimonio',
};

/* ── Punto de entrada ────────────────────────────────────── */
async function initCategoryPage(slug) {
  var meta = CATEGORY_META_BY_SLUG[slug];
  if (!meta) {
    console.error('[CategoryRenderer] Slug no encontrado:', slug);
    return;
  }
  var cat     = meta.key;
  var subcats = SUBCATEGORY_MAP.filter(function(s) { return s.category === cat; });
  var main    = document.getElementById('catMain');
  if (!main) {
    console.error('[CategoryRenderer] #catMain no encontrado');
    return;
  }

  document.body.classList.add(meta.theme_class);

  main.innerHTML = [
    _renderHero(meta),
    _renderOverview(meta),
    _renderSubcats(meta, subcats),
    _renderStrip(subcats),
    _renderTrust(subcats),
    _renderCtaDark(meta, cat),
  ].join('');

  if (window.lucide) lucide.createIcons();
  _wireCardClicks(main);
  _tryLoadBanner(meta);
  _initScrollReveal();

  try {
    var allProducts = await window.sheetsClient.getProducts();
    _updateSubcatMetrics(subcats, allProducts);
    _updateTrustMetrics(subcats, allProducts);
  } catch (err) {
    console.error('[CategoryRenderer] Error cargando productos:', err);
    main.querySelectorAll('.subcat-metric.loading').forEach(function(el) {
      el.classList.remove('loading');
      el.textContent = '—';
    });
    var pc = document.getElementById('trustProductCount');
    var ic = document.getElementById('trustInsurerCount');
    if (pc) pc.textContent = '—';
    if (ic) ic.textContent = '—';
  }
}

/* ── Hero ────────────────────────────────────────────────── */
function _renderHero(meta) {
  return `
<section class="cat-hero">
  <div class="cat-hero-bg no-image" id="catHeroBg"></div>
  <div class="cat-hero-overlay"></div>
  <div class="container">
    <div class="cat-hero-eyebrow">${meta.eyebrow}</div>
    <h1 class="cat-hero-headline">${meta.headline}</h1>
    <p class="cat-hero-subcopy">${meta.subcopy}</p>
    <div class="cat-hero-actions">
      <a href="${meta.cta_primary.href}" class="btn-primary">
        <i data-lucide="search" width="18" height="18"></i>
        ${meta.cta_primary.label}
      </a>
      <a href="${meta.cta_secondary.href}" class="btn-secondary">
        <i data-lucide="message-circle" width="18" height="18"></i>
        ${meta.cta_secondary.label}
      </a>
    </div>
  </div>
</section>`;
}

/* ── Overview strip ──────────────────────────────────────── */
function _renderOverview(meta) {
  return `
<div class="cat-overview">
  <div class="container">
    <div class="cat-overview-icon">
      <i data-lucide="${meta.icon}" width="28" height="28"></i>
    </div>
    <p class="cat-overview-text">${meta.short_pitch}</p>
  </div>
</div>`;
}

/* ── Subcategory showcase ────────────────────────────────── */
function _renderSubcats(meta, subcats) {
  var cards = '';
  subcats.forEach(function(s) {
    var gov       = GOBERNANZA_MAP[s.name] || {};
    var frase     = gov.frase_impacto            || '';
    var desc      = gov.descripcion_subcategoria || '';
    var fraseHtml = frase ? '<p class="subcat-card-frase">' + frase + '</p>' : '';
    var descHtml  = desc  ? '<p class="subcat-card-desc">'  + desc  + '</p>' : '';
    cards += `
<article class="subcat-card scroll-reveal" data-slug="${s.slug}" data-href="/${s.slug}/">
  <div class="subcat-card-top">
    <div class="subcat-card-name">${s.name}</div>
  </div>
  ${fraseHtml}${descHtml}
  <div class="subcat-card-metrics">
    <span class="subcat-metric loading" aria-label="Cargando">&nbsp;</span>
    <span class="subcat-metric loading" aria-label="Cargando">&nbsp;</span>
  </div>
  <div class="subcat-card-cta">
    Ver soluciones
    <i data-lucide="arrow-right" width="14" height="14"></i>
  </div>
</article>`;
  });

  return `
<section class="cat-subcats" id="subcategorias">
  <div class="container">
    <div class="cat-subcats-header scroll-reveal">
      <div class="cat-subcats-eyebrow">Lo que ofrecemos</div>
      <h2 class="cat-subcats-title">Soluciones disponibles</h2>
    </div>
    <div class="cat-subcats-grid">${cards}</div>
  </div>
</section>`;
}

/* ── Category strip ──────────────────────────────────────── */
function _renderStrip(subcats) {
  var pills = '';
  subcats.forEach(function(s) {
    pills += '<a class="cat-strip-pill" href="/' + s.slug + '/">' + s.name + '</a>';
  });
  return `
<div class="cat-strip">
  <div class="container">
    <span class="cat-strip-label">Subcategorías</span>
    ${pills}
  </div>
</div>`;
}

/* ── Trust section — dynamic metrics ────────────────────── */
function _renderTrust(subcats) {
  return `
<section class="cat-trust">
  <div class="container">
    <div class="cat-trust-grid">
      <div class="cat-trust-item scroll-reveal">
        <div class="cat-trust-number">${subcats.length}</div>
        <div class="cat-trust-label">Subcategorías</div>
      </div>
      <div class="cat-trust-item scroll-reveal">
        <div class="cat-trust-number" id="trustProductCount">—</div>
        <div class="cat-trust-label">Productos en catálogo</div>
      </div>
      <div class="cat-trust-item scroll-reveal">
        <div class="cat-trust-number" id="trustInsurerCount">—</div>
        <div class="cat-trust-label">Aseguradoras disponibles</div>
      </div>
      <div class="cat-trust-item scroll-reveal">
        <div class="cat-trust-number">Gratis</div>
        <div class="cat-trust-label">Costo de asesoría</div>
      </div>
    </div>
  </div>
</section>`;
}

/* ── CTA dark ────────────────────────────────────────────── */
function _renderCtaDark(meta, cat) {
  var ctaLabel = _CAT_CTA_LABELS[cat] || 'lo que más importa';
  return `
<section class="cat-cta-dark">
  <div class="container">
    <span class="cat-cta-badge">Sin costo · Sin compromiso</span>
    <h2 class="cat-cta-headline">¿Listo para proteger ${ctaLabel}?</h2>
    <p class="cat-cta-sub">${meta.short_pitch}</p>
    <div class="cat-cta-buttons">
      <a href="${meta.cta_primary.href}" class="btn-primary">
        <i data-lucide="search" width="18" height="18"></i>
        ${meta.cta_primary.label}
      </a>
      <a href="${meta.cta_secondary.href}" class="btn-secondary" style="color:#fff;border-color:rgba(255,255,255,0.4)">
        <i data-lucide="phone" width="18" height="18"></i>
        ${meta.cta_secondary.label}
      </a>
    </div>
  </div>
</section>`;
}

/* ── Helpers ─────────────────────────────────────────────── */
function _wireCardClicks(main) {
  main.querySelectorAll('.subcat-card[data-href]').forEach(function(card) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function() {
      window.location.href = card.dataset.href;
    });
  });
}

function _tryLoadBanner(meta) {
  if (!meta.banner_image) return;
  var heroBg = document.getElementById('catHeroBg');
  if (!heroBg) return;
  var img = new Image();
  img.onload = function() {
    heroBg.style.backgroundImage = 'url(\'' + meta.banner_image + '\')';
    heroBg.classList.remove('no-image');
  };
  img.src = meta.banner_image;
}

function _updateSubcatMetrics(subcats, allProducts) {
  subcats.forEach(function(s) {
    var prods        = allProducts.filter(function(p) { return p.menu_subcategory === s.name; });
    var productCount = prods.length;
    var insurerSet   = new Set(prods.map(function(p) { return p.carrier_name; }).filter(Boolean));
    var insurerCount = insurerSet.size;

    var card = document.querySelector('.subcat-card[data-slug="' + s.slug + '"]');
    if (!card) return;
    var metricsEl = card.querySelector('.subcat-card-metrics');
    if (!metricsEl) return;

    var prodLabel   = productCount + ' producto' + (productCount !== 1 ? 's' : '');
    var insurerHtml = '';
    if (insurerCount > 0) {
      var iLabel = insurerCount + ' aseguradora' + (insurerCount !== 1 ? 's' : '');
      insurerHtml = '<span class="subcat-metric">'
        + '<i data-lucide="building-2" width="12" height="12"></i> '
        + iLabel + '</span>';
    }

    metricsEl.innerHTML =
      '<span class="subcat-metric">'
      + '<i data-lucide="package" width="12" height="12"></i> '
      + prodLabel + '</span>'
      + insurerHtml;

    if (window.lucide) lucide.createIcons();
  });
}

function _updateTrustMetrics(subcats, allProducts) {
  var catNames     = new Set(subcats.map(function(s) { return s.name; }));
  var catProds     = allProducts.filter(function(p) { return catNames.has(p.menu_subcategory); });
  var productCount = catProds.length;
  var insurerCount = new Set(catProds.map(function(p) { return p.carrier_name; }).filter(Boolean)).size;

  var pc = document.getElementById('trustProductCount');
  var ic = document.getElementById('trustInsurerCount');
  if (pc) pc.textContent = productCount > 0 ? productCount : '—';
  if (ic) ic.textContent = insurerCount > 0 ? insurerCount : '—';
}

function _initScrollReveal() {
  var els = document.querySelectorAll('.scroll-reveal');
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(function(el) { obs.observe(el); });
}
