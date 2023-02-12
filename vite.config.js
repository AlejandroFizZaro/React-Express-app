import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // En mi caso, tengo dos proxis: '/login' y '/api'
      // Login para hacer fetch del Token
      '/login': {
        target: "https://localhost:1443",
        secure:false,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/login/, ''),
      },
      // Api para hacer peticiones de Usuarios, Profesores, Alumnos...
      '/api': {
        target: "https://localhost:1443",
        secure:false,
        changeOrigin: true,
      }
    }
  }
})
