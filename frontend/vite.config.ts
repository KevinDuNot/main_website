import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [tailwindcss(), sveltekit()],
    server: {
        proxy: {
            // '/api': {
            //     // http://52.63.52.28:8000
            //     target: 'http://localhost:8000',
            //     changeOrigin: true,
            //     secure: false,
            // }
        }
    }
});