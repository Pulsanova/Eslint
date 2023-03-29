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
        'import/extensions': ['.ts', '.js'],
        'import/external-module-folders': ['node_modules', 'node_modules/@types'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.mts', '.cts', '.ts'],
        },
        'import/resolver': {
            node: {
                extensions: ['.ts', '.js'],
            },
        },
        'jsdoc': {
            preferredTypes: {
                'Object<>': 'Record<>',
                'Object.<>': 'Record<>',
            },
            mode: 'permissive',
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

        // @see https://github.com/benmosher/eslint-plugin-import/blob/main/docs/rules/extensions.md
        'import/extensions': ['error', 'ignorePackages', {
            js: 'never',
            cjs: 'never',
            mjs: 'never',
            ts: 'never',
            cts: 'never',
            mts: 'never',
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
        {
            files: ['**/*.?({c,m})ts', '**/*.tsx'],
            ...require('./overrides/typescript'),
        },
    ],
};
