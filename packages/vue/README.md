# Pulsanova - ESLint: Configuration Vue

> Configuration ESLint __pour les projets browser__ Pulsanova __utilisant Vue 2__

Cette configuration étend la [configuration browser](../browser) et ajoute des règles propre
au développement d'une application React.

## Quand l'utiliser ?

Cette configuration est à utiliser quand __toutes__ les assertions suivantes sont exactes:
- Le code est transpilé avec Babel.
- Le code est destiné à être exécuté dans un navigateur.
- Le code utilise Vue.

## Installation

```bash
yarn add --dev eslint
yarn add --dev @pulsanova/eslint-config-vue
```

## Usage

Créez un fichier `.eslintrc.js` et ajoutez-y la configuration suivante:

```js
'use strict';

modyle.exports = {
    extends: '@pulsanova/vue',
    parserOptions: { 
        babelOptions: {
            configFile: '[Chemin vers votre configuration Babel]' 
        },

        // - Si votre projet utilise TypeScript...
        project: '[Chemin vers votre configuration TypeScript]',
        tsconfigRootDir: __dirname,
    },
};
```

## Règles

- La [configuration browser](../browser)
- Les [règles recommandées par le plugin Vue pour ESLint](https://eslint.vuejs.org/rules/)
- Voir directement [le code source](index.js) des règles pour plus d'informations quant
  aux règles activées / overwritées dans cette configuration.
