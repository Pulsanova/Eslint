'use strict';

// - Corrige la prise en charge des plugins chargés dans les configs. partagées.
//   (@see https://github.com/eslint/eslint/issues/3458)
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    // - Parseur
    parser: '@babel/eslint-parser',
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            legacyDecorators: true,
        },
    },

    // - Configuration
    settings: {
        'import/extensions': ['.mjs', '.js', '.ts', '.d.ts'],
        'import/external-module-folders': ['node_modules', 'node_modules/@types'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.d.ts'],
        },
        'import/resolver': {
            node: {
                extensions: ['.mjs', '.cjs', '.js', '.ts', '.d.ts', '.json'],
            },
        },
    },

    // - Plugins
    plugins: ['@babel'],

    // - Règles
    extends: '@pulsanova/base',
    rules: {
        // @see https://eslint.org/docs/rules/new-cap
        'new-cap': ['off'],
        '@babel/new-cap': ['error', {
            newIsCap: true,
            newIsCapExceptions: [],
            capIsNew: false,
            capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
        }],

        // @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
        'import/extensions': ['error', 'ignorePackages', {
            js: 'never',
            jsx: 'never',
            cjs: 'never',
            mjs: 'never',
            ts: 'never',
            tsx: 'never',
        }],

        // @see https://eslint.org/docs/rules/object-curly-spacing
        'object-curly-spacing': ['off'],
        '@babel/object-curly-spacing': ['error', 'always'],

        // @see https://eslint.org/docs/rules/semi
        'semi': ['off'],
        '@babel/semi': ['error', 'always'],

        // @see https://eslint.org/docs/rules/no-unused-expressions
        'no-unused-expressions': ['off'],
        '@babel/no-unused-expressions': ['error', {
            allowShortCircuit: false,
            allowTaggedTemplates: false,
            allowTernary: true,
        }],

        // @see https://eslint.org/docs/rules/strict
        'strict': ['error', 'never'],

        //
        // - Règles désactivées.
        //

        // @see https://eslint.org/docs/rules/no-invalid-this
        '@babel/no-invalid-this': ['off'],
    },

    // - Overrides
    overrides: [
        { files: ['**/*.ts?(x)'], ...require('./overrides/typescript.js') },
        {
            files: ['**/*.d.ts?(x)'],
            rules: {
                'max-classes-per-file': ['off'],
                'no-redeclare': ['off'],
                'no-var': ['off'],
                'vars-on-top': ['off'],
                '@typescript-eslint/no-extraneous-class': ['off'],
                '@typescript-eslint/triple-slash-reference': ['off'],
            },
        },
    ],
};
