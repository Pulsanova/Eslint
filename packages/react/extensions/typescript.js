import { DEFAULT_EXTENSIONS as BASE_EXTENSIONS } from '@pulsanova/eslint-config-browser';

export const EXTENSIONS = [...BASE_EXTENSIONS.ts, 'tsx'];

export default [{
    // - Fichiers
    files: [`**/*.{${Object.values(EXTENSIONS).flat().join(',')}}`],

    // - Règles
    rules: {
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-filename-extension': ['error', {
            allow: 'as-needed',
            extensions: ['.tsx'],
        }],
    },
}];
