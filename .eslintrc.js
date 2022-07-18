module.exports = {
  root: true,
  extends: ['prettier'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['import', 'promise', 'standard'],
  globals: {
    IS_DEVELOPMENT: 'readonly',
  },
};
