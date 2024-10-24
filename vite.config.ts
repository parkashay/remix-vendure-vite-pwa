import { vitePlugin as remix } from '@remix-run/dev';
import { installGlobals } from '@remix-run/node';
import { defineConfig } from 'vite';
import { remixPWA } from '@remix-pwa/dev';
import path from 'path';

installGlobals();

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    remix({
      ignoredRouteFiles: ['**/.*'],
    }),
    remixPWA(),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'app'), // Alias `~` to the `src` folder
    },
  },
});
