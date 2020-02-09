module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  globals: {
    module: false,
    require: false,
    console: false,
    getDate: false,
    getRegExp: false
  },
  parserOptions: {
    ecmaVersion: 5
  },
  rules: {
    'no-console': 1
  }
};
