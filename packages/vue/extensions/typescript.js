import vueParser from 'vue-eslint-parser';
import typescriptParser from '@typescript-eslint/parser';
import { DEFAULT_EXTENSIONS as BASE_EXTENSIONS } from '@pulsanova/eslint-config-browser/esnext';

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
        // https://eslint.vuejs.org/rules/require-typed-object-prop.html
        'vue/require-typed-object-prop': ['error'],
    },
}];
