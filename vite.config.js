import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: mode === 'production' ? undefined : {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false, // set false for local/dev HTTP or self-signed certs
        rewrite: (path) => path.replace(/^\/api/, ''), // /api/recipients/stars -> /recipients/stars
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('Proxying request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('Received response:', proxyRes.statusCode, 'for', req.url);
          });
        }
      }
    }
  }
}))
