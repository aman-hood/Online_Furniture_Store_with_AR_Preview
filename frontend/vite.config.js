import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,

    // ✅ allow ngrok host
    allowedHosts: [
      'capiteaux-archie-zincographic.ngrok-free.dev',
    ],

    // ✅ proxy backend through same ngrok URL
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
