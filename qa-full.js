/**
 * qa-full.js  — Playwright QA for ALL 27 subpages
 * Usage: node qa-full.js
 */

const { chromium } = require('playwright');
const fs   = require('fs');
const path = require('path');

const BASE_URL    = 'http://localhost:52498';
const SCREENSHOTS = path.join(__dirname, 'qa-screenshots-full');
fs.mkdirSync(SCREENSHOTS, { recursive: true });

const PAGES_TO_TEST = [
  { url: '/',                                              name: 'home',                                    hasHeroBanner: false },
  // VIDA
  { url: '/individual/',                                  name: 'individual',                              hasHeroBanner: true  },
  { url: '/vida-colectiva/',                              name: 'vida-colectiva',                          hasHeroBanner: true  },
  { url: '/ap-accidentes-personales/',                    name: 'ap-accidentes-personales',                hasHeroBanner: true  },
  { url: '/polizas-de-salud-y-medicina-prepagada/',       name: 'polizas-de-salud-y-medicina-prepagada',   hasHeroBanner: true  },
  { url: '/mascotas/',                                    name: 'mascotas',                                hasHeroBanner: true  },
  { url: '/arl-riesgos-laborales/',                       name: 'arl-riesgos-laborales',                   hasHeroBanner: true  },
  { url: '/polizas-de-asistencia-en-viajes-internacionales/', name: 'polizas-de-asistencia-en-viajes-internacionales', hasHeroBanner: true },
  { url: '/exequial/',                                    name: 'exequial',                                hasHeroBanner: true  },
  // AUTOS
  { url: '/vehiculos-particulares/',                      name: 'vehiculos-particulares',                  hasHeroBanner: true  },
  { url: '/vehiculos-comerciales/',                       name: 'vehiculos-comerciales',                   hasHeroBanner: true  },
  { url: '/vehiculos-pesados/',                           name: 'vehiculos-pesados',                       hasHeroBanner: true  },
  { url: '/maquinaria-y-equipos-moviles/',                name: 'maquinaria-y-equipos-moviles',            hasHeroBanner: true  },
  { url: '/movilidad-personal/',                          name: 'movilidad-personal',                      hasHeroBanner: true  },
  { url: '/credito-de-autos-livianos-publicos-y-pesados/', name: 'credito-de-autos-livianos-publicos-y-pesados', hasHeroBanner: true },
  { url: '/polizas-colectivas/',                          name: 'polizas-colectivas',                      hasHeroBanner: true  },
  // CUMPLIMIENTO
  { url: '/entidades-estatales/',                         name: 'entidades-estatales',                     hasHeroBanner: true  },
  { url: '/cumplimiento-particular/',                     name: 'cumplimiento-particular',                 hasHeroBanner: true  },
  { url: '/arrendamiento/',                               name: 'arrendamiento',                           hasHeroBanner: true  },
  { url: '/judiciales/',                                  name: 'judiciales',                              hasHeroBanner: true  },
  // GENERALES
  { url: '/empresas-o-persona-natural/',                  name: 'empresas-o-persona-natural',              hasHeroBanner: true  },
  { url: '/polizas-de-hogar/',                            name: 'polizas-de-hogar',                        hasHeroBanner: true  },
  { url: '/polizas-todo-riesgo-construccion/',            name: 'polizas-todo-riesgo-construccion',        hasHeroBanner: true  },
  { url: '/responsabilidad-civil-profesional/',           name: 'responsabilidad-civil-profesional',       hasHeroBanner: true  },
  { url: '/transporte-de-mercancias/',                    name: 'transporte-de-mercancias',                hasHeroBanner: true  },
  { url: '/educativa/',                                   name: 'educativa',                               hasHeroBanner: true  },
  { url: '/polizas-de-copropiedades/',                    name: 'polizas-de-copropiedades',                hasHeroBanner: true  },
  { url: '/polizas-todo-riesgo-montaje/',                 name: 'polizas-todo-riesgo-montaje',             hasHeroBanner: true  },
];

function pass(msg) { console.log('  ✅', msg); }
function fail(msg) { console.log('  ❌', msg); }
function info(msg) { console.log('  ℹ ', msg); }

async function getBrokenImages(page) {
  return page.evaluate(() =>
    [...document.querySelectorAll('img')]
      .filter(img => !img.complete || img.naturalWidth === 0)
      .map(img => img.src)
  );
}

async function hasPlaceholderShield(page) {
  return page.evaluate(() => {
    const icons = [...document.querySelectorAll('.card-image-icon')];
    return icons.some(el => el.style.display !== 'none' && el.offsetParent !== null);
  });
}

async function waitForCards(page, timeout = 8000) {
  try {
    await page.waitForSelector('.product-type-card:not(.skeleton-card)', { timeout });
    return true;
  } catch { return false; }
}

async function testModal(page, pageName) {
  const chip = await page.$('.logo-chip');
  if (!chip) { info('No logo chips — skipping modal test'); return 'no-chips'; }

  await chip.click();
  await page.waitForTimeout(600);

  const overlay = await page.$('.policy-overlay.active');
  if (overlay) {
    pass('Modal opened');
    await page.screenshot({ path: path.join(SCREENSHOTS, `${pageName}-modal.png`), fullPage: false });
    const closeBtn = await page.$('.policy-modal-close');
    if (closeBtn) await closeBtn.click();
    await page.waitForTimeout(300);
    return 'ok';
  } else {
    fail('Modal did NOT open');
    return 'fail';
  }
}

