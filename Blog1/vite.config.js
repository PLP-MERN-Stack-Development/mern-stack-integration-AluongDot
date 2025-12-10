import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Enable Tailwind 4.1
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 5173,
    host: true, // Listen on all addresses
    strictPort: false, // Allow fallback ports
    open: true, // Auto open browser
  },
  preview: {
    port: 5173,
    strictPort: false,
  },
  base: '/', // Ensure assets are loaded from root path
})
