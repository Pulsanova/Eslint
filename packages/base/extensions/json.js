import jsonPlugin from '@eslint/json';

const baseConfig = {
    // - Plugins
    plugins: {
        json: jsonPlugin,
    },

    // - Règles
    rules: {
        'json/no-duplicate-keys': ['error'],
        'json/no-empty-keys': ['error'],

        //
        // - Règles désactivées
        //

        'json/no-unsafe-values': ['off'],
        'json/no-unnormalized-keys': ['off'],
        'json/sort-keys': ['off'],
        'json/top-level-interop': ['off'],
    },
};

export default [
    {
        files: ['**/*.json'],
        ignores: ['package-lock.json'],
        language: 'json/json',
        ...baseConfig,
    },
    {
        files: ['**/*.jsonc', '.vscode/*.json'],
        language: 'json/jsonc',
        languageOptions: {
            allowTrailingCommas: true,
        },
        ...baseConfig,
    },
    {
        files: ['**/*.json5'],
        language: 'json/json5',
        ...baseConfig,
    },
];
