import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/meeting-timer/',
  server: {
    host: '0.0.0.0',
    hmr: {
      clientPort: 443
    },
    allowedHosts: ['*']
  }
}) 