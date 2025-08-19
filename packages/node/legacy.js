import nodeModernConfig from './index.js';
import {
    DEFAULT_EXTENSIONS as BASE_EXTENSIONS,
} from '@pulsanova/eslint-config-base';

export default [
    ...nodeModernConfig,
    {
        files: [`**/*.{${Object.values(BASE_EXTENSIONS).flat().join(',')}}`],

        // - Parser
        languageOptions: {
            sourceType: 'commonjs',
        },

        // - Rules
        rules: {
            'import/extensions': ['error', 'ignorePackages', {
                js: 'never',
                cjs: 'always',
                mjs: 'always',
            }],

            //
            // - Disabled rules
            //

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-import-meta-properties.md
            'unicorn/prefer-import-meta-properties': ['off'],

            // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md
            'unicorn/prefer-module': ['off'],

            // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-top-level-await.md
            'unicorn/prefer-top-level-await': ['off'],
        },
    },
];
