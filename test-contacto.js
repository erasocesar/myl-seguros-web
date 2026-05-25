const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://localhost:5173/contacto/');
  await page.waitForTimeout(1000);

  // A) Hero
  const h1 = await page.$eval('.contacto-hero h1', el => el.textContent.trim());
  const p  = await page.$eval('.contacto-hero p',  el => el.textContent.trim());
  console.log('PASS hero headline:', h1 === 'Hablemos de la solución adecuada para ti');
  console.log('PASS hero subcopy:', p.includes('Seguros, protección patrimonial'));

  // Hero has background-image
  const heroBg = await page.$eval('.contacto-hero', el => window.getComputedStyle(el).backgroundImage);
  console.log('PASS hero background-image set:', heroBg.includes('contacto-hero'));

  // B) WhatsApp CTA correct URL
  const waHref = await page.$eval('.wa-card .btn-wa-white', el => el.getAttribute('href'));
  console.log('PASS WA URL correct:', waHref === 'https://wa.me/573186517626?text=Hola%2C%20quiero%20asesor%C3%ADa%20con%20M%26L%20Seguros.');

  // C) WhatsApp removed from info panel
  const waInfoItems = await page.$$eval('.info-item', items =>
    items.filter(el => el.textContent.includes('WhatsApp')).length
  );
  console.log('PASS WhatsApp info-item removed:', waInfoItems === 0);

  // D) Mili CTA block removed
  const miliCards = await page.$$eval('.info-card', cards =>
    cards.filter(el => el.textContent.includes('Hablar con Mili')).length
  );
  console.log('PASS Mili CTA block removed:', miliCards === 0);

  // E/G) Form submit → success state (validation)
  await page.fill('#nombre', 'Juan Pérez');
  await page.fill('#telefono', '+57 300 123 4567');
  await page.fill('#email', 'juan@test.com');
  await page.selectOption('#seguro', 'Individual');
  await page.click('#submitBtn');
  await page.waitForTimeout(500);

  const successVisible = await page.$eval('#formSuccess', el => el.style.display !== 'none');
  const successText = await page.$eval('#formSuccess h3', el => el.textContent.trim());
  console.log('PASS success state shows:', successVisible);
  console.log('PASS success text:', successText);

  // Success WA link correct
  const successWaHref = await page.$eval('#formSuccess a[href*="wa.me"]', el => el.getAttribute('href'));
  console.log('PASS success WA uses correct number:', successWaHref.includes('573186517626'));

  // Error state: required field missing
  await page.goto('http://localhost:5173/contacto/');
  await page.waitForTimeout(500);
  await page.fill('#nombre', '');
  await page.click('#submitBtn');
  await page.waitForTimeout(300);
  const errVisible = await page.$eval('#formError', el => el.style.display !== 'none');
  console.log('PASS error state shows on empty required field:', errVisible);

  console.log('JS page errors:', errors.length ? errors : 'none');
  await browser.close();
})();
