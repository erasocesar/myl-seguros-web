/**
 * generate-assets-full.js
 * Full batch: 23 hero banners + 46 product card images
 * Skips files that already exist (preserves approved pilot assets).
 * Requires: OPENAI_API_KEY in environment.
 * Usage: node generate-assets-full.js
 */

const fs   = require('fs');
const path = require('path');

const API_KEY = process.env.OPENAI_API_KEY;
const BASE    = __dirname;

if (!API_KEY) {
  console.error('ERROR: OPENAI_API_KEY not set.');
  process.exit(1);
}

/* ── Hero Banners (1536x1024) ──────────────────────────────── */

const BANNERS = [
  // ── VIDA ──
  {
    file: 'assets/banners/vida-colectiva.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a group life insurance website. Diverse team of Colombian corporate professionals gathered in a bright modern Bogotá office, warm golden-hour sunlight through floor-to-ceiling windows, sense of solidarity and collective protection, premium editorial photography style. Copy-safe space on the left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/ap-accidentes-personales.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for an accident insurance website. Active Colombian professional cycling on a scenic Andean mountain road at golden hour, lush green Colombian landscape in the background, sense of vitality, freedom, and safety. Premium lifestyle sports photography. Copy-safe space on the left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/polizas-de-salud-y-medicina-prepagada.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a premium health insurance website. Warm and professional Colombian doctor consulting with a patient in a bright, modern private clinic, clean white and light blue medical environment, natural light, sense of trust and world-class healthcare. Premium medical photography. Copy-safe space on left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/mascotas.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a pet insurance website. Happy Colombian family with a golden retriever dog and a tabby cat in a beautiful bright modern home interior, warm afternoon sunlight through large windows, joyful and warm family lifestyle photography. Premium pet ownership aesthetic. Copy-safe left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/arl-riesgos-laborales.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a workplace risk and ARL insurance website. Colombian industrial engineer in modern hard hat and safety vest at a well-lit contemporary Colombian construction or industrial facility, confident and protected posture, dramatic sky, sense of professionalism and safety compliance. Copy-safe left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/polizas-de-asistencia-en-viajes-internacionales.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for an international travel assistance insurance website. Confident Colombian traveler with modern luggage at a beautiful international airport terminal or iconic European city plaza, warm lifestyle travel photography, sense of adventure and complete protection abroad. Copy-safe left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/exequial.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a funeral and bereavement insurance website. Elegant arrangement of white calla lilies and white roses on a polished dark wood surface, soft warm candlelight, calm and deeply respectful atmosphere, sophisticated floral still-life photography. No people, no coffins, no dark imagery. Dignified and serene. Copy-safe left third. No text, no logos, no watermarks.',
  },

  // ── AUTOS ──
  {
    file: 'assets/banners/vehiculos-comerciales.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a commercial vehicle insurance website. Fleet of modern branded delivery vans on a clean Colombian urban street at golden hour, professional logistics context, sense of reliability, efficiency and business continuity. Editorial commercial photography. Copy-safe left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/vehiculos-pesados.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a heavy vehicle insurance website. Line of modern heavy-duty trucks on a Colombian Andean highway, dramatic mountain landscape and dramatic sunset sky, sense of power, reliability and long-haul logistics excellence. Commercial transport photography. Copy-safe left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/maquinaria-y-equipos-moviles.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a construction machinery insurance website. Large yellow excavator and bulldozer working at a major Colombian construction site, dramatic clouds and golden sky, sense of industrial scale and power. Professional construction industry photography. Copy-safe left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/movilidad-personal.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a personal mobility insurance website. Young Colombian professional riding a premium motorcycle through a modern Bogotá street lined with trees, golden hour light, sense of urban freedom and lifestyle confidence. Premium lifestyle photography. Copy-safe left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/credito-de-autos-livianos-publicos-y-pesados.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a vehicle credit insurance website. Modern Colombian car dealership showroom interior, beautiful selection of cars under dramatic showroom lighting, sense of aspiration and financial achievement, premium automotive retail photography. Copy-safe left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/polizas-colectivas.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a collective vehicle fleet policy website. Aerial or elevated view of a large, neatly organized corporate vehicle fleet in a Colombian logistics park, overcast sky with dramatic light, sense of scale and fleet management precision. Commercial aerial photography. Copy-safe left third. No text, no logos, no watermarks.',
  },

  // ── CUMPLIMIENTO ──
  {
    file: 'assets/banners/cumplimiento-particular.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a private compliance insurance website. Two Colombian business professionals in business attire shaking hands over a formal contract on a glass conference table in a modern corporate office, warm natural light, sense of trust, partnership and contractual compliance. Premium corporate photography. Copy-safe left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/arrendamiento.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a rental insurance website. Professional Colombian real estate agent presenting keys to a smiling family in front of a beautiful modern Bogotá apartment building, golden hour light, urban residential architecture, sense of security and real estate confidence. Premium real estate photography. Copy-safe left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/judiciales.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a judicial bond and surety insurance website. Elegant Colombian courthouse exterior or a premium law office interior with scales of justice and architectural details, deep blue dramatic sky, sense of judicial authority, integrity and legal protection. Professional architectural and legal photography. Copy-safe left third. No text, no logos, no watermarks.',
  },

  // ── GENERALES ──
  {
    file: 'assets/banners/empresas-o-persona-natural.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a business and personal insurance website. Colombian entrepreneur or executive in a sleek modern Bogotá co-working space or glass-walled office, confident professional posture, warm natural light, ambition and security. Premium corporate lifestyle photography. Copy-safe left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/polizas-todo-riesgo-construccion.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a construction all-risk insurance website. Large-scale Colombian high-rise construction project with tower cranes against a dramatic sunrise sky, safety helmets and construction elements in foreground, sense of ambition, scale and project protection. Premium construction industry photography. Copy-safe left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/responsabilidad-civil-profesional.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a professional liability insurance website. Senior Colombian professional consultant presenting a strategy in a premium boardroom to a small executive team, sophisticated modern office environment, warm focused light, sense of expertise, authority and professional responsibility. Copy-safe left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/transporte-de-mercancias.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a cargo transport insurance website. Modern cargo trucks lined up at a large contemporary Colombian logistics and distribution center at golden hour, forklifts and shipping containers visible, professional supply chain photography, sense of reliability and scale. Copy-safe left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/educativa.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for an educational insurance website. Diverse group of Colombian university students studying together in a beautiful modern campus library or outdoor university plaza, golden afternoon light, sense of aspiration, academic achievement and a promising future. Premium educational lifestyle photography. Copy-safe left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/polizas-de-copropiedades.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for a condo and common areas insurance website. Beautiful modern Colombian residential condominium complex with manicured gardens, pool area, and elegant common spaces, warm afternoon golden light, premium urban residential architecture photography. Copy-safe left third. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/banners/polizas-todo-riesgo-montaje.png',
    size: '1536x1024',
    prompt: 'Wide-format photorealistic hero banner for an industrial all-risk installation insurance website. Professional engineers and technicians supervising the installation of large industrial machinery at a Colombian industrial plant, dramatic interior industrial lighting, precision technical work, sense of expertise and comprehensive protection. Copy-safe left third. No text, no logos, no watermarks.',
  },
];

