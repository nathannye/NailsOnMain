module.exports = {
  root: true,
  extends: ['prettier'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  globals: {
    IS_DEVELOPMENT: 'readonly',
  },
};
