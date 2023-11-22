module.exports = {
  extends: ['markuplint:recommended'],
  parser: {
    '\\.html$': '@markuplint/mustache-parser',
  },
  rules: {
    'required-h1': false,
  },
};
