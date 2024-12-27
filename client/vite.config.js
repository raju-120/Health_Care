import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api' : {
        target: 'http://localhost:5000',
        // target: 'https://health-care-server-3bv5.onrender.com/api',
        secure: true,
      },
    },
  },
  plugins: [react()],
})
