// eslint-disable-next-line no-undef
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    // React
    'react-refresh/only-export-components': 'warn',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    // General
    'no-useless-escape': 'off',
    'no-unused-vars': 'off',
    'no-unsafe-optional-chaining': 'off',
    'no-extra-boolean-cast': 'off'
  }
}
