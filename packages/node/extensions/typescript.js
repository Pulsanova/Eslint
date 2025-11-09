import { DEFAULT_EXTENSIONS as BASE_EXTENSIONS } from '@pulsanova/eslint-config-base';

export const EXTENSIONS = [...BASE_EXTENSIONS.ts, 'cts', 'mts'];

const base = {
    // - Files
    files: [`**/*.{${Object.values(EXTENSIONS).flat().join(',')}}`],

    // - Settings
    settings: {
        'import/extensions': ['.js', '.ts'],
        'import/external-module-folders': ['node_modules', 'node_modules/@types'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.mts', '.cts', '.ts'],
        },
        'import/resolver': {
            node: {
                extensions: ['.d.ts', '.ts', '.js', '.json'],
            },
            // - This resolver is only used to solves an issue with package.json `exports`.
            //   (Otherwise we'd use the default resolution mechanism (= node above)).
            // See https://github.com/import-js/eslint-plugin-import/issues/1868#issuecomment-2034198702
            typescript: {
                extensions: ['.d.ts', '.ts', '.js', '.json'],
                extensionAlias: {
                    '.js': ['.ts', '.d.ts', '.js'],
                    '.ts': ['.ts', '.d.ts', '.js'],
                    '.cjs': ['.cts', '.d.cts', '.cjs'],
                    '.cts': ['.cts', '.d.cts', '.cjs'],
                    '.mjs': ['.mts', '.d.mts', '.mjs'],
                    '.mts': ['.mts', '.d.mts', '.mjs'],
                },
            },
        },
    },
    rules: {
        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
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
