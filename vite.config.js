/* eslint-disable import/no-extraneous-dependencies */
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslint(),
    vitePluginFaviconsInject('src/img/Tuck_128.png'),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },
});
