/* ============================================================
   gobernanza-data.js — Datos estáticos extraídos de 03_GOBERNANZA.md
   y 02_SUBPAGE_TEMPLATE.md · Consultores M&L Seguros
   ============================================================ */

/* ── Mapa de 27 subcategorías ─────────────────────────────── */
const SUBCATEGORY_MAP = [
  // VIDA (8)
  { slug: 'individual',                                    name: 'Individual',                                     category: 'VIDA' },
  { slug: 'vida-colectiva',                               name: 'Vida Colectiva',                                 category: 'VIDA' },
  { slug: 'ap-accidentes-personales',                     name: 'AP (Accidentes Personales)',                     category: 'VIDA' },
  { slug: 'polizas-de-salud-y-medicina-prepagada',        name: 'Pólizas de Salud y Medicina Prepagada',          category: 'VIDA' },
  { slug: 'mascotas',                                     name: 'Mascotas',                                       category: 'VIDA' },
  { slug: 'arl-riesgos-laborales',                        name: 'ARL (Riesgos Laborales)',                        category: 'VIDA' },
  { slug: 'polizas-de-asistencia-en-viajes-internacionales', name: 'Pólizas de Asistencia en Viajes Internacionales', category: 'VIDA' },
  { slug: 'exequial',                                     name: 'Exequial',                                       category: 'VIDA' },
  // AUTOS (7)
  { slug: 'vehiculos-particulares',                       name: 'Vehículos Particulares',                         category: 'AUTOS' },
  { slug: 'vehiculos-comerciales',                        name: 'Vehículos Comerciales',                          category: 'AUTOS' },
  { slug: 'vehiculos-pesados',                            name: 'Vehículos Pesados',                              category: 'AUTOS' },
  { slug: 'maquinaria-y-equipos-moviles',                 name: 'Maquinaria y Equipos Móviles',                   category: 'AUTOS' },
  { slug: 'movilidad-personal',                           name: 'Movilidad Personal',                             category: 'AUTOS' },
  { slug: 'credito-de-autos-livianos-publicos-y-pesados', name: 'Crédito de Autos - Livianos, Públicos y Pesados', category: 'AUTOS' },
  { slug: 'polizas-colectivas',                           name: 'Pólizas Colectivas',                             category: 'AUTOS' },
  // CUMPLIMIENTO (4)
  { slug: 'entidades-estatales',                          name: 'Entidades Estatales',                            category: 'CUMPLIMIENTO' },
  { slug: 'cumplimiento-particular',                      name: 'Cumplimiento Particular',                        category: 'CUMPLIMIENTO' },
  { slug: 'arrendamiento',                                name: 'Arrendamiento',                                  category: 'CUMPLIMIENTO' },
  { slug: 'judiciales',                                   name: 'Judiciales',                                     category: 'CUMPLIMIENTO' },
  // GENERALES (8)
  { slug: 'empresas-o-persona-natural',                   name: 'Empresas y/o Persona Natural',                   category: 'GENERALES' },
  { slug: 'polizas-de-hogar',                             name: 'Pólizas de Hogar',                               category: 'GENERALES' },
  { slug: 'polizas-todo-riesgo-construccion',             name: 'Pólizas Todo Riesgo Construcción',               category: 'GENERALES' },
  { slug: 'responsabilidad-civil-profesional',            name: 'Responsabilidad Civil Profesional',              category: 'GENERALES' },
  { slug: 'transporte-de-mercancias',                     name: 'Transporte de Mercancías',                       category: 'GENERALES' },
  { slug: 'educativa',                                    name: 'Educativa',                                      category: 'GENERALES' },
  { slug: 'polizas-de-copropiedades',                     name: 'Pólizas de Copropiedades',                       category: 'GENERALES' },
  { slug: 'polizas-todo-riesgo-montaje',                  name: 'Pólizas Todo Riesgo Montaje',                    category: 'GENERALES' },
];

/* ── Slug → entry lookup ──────────────────────────────────── */
const SUBCATEGORY_BY_SLUG = {};
SUBCATEGORY_MAP.forEach(s => { SUBCATEGORY_BY_SLUG[s.slug] = s; });

