import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ViteTsconfigPaths from 'vite-tsconfig-paths'
import * as path from 'path';
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
      react(),
      ViteTsconfigPaths(),
      dts()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'), // Entry point for your package
      name: 'react-datapainter', // The global variable name for UMD builds
      fileName: (format) => `react-datapainter.${format}.js`, // Output filename format
    },
    rollupOptions: {
      // Ensure to externalize dependencies that shouldn't be bundled
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
