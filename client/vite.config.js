import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure the output directory matches the Netlify settings
    rollupOptions: {
      onwarn(warning, warn) {
        console.warn(warning.message);
      },
    },
  },
});