/* ── Gobernanza completa por nombre de subcategoría ──────── */
const GOBERNANZA_MAP = {

  /* ════════ VIDA ════════════════════════════════════════════ */

  'Individual': {
    slug:                   'individual',
    category:               'VIDA',
    titulo_bienvenida:      'Bienvenidos a la sección de Seguros de Vida Individual',
    descripcion_subcategoria: 'Protege económicamente a tu familia y a ti mismo con seguros de vida que van mucho más allá de la cobertura básica. Encuentra pólizas de vida tradicionales con ahorro programado, respaldo ante enfermedades graves como cáncer o Alzheimer, auxilios económicos en efectivo por hospitalización o desempleo, y coberturas que cancelan el saldo de tus deudas ante fallecimiento o incapacidad. SURA, Seguros Bolívar, MAPFRE, AXA Colpatria y más te acompañan en cada etapa de la vida.',
    frase_impacto:          'Porque lo que más importa merece la mayor protección.',
    banner_h1:              'Seguros de',
    banner_h2:              'Vida Individual',
    banner_image:           '../assets/banners/individual.png',
    banner_coberturas: [
      { icono: 'heart',       texto: 'Fallecimiento e invalidez' },
      { icono: 'shield',      texto: 'Enfermedades graves' },
      { icono: 'dollar-sign', texto: 'Auxilios en efectivo' },
      { icono: 'users',       texto: 'Protección familiar' },
    ],
    product_types: ['Individual', 'Vida Deudor', 'Auxilios y Respaldos Económicos'],
  },

  'Vida Colectiva': {
    slug:                   'vida-colectiva',
    category:               'VIDA',
    titulo_bienvenida:      'Bienvenidos a la sección de Seguros de Vida Colectiva',
    descripcion_subcategoria: 'Protege a todo tu equipo con una sola póliza. Soluciones corporativas de vida en grupo para empresas, cooperativas, colegios y gremios que cubren fallecimiento, invalidez, desmembración y beneficios por accidente para empleados y asociados. Incluye opciones con componente de ahorro colectivo, protección para cartera de deudores y programas de bienestar empresarial de SURA, MAPFRE, Equidad Seguros, Mundial de Seguros y Seguros del Estado.',
    frase_impacto:          'El mejor beneficio que le puedes dar a tu equipo.',
    banner_h1:              'Seguros de',
    banner_h2:              'Vida Colectiva',
    banner_image:           '../assets/banners/vida-colectiva.png',
    banner_coberturas: [
      { icono: 'users',       texto: 'Cobertura grupal' },
      { icono: 'shield',      texto: 'Fallecimiento e invalidez' },
      { icono: 'briefcase',   texto: 'Programas empresariales' },
      { icono: 'dollar-sign', texto: 'Cartera de deudores' },
    ],
    product_types: ['Vida Grupo Empresarial', 'Vida Grupo Deudores'],
  },

  'AP (Accidentes Personales)': {
    slug:                   'ap-accidentes-personales',
    category:               'VIDA',
    titulo_bienvenida:      'Bienvenidos a la sección de Accidentes Personales',
    descripcion_subcategoria: 'Cobertura económica inmediata ante lesiones, incapacidad o fallecimiento causados por accidentes: eventos externos, fortuitos y visibles. Ideal para estudiantes, trabajadores de campo, deportistas y toda persona activa. Incluye gastos médicos por accidente, desmembración, incapacidad total y permanente, auxilio funerario y respaldo para instituciones educativas. Disponible con Seguros Bolívar, Equidad Seguros, Mundial de Seguros y Seguros del Estado.',
    frase_impacto:          'Porque los accidentes no avisan.',
    banner_h1:              'Seguros de',
    banner_h2:              'Accidentes Personales',
    banner_image:           '../assets/banners/ap-accidentes-personales.png',
    banner_coberturas: [
      { icono: 'shield',      texto: 'Protección ante accidentes' },
      { icono: 'activity',    texto: 'Incapacidad y desmembración' },
      { icono: 'user-check',  texto: 'Gastos médicos' },
      { icono: 'heart',       texto: 'Auxilio funerario' },
    ],
    product_types: ['AP (Accidentes Personales)'],
  },

  'Pólizas de Salud y Medicina Prepagada': {
    slug:                   'polizas-de-salud-y-medicina-prepagada',
    category:               'VIDA',
    titulo_bienvenida:      'Bienvenidos a la sección de Salud y Medicina Prepagada',
    descripcion_subcategoria: 'Accede a los mejores servicios médicos con pólizas que cubren hospitalización, cirugías, urgencias, enfermedades de alto costo y embarazo. Desde cobertura nacional con telemedicina y médico en casa 24/7, hasta protección internacional BUPA con coberturas de hasta USD 7 millones para cáncer, trasplantes y deportes de alto riesgo. SURA, Seguros Bolívar, AXA Colpatria y MAPFRE tienen el plan que tu salud merece.',
    frase_impacto:          'Tu salud no puede esperar. Protégela hoy.',
    banner_h1:              'Seguros de',
    banner_h2:              'Salud y Medicina Prepagada',
    banner_image:           '../assets/banners/polizas-de-salud-y-medicina-prepagada.png',
    banner_coberturas: [
      { icono: 'heart-pulse', texto: 'Hospitalización y cirugías' },
      { icono: 'shield-plus', texto: 'Enfermedades de alto costo' },
      { icono: 'stethoscope', texto: 'Telemedicina 24/7' },
      { icono: 'activity',    texto: 'Cobertura internacional' },
    ],
    product_types: ['Pólizas de Salud', 'Medicina Prepagada'],
  },

  'Mascotas': {
    slug:                   'mascotas',
    category:               'VIDA',
    titulo_bienvenida:      'Bienvenidos a la sección de Seguros para Mascotas',
    descripcion_subcategoria: 'Tu perro o gato también es parte de la familia y merece protección real. Coberturas veterinarias para enfermedades, accidentes y urgencias, asistencia ante decesos y responsabilidad civil si tu mascota causa daños a terceros. SURA, MAPFRE y Mundial de Seguros tienen planes diseñados para que cuides la salud y el bienestar de tus peludos sin preocuparte por los gastos imprevistos.',
    frase_impacto:          'Ellos también son familia. Protégelos.',
    banner_h1:              'Seguros para',
    banner_h2:              'Mascotas',
    banner_image:           '../assets/banners/mascotas.png',
    banner_coberturas: [
      { icono: 'heart',       texto: 'Cobertura veterinaria' },
      { icono: 'shield',      texto: 'Enfermedades y accidentes' },
      { icono: 'user-check',  texto: 'Responsabilidad civil' },
      { icono: 'activity',    texto: 'Asistencia ante decesos' },
    ],
    product_types: ['Mascotas'],
  },

  'ARL (Riesgos Laborales)': {
    slug:                   'arl-riesgos-laborales',
    category:               'VIDA',
    titulo_bienvenida:      'Bienvenidos a la sección de ARL y Riesgos Laborales',
    descripcion_subcategoria: 'Cumple con la ley y protege a tus empleados ante accidentes laborales y enfermedades ocupacionales. Incluye administración de riesgos laborales obligatoria para empleadores colombianos, soluciones de seguridad social, rentas vitalicias mensuales de por vida ajustadas por IPC y sustitución pensional para beneficiarios. Equidad ARL, AXA Colpatria, MAPFRE y Seguros Bolívar ofrecen las soluciones más completas del mercado.',
    frase_impacto:          'Cumple con la ley y protege a quienes hacen posible tu empresa.',
    banner_h1:              'Seguros de',
    banner_h2:              'ARL y Riesgos Laborales',
    banner_image:           '../assets/banners/arl-riesgos-laborales.png',
    banner_coberturas: [
      { icono: 'user-check',  texto: 'Cobertura obligatoria ARL' },
      { icono: 'shield',      texto: 'Accidentes laborales' },
      { icono: 'briefcase',   texto: 'Enfermedades ocupacionales' },
      { icono: 'dollar-sign', texto: 'Rentas vitalicias' },
    ],
    product_types: ['ARL', 'Seguridad Social'],
  },

  'Pólizas de Asistencia en Viajes Internacionales': {
    slug:                   'polizas-de-asistencia-en-viajes-internacionales',
    category:               'VIDA',
    titulo_bienvenida:      'Bienvenidos a la sección de Asistencia en Viajes Internacionales',
    descripcion_subcategoria: 'Viaja al exterior con la tranquilidad de tener respaldo médico completo donde estés. Seguros Médicos Internacionales ofrece planes por días, meses o estadías prolongadas que cubren consultas, urgencias, hospitalización, farmacia, repatriación y odontología. Planes especiales para estudiantes en el exterior y trabajadores expatriados con asistencia telefónica médica 24/7 en cualquier parte del mundo.',
    frase_impacto:          'Viaja sin límites. Nosotros te cuidamos donde estés.',
    banner_h1:              'Seguros de',
    banner_h2:              'Asistencia en Viajes',
    banner_image:           '../assets/banners/polizas-de-asistencia-en-viajes-internacionales.png',
    banner_coberturas: [
      { icono: 'plane',       texto: 'Asistencia médica internacional' },
      { icono: 'shield',      texto: 'Hospitalización y urgencias' },
      { icono: 'heart-pulse', texto: 'Repatriación' },
      { icono: 'map-pin',     texto: 'Cobertura mundial 24/7' },
    ],
    product_types: ['Pólizas de Asistencia en Viajes Internacionales'],
  },

  'Exequial': {
    slug:                   'exequial',
    category:               'VIDA',
    titulo_bienvenida:      'Bienvenidos a la sección de Seguros Exequiales',
    descripcion_subcategoria: 'Cuando llega el momento más difícil, lo último que tu familia debe enfrentar es una carga económica. Los seguros exequiales de SURA cubren los servicios funerarios completos y brindan apoyo logístico integral ante el fallecimiento del asegurado o sus familiares cubiertos, garantizando acompañamiento en uno de los momentos más importantes de la vida.',
    frase_impacto:          'Dale a tu familia la tranquilidad de no tener que preocuparse por nada.',
    banner_h1:              'Seguros',
    banner_h2:              'Exequiales',
    banner_image:           '../assets/banners/exequial.png',
    banner_coberturas: [
      { icono: 'heart',       texto: 'Servicios funerarios completos' },
      { icono: 'shield',      texto: 'Apoyo logístico integral' },
      { icono: 'users',       texto: 'Familiares cubiertos' },
      { icono: 'phone',       texto: 'Acompañamiento 24/7' },
    ],
    product_types: ['Exequial'],
  },

  /* ════════ AUTOS ════════════════════════════════════════════ */

  'Vehículos Particulares': {
    slug:                   'vehiculos-particulares',
    category:               'AUTOS',
    titulo_bienvenida:      'Bienvenidos a la sección de Pólizas para Vehículos Particulares',
    descripcion_subcategoria: 'Encuentra el seguro ideal para tu automóvil, camioneta o campero familiar entre 10 pólizas de 9 aseguradoras líderes. Desde planes básicos con responsabilidad civil hasta coberturas Premium 360 con deducible desde 0%, vehículo de reemplazo hasta 30 días, conciliación en sitio y asistencia en carretera 24/7. Comparamos opciones de Seguros Bolívar, SURA, MAPFRE, AXA Colpatria y más para que protejas tu inversión sin pagar de más.',
    frase_impacto:          'Tu carro, protegido en cada kilómetro.',
    banner_h1:              'Seguros de',
    banner_h2:              'Vehículos Particulares',
    banner_image:           '../assets/banners/vehiculos-particulares.png',
    banner_coberturas: [
      { icono: 'shield',      texto: 'Daños propios y a terceros' },
      { icono: 'lock',        texto: 'Protección contra robo' },
      { icono: 'user-check',  texto: 'Responsabilidad civil' },
      { icono: 'truck',       texto: 'Asistencias en carretera' },
    ],
    product_types: ['Seguro de Autos'],
  },

  'Vehículos Comerciales': {
    slug:                   'vehiculos-comerciales',
    category:               'AUTOS',
    titulo_bienvenida:      'Bienvenidos a la sección de Seguros para Vehículos Comerciales',
    descripcion_subcategoria: 'Protección especializada para los vehículos que son el motor de tu negocio. Coberturas para taxis con amparo de lucro cesante, responsabilidad civil contractual para transporte de pasajeros, seguros para vans comerciales y camionetas de trabajo con asistencia jurídica incluida. HDI Colombia, Equidad Seguros, Previsora y Mundial de Seguros cuidan tu flota comercial en cada ruta.',
    frase_impacto:          'Tu negocio sobre ruedas, protegido en cada ruta.',
    banner_h1:              'Seguros para',
    banner_h2:              'Vehículos Comerciales',
    banner_image:           '../assets/banners/vehiculos-comerciales.png',
    banner_coberturas: [
      { icono: 'truck',       texto: 'Flotas comerciales' },
      { icono: 'shield',      texto: 'Responsabilidad civil' },
      { icono: 'user-check',  texto: 'Lucro cesante' },
      { icono: 'map-pin',     texto: 'Asistencia en ruta' },
    ],
    product_types: ['Todo Riesgo Taxis', 'Vehículos de Servicio Público', 'Vans Comerciales', 'Camionetas de Trabajo'],
  },

  'Vehículos Pesados': {
    slug:                   'vehiculos-pesados',
    category:               'AUTOS',
    titulo_bienvenida:      'Bienvenidos a la sección de Seguros para Vehículos Pesados',
    descripcion_subcategoria: 'Coberturas robustas para camiones, tractocamiones y vehículos de gran tonelaje que operan en carreteras nacionales. Incluye responsabilidad civil extracontractual, pérdida total o parcial por daños o hurto, asesoría jurídica en accidentes y opciones para flotas pesadas colectivas. Seguros Bolívar con su línea #322, Equidad Seguros y Mundial de Seguros protegen tu inversión en transporte de carga.',
    frase_impacto:          'Cobertura tan robusta como tu flota.',
    banner_h1:              'Seguros para',
    banner_h2:              'Vehículos Pesados',
    banner_image:           '../assets/banners/vehiculos-pesados.png',
    banner_coberturas: [
      { icono: 'truck',       texto: 'Camiones y tractocamiones' },
      { icono: 'shield',      texto: 'Pérdida total y parcial' },
      { icono: 'scale',       texto: 'Asesoría jurídica' },
      { icono: 'map',         texto: 'Cobertura nacional' },
    ],
    product_types: ['Seguro de Autos Pesados', 'Camiones', 'Tractocamiones', 'Flotas Pesadas'],
  },

  'Maquinaria y Equipos Móviles': {
    slug:                   'maquinaria-y-equipos-moviles',
    category:               'AUTOS',
    titulo_bienvenida:      'Bienvenidos a la sección de Seguros para Maquinaria y Equipos',
    descripcion_subcategoria: 'Protege tu maquinaria amarilla, retroexcavadoras, bulldozers y equipos de obra ante daños internos súbitos, colisiones, volcamientos y actos malintencionados. Coberturas para maquinaria de contratistas con recursos para reparar o reemplazar equipos afectados y asesoría de expertos para prevenir pérdidas. Seguros Bolívar y Mundial de Seguros tienen las soluciones que tu operación necesita.',
    frase_impacto:          'Tu maquinaria trabaja duro. Nosotros la protegemos.',
    banner_h1:              'Seguros para',
    banner_h2:              'Maquinaria y Equipos',
    banner_image:           '../assets/banners/maquinaria-y-equipos-moviles.png',
    banner_coberturas: [
      { icono: 'settings',    texto: 'Daños súbitos' },
      { icono: 'shield',      texto: 'Colisiones y volcamientos' },
      { icono: 'wrench',      texto: 'Reparación de equipos' },
      { icono: 'building',    texto: 'Maquinaria de obra' },
    ],
    product_types: ['Maquinaria Amarilla', 'Retroexcavadoras', 'Bulldozers', 'Maquinaria de Contratistas'],
  },

  'Movilidad Personal': {
    slug:                   'movilidad-personal',
    category:               'AUTOS',
    titulo_bienvenida:      'Bienvenidos a la sección de Seguros de Movilidad Personal',
    descripcion_subcategoria: 'Desde motos de alto cilindraje hasta bicicletas, patinetas y suscripciones de movilidad eléctrica: asegura el medio que usas cada día. Coberturas contra hurto, daños materiales, responsabilidad civil y asistencia en viaje para motociclistas, ciclistas y usuarios de transporte urbano. MAPFRE, Equidad Seguros, Qualitas Colombia, HDI Colombia y SURA Muverang tienen el plan perfecto para tu movilidad.',
    frase_impacto:          'Muévete libre. Llega siempre protegido.',
    banner_h1:              'Seguros de',
    banner_h2:              'Movilidad Personal',
    banner_image:           '../assets/banners/movilidad-personal.png',
    banner_coberturas: [
      { icono: 'bike',        texto: 'Motos y bicicletas' },
      { icono: 'shield',      texto: 'Hurto y daños' },
      { icono: 'user-check',  texto: 'Responsabilidad civil' },
      { icono: 'map-pin',     texto: 'Asistencia en viaje' },
    ],
    product_types: ['Motos', 'Bicicletas', 'Movilidad Urbana'],
  },

  'Crédito de Autos - Livianos, Públicos y Pesados': {
    slug:                   'credito-de-autos-livianos-publicos-y-pesados',
    category:               'AUTOS',
    titulo_bienvenida:      'Bienvenidos a la sección de Crédito Vehicular',
    descripcion_subcategoria: 'Pólizas todo riesgo con cláusula de beneficiario oneroso para vehículos financiados o en leasing. Protegen al banco, a la financiera y al deudor simultáneamente, garantizando que ante un siniestro la deuda quede cubierta y el activo financiado no se convierta en un pasivo.',
    frase_impacto:          'Tu crédito vehicular, respaldado desde el primer día.',
    banner_h1:              'Seguros de',
    banner_h2:              'Crédito Vehicular',
    banner_image:           '../assets/banners/credito-de-autos-livianos-publicos-y-pesados.png',
    banner_coberturas: [
      { icono: 'credit-card', texto: 'Beneficiario oneroso (banco)' },
      { icono: 'shield',      texto: 'Todo riesgo' },
      { icono: 'lock',        texto: 'Protección del crédito' },
      { icono: 'building',    texto: 'Leasing vehicular' },
    ],
    product_types: ['Crédito de Autos Pesados', 'Crédito de Autos Livianos', 'Leasing Vehicular', 'Compra de Cartera de Vehículos'],
  },

  'Pólizas Colectivas': {
    slug:                   'polizas-colectivas',
    category:               'AUTOS',
    titulo_bienvenida:      'Bienvenidos a la sección de Pólizas Colectivas de Vehículos',
    descripcion_subcategoria: 'Una sola póliza para toda la flota de tu empresa, con condiciones especiales por volumen. Coberturas para flotas convencionales, vehículos eléctricos e híbridos con asistencias especializadas para baterías, y opciones para flotas mixtas de todo tipo de motor. SURA y Qualitas Colombia ofrecen soluciones corporativas que simplifican la administración de tus pólizas vehiculares.',
    frase_impacto:          'Una sola póliza para toda tu flota. Menos trámites, más cobertura.',
    banner_h1:              'Pólizas',
    banner_h2:              'Colectivas de Vehículos',
    banner_image:           '../assets/banners/polizas-colectivas.png',
    banner_coberturas: [
      { icono: 'car',         texto: 'Flotas completas' },
      { icono: 'shield',      texto: 'Todo tipo de motor' },
      { icono: 'users',       texto: 'Condiciones especiales' },
      { icono: 'settings',    texto: 'Gestión centralizada' },
    ],
    product_types: ['Híbridos y/o Eléctricos', 'Convencionales', 'Todo Tipo de Motor'],
  },

  /* ════════ CUMPLIMIENTO ════════════════════════════════════ */

  'Entidades Estatales': {
    slug:                   'entidades-estatales',
    category:               'CUMPLIMIENTO',
    titulo_bienvenida:      'Bienvenidos a la sección de Seguros de Cumplimiento Estatal',
    descripcion_subcategoria: 'Garantiza el cumplimiento de todos tus contratos con el Estado colombiano bajo la Ley 80 de 1993. Coberturas para seriedad de la oferta, cumplimiento del contrato, manejo de anticipos, estabilidad y calidad de la obra, pago de salarios y prestaciones sociales. Seguros Bolívar, AXA Colpatria, Previsora y Seguros del Estado son las aseguradoras especializadas en el sector público.',
    frase_impacto:          'Cada contrato con el Estado, respaldado con la garantía correcta.',
    banner_h1:              'Seguros de',
    banner_h2:              'Cumplimiento Estatal',
    banner_image:           '../assets/banners/entidades-estatales.png',
    banner_coberturas: [
      { icono: 'building-2',  texto: 'Contratos Ley 80' },
      { icono: 'file-check',  texto: 'Seriedad de la oferta' },
      { icono: 'scale',       texto: 'Estabilidad de obra' },
      { icono: 'shield',      texto: 'Manejo de anticipos' },
    ],
    product_types: ['Entidades Estatales'],
  },

  'Cumplimiento Particular': {
    slug:                   'cumplimiento-particular',
    category:               'CUMPLIMIENTO',
    titulo_bienvenida:      'Bienvenidos a la sección de Cumplimiento entre Privados',
    descripcion_subcategoria: 'Protege tus contratos privados con garantías de cumplimiento entre personas naturales y empresas, sin participación del Estado. Ideal para contratos de construcción, servicios profesionales, suministros y obra privada. Seguros Bolívar, Equidad Seguros, Previsora y Mundial de Seguros respaldan tus compromisos comerciales y protegen al contratante ante incumplimientos.',
    frase_impacto:          'Tu contrato privado, blindado ante cualquier incumplimiento.',
    banner_h1:              'Seguros de',
    banner_h2:              'Cumplimiento Particular',
    banner_image:           '../assets/banners/cumplimiento-particular.png',
    banner_coberturas: [
      { icono: 'file-check',  texto: 'Contratos privados' },
      { icono: 'shield',      texto: 'Garantías de cumplimiento' },
      { icono: 'users',       texto: 'Protección al contratante' },
      { icono: 'scale',       texto: 'Asesoría jurídica' },
    ],
    product_types: ['Cumplimiento Particular'],
  },

  'Arrendamiento': {
    slug:                   'arrendamiento',
    category:               'CUMPLIMIENTO',
    titulo_bienvenida:      'Bienvenidos a la sección de Seguros de Arrendamiento',
    descripcion_subcategoria: 'Garantiza el pago oportuno de tu canon de arrendamiento incluso cuando el inquilino no puede pagar. Coberturas para viviendas y comercios hasta 400 m², con asistencia ilimitada 24/7 para emergencias en el inmueble, asesoría jurídica especializada, gestión profesional de cobranzas y respaldo para cuotas de administración y servicios públicos. SURA, MAPFRE, Seguros Bolívar y Mundial de Seguros cuidan tu inversión.',
    frase_impacto:          'Arrienda con confianza. Tu canon, garantizado.',
    banner_h1:              'Seguros de',
    banner_h2:              'Arrendamiento',
    banner_image:           '../assets/banners/arrendamiento.png',
    banner_coberturas: [
      { icono: 'home',        texto: 'Canon garantizado' },
      { icono: 'shield',      texto: 'Vivienda y comercios' },
      { icono: 'file-check',  texto: 'Asesoría jurídica' },
      { icono: 'dollar-sign', texto: 'Cuotas y servicios' },
    ],
    product_types: ['Arrendamiento'],
  },

  'Judiciales': {
    slug:                   'judiciales',
    category:               'CUMPLIMIENTO',
    titulo_bienvenida:      'Bienvenidos a la sección de Seguros Judiciales y Cauciones',
    descripcion_subcategoria: 'Cauciones y contracautelas para procesos legales activos, exigidas por jueces y tribunales colombianos. Mundial de Seguros ofrece fianzas judiciales que garantizan el cumplimiento de medidas cautelares, libertades provisionales y decisiones judiciales, respaldando tus obligaciones legales con la solvencia de una aseguradora reconocida.',
    frase_impacto:          'Respaldo jurídico cuando el proceso lo exige.',
    banner_h1:              'Seguros',
    banner_h2:              'Judiciales y Cauciones',
    banner_image:           '../assets/banners/judiciales.png',
    banner_coberturas: [
      { icono: 'scale',       texto: 'Cauciones judiciales' },
      { icono: 'file-check',  texto: 'Medidas cautelares' },
      { icono: 'shield',      texto: 'Fianzas y contracautelas' },
      { icono: 'briefcase',   texto: 'Libertades provisionales' },
    ],
    product_types: ['Judiciales'],
  },

  /* ════════ GENERALES ════════════════════════════════════════ */

  'Empresas y/o Persona Natural': {
    slug:                   'empresas-o-persona-natural',
    category:               'GENERALES',
    titulo_bienvenida:      'Bienvenidos a la sección de Seguros para Empresas y Personas',
    descripcion_subcategoria: 'Protege tu empresa o actividad profesional ante los riesgos que más importan: daños a terceros, incendio, robo, fraude de empleados, ciberataques, rotura de maquinaria y responsabilidad civil extracontractual. Desde microseguros para pequeños negocios hasta coberturas ALL RISK corporativas para grandes empresas. Seguros Bolívar, MAPFRE, Previsora y más de 6 aseguradoras tienen la solución para tu tamaño de empresa.',
    frase_impacto:          'Porque un error no debería costarte todo lo que has construido.',
    banner_h1:              'Seguros para',
    banner_h2:              'Empresas y Personas',
    banner_image:           '../assets/banners/empresas-o-persona-natural.png',
    banner_coberturas: [
      { icono: 'building-2',  texto: 'RC empresarial' },
      { icono: 'shield',      texto: 'Daños materiales' },
      { icono: 'users',       texto: 'Persona natural' },
      { icono: 'briefcase',   texto: 'Microseguros y ALL RISK' },
    ],
    product_types: ['Empresas', 'Persona Natural', 'Todo Tipo'],
  },

  'Pólizas de Hogar': {
    slug:                   'polizas-de-hogar',
    category:               'GENERALES',
    titulo_bienvenida:      'Bienvenidos a la sección de Seguros para el Hogar',
    descripcion_subcategoria: 'Protege tu casa o apartamento y todo lo que hay dentro con coberturas multirriesgo que incluyen incendio, terremoto, robo, daños por agua, responsabilidad civil y asistencia domiciliaria 24/7. Desde planes esenciales hasta coberturas integrales que protegen también a tu mascota y a tus empleados del hogar. SURA, MAPFRE, AXA Colpatria, Seguros Bolívar, Previsora y HDI Colombia tienen el plan que tu hogar necesita.',
    frase_impacto:          'Tu hogar es tu mayor patrimonio. Protégelo como merece.',
    banner_h1:              'Seguros de',
    banner_h2:              'Hogar y Patrimonio',
    banner_image:           '../assets/banners/polizas-de-hogar.png',
    banner_coberturas: [
      { icono: 'home',        texto: 'Incendio y terremoto' },
      { icono: 'shield',      texto: 'Robo y daños por agua' },
      { icono: 'user-check',  texto: 'Responsabilidad civil' },
      { icono: 'phone',       texto: 'Asistencia domiciliaria 24/7' },
    ],
    product_types: ['Pólizas de Hogar'],
  },

  'Pólizas Todo Riesgo Construcción': {
    slug:                   'polizas-todo-riesgo-construccion',
    category:               'GENERALES',
    titulo_bienvenida:      'Bienvenidos a la sección de Seguros Todo Riesgo Construcción',
    descripcion_subcategoria: 'Protege tu obra desde el primer pico hasta la entrega final. Coberturas para pérdidas o daños súbitos durante la construcción, incluyendo fenómenos naturales, sociales y daños a equipos. Seguros Bolívar, Equidad Seguros, Previsora y Mundial de Seguros brindan los recursos necesarios para reparar lo afectado y garantizar la continuidad de tu proyecto sin interrupciones.',
    frase_impacto:          'Protege tu obra desde el primer día hasta la entrega.',
    banner_h1:              'Seguros',
    banner_h2:              'Todo Riesgo Construcción',
    banner_image:           '../assets/banners/polizas-todo-riesgo-construccion.png',
    banner_coberturas: [
      { icono: 'building-2',  texto: 'Daños en construcción' },
      { icono: 'shield',      texto: 'Fenómenos naturales' },
      { icono: 'wrench',      texto: 'Equipos de obra' },
      { icono: 'user-check',  texto: 'Responsabilidad civil' },
    ],
    product_types: ['Pólizas Todo Riesgo Construcción'],
  },

  'Responsabilidad Civil Profesional': {
    slug:                   'responsabilidad-civil-profesional',
    category:               'GENERALES',
    titulo_bienvenida:      'Bienvenidos a la sección de Responsabilidad Civil Profesional',
    descripcion_subcategoria: 'Protege tu patrimonio y el de tus pacientes o clientes ante reclamaciones por errores, omisiones o negligencias en el ejercicio de tu profesión. Pólizas E&O bajo modalidad Claims Made para médicos, odontólogos, abogados, contadores, arquitectos y directivos. MAPFRE, Seguros Bolívar y Mundial de Seguros tienen coberturas especializadas que incluyen gastos de defensa legal.',
    frase_impacto:          'Ejerce tu profesión con confianza. Nosotros cubrimos los errores.',
    banner_h1:              'Seguros de',
    banner_h2:              'RC Profesional',
    banner_image:           '../assets/banners/responsabilidad-civil-profesional.png',
    banner_coberturas: [
      { icono: 'user-check',  texto: 'Errores y omisiones' },
      { icono: 'shield',      texto: 'Claims Made' },
      { icono: 'scale',       texto: 'Gastos de defensa legal' },
      { icono: 'briefcase',   texto: 'Médicos, abogados y más' },
    ],
    product_types: ['RC Profesional'],
  },

  'Transporte de Mercancías': {
    slug:                   'transporte-de-mercancias',
    category:               'GENERALES',
    titulo_bienvenida:      'Bienvenidos a la sección de Seguros de Transporte de Mercancías',
    descripcion_subcategoria: 'Tu carga protegida desde el origen hasta el destino, sin importar el medio de transporte: terrestre, aéreo, marítimo, fluvial o férreo. Seguros Bolívar ofrece el Programa Global de Logística para gestionar riesgos en toda la cadena de suministro, con línea Express para siniestros de hasta 10 millones. AXA Colpatria y Mundial de Seguros también cubren tus mercancías en rutas nacionales e internacionales.',
    frase_impacto:          'Tu mercancía parte protegida y llega protegida.',
    banner_h1:              'Seguros de',
    banner_h2:              'Transporte de Mercancías',
    banner_image:           '../assets/banners/transporte-de-mercancias.png',
    banner_coberturas: [
      { icono: 'truck',       texto: 'Terrestre, aéreo, marítimo' },
      { icono: 'shield',      texto: 'Pérdida y daño de carga' },
      { icono: 'package',     texto: 'Cadena de suministro' },
      { icono: 'map-pin',     texto: 'Rutas nacionales e internacionales' },
    ],
    product_types: ['Transporte de Mercancías'],
  },

  'Educativa': {
    slug:                   'educativa',
    category:               'GENERALES',
    titulo_bienvenida:      'Bienvenidos a la sección de Seguros Educativos',
    descripcion_subcategoria: 'Asegura la continuidad educativa de tus hijos y protege la infraestructura de tu institución. Seguros de renta educativa de SURA y MAPFRE garantizan el pago de la matrícula y gastos escolares si los padres fallecen o quedan incapacitados, mientras que las pólizas patrimoniales protegen las instalaciones físicas de colegios e institutos ante daños y siniestros.',
    frase_impacto:          'La educación de tus hijos, protegida ante cualquier imprevisto.',
    banner_h1:              'Seguros',
    banner_h2:              'Educativos',
    banner_image:           '../assets/banners/educativa.png',
    banner_coberturas: [
      { icono: 'graduation-cap', texto: 'Renta educativa' },
      { icono: 'shield',         texto: 'Continuidad escolar' },
      { icono: 'heart',          texto: 'Fallecimiento e incapacidad' },
      { icono: 'building',       texto: 'Infraestructura educativa' },
    ],
    product_types: ['Educativa'],
  },

  'Pólizas de Copropiedades': {
    slug:                   'polizas-de-copropiedades',
    category:               'GENERALES',
    titulo_bienvenida:      'Bienvenidos a la sección de Seguros para Copropiedades',
    descripcion_subcategoria: 'Protección obligatoria para las zonas comunes de tu conjunto residencial o edificio bajo Ley 675 de propiedad horizontal. Seguros Bolívar cubre daños por incendio, robo con violencia, equipos electrónicos, responsabilidad civil ante terceros y ofrece asistencia en plomería, cerrajería y gas, más asesoría jurídica y gestión en línea a través del portal de clientes.',
    frase_impacto:          'Las zonas comunes de tu conjunto, protegidas como lo exige la ley.',
    banner_h1:              'Seguros de',
    banner_h2:              'Copropiedades',
    banner_image:           '../assets/banners/polizas-de-copropiedades.png',
    banner_coberturas: [
      { icono: 'building',    texto: 'Zonas comunes Ley 675' },
      { icono: 'shield',      texto: 'Incendio y robo' },
      { icono: 'users',       texto: 'RC ante terceros' },
      { icono: 'wrench',      texto: 'Asistencia domiciliaria' },
    ],
    product_types: ['Pólizas de Copropiedades'],
  },

  'Pólizas Todo Riesgo Montaje': {
    slug:                   'polizas-todo-riesgo-montaje',
    category:               'GENERALES',
    titulo_bienvenida:      'Bienvenidos a la sección de Seguros Todo Riesgo Montaje',
    descripcion_subcategoria: 'Cobertura especializada para la instalación y puesta en marcha de maquinaria industrial fija, desde la llegada de las partes hasta los períodos de prueba. Seguros Bolívar protege contra daños súbitos durante el montaje, con visitas programadas para identificar riesgos y recursos económicos para reparar equipos afectados antes de que entren en operación comercial.',
    frase_impacto:          'Del primer tornillo a la puesta en marcha, tu inversión protegida.',
    banner_h1:              'Seguros',
    banner_h2:              'Todo Riesgo Montaje',
    banner_image:           '../assets/banners/polizas-todo-riesgo-montaje.png',
    banner_coberturas: [
      { icono: 'settings',    texto: 'Instalación de maquinaria' },
      { icono: 'shield',      texto: 'Daños durante montaje' },
      { icono: 'wrench',      texto: 'Períodos de prueba' },
      { icono: 'layers',      texto: 'Puesta en marcha' },
    ],
    product_types: ['Pólizas Todo Riesgo Montaje'],
  },

};

