## 1.1.0 (unreleased)
- Met à jour les dépendances (et donc ajoute le support de Typescript 4.x).

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
