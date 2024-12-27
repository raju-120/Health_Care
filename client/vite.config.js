import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api' : {
        // target: 'https://health-care-server-0t0x.onrender.com',
        target: 'http://localhost:5000',
        secure: true,
      },
    },
  },
  plugins: [react()],
})
