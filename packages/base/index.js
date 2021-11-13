'use strict';

module.exports = {
    env: { es6: true },

    // - Parseur
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'script',
    },

    // - Règles
    extends: 'airbnb-base',
    rules: {
        // - Oblige à retourner une valeur dans les callbacks des fonctions de tableau (`map`, `reduce`, ...).
        //   Les retours implicitent ne sont pas autorisés (l'absence de retour qui équivaut à `undefined`).
        // @see https://eslint.org/docs/rules/array-callback-return
        'array-callback-return': ['error', { allowImplicit: false }],

        // - Interdit l'omission des accolades, même pour les déclarations sur une seule ligne.
        // @see https://eslint.org/docs/rules/curly
        'curly': ['error', 'all'],

        // - Le nom des fonctions doit matcher le nom des variables / propriétés
        //   à laquelle elles sont assignées (e.g. `const myFunc = function myFunc() {};`).
        // @see https://eslint.org/docs/rules/func-name-matching
        'func-name-matching': ['error', 'always', {
            considerPropertyDescriptor: true,
            includeCommonJSModuleExports: false,
        }],

        // - Les fonctions doivent toujours être déclarées sous forme d'expression.
        //
        // @example
        // ```js
        // const foo = function() {
        //     // ...
        // };
        //
        // // ET NON:
        // function foo() {
        //     // ...
        // }
        // ```
        //
        // @see https://eslint.org/docs/rules/func-style
        'func-style': ['error', 'expression'],

        // - Les fonctions dont le nom ne peut être déduit doivent être nommées explicitement.
        //   Ceci permet un debugging plus simple car les fonctions sont nommés dans la console développeur des navigateurs.
        // @see https://eslint.org/docs/rules/func-names
        'func-names': ['warn', 'as-needed'],

        // - Les accesseurs et mutateurs doivent être groupés, avec l'accesseur (getter) avant le mutateur (setter).
        // @see https://eslint.org/docs/rules/grouped-accessor-pairs
        'grouped-accessor-pairs': ['error', 'getBeforeSet'],

        // - Interdit l'utilisation de dépendances "extra" (non référencées en tant que dépendances de production)
        //   Cette version ajuste les exceptions en ajoutant notamment la prise en charge des fichiers `spec.js`.
        // @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
        'import/no-extraneous-dependencies': ['error', {
            devDependencies: [
                'tests/**',
                '**/__tests__/**',
                '**/__mocks__/**',
                '**/*.{test,spec}.js',
                '**/{test,spec}.js',
                '**/gulpfile.js',
                '**/vue.config.js',
                '**/rollup.config.js',
                '**/webpack.config.js',
                '**/postcss.config.js',
                '**/next.config.js',
                '**/.eslintrc.js',
            ],
            optionalDependencies: false,
        }],

        // - L'indentation doit être de 4 espaces (pas de tabs).
        // @see https://eslint.org/docs/rules/indent
        'indent': ['error', 4, {
            ArrayExpression: 1,
            CallExpression: { arguments: 1 },
            FunctionDeclaration: { parameters: 1, body: 1 },
            FunctionExpression: { parameters: 1, body: 1 },
            ImportDeclaration: 1,
            ObjectExpression: 1,
            SwitchCase: 1,
            VariableDeclarator: 1,
            flatTernaryExpressions: false,
            ignoreComments: false,
            outerIIFEBody: 1,

            // https://github.com/benjamn/ast-types/blob/master/def/jsx.ts
            ignoredNodes: [
                'JSXElement',
                'JSXElement > *',
                'JSXAttribute',
                'JSXIdentifier',
                'JSXNamespacedName',
                'JSXMemberExpression',
                'JSXSpreadAttribute',
                'JSXExpressionContainer',
                'JSXOpeningElement',
                'JSXClosingElement',
                'JSXFragment',
                'JSXOpeningFragment',
                'JSXClosingFragment',
                'JSXText',
                'JSXEmptyExpression',
                'JSXSpreadChild',
            ],
        }],

        // - Les lignes ne doivent pas faire plus de 120 caractères de long.
        //   Le dépassement de cette limite est toutefois autorisé dans les commentaires,
        //   urls et les chaînes de caractères.
        // @see https://eslint.org/docs/rules/max-len
        'max-len': ['error', 120, 4, {
            ignoreComments: true,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreTrailingComments: true,
            ignoreUrls: true,
        }],

        // - Empêche certains exports nommés qui pourraient porter à confusion:
        //   - `then`: Cet export causeraient beaucoup de confusion dans les imports dynamiques.
        // https://eslint.org/docs/rules/no-restricted-exports
        'no-restricted-exports': ['error', {
            restrictedNamedExports: ['then'],
        }],

        // - Pas de déclaration implicites dans le scope global
        //
        //   Lors de la déclaration de fonctions ou variables dans le scope global,
        //   il faut spécifier explicitement `window.(...)` (ou bien `global.(...)`).
        //
        //   __Note:__ Cette règle s'applique uniquement pour le code avec un `parserOptions.sourceType`
        //   à `script` (= script browser). (Les modules ayant leurs propres scope)
        //
        // @see https://eslint.org/docs/rules/no-implicit-globals
        'no-implicit-globals': ['error'],

        // - Pas de propriétés privées non utilisées dans les classes.
        // @see https://eslint.org/docs/rules/no-unused-private-class-members
        'no-unused-private-class-members': ['error'],

        // - Les objets littéraux doivent avoir des retours à la ligne cohérents.
        // @see https://eslint.org/docs/rules/object-curly-newline
        'object-curly-newline': ['error', {
            ObjectExpression: { multiline: true, consistent: true },
            ObjectPattern: { multiline: true, consistent: true },
            ImportDeclaration: { multiline: true, consistent: true },
            ExportDeclaration: { multiline: true, consistent: true },
        }],

        // - Les opérateurs autour desquels il y a un retour à la ligne doivent être situés à la fin de
        //   la ligne avant le retour à la ligne.
        //
        //   Il y a quelques exceptions à cette règle:
        //   - Les `=` ne doivent jamais être immédiatement précédé ou suivi d'un retour à la ligne.
        //   - Les `?` et `:` (conditions ternaires) doivent être situés avant.
        //
        // @see https://eslint.org/docs/rules/operator-linebreak
        'operator-linebreak': ['error', 'after', {
            overrides: {
                '=': 'none',
                '?': 'before',
                ':': 'before',
            },
        }],

        // - Préfère les fonctions flêchées en tant que callback sauf pour les fonctions nommées.
        // @see https://eslint.org/docs/rules/prefer-arrow-callback
        'prefer-arrow-callback': ['error', {
            allowNamedFunctions: true,
            allowUnboundThis: true,
        }],

        // - Préfère l'utilisation des groupes de capture dans les regex plutôt
        //   que la récupérations des correspondances via leurs indexes.
        // @see https://eslint.org/docs/rules/prefer-named-capture-group
        'prefer-named-capture-group': ['error'],

        // - Des "quotes" simples doivent être utilisées partout, sauf pour tout ce qui
        //   est chaîne de caractères "non-système" (templates, phrases lues, ...)
        //   qui elles doivent être quotées via des littéraux de gabarits.
        //
        // @example
        // ```js
        // const monObjet = { 'first-name': `Jean` };
        // ```
        //
        // @see https://eslint.org/docs/rules/quotes
        'quotes': ['error', 'single', { allowTemplateLiterals: true }],

        // - S'assure de la cohérence dans l'utilisation des quotes dans les objets littéraux.
        // @see https://eslint.org/docs/rules/quote-props
        'quote-props': ['error', 'consistent'],

        // - Interdit les assignements qui peuvent mener à des "races conditions" dû à l'usage de `await` ou `yield`.
        // @see https://eslint.org/docs/rules/require-atomic-updates
        'require-atomic-updates': ['error'],

        // - Le mode strict doit être explicitement déclaré.
        // @see https://eslint.org/docs/rules/strict
        'strict': ['error', 'safe'],

        //
        // - Règles désactivées.
        //

        // @see https://eslint.org/docs/rules/id-denylist
        'id-denylist': ['off'],

        // @see https://github.com/benmosher/eslint-plugin-import/issues/645
        'import/order': ['off'],

        // @see https://eslint.org/docs/rules/no-continue
        'no-continue': ['off'],

        // @see https://eslint.org/docs/rules/no-param-reassign
        'no-param-reassign': ['off'],

        // @see https://eslint.org/docs/rules/no-underscore-dangle
        'no-underscore-dangle': ['off'],
    },
};
