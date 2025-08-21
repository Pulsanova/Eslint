import babelPlugin from '@babel/eslint-plugin';
import babelParser from '@babel/eslint-parser';
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
                parser: babelParser,
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
                        // - Ce résolveur est uniquement utilisé pour résoudre un problème avec les `exports` dans les `package.json`.
                        //   (Sinon on utiliserait le mécanisme de résolution par défaut (= Node ci-dessus)).
                        // See https://github.com/import-js/eslint-plugin-import/issues/1868#issuecomment-2034198702
                        typescript: {
                            extensions: ['.d.ts', '.ts', '.js', '.json'],
                        },
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
            plugins: {
                '@babel': babelPlugin,
            },

            // - Règles
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
