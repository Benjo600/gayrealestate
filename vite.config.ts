import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Sitemap is managed manually via public/sitemap.xml
// (includes changefreq, priority, and lastmod values)

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: true,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});

