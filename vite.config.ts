import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sitemap from 'vite-plugin-sitemap';

import { BLOG_POSTS } from './data/blogs';
import { agents } from './data/agents';

const blogRoutes = BLOG_POSTS.map(post => `/blog/${post.slug}`);
const agentRoutes = Object.keys(agents).map(id => `/agent/${id}`);

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
        '/reviews',
        ...blogRoutes,
        ...agentRoutes
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});

