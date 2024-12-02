import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Send all requests through /graphql to the Express 3333 port
  server: {
    proxy: {
      '/graphql': {
        target: 'http://localhost:3333'
      }
    }
  }
})
