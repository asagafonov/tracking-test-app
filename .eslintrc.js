module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-console': 0,
    'no-param-reassign': 0,
    'import/extensions': 0,
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'react/function-component-definition': 0,
    'jsx-a11y/no-static-element-interactions': 0,
  },
};
