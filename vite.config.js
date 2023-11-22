import { defineConfig } from 'vite';
import path from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  root: 'src',
  server: {
    host: true, // IPアドレス有効化
    open: true,
    port: 8080,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    minify: true,
    rollupOptions: {
      // https://rollupjs.org/configuration-options/
      input: 'src/index.html',
      output: {
        entryFileNames: `js/[name].js`,
        chunkFileNames: `js/[name].js`,
        assetFileNames: (assetInfo) => {
          // if (/\.(gif|jpe?g|png|svg|webp|)$/.test(assetInfo.name)) {
          //   return 'assets/img/[name].[ext]';
          // }
          if (/\.css$/.test(assetInfo.name)) {
            return 'assets/css/[name].[ext]';
          }
          return 'assets/[name].[ext]';
        },
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, 'src/partials'),
    }),
  ],
});
