import globals from 'globals';
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
            'import/extensions': ['.js'],
            'import/external-module-folders': ['node_modules'],
            'import/resolver': {
                node: {
                    extensions: ['.js', '.json'],
                },
                // - Ce résolveur est uniquement utilisé pour résoudre un problème avec les `exports` dans les `package.json`.
                //   (Sinon on utiliserait le mécanisme de résolution par défaut (= Node ci-dessus)).
                // See https://github.com/import-js/eslint-plugin-import/issues/1868#issuecomment-2034198702
                typescript: {
                    extensions: ['.js', '.json'],
                    mainFields: ['main'],
                },
            },
        },

        // - Rules
        rules: {
            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
            'import/extensions': ['error', 'ignorePackages'],

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

            // - Déjà pris en charge par `unicorn/prefer-node-protocol`.
            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/enforce-node-protocol-usage.md
            'import/enforce-node-protocol-usage': ['off'],

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
