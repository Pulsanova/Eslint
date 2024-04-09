'use strict';

module.exports = {
    // - Parseur
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
        extraFileExtensions: ['.vue'],
        parser: '@typescript-eslint/parser',
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
};
