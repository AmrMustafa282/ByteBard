import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
 server: {
  proxy: {
   "/api": {
    // target: "http://localhost:3000",
    target: "https://bytebard-hfri.onrender.com",
    changeOrigin: true, // Add this line if necessary
    secure: true,
   },
  },
 },
 plugins: [react()],
});
