import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            Api: '/src/api',
            Assets: '/src/assets',
            Components: '/src/components',
            Hooks: '/src/hooks',
            Pages: '/src/pages',
            Store: '/src/Store',
            Types: '/src/types',
            Utils: '/src/utils',
        },
    },
});
