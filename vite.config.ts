import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), splitVendorChunkPlugin()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: true,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1000, // Ajusta o limite de aviso para 1000KB
    rollupOptions: {
      output: {
        manualChunks: {
          // Separa o React e suas dependências
          react: ['react', 'react-dom', 'react-router-dom'],
          // Separa bibliotecas UI
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-slot'],
          // Separa bibliotecas de utilidades
          utils: ['date-fns', 'zod', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          // Separa bibliotecas de gráficos (se houver)
          charts: ['recharts', 'd3-shape', 'd3-scale'],
          // Separa o Socket.IO (se estiver usando)
          socket: ['socket.io-client'],
        },
      },
    },
  },
  preview: {
    port: 3000,
    host: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}))