/* ── Lookup por slug ───────────────────────────────────────── */
const GOBERNANZA_BY_SLUG = {};
Object.values(GOBERNANZA_MAP).forEach(g => {
  if (g.slug) GOBERNANZA_BY_SLUG[g.slug] = g;
});

/* ── Default badges por categoría ─────────────────────────── */
const DEFAULT_BADGES = {
  VIDA:         ['Cobertura amplia', 'Sin costo de asesoría', 'Múltiples aseguradoras', 'Cotización gratis', 'Respaldo inmediato'],
  AUTOS:        ['Asistencia 24/7', 'Vehículo de reemplazo', 'Sin costo de asesoría', 'Múltiples aseguradoras', 'Cotización gratis'],
  CUMPLIMIENTO: ['Garantías legales', 'Asesoría jurídica', 'Sin costo de asesoría', 'Respaldo inmediato', 'Cotización gratis'],
  GENERALES:    ['Cobertura multirriesgo', 'Asistencia 24/7', 'Sin costo de asesoría', 'Múltiples aseguradoras', 'Cotización gratis'],
};

/* ── Quick chips de Mili por subcategoría ─────────────────── */
const MILI_CHIPS = {
  'Vehículos Particulares':  ['¿Qué cubre exactamente?', '¿Cuánto cuesta aproximadamente?', 'Tengo el carro financiado', 'Quiero cotizar ahora'],
  'Individual':              ['¿Qué cubre en caso de fallecimiento?', '¿Hay coberturas por enfermedad?', 'Busco proteger a mi familia', 'Quiero cotizar ahora'],
  'Pólizas de Hogar':        ['¿Qué cubre exactamente?', 'Es para apartamento arrendado', 'Es para casa propia', 'Quiero cotizar ahora'],
  'default':                 ['¿Qué coberturas tiene?', '¿Cuánto cuesta?', 'Quiero comparar opciones', 'Hablar con un asesor'],
};

