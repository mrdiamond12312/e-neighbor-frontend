module.exports = {
  extends: [
    'plugin:import/errors',
    'plugin:import/typescript',
    require.resolve('@umijs/fabric/dist/eslint'),
  ],
  rules: {
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern:
              '{@(@/actions|@/app|@/assets|@/calls|@/client|@/components|@/constants|/@context|@/database|@helpers|@/hooks|@/init|@/managers|@/queries|@/screens|@/selectors|@/share|@/store|@/telemetry|@/typings|@/test|@/utils)/**,@(@/constants|@/i18n|@/notifications|@/store|@/websocket)}',
            group: 'parent',
            position: 'after',
          },
          {
            pattern: 'app/**',
            group: 'parent',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroupsExcludedImportTypes: ['type'],
      },
    ],
  },
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
    KEY_FLAG_SMITH: true,
    KEY_MIXPANEL: true,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/extensions': ['.ts', '.tsx'],
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
        moduleDirectory: ['./src/*', './src/.umi/*', 'node_modules'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
