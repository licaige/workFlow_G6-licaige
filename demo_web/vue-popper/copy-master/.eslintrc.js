module.exports = {
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
  },
  'env': {
    'browser': true,
    'commonjs': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  'rules': {
    "no-undef": "off",
    "no-nested-ternary": "off",
    "no-param-reassign": "off",
    "import/extensions": "off",
    'consistent-return': 'off',
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    'prettier/prettier': 'error',
  },
  'plugins': ['@typescript-eslint', 'prettier'],
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