/* ── Mapa subcategoría → URL slug (para mega-menu hrefs) ─── */
const SLUG_MAP = {};
SUBCATEGORY_MAP.forEach(s => { SLUG_MAP[s.name] = `/${s.slug}/`; });
// Alias para nombres ligeramente diferentes en el navbar del home
SLUG_MAP['Pólizas de Salud'] = '/polizas-de-salud-y-medicina-prepagada/';
SLUG_MAP['Gastos Emergentes'] = '/individual/';
SLUG_MAP['Viajes Internacionales'] = '/polizas-de-asistencia-en-viajes-internacionales/';
SLUG_MAP['Crédito de Autos'] = '/credito-de-autos-livianos-publicos-y-pesados/';
SLUG_MAP['RC Profesional'] = '/responsabilidad-civil-profesional/';
SLUG_MAP['Todo Riesgo Construcción'] = '/polizas-todo-riesgo-construccion/';
SLUG_MAP['Todo Riesgo Montaje'] = '/polizas-todo-riesgo-montaje/';
SLUG_MAP['RC Hidrocarburos'] = '/responsabilidad-civil-profesional/';
SLUG_MAP['RCE Derivado de Cumplimiento'] = '/cumplimiento-particular/';
SLUG_MAP['Disposiciones Legales'] = '/entidades-estatales/';
// Category landing page routes
SLUG_MAP['Vida']         = '/vida/';
SLUG_MAP['Autos']        = '/autos/';
SLUG_MAP['Cumplimiento'] = '/cumplimiento/';
SLUG_MAP['Generales']    = '/generales/';

/* ── Navbar + mega-menu wiring (runs on every page) ──────── */
document.addEventListener('DOMContentLoaded', () => {
  // Rewrite #vida/#autos/etc. → category landing pages
  const CATEGORY_HREFS = {
    '#vida': '/vida/', '#autos': '/autos/',
    '#cumplimiento': '/cumplimiento/', '#generales': '/generales/',
  };
  document.querySelectorAll('.nav-menu .has-dropdown > a').forEach(a => {
    const target = CATEGORY_HREFS[a.getAttribute('href')];
    if (target) a.href = target;
  });
  // Wire mega-menu subcategory titles to their subpages
  document.querySelectorAll('.mega-menu-title').forEach(el => {
    const url = SLUG_MAP[el.textContent.trim()];
    if (url) el.addEventListener('click', () => { window.location.href = url; });
  });
});
