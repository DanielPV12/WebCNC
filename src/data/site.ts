export const site = {
  name: 'CNC Tijuana',
  tagline: 'Automotriz',
  phone: '+52 664 836 4004',        // TODO: número real
  whatsapp: '526648364004',         // formato internacional, sin + ni espacios
  email: 'contacto@ejemplo.com',    // TODO
  address: 'Calle Maquinistas 123, Tijuana, B.C.', // TODO
};

export const nav = [
  ['Máquinas', '#maquinas'], ['Materiales', '#materiales'],
  ['Proyectos', '#proyectos'], ['Proceso', '#proceso'],
] as const;

export const machines = [
  { name: 'Centros de maquinado de 3 ejes', desc: 'Piezas prismáticas, soportes, placas y moldes en series cortas o largas.', cap: 'Área de trabajo: por definir' },
  { name: 'Maquinado de 4 y 5 ejes', desc: 'Geometrías complejas en una sola sujeción: carcasas, impulsores, prototipos.', cap: 'Área de trabajo: por definir' },
  { name: 'Torno CNC', desc: 'Flechas, bujes, poleas y piezas de revolución con tolerancias cerradas.', cap: 'Diámetro máximo: por definir' },
  { name: 'Torno y fresadora convencional', desc: 'Reparaciones, refacciones descontinuadas y trabajos únicos.', cap: 'Capacidad: por definir' },
  { name: 'Grabado láser', desc: 'Marcado de números de parte, logotipos y series sobre metal y plástico.', cap: 'Área de grabado: por definir' },
];

export const materials = [
  { name: 'Aluminio', grades: '6061, 7075', use: 'Ligero y maquinable. Soportes, adaptadores, prototipos.' },
  { name: 'Aceros', grades: '1018, 4140, D2', use: 'Resistencia y desgaste. Flechas, engranes, herramentales.' },
  { name: 'Delrin / Acetal', grades: 'Natural y negro', use: 'Baja fricción. Bujes, guías, aislantes.' },
  { name: 'PEEK', grades: 'Grado técnico', use: 'Alta temperatura y química. Piezas especiales.' },
  { name: 'Latón y bronce', grades: 'Según pedido', use: 'Bujes, conectores y piezas de desgaste.' },
  { name: 'Acabados', grades: 'Anodizado, galvanizado', use: 'Protección contra corrosión y acabado estético.' },
];

export const projects = [
  { title: 'Soporte de motor', cat: 'Automotriz', mat: 'Aluminio 6061' },
  { title: 'Polea personalizada', cat: 'Automotriz', mat: 'Aluminio 7075' },
  { title: 'Adaptador de brida', cat: 'Automotriz', mat: 'Acero 1018' },
  { title: 'Carcasa de prototipo', cat: 'Industrial', mat: 'Aluminio 6061' },
  { title: 'Buje de baja fricción', cat: 'Industrial', mat: 'Delrin' },
  { title: 'Refacción descontinuada', cat: 'Refacciones', mat: 'Acero 4140' },
];

export const steps = [
  ['Envía tu plano', 'Sube un CAD o PDF, o una pieza de muestra.'],
  ['Recibe tu cotización', 'Precio y tiempo de entrega por escrito.'],
  ['Fabricación', 'Maquinado e inspección dimensional.'],
  ['Entrega', 'Recoges en taller o te la enviamos.'],
] as const;
