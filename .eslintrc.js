/* eslint-env node */
// module.exports = {
//   'env': {
//     'browser': true,
//     'es6': true,
//     'jest/globals': true,
//     // 'cypress/globals':true
//   },
//   'extends': [
//     'eslint:recommended',
//     'plugin:react/recommended'
//   ],
//   'parserOptions': {
//     'ecmaFeatures': {
//       'jsx': true
//     },
//     'ecmaVersion': 2018,
//     'sourceType': 'module'
//   },
//   'plugins': [
//     'react', 'jest',
//     'prettify'
//   ],
//   'rules': {
//     'indent': [
//       'error',
//       2
//     ],
//     'linebreak-style': [
//       'error',
//       'unix'
//     ],
//     'quotes': [
//       'error',
//       'single'
//     ],
//     'semi': [
//       'error',
//       'never'
//     ],
//     'eqeqeq': 'error',
//     'no-trailing-spaces': 'error',
//     'object-curly-spacing': [
//       'error', 'always'
//     ],
//     'arrow-spacing': [
//       'error', { 'before': true, 'after': true }
//     ],
//     'no-console': 0,
//     'react/prop-types': 0
//   },
//   'settings': {
//     'react': {
//       'version': 'detect'
//     }
//   }
// }

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: false,
  },
  extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
    es6: true,
    // 'jest/globals': true,
    // 'cypress/globals': true,
  },
  rules: {
    'max-len': ['error', { code: 100 }],
    'prefer-promise-reject-errors': ['off'],
    'react/jsx-filename-extension': ['off'],
    'react/prop-types': ['warn'],
    'no-return-assign': ['off'],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: false, optionalDependencies: false, peerDependencies: false },
    ],
  },
}
