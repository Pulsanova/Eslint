import typescriptParser from '@typescript-eslint/parser';
import { DEFAULT_EXTENSIONS as BASE_EXTENSIONS } from '@pulsanova/eslint-config-base';

export const DEFAULT_EXTENSIONS = [...BASE_EXTENSIONS.ts, 'cts', 'mts'];

export const createConfig = (additionalExtensions = []) => {
    const extensions = [...new Set([...DEFAULT_EXTENSIONS, ...additionalExtensions])];
    const extensionsGlob = extensions.length > 1
        ? `{${extensions.join(',')}}`
        : [...extensions].shift();

    const base = {
        // - Files
        files: [`**/*.${extensionsGlob}`],

        // - Parser
        languageOptions: {
            parser: typescriptParser,
        },

        // - Rules
        rules: {
            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
            'import/extensions': ['error', 'ignorePackages', {
                checkTypeImports: true,
                pattern: {
                    js: 'never',
                    cjs: 'never',
                    mjs: 'never',
                    ts: 'never',
                    cts: 'never',
                    mts: 'never',
                },
            }],

            //
            // - Incompatible / Non-optimized rules
            //

            // - Already handled by the base TypeScript config.
            '@babel/no-unused-expressions': ['off'],
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

    return [base, ...overrides];
};

export default createConfig();
