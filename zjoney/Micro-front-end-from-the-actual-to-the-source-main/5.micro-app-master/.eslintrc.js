module.exports = {
  parser: '@typescript-eslint/parser', // babel-eslint
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  globals: {},
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', args: 'after-used' }],
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/ban-types': 0,
    'standard/no-callback-literal': 0,
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'prefer-spread': 0,
    'prefer-rest-params': 0,
    'no-prototype-builtins': 0,
    'no-unused-expressions': 0,
    'comma-dangle': ['error', 'only-multiline'],
    'no-eval': ['error', { allowIndirect: true }],
    'no-new-func': 0,
  }
}
