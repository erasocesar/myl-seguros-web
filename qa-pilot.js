/**
 * qa-pilot.js  — Playwright QA for asset pilot
 * Verifica: banners, cards, modals, no broken images
 * Uso: node qa-pilot.js
 */

const { chromium } = require('playwright');
const fs   = require('fs');
const path = require('path');

const BASE_URL    = 'http://localhost:52498';
const SCREENSHOTS = path.join(__dirname, 'qa-screenshots');
fs.mkdirSync(SCREENSHOTS, { recursive: true });

const PAGES_TO_TEST = [
  { url: '/',                        name: 'home',                  hasHeroBanner: false },
  { url: '/vehiculos-particulares/', name: 'vehiculos-particulares', hasHeroBanner: true  },
  { url: '/individual/',             name: 'individual',             hasHeroBanner: true  },
  { url: '/polizas-de-hogar/',       name: 'polizas-de-hogar',       hasHeroBanner: true  },
  { url: '/entidades-estatales/',    name: 'entidades-estatales',    hasHeroBanner: true  },
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
  // Shield fallback icon is shown when card image fails to load
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

async function testModal(page, pageName, type) {
  const chip = await page.$('.logo-chip');
  if (!chip) { info('No logo chips found — skipping modal test'); return; }

  await chip.click();
  await page.waitForTimeout(600);

  const overlay = await page.$('.policy-overlay.active');
  if (overlay) {
    pass(`${type} modal opened`);
    // Screenshot of modal
    await page.screenshot({ path: path.join(SCREENSHOTS, `${pageName}-modal.png`), fullPage: false });
    // Close
    const closeBtn = await page.$('.policy-modal-close');
    if (closeBtn) await closeBtn.click();
    await page.waitForTimeout(300);
  } else {
    fail(`${type} modal did NOT open`);
  }
}

async function main() {
  console.log('=== MYL Seguros — Playwright QA Pilot ===\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  const results = [];

  for (const p of PAGES_TO_TEST) {
    console.log(`\n── ${p.name} (${p.url}) ──`);
    const page = await context.newPage();

    // Collect console errors
    const consoleErrors = [];
    page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });

    await page.goto(BASE_URL + p.url, { waitUntil: 'domcontentloaded', timeout: 15000 });

    // Screenshot above fold
    await page.screenshot({ path: path.join(SCREENSHOTS, `${p.name}-above-fold.png`), fullPage: false });

    // 1. Hero banner check
    if (p.hasHeroBanner) {
      await page.waitForTimeout(500); // let JS render hero
      const heroBg = await page.$('#heroBannerBg');
      if (heroBg) {
        const bgImage = await heroBg.evaluate(el => el.style.backgroundImage);
        if (bgImage && bgImage !== 'none' && bgImage !== '') {
          pass(`Hero banner background applied: ${bgImage.slice(0, 60)}...`);
        } else {
          fail('Hero banner backgroundImage is empty (CSS gradient fallback)');
        }
      }
    }

    // 2. Wait for cards to load (Sheets data)
    if (p.url !== '/') {
      const cardsLoaded = await waitForCards(page);
      if (cardsLoaded) {
        pass('Product cards rendered');

        // 3. Check for placeholder shields
        const hasShields = await hasPlaceholderShield(page);
        if (hasShields) fail('Placeholder shield icons visible (card image missing)');
        else            pass('No placeholder shield icons');

        // 4. Check logo chips exist
        const chipCount = await page.$$eval('.logo-chip', els => els.length);
        if (chipCount > 0) pass(`${chipCount} logo chip(s) rendered`);
        else               info('No logo chips (no Sheets data for this page?)');

        // Full-page screenshot after cards
        await page.screenshot({ path: path.join(SCREENSHOTS, `${p.name}-cards.png`), fullPage: true });

        // 5. Modal test (if chips exist)
        if (chipCount > 0) await testModal(page, p.name, 'policy');

      } else {
        info('Cards did not load (Sheets data unavailable or no products)');
        await page.screenshot({ path: path.join(SCREENSHOTS, `${p.name}-no-cards.png`), fullPage: false });
      }
    } else {
      // Home page: just check broken images
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(SCREENSHOTS, `${p.name}-full.png`), fullPage: true });
    }

    // 6. Broken image check
    const broken = await getBrokenImages(page);
    if (broken.length === 0) pass('No broken images');
    else {
      fail(`${broken.length} broken image(s):`);
      broken.forEach(src => console.log('      ', src));
    }

    // 7. Console errors
    const relevantErrors = consoleErrors.filter(e =>
      !e.includes('/api/mili') &&       // expected: proxy not wired
      !e.includes('gviz/tq') &&         // sheets might 403 in local
      !e.includes('cloudflare')
    );
    if (relevantErrors.length === 0) pass('No unexpected console errors');
    else {
      fail(`${relevantErrors.length} console error(s):`);
      relevantErrors.slice(0, 3).forEach(e => console.log('      ', e.slice(0, 120)));
    }

    results.push({ page: p.name, broken: broken.length, errors: relevantErrors.length });
    await page.close();
  }

  await browser.close();

  // Summary
  console.log('\n════════════════════════════════');
  console.log('QA SUMMARY');
  console.log('════════════════════════════════');
  results.forEach(r => {
    const status = r.broken === 0 && r.errors === 0 ? '✅' : '⚠️ ';
    console.log(`${status} ${r.page.padEnd(30)} broken:${r.broken}  errors:${r.errors}`);
  });
  console.log(`\nScreenshots saved to: ${SCREENSHOTS}`);
}

main().catch(e => { console.error(e); process.exit(1); });
