# Pulsanova - ESLint: Configuration de base

> Configuration ESLint __de base__ pour les projets Pulsanova

## Quand l'utiliser ?

Cette configuration est à utiliser quand __toutes__ les assertions suivantes sont exactes:
- Le code est écrit en ES6+.
- Le code n'est pas compilé / transpilé, sinon voir la config. [esnext](../esnext).

## Installation

```bash
# - NPM
npm install --save-dev eslint @pulsanova/eslint-config-base

# - Yarn
yarn add --dev eslint @pulsanova/eslint-config-base
```

## Usage

Créez un fichier `.eslintrc.json` et ajoutez-y la configuration suivante:

```json
{
    "extends": "@pulsanova/base"
}
```
