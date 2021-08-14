'use strict';

module.exports = {
    // - Parseur
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
    },


    // - Règles
    rules: {
        // - Pas d'utilisation de l'extension `.ts` mais uniquement `.tsx` pour les fichiers contenant du JSX.
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-filename-extension': ['error', {
            allow: 'as-needed',
            extensions: ['.tsx'],
        }],
    },
};
