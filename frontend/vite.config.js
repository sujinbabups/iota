import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Load environment variables from .env files
const backendUrl = process.env.VITE_API_URL;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: backendUrl, 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
