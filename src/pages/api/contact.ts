import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

const ALLOWED = ['pdf', 'dwg', 'dxf', 'step', 'stp', 'iges', 'igs', 'stl'];
const MAX_FILE = 10 * 1024 * 1024; // 10 MB por archivo
const MAX_FILES = 3;

const env = (k: string) => process.env[k] ?? (import.meta.env as Record<string, string>)[k];
const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ');

export const POST: APIRoute = async ({ request }) => {
  let data: FormData;
  try { data = await request.formData(); } catch { return json({ error: 'Solicitud inválida.' }, 400); }

  if (data.get('website')) return json({ ok: true }); // honeypot anti-spam

  const s = (k: string) => String(data.get(k) ?? '').trim().slice(0, 3000);
  const nombre = oneLine(s('nombre')), email = oneLine(s('email'));
  const telefono = oneLine(s('telefono')), material = oneLine(s('material')), mensaje = s('mensaje');

  if (!nombre || !mensaje || !/^\S+@\S+\.\S+$/.test(email))
    return json({ error: 'Revisa nombre, correo y descripción.' }, 400);

  const files = data.getAll('planos').filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) return json({ error: `Máximo ${MAX_FILES} archivos.` }, 400);
  for (const f of files) {
    const ext = f.name.split('.').pop()?.toLowerCase() ?? '';
    if (!ALLOWED.includes(ext)) return json({ error: `Formato no permitido: ${f.name}` }, 400);
    if (f.size > MAX_FILE) return json({ error: `${f.name} pesa más de 10 MB.` }, 400);
  }

  const host = env('SMTP_HOST'), user = env('SMTP_USER'), pass = env('SMTP_PASS'), to = env('CONTACT_TO');
  if (!host || !user || !pass || !to) return json({ error: 'El correo no está configurado.' }, 500);

  try {
    const transporter = nodemailer.createTransport({
      host, port: Number(env('SMTP_PORT') || 465), secure: Number(env('SMTP_PORT') || 465) === 465,
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: `"Sitio web" <${user}>`,
      to,
      replyTo: email,
      subject: `Nueva cotización de ${nombre}`,
      text: [
        `Nombre: ${nombre}`, `Correo: ${email}`, `Teléfono: ${telefono || '—'}`,
        `Material: ${material || 'Sin definir'}`, '', mensaje,
      ].join('\n'),
      attachments: await Promise.all(files.map(async (f) => ({
        filename: f.name.replace(/[^\w.\- ]/g, '_'),
        content: Buffer.from(await f.arrayBuffer()),
      }))),
    });
    return json({ ok: true });
  } catch (e) {
    console.error('Error enviando correo:', e);
    return json({ error: 'No pudimos enviar el mensaje. Intenta por WhatsApp.' }, 500);
  }
};
