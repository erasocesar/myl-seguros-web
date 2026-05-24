/**
 * generate-assets-pilot.js
 * Genera 3 hero banners + 3 product card images (piloto)
 * Requiere: OPENAI_API_KEY en variable de entorno
 * Uso: node generate-assets-pilot.js
 */

const fs   = require('fs');
const path = require('path');

const API_KEY = process.env.OPENAI_API_KEY;
const BASE    = __dirname;

if (!API_KEY) {
  console.error('ERROR: OPENAI_API_KEY no está configurado.');
  process.exit(1);
}

/* ── Selección del piloto ── */

// gpt-image-1 supported sizes: 1024x1024, 1536x1024 (landscape), 1024x1536 (portrait)
const PILOT_BANNERS = [
  {
    file:   'assets/banners/individual.png',
    size:   '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a premium insurance website. A warm family portrait: Colombian parents and two young children in a bright, modern Bogotá home, golden hour sunlight through large windows, sense of security and belonging. Elegant interior architecture. Premium lifestyle. Clean composition with copy-safe space on the left third. No text, no logos, no watermarks, no people from behind.',
  },
  {
    file:   'assets/banners/polizas-de-hogar.png',
    size:   '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a home insurance website. A beautiful modern residential building or house in a Colombian urban neighborhood at golden hour, warm interior lights glowing through large windows, lush landscaping, elegant contemporary architecture, sense of safety and tranquility. Professional real estate photography style. Copy-safe space on the left. No text, no logos, no watermarks.',
  },
  {
    file:   'assets/banners/entidades-estatales.png',
    size:   '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a government compliance insurance website. Modern Colombian government or institutional office buildings, clean glass-and-concrete architecture, deep blue sky with dramatic clouds, Colombian flag subtle in background, sense of authority and trust, corporate photography style. Slightly desaturated professional look. Copy-safe space on the left. No text, no logos, no watermarks.',
  },
];

const PILOT_CARDS = [
  {
    file:   'assets/cards/individual.png',
    size:   '1024x1024',
    prompt: 'Square photorealistic product card image for a life insurance website. A confident, warm-smiling Colombian professional in their 40s, business casual attire, modern office bokeh background, natural window light, sense of security and well-being. Portrait photography. Premium insurance brand aesthetic. Clean composition. No text, no logos, no watermarks.',
  },
  {
    file:   'assets/cards/polizas-de-hogar.png',
    size:   '1024x1024',
    prompt: 'Square photorealistic product card image for a home insurance website. A bright, beautifully decorated modern Colombian living room interior, warm ambient lighting, comfortable furniture, potted plants, sense of home and coziness. Interior architecture photography. Premium real estate aesthetic. Clean composition. No text, no logos, no watermarks.',
  },
  {
    file:   'assets/cards/arrendamiento.png',
    size:   '1024x1024',
    prompt: 'Square photorealistic product card image for a rental insurance website. House keys on a clean modern surface, elegant apartment building seen softly blurred in background through a window, Colombian urban residential context, shallow depth of field, sense of real estate confidence. Professional product photography. No text, no logos, no watermarks.',
  },
];

/* ── Helpers ── */

async function generateAndSave(prompt, size, dest) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method:  'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type':  'application/json',
    },
    body: JSON.stringify({
      model:  'gpt-image-1',
      prompt,
      n:      1,
      size,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API ${res.status}: ${txt.slice(0, 200)}`);
  }

  const json = await res.json();
  const b64  = json.data[0].b64_json;
  if (!b64) throw new Error('No b64_json in response');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(b64, 'base64'));
  return fs.statSync(dest).size;
}

/* ── Main ── */

async function main() {
  const all   = [...PILOT_BANNERS, ...PILOT_CARDS];
  let ok = 0, fail = 0;

  for (const item of all) {
    const dest  = path.join(BASE, item.file);
    const label = item.file.replace('assets/', '');
    process.stdout.write(`  Generating ${label} ... `);
    try {
      const bytes = await generateAndSave(item.prompt, item.size, dest);
      console.log(`✓  (${(bytes / 1024).toFixed(0)} KB)`);
      ok++;
    } catch (e) {
      console.log(`✗  ${e.message}`);
      fail++;
    }
  }

  console.log(`\nPilot done — ${ok} generated, ${fail} failed.`);
  if (fail > 0) process.exit(1);
}

main();
