# Pulsanova - ESLint: Configuration React

> Configuration ESLint __pour les projets browser__ Pulsanova __utilisant React__

Cette configuration étend la [configuration browser](../browser) et ajoute des règles propre
au développement d'une application React.

## Quand l'utiliser ?

Cette configuration est à utiliser quand __toutes__ les assertions suivantes sont exactes:
- Le code est transpilé avec Babel.
- Le code est destiné à être exécuté dans un navigateur.
- Le code utilise React.

## Installation

```bash
yarn add --dev eslint
yarn add --dev @pulsanova/eslint-config-react
```

## Usage

Créez un fichier `.eslintrc.json` et ajoutez-y la configuration suivante:

```json
{
    "extends": "@pulsanova/react"
}
```

## Règles

- La [configuration browser](../browser)
- La [configuration AirBnb spécifique à React][airbnb-react-rules]
- La [configuration AirBnb spécifique à l'accessibilité dans le JSX][airbnb-jsx-a11y-rules]
- Voir directement [le code source](index.js) des règles pour plus d'informations quant
  aux règles activées / overwritées dans cette configuration.

[airbnb-react-rules]: https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react.js
[airbnb-jsx-a11y-rules]: https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react-a11y.js
