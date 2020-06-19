# Pulsanova - ESLint: Configuration browser

> Configuration ESLint __pour les projets browser__ Pulsanova

Cette configuration étend la [configuration ESNext](../esnext) et ajoute des règles propre
au développement d'une application pour navigateur.

## Quand l'utiliser ?

Cette configuration est à utiliser quand __toutes__ les assertions suivantes sont exactes:
- Le code est transpilé avec Babel.
- Le code est destiné à être exécuté dans un navigateur.
- Le code n'utilise pas React, sans quoi il faut utiliser la config. [react](../react).

## Installation

```bash
yarn add --dev eslint
yarn add --dev @pulsanova/eslint-config-browser
```

## Usage

Créez un fichier `.eslintrc.json` et ajoutez-y la configuration suivante:

```json
{
    "extends": "@pulsanova/browser"
}
```

## Règles

- _Toutes les règles de la [configuration ESNext](../esnext)_
- Voir directement [le code source](index.js) des règles pour plus d'informations quant  
  aux règles activées / overwritées dans cette configuration.
