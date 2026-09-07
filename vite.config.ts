import dotenv from 'dotenv';
import express from 'express';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {apiRouter} from './server/api';

// Load server-only secrets (RESEND_API_KEY, MONGODB_URI, ADMIN_SECRET_KEY) from
// .env.local or .env. These are NOT prefixed with VITE_, so Vite never exposes
// them to the browser bundle.
dotenv.config({path: '.env.local'});
dotenv.config();

// Mounts our small Express API (server/api.ts) directly inside Vite's own
// dev server, so `npm run dev` starts both the website and the OTP backend
// with a single command — no second terminal needed.
function otpApiPlugin(): Plugin {
  return {
    name: 'otp-api-middleware',
    configureServer(server) {
      const app = express();
      app.use('/api', apiRouter);
      server.middlewares.use(app);
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), otpApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: true as const,
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
