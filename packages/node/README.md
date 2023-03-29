# Pulsanova - ESLint: Configuration node

> Configuration ESLint __pour les projets Node__ Pulsanova

Cette configuration étend la [configuration de base](../base) et ajoute des règles propre
au développement d'une application sous environnement Node.

## Quand l'utiliser ?

Cette configuration est à utiliser quand __toutes__ les assertions suivantes sont exactes:
- Le code a été développé pour être utilisé dans un contexte Node.
- Le code n'utilise pas Babel, sans quoi il faut utiliser la config. [esnext](../esnext).

## Installation

```bash
# - NPM
npm install --save-dev eslint @pulsanova/eslint-config-node

# - Yarn
yarn add --dev eslint @pulsanova/eslint-config-node
```

## Usage

Créez un fichier `.eslintrc.json` et ajoutez-y la configuration suivante:

```json
{
    "extends": "@pulsanova/node"
}
```
