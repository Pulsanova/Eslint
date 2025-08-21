import vueParser from 'vue-eslint-parser';
import typescriptParser from '@typescript-eslint/parser';
import { DEFAULT_EXTENSIONS as BASE_EXTENSIONS } from '@pulsanova/eslint-config-browser';

export const EXTENSIONS = [...BASE_EXTENSIONS.ts, 'tsx'];

export default [{
    // - Fichiers
    files: [`**/*.{${Object.values(EXTENSIONS).flat().join(',')}}`],

    // - Parseur
    languageOptions: {
        parser: vueParser,
        parserOptions: {
            parser: typescriptParser,
            extraFileExtensions: ['.vue'],
        },
    },

    // - Règles
    rules: {
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-filename-extension': ['error', {
            allow: 'as-needed',
            extensions: ['.tsx'],
        }],

        // https://eslint.vuejs.org/rules/require-typed-object-prop.html
        'vue/require-typed-object-prop': ['error'],
    },
}];
