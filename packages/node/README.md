# Pulsanova - ESLint: Configuration Node

> Configuration ESLint __pour les projets Node__ Pulsanova

Cette configuration étend la [configuration de base](../base) et ajoute des règles propre
au développement d'une application sous environnement Node.

Elle expose plusieurs points d'entrée :

- `@pulsanova/eslint-config-node` :  
  Un environnement Node natif (ESM moderne, règles spécifiques au runtime Node).
- `@pulsanova/eslint-config-node/legacy` :  
  Un environnement Node legacy en CommonJS.

## Quand l'utiliser ?

Cette configuration est à utiliser quand __toutes__ les assertions suivantes sont exactes:
- Le code a été développé pour être utilisé dans un contexte Node.

## Installation

```bash
# - NPM
npm install --save-dev eslint @pulsanova/eslint-config-node

# - Yarn
yarn add --dev eslint @pulsanova/eslint-config-node
```

## Usage

Créez un fichier `eslint.config.mjs` et ajoutez-y la configuration suivante:

```js
export { default } from '@pulsanova/eslint-config-node';
```

Ou, pour les projets legacy en CommonJs :

```js
export { default } from '@pulsanova/eslint-config-node/legacy';
```
