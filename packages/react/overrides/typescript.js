'use strict';

module.exports = {
    // - Règles
    rules: {
        // - Pas d'utilisation de l'extension `.ts` mais uniquement `.tsx` pour les fichiers React.
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-filename-extension': ['error', {
            allow: 'as-needed',
            extensions: ['.tsx'],
        }],
    },
};
