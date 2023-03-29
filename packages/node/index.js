'use strict';

// - Corrige la prise en charge des plugins chargés dans les configs. partagées.
//   (@see https://github.com/eslint/eslint/issues/3458)
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    env: { node: true },

    // - Configuration
    settings: {
        'import/extensions': ['.js'],
        'import/external-module-folders': ['node_modules'],
        'import/resolver': {
            node: { extensions: ['.js'] },
        },
    },

    // - Règles
    extends: '@pulsanova/base',
    rules: {
        // TODO: Interdire les extensions manquantes lorsqu'on utilisera ESM pour les paquets node.
        // @see https://nodejs.org/api/esm.html#mandatory-file-extensions
        // @see https://github.com/benmosher/eslint-plugin-import/blob/main/docs/rules/extensions.md
        'import/extensions': ['error', 'ignorePackages', {
            js: 'never',
            cjs: 'always',
            mjs: 'always',
        }],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md
        'unicorn/prefer-node-protocol': ['error'],

        //
        // - Règles désactivées.
        //

        // @see https://eslint.org/docs/rules/global-require
        'global-require': ['off'],

        // @see https://eslint.org/docs/rules/no-console
        'no-console': ['off'],

        // TODO: À activer lorsqu'on utilisera ESM pour les paquets node.
        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md
        'unicorn/prefer-module': ['off'],

        // TODO: À activer lorsqu'on utilisera ESM pour les paquets node.
        // @see https://github.com/nodejs/node/issues/21267
        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-top-level-await.md
        'unicorn/prefer-top-level-await': ['off'],
    },

    // - Overrides
    overrides: [
        {
            files: ['**/*.mjs'],
            parserOptions: {
                sourceType: 'module',
            },
        },
        {
            files: ['**/*.{c,m}js'],
            rules: {
                // @see https://nodejs.org/api/esm.html#mandatory-file-extensions
                // @see https://github.com/benmosher/eslint-plugin-import/blob/main/docs/rules/extensions.md
                'import/extensions': ['error', 'ignorePackages'],
            },
        },
    ],
};
