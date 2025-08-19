import globals from 'globals';
import confusingBrowserGlobals from 'confusing-browser-globals';
import {
    createConfig as esnextConfig,
    DEFAULT_EXTENSIONS,
} from '@pulsanova/eslint-config-esnext';

export { DEFAULT_EXTENSIONS };

export const createConfig = (additionalExtensions = {}) => {
    const extensions = {
        js: [...new Set([...DEFAULT_EXTENSIONS.js, ...additionalExtensions.js ?? []])],
        ts: [...new Set([...DEFAULT_EXTENSIONS.ts, ...additionalExtensions.ts ?? []])],
    };

    return [
        ...esnextConfig(extensions),
        {
            // - Fichiers
            files: [`**/*.{${Object.values(extensions).flat().join(',')}}`],

            // - Parseur
            languageOptions: {
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

                // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-post-message-target-origin.md
                'unicorn/require-post-message-target-origin': ['error'],
            },
        },
    ];
};

export default createConfig();
