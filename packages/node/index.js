'use strict';

// - Corrige la prise en charge des plugins chargés dans les configs. partagées.
// @see https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    env: { node: true },

    // - Règles
    extends: '@pulsanova/base',
    rules: {
        // @see https://nodejs.org/api/esm.html#mandatory-file-extensions
        // @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
        'import/extensions': ['error', 'ignorePackages'],

        //
        // - Règles désactivées.
        //

        // @see https://eslint.org/docs/rules/global-require
        'global-require': ['off'],

        // @see https://eslint.org/docs/rules/no-console
        'no-console': ['off'],
    },
};
