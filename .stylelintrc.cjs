module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-property-sort-order-smacss'],
  ignoreFiles: ['**/node_modules/**'],
  rules: {
    // Patternはケバブケース以外エラーとなるため上書き
    'selector-id-pattern': null,
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
    'scss/at-mixin-pattern': null,
    'scss/dollar-variable-pattern': null,
    'scss/percent-placeholder-pattern': null,
    // font-family名の引用符の扱い
    'font-family-name-quotes': 'always-where-recommended',
    // font-weightを数値で指定
    'font-weight-notation': 'numeric',
  },
};
