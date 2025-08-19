# Pulsanova - ESLint: Configuration browser

> Configuration ESLint __pour les projets browser__ Pulsanova

Cette configuration étend la [configuration ESNext](../esnext) et ajoute des règles propre
au développement d'une application pour navigateur.

## Quand l'utiliser ?

Cette configuration est à utiliser quand __toutes__ les assertions suivantes sont exactes:
- Le code est transpilé avec Babel.
- Le code est destiné à être exécuté dans un navigateur.
- Le code n'utilise pas React, sans quoi il faut utiliser la config. [react](../react).
- Le code n'utilise pas Vue, sans quoi il faut utiliser la config. [vue](../vue).

## Installation

```bash
# - NPM
npm install --save-dev eslint @pulsanova/eslint-config-browser

# - Yarn
yarn add --dev eslint @pulsanova/eslint-config-browser
```

## Usage

Créez un fichier `eslint.config.mjs` et ajoutez-y la configuration suivante:

```js
import browserConfig from '@pulsanova/eslint-config-browser';

export default [
    ...browserConfig,
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
