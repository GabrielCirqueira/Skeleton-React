import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src'),
    },
  },
    server: {
    host: "0.0.0.0",
    cors: true,
    port: 5175,
    hmr: {
      host: "localhost",
    },
  },
})