async function main() {
  console.log('=== MYL Seguros — Full QA (27 subpages) ===\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  const results = [];

  for (const p of PAGES_TO_TEST) {
    console.log(`\n── ${p.name} ──`);
    const page = await context.newPage();

    const consoleErrors = [];
    page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });

    try {
      await page.goto(BASE_URL + p.url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    } catch (e) {
      fail(`Page load failed: ${e.message.slice(0, 80)}`);
      results.push({ page: p.name, banner: false, broken: -1, shields: false, chips: 0, modal: 'load-fail', errors: -1 });
      await page.close();
      continue;
    }

    await page.screenshot({ path: path.join(SCREENSHOTS, `${p.name}-above-fold.png`), fullPage: false });

    let bannerOk = false;
    if (p.hasHeroBanner) {
      await page.waitForTimeout(500);
      const heroBg = await page.$('#heroBannerBg');
      if (heroBg) {
        const bgImage = await heroBg.evaluate(el => el.style.backgroundImage);
        if (bgImage && bgImage !== 'none' && bgImage !== '') {
          pass(`Hero banner: ${bgImage.slice(0, 70)}...`);
          bannerOk = true;
        } else {
          fail('Hero banner backgroundImage empty (gradient fallback)');
        }
      } else {
        fail('#heroBannerBg element not found');
      }
    }

    let cardsOk = false, chipCount = 0, shields = false, modalResult = 'n/a';

    if (p.url !== '/') {
      cardsOk = await waitForCards(page);
      if (cardsOk) {
        pass('Product cards rendered');

        shields = await hasPlaceholderShield(page);
        if (shields) fail('Placeholder shield icons visible (card image missing)');
        else         pass('No placeholder shield icons');

        chipCount = await page.$$eval('.logo-chip', els => els.length);
        if (chipCount > 0) pass(`${chipCount} logo chip(s)`);
        else               info('No logo chips');

        await page.screenshot({ path: path.join(SCREENSHOTS, `${p.name}-cards.png`), fullPage: true });

        if (chipCount > 0) modalResult = await testModal(page, p.name);
      } else {
        info('Cards did not load (no Sheets data or network issue)');
        await page.screenshot({ path: path.join(SCREENSHOTS, `${p.name}-no-cards.png`), fullPage: false });
      }
    } else {
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(SCREENSHOTS, `${p.name}-full.png`), fullPage: true });
    }

    const broken = await getBrokenImages(page);
    if (broken.length === 0) pass('No broken images');
    else {
      fail(`${broken.length} broken image(s):`);
      broken.forEach(src => console.log('      ', src));
    }

    const relevantErrors = consoleErrors.filter(e =>
      !e.includes('/api/mili') &&
      !e.includes('gviz/tq') &&
      !e.includes('cloudflare') &&
      !e.includes('googleapis')
    );
    if (relevantErrors.length === 0) pass('No unexpected console errors');
    else {
      fail(`${relevantErrors.length} console error(s):`);
      relevantErrors.slice(0, 3).forEach(e => console.log('      ', e.slice(0, 120)));
    }

    results.push({
      page: p.name,
      banner: p.hasHeroBanner ? bannerOk : null,
      broken: broken.length,
      shields,
      chips: chipCount,
      modal: modalResult,
      errors: relevantErrors.length,
    });

    await page.close();
  }

  await browser.close();

  // Summary
  console.log('\n' + '═'.repeat(70));
  console.log('FULL QA SUMMARY');
  console.log('═'.repeat(70));
  console.log(`${'Page'.padEnd(42)} ${'Banner'.padEnd(8)} ${'Broken'.padEnd(8)} ${'Shields'.padEnd(9)} ${'Chips'.padEnd(6)} ${'Modal'.padEnd(8)} Errors`);
  console.log('─'.repeat(70));

  let totalBannerFail = 0, totalBroken = 0, totalShields = 0, totalModalFail = 0;

  results.forEach(r => {
    const bannerIcon  = r.banner === null ? '─' : r.banner ? '✅' : '❌';
    const brokenIcon  = r.broken > 0 ? `❌${r.broken}` : '✅0';
    const shieldsIcon = r.shields ? '❌' : '✅';
    const modalIcon   = r.modal === 'ok' ? '✅' : r.modal === 'n/a' ? '─' : r.modal === 'no-chips' ? 'ℹ' : '❌';
    const errIcon     = r.errors > 0 ? `❌${r.errors}` : r.errors === -1 ? '❌?' : '✅0';

    if (r.banner === false) totalBannerFail++;
    if (r.broken > 0) totalBroken += r.broken;
    if (r.shields) totalShields++;
    if (r.modal === 'fail') totalModalFail++;

    console.log(`${r.page.padEnd(42)} ${bannerIcon.padEnd(8)} ${brokenIcon.padEnd(8)} ${shieldsIcon.padEnd(9)} ${String(r.chips).padEnd(6)} ${modalIcon.padEnd(8)} ${errIcon}`);
  });

  console.log('─'.repeat(70));
  const allClear = totalBannerFail === 0 && totalBroken === 0 && totalShields === 0 && totalModalFail === 0;
  console.log(allClear
    ? '\n✅ ALL CHECKS PASSED'
    : `\n⚠️  Issues: ${totalBannerFail} banner failures, ${totalBroken} broken images, ${totalShields} pages with shields, ${totalModalFail} modal failures`
  );
  console.log(`\nScreenshots: ${SCREENSHOTS}`);
}

main().catch(e => { console.error(e); process.exit(1); });
