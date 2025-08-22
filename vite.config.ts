import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import * as path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: ['**/*.svg?react', "**/*.webp?react", '**/*.png?react', '**/*.jpg?react',]
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, '/src'),
      app: '/src/app',
      entities: '/src/entities',
      features: '/src/features',
      pages: '/src/pages',
      shared: '/src/shared',
      widgets: '/src/widgets',
    },
  },
  define: {
    global: 'window', // <-- добавляем полифилл для global
  },
  server: {
    port: 3000,
  }
})
