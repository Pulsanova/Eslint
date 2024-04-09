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
            node: {
                extensions: ['.js', '.json'],
            },
        },
    },

    // - Règles
    extends: '@pulsanova/base',
    rules: {
        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
        'import/extensions': ['error', 'ignorePackages'],

        // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-blob-reading-methods.md
        'unicorn/prefer-blob-reading-methods': ['error'],

        // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md
        'unicorn/prefer-node-protocol': ['error'],

        //
        // - Règles désactivées.
        //

        // https://eslint.org/docs/rules/no-console
        'no-console': ['off'],
    },

    // - Overrides
    overrides: [
        {
            files: ['**/*.mjs'],
            parserOptions: {
                sourceType: 'module',
            },
        },
    ],
};
