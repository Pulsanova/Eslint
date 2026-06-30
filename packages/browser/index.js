import globals from 'globals';
import confusingBrowserGlobals from 'confusing-browser-globals';
import {
    createConfig as baseConfig,
    DEFAULT_EXTENSIONS,
} from '@pulsanova/eslint-config-base';

export { DEFAULT_EXTENSIONS };

export const createConfig = (additionalExtensions = {}) => {
    const extensions = {
        js: [...new Set([...DEFAULT_EXTENSIONS.js, ...additionalExtensions.js ?? []])],
        ts: [...new Set([...DEFAULT_EXTENSIONS.ts, ...additionalExtensions.ts ?? []])],
    };

    return [
        ...baseConfig(extensions),
        {
            // - Fichiers
            files: [`**/*.{${Object.values(extensions).flat().join(',')}}`],

            // - Parseur
            languageOptions: {
                sourceType: 'script',
                globals: {
                    ...globals.browser,
                },
            },

            // - Règles
            rules: {
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
                'strict': ['error', 'global'],

                // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-post-message-target-origin.md
                'unicorn/require-post-message-target-origin': ['error'],

                //
                // - Règles désactivées
                //

                'import/consistent-type-specifier-style': ['off'],
                'import/export': ['off'],
                'import/extensions': ['off'],
                'import/first': ['off'],
                'import/named': ['off'],
                'import/newline-after-import': ['off'],
                'import/no-duplicates': ['off'],
                'import/no-empty-named-blocks': ['off'],
                'import/no-mutable-exports': ['off'],
                'import/no-named-default': ['off'],
                'import/no-relative-packages': ['off'],
                'import/no-self-import': ['off'],
                'import/no-unresolved': ['off'],
                'import/no-useless-path-segments': ['off'],
                'import/order': ['off'],
                'import/prefer-default-export': ['off'],
            },
        },
    ];
};

export default createConfig();
