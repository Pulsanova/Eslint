# Pulsanova - ESLint: Configuration browser

> Configuration ESLint __pour les projets browser__ Pulsanova

Cette configuration étend la [configuration de base](../base) et ajoute des règles propre
au développement d'une application destinée à un navigateur.

Elle expose plusieurs points d'entrée :

- `@pulsanova/eslint-config-browser` :  
  Un environnement navigateur "classique" (scripts chargés via `<script>`, sans bundler).
- `@pulsanova/eslint-config-browser/esnext` :  
  Un environnement navigateur __transpilé / bundlé__.

## Quand l'utiliser ?

Cette configuration est à utiliser quand __toutes__ les assertions suivantes sont exactes:
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

Créez un fichier `eslint.config.mjs` et ajoutez-y la configuration suivante.

Pour un environnement navigateur « classique » (non transpilé) :

```js
export { default } from '@pulsanova/eslint-config-browser';
```

Pour une application transpilée / bundlée :

```js
export { default } from '@pulsanova/eslint-config-browser/esnext';
```
