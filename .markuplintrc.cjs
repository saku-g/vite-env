module.exports = {
  extends: ['markuplint:recommended'],
  parser: {
    '\\.html$': '@markuplint/mustache-parser',
  },
  rules: {
    'required-h1': false,
  },
  nodeRules: {
    selector: 'iframe',
    rules: {
      'required-attr': false,
    },
  },
  excludeFiles: ['./src/partials/*.html'],
};
