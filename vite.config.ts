import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import * as path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: ['**/*.svg?react'],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
      app: path.resolve(__dirname, 'src/app'),
      entities: path.resolve(__dirname, 'src/entities'),
      features: path.resolve(__dirname, 'src/features'),
      pages: path.resolve(__dirname, 'src/pages'),
      shared: path.resolve(__dirname, 'src/shared'),
      widgets: path.resolve(__dirname, 'src/widgets'),
    },
  },
  // define: {
  //   global: 'window',
  // },
  server: {
    port: 3000,
  }
})
