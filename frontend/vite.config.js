import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { baseUri } from './uri'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/api': {
        target: `${baseUri}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },

    }
  }
})