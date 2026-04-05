import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Ignore build outputs
  globalIgnores(['dist', 'build']),

  // Apply to JS/TS/JSX/TSX files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        // Use a dedicated tsconfig for ESLint so project references don't break parser
        project: './tsconfig.eslint.json',
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': tsPlugin,
    },

    settings: {
      react: { version: 'detect' },
    },

    // Manually enable a compact set of rules similar to the classic "recommended" sets
    // Avoid using `extends` with plugin configs to prevent nested-extends errors.
    rules: {
      // React
      'react/react-in-jsx-scope': 'off',

      // Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // TypeScript / general
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // Stylistic / spacing rules added so linter reports common spacing problems
      // These are core ESLint rules and don't require extra plugins.
      'no-multi-spaces': 'error',
      'no-trailing-spaces': 'error',
      'comma-spacing': ['error', { before: false, after: true }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-in-parens': ['error', 'never'],
      'space-before-blocks': ['error', 'always'],
      'no-mixed-spaces-and-tabs': 'error',
      'eol-last': ['error', 'always'],

      // You can add more rules here as needed (e.g. stylistic, a11y, etc.)
    },
  },
])
