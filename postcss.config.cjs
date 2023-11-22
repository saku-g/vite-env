/*eslint-env commonjs*/
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-sort-media-queries')({
      sort: 'mobile-first',
    }),
  ],
};
