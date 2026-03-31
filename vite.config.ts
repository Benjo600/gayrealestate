import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [
    react(),
    sitemap({
      hostname: 'https://www.gayrealestateconnecticut.com',
      dynamicRoutes: [
        '/', 
        '/about', 
        '/blog', 
        '/agents', 
        '/buyers-guide', 
        '/sellers-guide', 
        '/first-time-buyers', 
        '/home-valuation', 
        '/relocation', 
        '/marketing', 
        '/mortgage-calculator', 
        '/reviews'
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});

