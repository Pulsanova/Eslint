# Pulsanova - ESLint: Configuration React

> Configuration ESLint __pour les projets browser__ Pulsanova __utilisant React__

Cette configuration étend la [configuration browser](../browser) et ajoute des règles propre
au développement d'une application React.

## Quand l'utiliser ?

Cette configuration est à utiliser quand __toutes__ les assertions suivantes sont exactes:
- Le code est destiné à être exécuté dans un navigateur.
- Le code utilise React.

## Installation

```bash
# - NPM
npm install --save-dev eslint @pulsanova/eslint-config-react

# - Yarn
yarn add --dev eslint @pulsanova/eslint-config-react
```

## Usage

Créez un fichier `eslint.config.mjs` et ajoutez-y la configuration suivante:

```js
export { default } from '@pulsanova/eslint-config-react';
```