/* ── Product Cards (1024x1024) ─────────────────────────────── */

const CARDS = [
  // ── VIDA ──
  {
    file: 'assets/cards/vida-deudor.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a life debtor insurance website. Professional Colombian in their 40s reviewing financial documents or meeting with a bank advisor at a modern Bogotá bank branch, sense of financial protection and peace of mind. Portrait photography, warm lighting, bokeh background. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/auxilios-y-respaldos-economicos.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for an economic aid and support insurance website. Warm embrace between a Colombian family (couple with child) in a comfortable modern home, sense of solidarity, love and economic protection. Lifestyle family photography, warm natural light. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/vida-grupo-empresarial.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a corporate group life insurance website. Diverse team of Colombian business professionals posing confidently in a modern office, group portrait, professional business attire, sense of collective security. Clean corporate photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/vida-grupo-deudores.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a group debtor life insurance website. Elegant stack of financial documents, loan agreements or a corporate desk with a laptop and contract papers, Colombian banking professional context, shallow depth of field. Clean product photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/ap-accidentes-personales.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for an accident insurance website. Active Colombian athlete (cyclist or trail runner) in athletic gear on an Andean park path, sense of energy, vitality and life protection. Premium sports lifestyle photography, natural light. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/polizas-de-salud.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a health insurance website. Warm and reassuring Colombian doctor in a white coat at a bright modern clinic, stethoscope around neck, professional and trustworthy expression. Medical portrait photography, clean background. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/medicina-prepagada.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a prepaid medicine insurance website. Premium private clinic reception or consultation room interior, clean modern medical environment with white and light blue tones, world-class healthcare aesthetic. Interior architectural photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/mascotas.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a pet insurance website. Adorable golden retriever puppy or a fluffy cat in a bright, beautiful Colombian home, warm sunlight, premium pet photography aesthetic, sense of joy and love. Clean square composition. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/arl.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for an ARL workplace risk insurance website. Confident Colombian industrial worker in full safety gear (hard hat, safety vest, gloves) in a well-lit modern factory or construction site. Professional occupational safety portrait. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/seguridad-social.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a social security insurance website. Colombian professional reviewing benefits or social security documents on a tablet in a modern office, sense of rights, stability and formal protection. Clean office lifestyle photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/polizas-de-asistencia-en-viajes-internacionales.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for an international travel assistance insurance website. Open passport with boarding passes resting near an airplane window with clouds visible outside, warm travel lifestyle photography, sense of confidence and global protection. Clean square composition. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/exequial.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a funeral and bereavement insurance website. Peaceful arrangement of white calla lilies in an elegant ceramic vase against a soft neutral background, dignified and serene, soft bokeh, non-dark and non-cheerful, respectful elegance. Fine art still-life photography. No text, no logos, no watermarks.',
  },

  // ── AUTOS ──
  {
    file: 'assets/cards/todo-riesgo-taxis.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a taxi all-risk insurance website. Modern Colombian yellow taxi cab on a clean Bogotá street, daytime urban setting, professional commercial transport, sense of reliability. Urban automotive photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/vehiculos-de-servicio-publico.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a public service vehicle insurance website. Modern articulated city bus at a clean Colombian transit station or stop, urban public transport, professional and reliable service. Urban transport photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/vans-comerciales.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a commercial van insurance website. Modern white or grey delivery van parked in front of a Colombian commercial building, professional urban logistics context, clean composition. Commercial automotive photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/camionetas-de-trabajo.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a work pickup truck insurance website. Rugged heavy-duty pickup truck on a Colombian mountain road or near a construction site, utility and power, professional work vehicle aesthetic. Automotive photography, natural setting. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/seguro-de-autos-pesados.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a heavy automotive insurance website. Dramatic front-facing perspective of a large heavy truck or semi-trailer on an open Colombian highway, sense of power and commercial scale. Professional commercial vehicle photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/camiones.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a freight truck insurance website. Modern freight truck at a Colombian logistics depot with a loading dock background, commercial transport, professional and reliable. Commercial automotive photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/tractocamiones.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a tractor-trailer insurance website. Modern tractor-trailer on a Colombian Andean highway at golden hour, dramatic landscape, sense of long-haul logistics excellence and reliability. Professional commercial transport photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/flotas-pesadas.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a heavy fleet insurance website. Multiple heavy trucks parked in organized formation at a Colombian logistics company yard, slight elevated angle, fleet management scale and precision. Aerial commercial photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/maquinaria-amarilla.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a yellow machinery insurance website. Vibrant yellow excavator working at a Colombian construction site against a dramatic sky, industrial power and construction precision. Construction machinery photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/retroexcavadoras.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a backhoe excavator insurance website. Backhoe excavator digging at a Colombian construction site, detailed close-up of the machinery arm, professional industrial photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/bulldozers.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a bulldozer insurance website. Powerful bulldozer on a large Colombian earthmoving project, dramatic sky, construction power and precision. Professional industrial machinery photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/maquinaria-de-contratistas.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a contractors machinery insurance website. Colombian construction contractor in a hard hat reviewing project plans at a construction site, machinery visible in background, professional portrait, sense of expertise and responsibility. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/motos.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a motorcycle insurance website. Premium sport or touring motorcycle on a scenic Colombian mountain road, dramatic Andean landscape backdrop, lifestyle photography, premium two-wheel ownership. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/bicicletas.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a bicycle insurance website. High-end road bicycle leaning against a stylish wall in a modern Bogotá neighborhood, urban lifestyle photography, premium cycling culture aesthetic. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/movilidad-urbana.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for an urban mobility insurance website. Young Colombian professional riding an electric scooter through a modern Bogotá street, contemporary urban lifestyle, trendy and dynamic. Urban lifestyle photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/credito-de-autos-pesados.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a heavy vehicle credit insurance website. Colombian truck owner signing financing documents with a professional advisor at a commercial dealership, sense of business transaction and trust. Professional photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/credito-de-autos-livianos.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a light vehicle credit insurance website. Car keys on a dealer desk with a new sedan visible through the showroom window, financing documents, sense of aspiration and achievement. Clean product photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/leasing-vehicular.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a vehicle leasing insurance website. Elegant modern sedan or luxury SUV in a premium Colombian car dealership showroom, sophisticated accent lighting, premium automotive retail aesthetic. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/compra-de-cartera-de-vehiculos.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a vehicle portfolio insurance website. Organized aerial view of a multi-brand vehicle lot with diverse cars neatly arranged, portfolio and asset management context, commercial photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/hibridos-y-o-electricos.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a hybrid and electric vehicle insurance website. Modern electric vehicle plugged into a charging station in a clean Colombian urban parking garage, sustainable technology aesthetic, premium clean energy lifestyle. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/convencionales.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a conventional vehicle insurance website. Classic family sedan parked in front of a suburban Colombian home, warm afternoon light, reliable family vehicle, trustworthy lifestyle photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/todo-tipo-de-motor.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for an all motor types vehicle insurance website. Clean lineup of diverse vehicles — sedan, motorcycle, and truck — side by side in a neutral studio or clean outdoor setting, comprehensiveness concept, professional automotive photography. No text, no logos, no watermarks.',
  },

  // ── CUMPLIMIENTO ──
  {
    file: 'assets/cards/entidades-estatales.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a state compliance insurance website. Formal government contract documents with an official seal on an elegant institutional desk, Colombian public sector context, sense of governance and institutional authority. Clean still-life photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/cumplimiento-particular.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a private compliance bond insurance website. Two Colombian business professionals shaking hands over a contract document at a modern corporate office table, trust and private contractual compliance. Professional portrait photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/judiciales.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a judicial bond insurance website. Elegant wooden gavel resting on legal documents beside a scales of justice figurine on a clean desk, Colombian legal context, authority and integrity. Legal still-life photography. No text, no logos, no watermarks.',
  },

  // ── GENERALES ──
  {
    file: 'assets/cards/empresas.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a business insurance website. Modern Colombian corporate office interior with glass walls and a professional team in a meeting, business environment, premium corporate insurance context. Corporate lifestyle photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/persona-natural.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a self-employed and personal insurance website. Confident Colombian entrepreneur or independent professional working in a bright modern workspace or home office, natural light, independent professional lifestyle. Portrait photography, clean bokeh. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/todo-tipo.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for an all-types insurance website. Thoughtfully composed flat lay or artistic still life showing symbolic objects representing different types of insurance — a miniature house, a car key, a stethoscope, and a contract envelope — arranged elegantly on a neutral premium surface with soft shadows. Conceptual product photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/polizas-todo-riesgo-construccion.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a construction all-risk insurance website. Colombian construction worker in safety gear standing on a high building floor with a panoramic Bogotá cityscape behind, sense of scale and urban progress. Professional construction portrait photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/rc-profesional.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a professional liability insurance website. Senior Colombian executive or consultant in a premium modern office, reviewing a document with focused confidence, professional business attire, soft bokeh background. Premium corporate portrait photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/transporte-de-mercancias.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a cargo transport insurance website. Interior of a large modern Colombian warehouse or distribution center with a forklift moving palletized cargo, professional logistics photography, sense of operational scale. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/educativa.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for an educational insurance website. Colombian university student studying with books and a laptop in a modern campus library, focused and aspirational expression, warm natural light, sense of academic excellence. Portrait photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/polizas-de-copropiedades.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for a condo and common areas insurance website. Elegant lobby of a premium modern Colombian residential condominium, marble floors, concierge desk, refined interior architecture, sense of collective property pride. Interior architectural photography. No text, no logos, no watermarks.',
  },
  {
    file: 'assets/cards/polizas-todo-riesgo-montaje.png',
    size: '1024x1024',
    prompt: 'Square photorealistic product card for an industrial all-risk assembly insurance website. Specialist engineers in safety gear supervising the precision installation of large industrial equipment in a Colombian industrial facility, complex machinery in background, sense of technical expertise. Professional industrial photography. No text, no logos, no watermarks.',
  },
];

