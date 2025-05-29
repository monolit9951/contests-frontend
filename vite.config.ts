import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import * as path from "node:path";

export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    return defineConfig({
        plugins: [
            react(),
            svgr({
                include: ['**/*.svg?react', "**/*.webp?react", '**/*.png?react', '**/*.jpg?react'],
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
        server: {
            port: 3000,
            host: env.VITE_HOST || 'localhost',
        },
    })
}
