import { defineConfig } from 'vite';
import path from 'path';
import globule from 'globule';
import handlebars from 'vite-plugin-handlebars';
import sassGlobImports from 'vite-plugin-sass-glob-import';
import siteData from './src/data/siteData.json';
import articleData from './src/data/articleData.json';

/**
 * htmlファイルを配列で取得して、以下の形式でオブジェクトに変換
 * { index: 'src/index.html', filename: 'src/filename.html', ... }
 */
const htmlFiles = globule.find('src/**/*.html', {
  ignore: ['src/**/_*.html'],
});
const pageObject = Object.fromEntries(
  htmlFiles.map((filePath) => {
    const key = filePath.split('/').slice(-1)[0].replace('.html', '');
    return [key, filePath];
  }),
);

// https://ja.vitejs.dev/config/
export default defineConfig({
  root: 'src',
  publicDir: '../public',
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
      input: pageObject,
      output: {
        entryFileNames: `assets/js/[name].js`,
        chunkFileNames: `assets/js/[name].js`,
        assetFileNames: (assetInfo) => {
          console.log(assetInfo.name);
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
      /* eslint-env node */
      partialDirectory: path.resolve(__dirname, './src/partials'),
      context: (pagePath) => {
        return {
          ...siteData[pagePath],
          ...articleData,
        };
      },
    }),
    sassGlobImports(),
  ],
});
