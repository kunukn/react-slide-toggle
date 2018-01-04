module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  plugins: ['import'],
  rules: {
    'no-underscore-dangle': 'off',
    'func-names': 'off',
    'import/prefer-default-export': 'off',
    'no-restricted-properties': 'off',
    'linebreak-style': 0,
    'arrow-parens': ["error", "as-needed"],
  },
};