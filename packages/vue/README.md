# Pulsanova - ESLint: Configuration Vue

> Configuration ESLint __pour les projets browser__ Pulsanova __utilisant Vue__

Cette configuration étend la [configuration browser](../browser) et ajoute des règles propre
au développement d'une application Vue.

## Quand l'utiliser ?

Cette configuration est à utiliser quand __toutes__ les assertions suivantes sont exactes:
- Le code est transpilé avec Babel.
- Le code est destiné à être exécuté dans un navigateur.
- Le code utilise Vue.

## Installation

```bash
# - NPM
npm install --save-dev eslint @pulsanova/eslint-config-vue

# - Yarn
yarn add --dev eslint @pulsanova/eslint-config-vue
```

## Usage

Créez un fichier `eslint.config.mjs` et ajoutez-y la configuration suivante:

```js
import vueConfig from '@pulsanova/eslint-config-vue';

export default [
    ...vueConfig,
    {
        languageOptions: {
            parserOptions: {
                babelOptions: {
                    configFile: '[Chemin vers votre configuration Babel]',
                },
            },
        },
    },
];
```
