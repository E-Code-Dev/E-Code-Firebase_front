import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@images': path.resolve(__dirname, '/src/assets/images'),
      '@styles': path.resolve(__dirname, '/src/assets/styles'),
      '@components': path.resolve(__dirname, '/src/components'),
      '@containers': path.resolve(__dirname, '/src/containers'),
      '@contexts': path.resolve(__dirname, '/src/contexts'),
      '@interfaces': path.resolve(__dirname, '/src/interfaces'),
      '@lib': path.resolve(__dirname, '/src/lib'),
      '@pages': path.resolve(__dirname, '/src/pages')
    }
  },
  plugins: [react()]
})
