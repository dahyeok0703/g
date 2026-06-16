import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  // host:true lets the dev server be reachable from the sandbox preview proxy
  // (StackBlitz/CodeSandbox); strictPort:false lets it fall back if taken.
  server: { host: true, port: 5173, strictPort: false },
});
