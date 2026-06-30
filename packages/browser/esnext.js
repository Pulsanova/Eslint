import globals from 'globals';
import confusingBrowserGlobals from 'confusing-browser-globals';
import { createNodeResolver } from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import {
    createConfig as baseConfig,
    DEFAULT_EXTENSIONS as BASE_EXTENSIONS,
} from '@pulsanova/eslint-config-base';
import {
    createConfig as typescriptConfig,
    DEFAULT_EXTENSIONS as DEFAULT_TS_EXTENSIONS,
} from './extensions/typescript.js';

export const DEFAULT_EXTENSIONS = {
    js: [...BASE_EXTENSIONS.js, 'mjs', 'cjs'],
    ts: DEFAULT_TS_EXTENSIONS,
};

export const createConfig = (additionalExtensions = {}) => {
    const extensions = {
        js: [...new Set([...DEFAULT_EXTENSIONS.js, ...additionalExtensions.js ?? []])],
        ts: [...new Set([...DEFAULT_EXTENSIONS.ts, ...additionalExtensions.ts ?? []])],
    };

    const base = [
        ...baseConfig(extensions),
        {
            // - Fichiers
            files: [`**/*.{${Object.values(extensions).flat().join(',')}}`],

            // - Parseur
            languageOptions: {
                sourceType: 'module',
                globals: {
                    ...globals.browser,
                },
            },

            // - Configuration
            settings: {
                'import-x/extensions': ['.d.ts', '.ts', '.js'],
                'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
                'import-x/parsers': {
                    '@typescript-eslint/parser': ['.mts', '.cts', '.ts'],
                },
                'import-x/resolver-next': [
                    createNodeResolver({
                        extensions: ['.d.ts', '.ts', '.js', '.json'],
                    }),
                    createTypeScriptImportResolver({
                        extensions: ['.d.ts', '.ts', '.js', '.json'],
                    }),
                ],
                'jsdoc': {
                    preferredTypes: {
                        'Object<>': 'Record<>',
                        'Object.<>': 'Record<>',
                    },
                    mode: 'permissive',
                },
            },

            // - Règles
            rules: {
                // https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/extensions.md
                'import/extensions': ['error', 'ignorePackages', {
                    js: 'never',
                    cjs: 'never',
                    mjs: 'never',
                    ts: 'never',
                    cts: 'never',
                    mts: 'never',
                }],

                // https://eslint.org/docs/rules/no-restricted-globals
                'no-restricted-globals': (
                    [
                        'error',
                        {
                            name: 'isFinite',
                            message: 'Use Number.isFinite instead.`',
                        },
                        {
                            name: 'isNaN',
                            message: 'Use Number.isNaN instead.',
                        },
                    ].concat(
                        confusingBrowserGlobals.map((globalName) => ({
                            name: globalName,
                            message: `Use window.${globalName} instead.`,
                        })),
                    )
                ),

                // https://eslint.org/docs/rules/strict
                'strict': ['error', 'never'],

                // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-post-message-target-origin.md
                'unicorn/require-post-message-target-origin': ['error'],
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

    return [
        // eslint-disable-next-line unicorn/no-useless-spread
        ...[...base, ...overrides],
        ...typescriptConfig(extensions.ts),
    ];
};

export default createConfig();
