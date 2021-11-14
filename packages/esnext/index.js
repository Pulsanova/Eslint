'use strict';

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
                extensions: ['.mjs', '.js', '.ts', '.d.ts', '.json'],
            },
        },
    },

    // - Plugins
    plugins: ['@babel'],

    // - Règles
    extends: '@pulsanova/base',
    rules: {
        // (Prise en charge Babel, voir parent)
        // @see https://eslint.org/docs/rules/new-cap
        'new-cap': ['off'],
        '@babel/new-cap': ['error', {
            newIsCap: true,
            newIsCapExceptions: [],
            capIsNew: false,
            capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
        }],

        // - L'extension ne doit pas être spécifiée dans les imports de fichiers contenant du JavaScript.
        //   (Le support de TypeScript est ajouté dans cet overwrite)
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
        'import/extensions': ['error', 'ignorePackages', {
            js: 'never',
            jsx: 'never',
            mjs: 'never',
            ts: 'never',
            tsx: 'never',
        }],

        // (Prise en charge Babel, voir parent)
        // @see https://eslint.org/docs/rules/object-curly-spacing
        'object-curly-spacing': ['off'],
        '@babel/object-curly-spacing': ['error', 'always'],

        // (Prise en charge Babel, voir parent)
        // @see https://eslint.org/docs/rules/semi
        'semi': ['off'],
        '@babel/semi': ['error', 'always'],

        // (Prise en charge Babel, voir parent)
        // @see https://eslint.org/docs/rules/no-unused-expressions
        'no-unused-expressions': ['off'],
        '@babel/no-unused-expressions': ['error', {
            allowShortCircuit: false,
            allowTaggedTemplates: false,
            allowTernary: true,
        }],

        // - Le mode strict ne doit jamais être déclaré, babel s'en charge.
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
        { files: ['**/*.ts?(x)'], ...require('./overrides/typescript') },
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
