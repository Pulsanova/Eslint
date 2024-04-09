# Pulsanova - ESLint: Configuration ESNext

> Configuration ESLint __pour les projets ESNext (babel)__ Pulsanova

Cette configuration étend la [configuration de base](../base) et ajoute des règles propre
au développement d'une application avec [Babel](https://babeljs.io) et [TypeScript](https://www.typescriptlang.org).

## Quand l'utiliser ?

Cette configuration est à utiliser quand __toutes__ les assertions suivantes sont exactes:
- Le code est transpilé avec Babel.
- Le code n'est pas destiné aux navigateurs (sans quoi => Config. [browser](../browser)).

## Installation

```bash
# - NPM
npm install --save-dev eslint @pulsanova/eslint-config-esnext

# - Yarn
yarn add --dev eslint @pulsanova/eslint-config-esnext
```

## Usage

Créez un fichier `.eslintrc.js` et ajoutez-y la configuration suivante:

```js
'use strict';

module.exports = {
    extends: '@pulsanova/esnext',
    parserOptions: {
        babelOptions: {
            configFile: '[Chemin vers votre configuration Babel]',
        },

        // - Si votre projet utilise TypeScript...
        project: '[Chemin vers votre configuration TypeScript]',
        tsconfigRootDir: __dirname,
    },
};
```
