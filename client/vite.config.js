import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Combined Vite configuration
export default defineConfig({
  plugins: [react()], // Include the React plugin

  // Additional configurations
  resolve: {
    alias: {
      // Add your path aliases if needed
    },
  },
  
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Display all Rollup warnings
        console.warn(warning.message);
      },
    },
  },
});
