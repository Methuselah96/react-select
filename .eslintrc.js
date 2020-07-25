module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['react'],
  rules: {
    'no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^event$',
        ignoreRestSiblings: true,
        vars: 'all',
        varsIgnorePattern: 'jsx|emotionJSX'
      },
    ],
    curly: [2, 'multi-line'],
    'jsx-quotes': 1,
    'no-shadow': 1,
    'no-trailing-spaces': 1,
    'no-underscore-dangle': 1,
    'no-unused-expressions': 1,
    'object-curly-spacing': [1, 'always'],
    quotes: [2, 'single', 'avoid-escape'],
    'react/jsx-boolean-value': 1,
    'react/jsx-no-undef': 1,
    'react/jsx-uses-react': 1,
    'react/jsx-uses-vars': 1,
    'react/jsx-wrap-multilines': 1,
    'react/no-did-mount-set-state': 1,
    'react/no-did-update-set-state': 1,
    'react/no-unknown-property': 1,
    'react/react-in-jsx-scope': 1,
    'react/self-closing-comp': 1,
    'react/sort-prop-types': 1,
    semi: 2,
    strict: 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/base'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^event$',
            ignoreRestSiblings: true,
            vars: 'all',
            varsIgnorePattern: 'jsx|emotionJSX',
          },
        ],
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 1,
        quotes: 'off',
        '@typescript-eslint/quotes': [2, 'single', 'avoid-escape'],
        semi: 'off',
        '@typescript-eslint/semi': 2,
      },
    },
  ],
};
