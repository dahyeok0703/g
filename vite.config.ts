import { defineConfig, type PluginOption, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

/**
 * Dev-only middleware that mounts the serverless functions in `/api`
 * (ai.ts, image.ts) so the same handlers run locally without a separate
 * Express server. In production (Vercel/Netlify) these files are deployed
 * as functions and this plugin is irrelevant.
 *
 * Keys (ANTHROPIC_API_KEY, IMAGE_SEARCH_KEY, ...) stay server-side here —
 * they are never bundled into the client.
 */
function apiMiddleware(): PluginOption {
  return {
    name: 'fitday-api-middleware',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      const mount = (route: string, file: string) => {
        server.middlewares.use(route, async (req, res) => {
          try {
            const mod = await server.ssrLoadModule(file);
            await mod.default(req, res);
          } catch (err) {
            server.config.logger.error(`[api] ${route} failed: ${String(err)}`);
            if (!res.headersSent) {
              res.statusCode = 500;
              res.setHeader('content-type', 'application/json');
            }
            res.end(JSON.stringify({ error: 'api_handler_error' }));
          }
        });
      };
      mount('/api/ai', path.resolve(__dirname, 'api/ai.ts'));
      mount('/api/image', path.resolve(__dirname, 'api/image.ts'));
    },
  };
}

export default defineConfig({
  plugins: [react(), apiMiddleware()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: { port: 5173 },
});
