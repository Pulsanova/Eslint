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
        'import/extensions': ['.d.ts', '.ts', '.js'],
        'import/external-module-folders': ['node_modules', 'node_modules/@types'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.mts', '.cts', '.ts'],
        },
        'import/resolver': {
            node: {
                extensions: ['.d.ts', '.ts', '.js', '.json'],
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
        // https://eslint.org/docs/rules/new-cap
        'new-cap': ['off'],
        '@babel/new-cap': ['error', {
            newIsCap: true,
            newIsCapExceptions: [],
            capIsNew: false,
            capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
        }],

        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
        'import/extensions': ['error', 'ignorePackages', {
            js: 'never',
            cjs: 'never',
            mjs: 'never',
            ts: 'never',
            cts: 'never',
            mts: 'never',
        }],

        // https://eslint.style/rules/js/object-curly-spacing
        '@stylistic/js/object-curly-spacing': ['off'],
        '@babel/object-curly-spacing': ['error', 'always'],

        // https://eslint.style/rules/js/semi
        '@stylistic/js/semi': ['off'],
        '@babel/semi': ['error', 'always'],

        // https://eslint.org/docs/rules/no-undef
        'no-undef': ['off'],
        '@babel/no-undef': ['off'],

        // https://eslint.org/docs/rules/no-unused-expressions
        'no-unused-expressions': ['off'],
        '@babel/no-unused-expressions': ['error', {
            allowShortCircuit: false,
            allowTaggedTemplates: false,
            allowTernary: true,
        }],

        // https://eslint.org/docs/rules/strict
        'strict': ['error', 'never'],

        //
        // - Règles désactivées.
        //

        // https://eslint.org/docs/rules/no-invalid-this
        '@babel/no-invalid-this': ['off'],
    },

    // - Overrides
    overrides: [
        {
            files: ['**/*.?({c,m})ts', '**/*.tsx'],
            ...require('./overrides/typescript.js'),
        },
    ],
};
