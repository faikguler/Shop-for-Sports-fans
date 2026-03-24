import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

const backendPort = process.env.PORT || 5000

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/uploads': `http://localhost:${backendPort}`,
      '/api': `http://localhost:${backendPort}`
    }
  }
})