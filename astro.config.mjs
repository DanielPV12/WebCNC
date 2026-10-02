import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// Solo /api/contact corre en servidor; el resto del sitio se genera estático.
export default defineConfig({
  adapter: node({ mode: 'standalone' }),
  // Formulario público sin sesiones: no hay nada que proteger con la verificación de origen.
  security: { checkOrigin: false },
  vite: { plugins: [tailwindcss()] },
});
