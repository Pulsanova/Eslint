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
            },
        },
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
