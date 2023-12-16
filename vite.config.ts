import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            Api: '/src/Api',
            Assets: '/src/Assets',
            Components: '/src/Components',
            Hooks: '/src/Hooks',
            Pages: '/src/Pages',
            Store: '/src/Store',
            Types: '/src/Types',
            Utils: '/src/Utils',
        },
    },
});
