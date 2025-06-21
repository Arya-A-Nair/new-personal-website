import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/',
    publicDir: 'public',
    css: {
        postcss: './postcss.config.js',
        modules: {
            localsConvention: 'camelCaseOnly',
            generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
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