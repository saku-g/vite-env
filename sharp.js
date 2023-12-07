import fs from 'fs';
import path from 'path';
import globule from 'globule';
import sharp from 'sharp';

// 画像処理を行い出力 dir.src -> dir.dest
const dir = {
  src: 'src/assets/original-img',
  dest: 'public/assets/img',
};

// 画像ファイルを取得
const imageFiles = globule.find(`${dir.src}/**/*.{jpg,jpeg,png,gif,svg}`);

// 出力先ディレクトリが存在しない場合、ディレクトリを作成
// See: https://nodejs.org/api/fs.html
if (!fs.existsSync(dir.dest)) {
  fs.mkdirSync(dir.dest, { recursive: true });
}

/**
 * 画像を処理して指定されたメソッドでsharpを実行する関数
 * @param {string} file - 入力画像ファイルパス
 * @param {string} method - sharpメソッド名
 * @param {number} qualityNum - 画質の数値
 * @param {string} outputPath - 出力先ファイルパス
 */
const sharpFn = (file, method, qualityNum, outputPath) => {
  const outputDir = path.dirname(outputPath);
  // サブディレクトリが存在しない場合、ディレクトリを作成
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // See: https://sharp.pixelplumbing.com/api-output
  sharp(file)
    [method]({
      quality: qualityNum,
    })
    .toFile(outputPath, (err, info) => {
      if (err) {
        console.error(`Error processing image: ${outputPath}`);
        console.error(err);
      } else {
        console.log(`Image processed successfully: ${file} -> ${outputPath}`);
      }
    });
};

imageFiles.forEach((file) => {
  // See: https://nodejs.org/api/path.html
  // 出力先ディレクトリ・出力先パス・拡張子を定義
  const outputDir = path.dirname(file).replace(dir.src, dir.dest);
  const outputPath = `${outputDir}/${path.basename(file)}`;
  const ext = path.extname(file).toLowerCase().replace('.', '');

  // 出力先ファイルが存在しない場合、画像処理を行う
  if (!fs.existsSync(outputPath)) {
    switch (ext) {
      case 'jpg':
      case 'jpeg':
        sharpFn(file, 'jpeg', 80, outputPath);
        sharpFn(file, 'webp', 80, outputPath.replace(/\.jpe?g$/, '.webp'));
        break;
      case 'png':
        sharpFn(file, 'png', 80, outputPath);
        sharpFn(file, 'webp', 80, outputPath.replace(/\.png$/, '.webp'));
        break;
      case 'gif':
        sharpFn(file, 'gif', 80, outputPath);
        break;
      case 'svg':
        // svgは複製
        fs.copyFileSync(file, outputPath);
        console.log(`SVG image copied successfully: ${file}`);
        console.log(`Output: ${outputPath}`);
        break;
    }
  }
});
