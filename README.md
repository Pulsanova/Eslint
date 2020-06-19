# Pulsanova - Eslint Configs.

> Configurations [ESLint](http://eslint.org) pour les projets Pulsanova

## Pré-requis

Avant de pouvoir "consommer" les configurations ESLint Pulsanova, vous devez paramètrer NPM / Yarn pour 
qu'ils utilisent Github Packages pour les paquets `@pulsanova/*` (plus de détails à ce sujet [ici][github-packages-npm-doc]:

```bash
❯ npm login --registry=https://npm.pkg.github.com --scope=@pulsanova
```

## Configurations disponibles

_Note:_ Pour savoir quelle configuration utiliser, reportez-vous aux paragraphes  
"Quand l'utiliser" disponibles dans les différentes configurations.

### [`@pulsanova/react`](packages/react)  
Configuration générale pour le développement d'une application "browser" avec utilisation de React.

### [`@pulsanova/browser`](packages/browser)  
Configuration générale pour le développement d'une application "browser".

### [`@pulsanova/esnext`](packages/esnext)  
Configuration ESLint pour les projets ESNext (babel) avec utilisation de TypeScript.

### [`@pulsanova/base`](packages/base)  
Cette configuration correspond aux règles de base uniquement, sans spécificités propre à l'environnement.


[github-packages-npm-doc]: https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages
