/* ============================================================
   category-meta.js — Presentation metadata for category landing pages
   Source of truth for governance copy: docs/03_GOBERNANZA.md §11.6
   This file contains only renderer-facing config:
   slug, icon, theme, short presentation strings, CTA targets.
   No governance business definitions duplicated here.
   ============================================================ */

const CATEGORY_META = {

  VIDA: {
    slug:        'vida',
    key:         'VIDA',
    banner_image: '/assets/banners/vida.png',
    icon:        'heart',
    theme_class: 'theme-vida',
    eyebrow:     'PROTECCIÓN INTEGRAL',
    headline:    'Protección para cada etapa de tu vida y la de quienes más importan',
    subcopy:     'Soluciones en vida, salud, accidentes, mascotas y protección financiera diseñadas para personas, familias y empresas.',
    short_pitch: 'Protección personal, familiar y financiera.',
    cta_primary:   { label: 'Explorar soluciones',  href: '#subcategorias' },
    cta_secondary: { label: 'Hablar con un asesor', href: '/contacto/' },
  },

  AUTOS: {
    slug:        'autos',
    key:         'AUTOS',
    banner_image: '/assets/banners/autos.png',
    icon:        'car-front',
    theme_class: 'theme-autos',
    eyebrow:     'MOVILIDAD PROTEGIDA',
    headline:    'Movilidad protegida para personas, empresas y flotas',
    subcopy:     'Coberturas para vehículos particulares, comerciales, maquinaria, movilidad personal y soluciones de financiación.',
    short_pitch: 'Protección para todo lo que se mueve contigo.',
    cta_primary:   { label: 'Explorar soluciones',  href: '#subcategorias' },
    cta_secondary: { label: 'Hablar con un asesor', href: '/contacto/' },
  },

  CUMPLIMIENTO: {
    slug:        'cumplimiento',
    key:         'CUMPLIMIENTO',
    banner_image: '/assets/banners/cumplimiento.png',
    icon:        'shield-check',
    theme_class: 'theme-cumplimiento',
    eyebrow:     'GARANTÍA JURÍDICA',
    headline:    'Garantías jurídicas y contractuales con respaldo asegurador',
    subcopy:     'Soluciones para contratos públicos, privados, cauciones judiciales, arrendamientos y obligaciones contractuales.',
    short_pitch: 'Seguridad contractual con respaldo experto.',
    cta_primary:   { label: 'Explorar soluciones',  href: '#subcategorias' },
    cta_secondary: { label: 'Hablar con un asesor', href: '/contacto/' },
  },

  GENERALES: {
    slug:        'generales',
    key:         'GENERALES',
    banner_image: '/assets/banners/generales.png',
    icon:        'building',
    theme_class: 'theme-generales',
    eyebrow:     'PROTECCIÓN PATRIMONIAL',
    headline:    'Protección patrimonial para personas, empresas y operaciones',
    subcopy:     'Coberturas para hogar, transporte, responsabilidad civil, construcción, copropiedades y riesgos especializados.',
    short_pitch: 'Protege lo que has construido.',
    cta_primary:   { label: 'Explorar soluciones',  href: '#subcategorias' },
    cta_secondary: { label: 'Hablar con un asesor', href: '/contacto/' },
  },

};

/* ── Slug → CATEGORY_META lookup ─────────────────────────── */
const CATEGORY_META_BY_SLUG = {};
Object.values(CATEGORY_META).forEach(m => { CATEGORY_META_BY_SLUG[m.slug] = m; });
