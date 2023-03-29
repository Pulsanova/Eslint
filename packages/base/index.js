'use strict';

// @see https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    env: { es6: true },

    // - Parseur
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script',
    },

    // - Règles
    extends: 'airbnb-base',
    rules: {
        // @see https://eslint.org/docs/rules/array-callback-return
        'array-callback-return': ['error', { allowImplicit: false }],

        // @see https://eslint.org/docs/rules/curly
        'curly': ['error', 'all'],

        // @see https://eslint.org/docs/rules/func-name-matching
        'func-name-matching': ['error', 'always', {
            considerPropertyDescriptor: true,
            includeCommonJSModuleExports: false,
        }],

        // @see https://eslint.org/docs/rules/func-style
        'func-style': ['error', 'expression'],

        // @see https://eslint.org/docs/rules/func-names
        'func-names': ['warn', 'as-needed'],

        // @see https://eslint.org/docs/rules/grouped-accessor-pairs
        'grouped-accessor-pairs': ['error', 'getBeforeSet'],

        // @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
        'import/no-extraneous-dependencies': ['error', {
            devDependencies: [
                'tests/**',
                '**/__tests__/**',
                '**/__mocks__/**',
                '**/*.{test,spec}.{js,ts,tsx}',
                '**/{test,spec}.{js,ts,tsx}',
                '**/gulpfile.js',
                '**/vue.config.js',
                '**/rollup.config.js',
                '**/webpack.config.js',
                '**/postcss.config.js',
                '**/next.config.js',
                '**/.eslintrc.js',
            ],
            optionalDependencies: false,
        }],

        // @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
        'import/extensions': ['error', 'ignorePackages', { js: 'never' }],

        // @see https://eslint.org/docs/rules/indent
        'indent': ['error', 4, {
            ArrayExpression: 1,
            CallExpression: { arguments: 1 },
            FunctionDeclaration: { parameters: 1, body: 1 },
            FunctionExpression: { parameters: 1, body: 1 },
            ImportDeclaration: 1,
            ObjectExpression: 1,
            SwitchCase: 1,
            VariableDeclarator: 1,
            flatTernaryExpressions: false,
            ignoreComments: false,
            outerIIFEBody: 1,

            // @see https://github.com/benjamn/ast-types/blob/master/def/jsx.ts
            ignoredNodes: [
                'JSXElement',
                'JSXElement > *',
                'JSXAttribute',
                'JSXIdentifier',
                'JSXNamespacedName',
                'JSXMemberExpression',
                'JSXSpreadAttribute',
                'JSXExpressionContainer',
                'JSXOpeningElement',
                'JSXClosingElement',
                'JSXFragment',
                'JSXOpeningFragment',
                'JSXClosingFragment',
                'JSXText',
                'JSXEmptyExpression',
                'JSXSpreadChild',
            ],
        }],

        // @see https://eslint.org/docs/rules/max-len
        'max-len': ['error', 120, 4, {
            ignoreComments: true,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreTrailingComments: true,
            ignoreUrls: true,
        }],

        // @see https://eslint.org/docs/rules/no-restricted-exports
        'no-restricted-exports': ['error', {
            restrictedNamedExports: ['then'],
        }],

        // @see https://eslint.org/docs/rules/no-implicit-globals
        'no-implicit-globals': ['error'],

        // @see https://eslint.org/docs/rules/no-unused-private-class-members
        'no-unused-private-class-members': ['error'],

        // @see https://eslint.org/docs/rules/object-curly-newline
        'object-curly-newline': ['error', {
            ObjectExpression: { multiline: true, consistent: true },
            ObjectPattern: { multiline: true, consistent: true },
            ImportDeclaration: { multiline: true, consistent: true },
            ExportDeclaration: { multiline: true, consistent: true },
        }],

        // @see https://eslint.org/docs/rules/operator-linebreak
        'operator-linebreak': ['error', 'after', {
            overrides: {
                '=': 'none',
                '?': 'before',
                ':': 'before',
            },
        }],

        // @see https://eslint.org/docs/rules/prefer-arrow-callback
        'prefer-arrow-callback': ['error', {
            allowNamedFunctions: true,
            allowUnboundThis: true,
        }],

        // @see https://eslint.org/docs/rules/prefer-named-capture-group
        'prefer-named-capture-group': ['error'],

        // @see https://eslint.org/docs/rules/quotes
        'quotes': ['error', 'single', { allowTemplateLiterals: true }],

        // @see https://eslint.org/docs/rules/quote-props
        'quote-props': ['error', 'consistent'],

        // @see https://eslint.org/docs/rules/require-atomic-updates
        'require-atomic-updates': ['error', {
            allowProperties: true,
        }],

        // @see https://eslint.org/docs/rules/strict
        'strict': ['error', 'safe'],

        //
        // - Règles désactivées.
        //

        // @see https://eslint.org/docs/rules/id-denylist
        'id-denylist': ['off'],

        // @see https://github.com/benmosher/eslint-plugin-import/blob/1012eb951767279ce3b540a4ec4f29236104bb5b/docs/rules/no-import-module-exports.md
        'import/no-import-module-exports': ['off'],

        // @see https://eslint.org/docs/rules/no-continue
        'no-continue': ['off'],

        // @see https://eslint.org/docs/rules/no-param-reassign
        'no-param-reassign': ['off'],

        // @see https://eslint.org/docs/rules/no-underscore-dangle
        'no-underscore-dangle': ['off'],
    },

    // - Overrides
    overrides: [
        {
            files: ['**/*.mjs'],
            parserOptions: {
                sourceType: 'module',
            },
            rules: {
                // @see https://nodejs.org/api/esm.html#mandatory-file-extensions
                // @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
                'import/extensions': ['error', 'ignorePackages'],
            },
        },
    ],
    reportUnusedDisableDirectives: true,
};
