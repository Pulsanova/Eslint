import { createNodeResolver } from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { DEFAULT_EXTENSIONS as BASE_EXTENSIONS } from '@pulsanova/eslint-config-base';

export const EXTENSIONS = [...BASE_EXTENSIONS.ts, 'cts', 'mts'];

const base = {
    // - Files
    files: [`**/*.{${Object.values(EXTENSIONS).flat().join(',')}}`],

    // - Settings
    settings: {
        'import-x/extensions': ['.js', '.ts'],
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
                extensionAlias: {
                    '.js': ['.ts', '.d.ts', '.js'],
                    '.ts': ['.ts', '.d.ts', '.js'],
                    '.cjs': ['.cts', '.d.cts', '.cjs'],
                    '.cts': ['.cts', '.d.cts', '.cjs'],
                    '.mjs': ['.mts', '.d.mts', '.mjs'],
                    '.mts': ['.mts', '.d.mts', '.mjs'],
                },
            }),
        ],
    },
    rules: {
        // https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/extensions.md
        'import/extensions': ['error', 'ignorePackages', {
            checkTypeImports: true,
            pattern: {
                ts: 'never',
                cts: 'never',
                mts: 'never',
            },
        }],
    },
};

const overrides = [
    {
        files: ['**/*.cts'],
        languageOptions: {
            sourceType: 'commonjs',
        },
    },
];

export default [base, ...overrides];
