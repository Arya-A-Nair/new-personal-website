import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
    },
    server: {
        port: 3000,
        open: true,
    },
    preview: {
        port: 3000,
        open: true,
    },
    define: {
        global: 'globalThis',
    },
}) 