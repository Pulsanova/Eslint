# Pulsanova - ESLint: Configuration de base

> Configuration ESLint __de base__ pour les projets Pulsanova

## Quand l'utiliser ?

Cette configuration est à utiliser quand __toutes__ les assertions suivantes sont exactes:
- Le code est écrit en ES6+.
- Le code n'est pas compilé / transpilé, sinon voir la config. [esnext](../esnext).

## Installation

```bash
yarn add --dev eslint
yarn add --dev @pulsanova/eslint-config-base
```

## Usage

Créez un fichier `.eslintrc.json` et ajoutez-y la configuration suivante:

```json
{
    "extends": "@pulsanova/base"
}
```

## Règles

Cette configuration étend la [Configuration de base AirBnb][airbnb-base-rules].

Il est donc necessaire de connaitre le "[Airbnb JavaScript Style Guide][airbnb-style-guide]" avant
d'utiliser cette configuration.

Voir directement [le code source](index.js) des règles pour plus d'informations quant
aux règles activées / overwritées dans cette configuration.  
Celui-ci (le code source) contient des commentaires sur le pourquoi de toutes les règles
activées / overwritées par rapport à la configuration de base AirBnb.

[airbnb-style-guide]: https://github.com/airbnb/javascript
[airbnb-base-rules]: https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base