/* ── Core helpers ──────────────────────────────────────────── */

async function generateAndSave(prompt, size, dest) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method:  'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type':  'application/json',
    },
    body: JSON.stringify({ model: 'gpt-image-1', prompt, n: 1, size }),
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

/* ── Main ──────────────────────────────────────────────────── */

async function main() {
  const all  = [...BANNERS, ...CARDS];
  const todo = all.filter(item => !fs.existsSync(path.join(BASE, item.file)));

  const skipped = all.length - todo.length;
  console.log(`\nTotal assets: ${all.length}  |  Existing (skipped): ${skipped}  |  To generate: ${todo.length}\n`);

  let ok = 0, fail = 0;
  const failures = [];

  for (const item of todo) {
    const dest  = path.join(BASE, item.file);
    const label = item.file.replace('assets/', '');
    process.stdout.write(`  Generating ${label} ... `);
    try {
      const bytes = await generateAndSave(item.prompt, item.size, dest);
      console.log(`✓  (${(bytes / 1024).toFixed(0)} KB)`);
      ok++;
    } catch (e) {
      console.log(`✗  ${e.message}`);
      failures.push({ file: item.file, error: e.message });
      fail++;
    }
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`Generated: ${ok}  |  Failed: ${fail}  |  Skipped: ${skipped}`);

  if (failures.length > 0) {
    console.log('\nFailed assets:');
    failures.forEach(f => console.log(`  ✗ ${f.file}: ${f.error}`));
  }

  // Cost estimate: banners $0.06 each (1536x1024), cards $0.04 each (1024x1024)
  const bannersDone = todo.filter(i => i.file.includes('/banners/')).length - failures.filter(f => f.file.includes('/banners/')).length;
  const cardsDone   = todo.filter(i => i.file.includes('/cards/')).length  - failures.filter(f => f.file.includes('/cards/')).length;
  const estCost     = (bannersDone * 0.06) + (cardsDone * 0.04);
  console.log(`\nEstimated cost this run: $${estCost.toFixed(2)}`);
  console.log(`Pilot cost (6 images):   $0.30`);
  console.log(`Total estimated:         $${(estCost + 0.30).toFixed(2)}`);

  if (fail > 0) process.exit(1);
}

main();
