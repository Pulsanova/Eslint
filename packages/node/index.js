import globals from 'globals';
import { createNodeResolver } from 'eslint-plugin-import-x';
import {
    createConfig as baseConfig,
    DEFAULT_EXTENSIONS as BASE_EXTENSIONS,
} from '@pulsanova/eslint-config-base';
import typescriptConfig, {
    EXTENSIONS as TS_EXTENSIONS,
} from './extensions/typescript.js';

export const EXTENSIONS = {
    js: [...BASE_EXTENSIONS.js, 'cjs', 'mjs'],
    ts: TS_EXTENSIONS,
};

const base = [
    ...baseConfig(EXTENSIONS),
    {
        // - Files
        files: [`**/*.{${Object.values(EXTENSIONS).flat().join(',')}}`],

        // - Parser
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.node,
            },
        },

        // - Settings
        settings: {
            'import-x/extensions': ['.js'],
            'import-x/external-module-folders': ['node_modules'],
            'import-x/resolver-next': [
                createNodeResolver({
                    extensions: ['.js', '.json'],
                }),
            ],
        },

        // - Rules
        rules: {
            // https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/extensions.md
            'import/extensions': ['error', 'ignorePackages', {
                ts: 'never',
                cts: 'never',
                mts: 'never',
            }],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-exports-in-scripts.md
            'unicorn/no-exports-in-scripts': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-blob-reading-methods.md
            'unicorn/prefer-blob-reading-methods': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-import-meta-properties.md
            'unicorn/prefer-import-meta-properties': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md
            'unicorn/prefer-module': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md
            'unicorn/prefer-node-protocol': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-top-level-await.md
            'unicorn/prefer-top-level-await': ['error'],

            //
            // - Règles désactivées
            //

            // https://eslint.org/docs/rules/no-console
            'no-console': ['off'],
        },
    },
];

const overrides = [
    {
        files: ['**/*.cjs'],
        languageOptions: {
            sourceType: 'commonjs',
        },
    },
];

export default [
    // eslint-disable-next-line unicorn/no-useless-spread
    ...[...base, ...overrides],
    ...typescriptConfig,
];
