import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    hmr: {
      clientPort: 443
    },
    allowedHosts: ['*', 'c1c3f079-d171-45b5-b431-aad119954506-00-1pi05obdcz2kl.spock.replit.dev']
  }
}) 