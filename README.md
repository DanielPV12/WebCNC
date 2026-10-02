# CNC Tijuana Automotriz

    npm install
    cp .env.example .env   # configura el correo
    npm run dev

Datos del sitio (teléfono, máquinas, materiales, proyectos): `src/data/site.ts`.
Los bloques `.ph` son placeholders: cámbialos por `<img>` (fotos en `public/`).

## Formulario por correo
`src/pages/api/contact.ts` envía el correo con adjuntos usando SMTP (variables en `.env`).
Con Gmail usa una *contraseña de aplicación*. Producción: `npm run build && node dist/server/entry.mjs`
en un hosting con Node (Railway, Render, VPS). No funciona en GitHub Pages (es solo estático).
