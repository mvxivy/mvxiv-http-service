module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': process.env.NODE_ENV === 'production' ? ['warn', { allow: ['error'] }] : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': [
      'error',
      100,
      { ignorePattern: '^import\\s.+\\sfrom\\s.+;$', ignoreComments: true },
    ],
    'no-param-reassign': 'off',
    'global-require': 'off',
    radix: 'off',
    'quote-props': ['error', 'as-needed'],
    'no-empty': ['error', { allowEmptyCatch: false }],
    'no-shadow': 'off', // https://eslint.org/docs/rules/no-shadow
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ], // ['always', 'always-multiline', 'never']
    'no-underscore-dangle': 'off',
    'no-plusplus': 'off',
    'no-mixed-operators': 'off',
    'no-bitwise': ['error', { allow: ['~'], int32Hint: true }],
    'no-unused-vars': process.env.NODE_ENV === 'production' ? ['error', 'always'] : 'off',
    'no-constant-condition': ['warn', { checkLoops: true }],
    'keyword-spacing': [
      'error',
      {
        overrides: {
          if: { after: true },
          for: { after: true },
          while: { after: true },
        },
      },
    ],
    'no-multiple-empty-lines': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-return-assign': 'off',
    'prefer-const': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'promise/param-names': 'off',
    'valid-typeof': ['error', { requireStringLiterals: false }],
  },
};
