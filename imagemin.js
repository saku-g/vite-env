import imagemin from 'imagemin-keep-folder';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';
import imageminWebp from 'imagemin-webp';

/**
 * 画像圧縮後、webpを生成します
 */

const srcDir = 'src/assets/img';
const outDir = 'public/assets/img';

imagemin([`${srcDir}/**/*.{jpg,jpeg,png,gif,svg}`], {
  plugins: [imageminMozjpeg(), imageminPngquant(), imageminGifsicle(), imageminSvgo()],
  replaceOutputDir: (output) => {
    return output.replace(/img\//, `../../${outDir}/`);
  },
})
  .then(() => {
    imagemin([`${outDir}/**/*.{jpg,jpeg,png}`], {
      plugins: [imageminWebp()],
    });
    console.log('Images optimized and WebP images generated successfully!');
  })
  .catch((error) => {
    console.error('Error optimizing images:', error);
  });
