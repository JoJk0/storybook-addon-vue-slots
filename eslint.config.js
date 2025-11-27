import storybook from 'eslint-plugin-storybook';
import js from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import vuePlugin from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      '.github/dependabot.yml',
      '!.*',
      '*.tgz',
      'dist/',
      'scripts/',
      'coverage/',
      'node_modules/',
      'storybook-static/',
      'build-storybook.log',
      '.DS_Store',
      '.env',
      '.idea',
      '.vscode',
    ],
  },
  js.configs.recommended,
  vuePlugin.configs['flat/recommended'],
  {
    settings: {
      vue: {
        version: 'detect',
      },
    },
  },
  ...tseslint.configs.recommended,
  ...storybook.configs['flat/recommended'],
  prettierRecommended,
];