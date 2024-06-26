'use strict';

// - Corrige la prise en charge des plugins chargés dans les configs. partagées.
//   (@see https://github.com/eslint/eslint/issues/3458)
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    env: { browser: true },

    // - Règles
    extends: '@pulsanova/esnext',
    rules: {
        // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-post-message-target-origin.md
        'unicorn/require-post-message-target-origin': ['error'],
    },
};
