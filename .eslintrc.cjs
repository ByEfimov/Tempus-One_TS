module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src/'],
            },
        },
    },
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'import'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'no-console': 'error',
        'prefer-const': 'error',
        'import/no-unresolved': 'off',
        'react-hooks/exhaustive-deps': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'import/order': [
            'error',
            {
                groups: [
                    'index',
                    'parent',
                    'sibling',
                    'internal',
                    'external',
                    'builtin',
                    'object',
                    'type',
                ],
            },
        ],
    },
};
