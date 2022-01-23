## 2.1.(1-2) (2022-01-23)
- Fixe la version de `eslint-config-airbnb` car pose des soucis avec la règle `react/function-component-definition`.  
  (=> A investiguer lors de la prochaine mise à jour des dépendances)

## 2.1.0 (2022-01-23)
- Les fichiers de tests unitaires typés (e.g. `.ts`) peuvent utilisés des dépendances de développement
  sans erreur remontées par ESLint (comme c'était déjà le cas pour les fichiers de TU non typés).
- Les commentaires de désactivation ESLint inutiles sont maintenant signalés.
- Désactive la règle `import/no-import-module-exports` qui remonte des faux positifs avec les imports dynamiques.
- Réactive la règle `import/order` qui a été corrigée et fonctionne maintenant correctement avec les imports de types.
- Permet l'utilisation de `console.(log|error|etc.)` dans la config. Node.
- Il est maintenant possible d'appeler `.toString()` sur les instance d'`Error`.
- Améliore la prise en charge de la casse dans les types (#6).
- Désactive les règles `react/jsx-uses-react` et `react/react-in-jsx-scope`, plus nécessaires avec
  le nouveau mécanisme de transmormation du JSX.
- Prend en charge les hooks nommées `useUpdateEffect` comme étant des hooks avec dépendances.
- Améliore la règle vérifiant le nommage des components, ceux-ci :  
  - Doivent être en PascalCase, les components tout en majuscule sont interdits.
  - Peuvent être "namespacés" sont autorisés (e.g. `<Form.Input />`).
  - Ne doivent pas être "privés" (préfixés par un underscore), c'est souvent signe d'une mauvaise structuration.

## 2.0.(3-4) (2021-11-21)
- Désactive la règle `vue/no-undef-properties` qui rapporte trop de faux positifs.
- Corrige le linting des membres des types aliases et enums qui ne fonctionnait plus correctement depuis la 2.0.1.

## 2.0.2 (2021-11-21)
- Ajoute une dépendance manquante dans la configuration Vue.

## 2.0.1 (2021-11-21)
- Met à jour ESLint en version 8.3.0.
- Corrige un problème avec des règles du plugin Babel mal renommées.
- Corrige un problème avec le parseur utilisé pour la configuration Vue.

## 2.0.0 (2021-11-19)
- [Breaking] Utilise `exports` dans les `package.json`.
- [Breaking] Supprime la configuration Webpack dans la configuration Vue, ce n'était pas sa responsabilité. 
- [Breaking] La configuration `esnext` utilise maintenant le dernier parser Babel.  
  Vous devez donc spécifier `parserOptions: { babelOptions: { configFile: "babel.config.js" } }`
  en remplacement la valeur de `configFile` par le chemin vers votre configiration Babel dans votre 
  configuration ESLint pour l'utiliser (sinon le parsing ne sera pas adapté à votre configuration Babel).
- Ajoute un patch ESLint corrigeant la prise en charge des plugins chargés dans les configs. partagées.
- Utilise maintenant la dernière version d'ECMAScript pour le parsing de base.
- Ajoute la prise en charge de l'extension `.cjs`.
- Améliore la prise en charge de l'extension `.mjs`.
- Met à jour les dépendances (et notamment ESLint en version 8.x).
- Ajoute une configuration pour Node.
- Nouvelles règles:
  - Pas de propriétés privées non utilisées dans les classes.
  - Les exports de type doivent toujours être effectués via `export type ...`.
  - (TypeScript) Empêche l'utilisation de l'opérateur `void` lorsque c'est inutile / déjà le cas.
  - (TypeScript) Vérifie qu'une assertion non-null n'est pas utilisé avec un opérateur null coalescent (e.g. `foo! ?? 'bar'`).
  - (React) Interdit l'utilisation de namespaces dans le JSX (e.g. `<ns:Comp />`) car non supportés.
  - (React / Vue) Empêche l'utilisation de valeurs invalides pour certains attributs HTML (`rel` uniquement pour le moment).
  - (Vue) Interdit l'utilisation de `v-text` au profit des `children`.
  - (Vue) Interdit l'utilisation d'attributs invalides sur les elements `<template>`.
  - (Vue) Interdit l'utilisation de propriétés non définies dans les components.
  - (Vue) Empêche l'utilisation de propriétés computed dans `data() {}` vu que celles-ci ne sont pas encore initialisées.
  - (Vue) Interdit l'usage de l'attribut `tag` (déprécié en Vue 3.x) dans les `<RouterLink>` (ou `<router-link>`).
  - (Vue) Contrôle la gestion des nouvelles lignes dans la déclation des blocks Vue (`<template>`, `<script>`.
  - (Vue) Empêche l'utilsation de chaînes quotées inutilement (e.g. `{{ 'Hello' }}`).

## 1.3.2 (2021-09-18)
- Corrige le parsing de TypeScript dans la configuration Vue.

## 1.3.1 (2021-09-04)
- Met à jour la prise en charge de TypeScript.

## 1.3.0 (2021-08-28)
- Ajoute la prise en charge du chargement des fichiers `.vue` sans spécifier l'extension.

## 1.2.1 (2021-08-14)
- Corrige les règles Vue.

## 1.2.0 (2021-08-14)
- Met à jour les paquets.
- Ne limite plus le nombre d'éléments max. par ligne pour la règle `object-curly-newline`.
- Ajoute la configuration pour Vue.
- Nouvelles règles:  
  - Empêche l'utilisation de `import ... from` avec les exports CommonJS (`module.exports = ...`, etc.).
  - Empêche l'import de paquets (présence d'un `package.json`) via des imports relatifs.
  - Préfère l'utilisation du mot-clé `this` en type de retour (qui a une signification particulière) plutôt que le nom de classe.
  - Empêche l'utilisation de valeur non stables en tant que contexte React.
  - Empêche l'utilisation de composants impbriqués instables.

## 1.1.1 (2020-12-27)
- Désactive la rêgle `no-undef` dans les fichiers TypeScript.  
  (comme conseillé [ici](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors))

## 1.1.0 (2020-12-26)
- Met à jour les dépendances (et donc ajoute le support de Typescript 4.x).
- Met à jour la version d'ecmascript supportée (=> 2021).
- Met à jour la règle `@typescript-eslint/ban-ts-comment`: Un commentaire explicatif 
  est maintenant exigé lors de l'utilisation de `// @ts-expect-error` et `// @ts-ignore`.
- Nouvelles règles:
  - Les imports de type doivent toujouus être effectués via `import type ...`.
  - Interdit les séquences d'échappement \8 et \9 dans les chaînes.
  - Empêche l'utilisation du chaînage optionnel dans les contextes ou `undefined` n'est pas permis.
  - Les définitions d'objets avec membres non connus doivent être effectuées via `Record<..., ...>` (et non `{ [key: ...]: ... }`).
  - Empêche l'utilisation d'expressions de type `void` dans des contextes déroutants.
  - Empêche l'utilisation de `as` là ou `!` serait plus approprié.

## 1.0.0 (2020-08-11)
- Première version "stable".
- Met à jour les dépendances.
- Ajoute les fichiers `postcss.config.js` et `next.config.js` aux 
  fichiers ignorés par la règle `import/no-extraneous-dependencies`.
- Nouvelles règles:  
  - Vérifie que toutes les valeurs des enum sont bien explicitement déclarées.

## 0.3.1 (2020-07-17)
- Met à jour le `yarn.lock` racine.

## 0.3.0 (2020-07-17)
- Met à jour les dépendances.
- Met à jour ESLint en version 7.4.0.
- Met à jour la configuration typescript avec des nouveaux overwrites de la configuration ESLint de base.
- Nouvelles règles:  
  - Interdit le retour dans la création de promesses (retour qui est de toute façon ignoré).
  - Interdit les boucles avec un corps qui n'autorisent qu'une itération.

## 0.2.0 (2020-07-16)
- Corrige la règle `jsx-a11y/anchor-is-valid` en enlevant le contrainte `[href|to]` sur les components `<Link />`.  
  (En effet, ces components, dans certains cas, n'ont pas nécessairement besoin de cet attribut (e.g. Next.js))
- Corrige la règle `quotes` dans la configuration Typescript qui était mal configurée.

## 0.1.6 (2020-06-20)
- [Configuration ESNext] Corrige la règle `babel/quotes` qui était mal configurée.

## 0.1.5 (2020-06-19)
- [Configuration React] Met à jour les dépendances.

## 0.1.1 -> 0.1.4 (2020-06-19)
- Corrige la publication.

## 0.1.0 (2020-06-19)
- Première version.
