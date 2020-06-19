'use strict';

module.exports = {
    // - Parseur
    parser: '@typescript-eslint/parser',
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: true,
    },

    // - Plugins
    plugins: ['@typescript-eslint'],

    // - Règles
    rules: {
        // - Requiert que les surcharge de méthodes soient placés à la suite.
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/adjacent-overload-signatures.md
        '@typescript-eslint/adjacent-overload-signatures': ['error'],

        // - Les types tableaux doivent toujours être déclarés de la même manière:
        //   - Pour les tableaux de type simple, la forme "array" doit être utilisée (e.g. `string[]`).
        //   - Pour les tableaux de type complexes, la forme "generic" doit être utilisée  (e.g. `Array<string | number>`).
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md
        '@typescript-eslint/array-type': ['error', {
            default: 'array-simple',
            readonly: 'array-simple',
        }],

        // - Interdit l'utilisation des directives `// @ts-nocheck` et `// @ts-check` qui n'ont pas
        //   de raison d'être utilisée car seuls les fichiers `.tsx?` doivent être typés (et non les fichiers `.js`).
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-ts-comment.md
        '@typescript-eslint/ban-ts-comment': ['error', {
            'ts-expect-error': false,
            'ts-ignore': false,
            'ts-nocheck': true,
            'ts-check': false,
        }],

        // - Interdit l'utilisation de commentaires TSLint (vu que ESLint est utilisé).
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-tslint-comment.md
        '@typescript-eslint/ban-tslint-comment': ['error'],

        // - Utilise l'utilisation de certains types:
        //   - Il ne faut pas utiliser de classes primitives (`Boolean`, `String`, `Number`, notez les majuscules) en tant que type.
        //   - Il faut utiliser le type `Record<string, any>` à la place de `Object`, `object` ou `{}`.
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md
        '@typescript-eslint/ban-types': ['error'],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
        'brace-style': ['off'],
        '@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: true }],

        // - Les littéraux exposés dans les classes doivent être déclarés en tant que propriétés.
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/class-literal-property-style.md
        '@typescript-eslint/class-literal-property-style': ['error', 'fields'],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-spacing.md
        'comma-spacing': ['off'],
        '@typescript-eslint/comma-spacing': ['error', { before: false, after: true }],

        // - Vérifie que les assertions de type (= le casting de type) est toujours effectué via `as` ('foo' as string).
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.md
        '@typescript-eslint/consistent-type-assertions': ['error', {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow',
        }],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/default-param-last.md
        'default-param-last': ['off'],
        '@typescript-eslint/default-param-last': ['error'],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
        'dot-notation': ['off'],
        '@typescript-eslint/dot-notation': ['error', {
            allowKeywords: true,
            allowPrivateClassPropertyAccess: false,
        }],

        // - Requiert que les fonctions et méthodes spécifient leur type de retour.
        //   A noter qu'il est aussi autorisé de spécifié le type de retour sur une éventuelle variable
        //   contenant la fonction plutôt que sur celle-ci.
        //
        //   Quelques exceptions:
        //   - Les fonctions retournant un autre fonctions n'ont pas l'obligation de typer leur retour.
        //   - Les fonctions déclarées en paramètre / en tant qu'expression.
        //
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
        '@typescript-eslint/explicit-function-return-type': ['error', {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: false,
        }],

        // - Requiert la déclaration de la visibilité sur chaque membre des classes, sauf le constructeur quand il est `public`.
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
        '@typescript-eslint/explicit-member-accessibility': ['error', {
            accessibility: 'explicit',
            ignoredMethodNames: [],
            overrides: {
                constructors: 'no-public',
            },
        }],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
        'func-call-spacing': ['off'],
        '@typescript-eslint/func-call-spacing': ['error', 'never'],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
        // NOTE: https://github.com/typescript-eslint/typescript-eslint/issues/1824
        'indent': ['off'],
        '@typescript-eslint/indent': ['error', 4, {
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

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/keyword-spacing.md
        'keyword-spacing': ['off'],
        '@typescript-eslint/keyword-spacing': ['error', {
            after: true,
            before: true,
            overrides: {
                case: { after: true },
                return: { after: true },
                throw: { after: true },
            },
        }],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
        'lines-between-class-members': ['off'],
        '@typescript-eslint/lines-between-class-members': ['error', 'always', {
            exceptAfterOverload: true,
            exceptAfterSingleLine: false,
        }],

        // - Normalise la déclaration des types et des interfaces:
        //   - Les interfaces doivent utiliser des points-virgules en tant que délimiteur, après TOUS les éléments (même sur une seule ligne).
        //   - Les types (e.g. `type Foo = {};`) doivent utiliser des virgules en tant que délimiteur, avec une virgule trainante lorsque multi-ligne.
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-delimiter-style.md
        '@typescript-eslint/member-delimiter-style': ['error', {
            multiline: { delimiter: 'comma', requireLast: true },
            singleline: { delimiter: 'comma', requireLast: false },
            overrides: {
                interface: {
                    multiline: { delimiter: 'semi', requireLast: true },
                    singleline: { delimiter: 'semi', requireLast: true },
                },
            },
        }],

        // - Les intefaces doivent utiliser le style `méthode` pour déclarer les ... méthodes.
        //   (e.g. `{ func(arg: string): number; }` et non `{ func: (arg: string) => number; }`)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/method-signature-style.md
        '@typescript-eslint/method-signature-style': ['error', 'method'],

        // - Les types doivent être déclarés en PascalCase.
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
        '@typescript-eslint/naming-convention': ['error', {
            selector: 'typeLike',
            format: ['PascalCase'],
        }],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
        'no-array-constructor': ['off'],
        '@typescript-eslint/no-array-constructor': ['error'],

        // - Requiert que `.toString()` soit uniquement appelé sur les objets qui fournissent des informations
        //   utiles lorsque convertis en chaîne. (et non `"[object Object]"`)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-base-to-string.md
        '@typescript-eslint/no-base-to-string': ['error'],

        // - Interdit l'utilisation d'assertions non-null (e.g. `foo!`) dans des contextes qui pourraient porter à confusion.
        //   (e.g. `foo! == bar` ressemble trop à `foo !== bar`)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-confusing-non-null-assertion.md
        '@typescript-eslint/no-confusing-non-null-assertion': ['error'],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
        'no-dupe-class-members': ['off'],
        '@typescript-eslint/no-dupe-class-members': ['error'],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
        'no-empty-function': ['off'],
        '@typescript-eslint/no-empty-function': ['error', {
            allow: ['arrowFunctions', 'functions', 'methods'],
        }],

        // - Interdit les assertions non-null (e.g. `foo!.bar`) qui ne sont pas utiles.
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-non-null-assertion.md
        '@typescript-eslint/no-extra-non-null-assertion': ['error'],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-semi.md
        'no-extra-semi': ['off'],
        '@typescript-eslint/no-extra-semi': ['error'],

        // - Interdit l'utilisation des classes comme des namespaces.
        //   Permet toutefois les classes contenant uniquement un constructeur, un décorateur ou des statiques.
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extraneous-class.md
        '@typescript-eslint/no-extraneous-class': ['error', {
            allowConstructorOnly: true,
            allowStaticOnly: true,
            allowWithDecorator: true,
            allowEmpty: false,
        }],

        // - Interdit l'utilisation de `void` en dehors des retours de fonctions et des types génériques.
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-invalid-void-type.md
        '@typescript-eslint/no-invalid-void-type': ['error', { allowInGenericTypeArguments: true }],

        // - Vérifie la déclaration des constructeurs dans les classes et `new()` dans les interfaces (et pas un mélange des deux).
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-new.md
        '@typescript-eslint/no-misused-new': ['error'],

        // - Interdit l'utilisation des namespaces, sauf dans les fichiers de définition.
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-namespace.md
        '@typescript-eslint/no-namespace': ['error', {
            allowDeclarations: false,
            allowDefinitionFiles: true,
        }],

        // - Interdit l'usage d'une assertion non-null (e.g. `foo!.bar`) après une chaîne optionnelle (e.g. `foo?.bar!`).
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-asserted-optional-chain.md
        '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],

        // - Interdit l'utilisation des prioriétés déclarées implicitement via des paramètres de méthode.
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-parameter-properties.md
        '@typescript-eslint/no-parameter-properties': ['error'],

        // - Avertisssement lors de l'utilisation d'un qualifier inutile dans les enums ou namespace (e.g. `enum A { B, C = A.B }` => `enum A { B, C = B }`).
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-qualifier.md
        '@typescript-eslint/no-unnecessary-qualifier': ['error'],

        // - Avertissement lors de la spécification d'un argument de type qui est déjà la valeur par défaut.
        //   (e.g. Pour `Type Foo<T = string> = T[];`, ceci n'est pas utile: `const foo: Foo<string> = ['a'];`, ceci suffit: `const foo: Foo = ['a'];`)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-arguments.md
        '@typescript-eslint/no-unnecessary-type-arguments': ['error'],

        // - Interdit les assertions de type (= type casting) qui ne changent pas le type de l'expression / sont inutiles.
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-assertion.md
        '@typescript-eslint/no-unnecessary-type-assertion': ['error', {
            typesToIgnore: [],
        }],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
        'no-unused-expressions': ['off'],
        'babel/no-unused-expressions': ['off'],
        '@typescript-eslint/no-unused-expressions': ['error', {
            allowShortCircuit: false,
            allowTaggedTemplates: false,
            allowTernary: true,
        }],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
        // NOTE: https://github.com/typescript-eslint/typescript-eslint/issues/1856
        'no-unused-vars': ['off'],
        '@typescript-eslint/no-unused-vars': ['error', {
            args: 'after-used',
            ignoreRestSiblings: true,
            vars: 'all',
        }],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
        // NOTE: https://github.com/typescript-eslint/typescript-eslint/issues/1856
        'no-use-before-define': ['off'],
        '@typescript-eslint/no-use-before-define': ['error', {
            classes: true,
            enums: true,
            functions: true,
            typedefs: true,
            variables: true,
        }],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
        'no-useless-constructor': ['off'],
        '@typescript-eslint/no-useless-constructor': ['error'],

        // - Vérifie que `as const` est utilisé à la place des types littéraux quand c'est possible.
        //   (e.g. `let foo: 2 = 2;` => `let foo = 2 as const;`)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-as-const.md
        '@typescript-eslint/prefer-as-const': ['error'],

        // - Interdit l'utilisation d'interfaces avec call signature pour définir le type d'une fonction simple.
        //   (e.g. `interface MyFunc { (): string }` => `type MyFunc = () => string;`)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-function-type.md
        '@typescript-eslint/prefer-function-type': ['error'],

        // - Préfère l'utilisation du mot-clé `namespace` plutôt que `module` pour éviter la confusion avec les modules ES2015.
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-namespace-keyword.md
        '@typescript-eslint/prefer-namespace-keyword': ['error'],

        // - Requiert l'utilisation du générique lors de l'utilisation de `Array#reduce` plutôt que de caster le type en deuxième paramètre.
        //   (e.g. `[].reduce(() => {}, {} as MyObject)` => [].reduce<MyObject>(() => {}, {})`)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-reduce-type-parameter.md
        '@typescript-eslint/prefer-reduce-type-parameter': ['error'],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
        'quotes': ['off'],
        'babel/quotes': ['off'],
        '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],

        // - Intedit l'addition de deux variables qui ne sont pas du même type (par exemple l'un une chaîne et l'autre un nombre).
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-plus-operands.md
        '@typescript-eslint/restrict-plus-operands': ['error', {
            checkCompoundAssignments: true,
        }],

        // - Interdit l'utilisation d'expression retournant autre chose que des chaînes ou des nombres dans les littéraux de gabarits.
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-template-expressions.md
        '@typescript-eslint/restrict-template-expressions': ['error', {
            allowNumber: true,
            allowAny: true,
            allowBoolean: false,
            allowNullish: false,
        }],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
        'no-return-await': ['off'],
        '@typescript-eslint/return-await': ['error', 'in-try-catch'],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
        'semi': ['off'],
        'babel/semi': ['off'],
        '@typescript-eslint/semi': ['error', 'always'],

        // (Prise en charge TypeScript, voir parent)
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
        'space-before-function-paren': ['off'],
        '@typescript-eslint/space-before-function-paren': ['error', {
            anonymous: 'never',
            asyncArrow: 'always',
            named: 'never',
        }],

        // - Requiert que les switchs soient exhaustifs lorsqu'ils utilisent un type `union` permettant de détecter ce genre d'erreur.
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/switch-exhaustiveness-check.md
        '@typescript-eslint/switch-exhaustiveness-check': ['error'],

        // - Interdit l'utilisation des références "triple slash" (e.g. `/// <reference path="foo" />`).
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/triple-slash-reference.md
        '@typescript-eslint/triple-slash-reference': ['error', {
            path: 'never',
            types: 'never',
            lib: 'never',
        }],

        // - Vérifie le style des déclarations de type:
        //   - Requiert qu'il n'y ait pas d'espace avant les deux-points (`foo:`).
        //   - Requiert qu'il y ait un espace après les deux-points (`: string`).
        //   - Requiert qu'il y ait un espace avant et après les flêches (`() => string`).
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/type-annotation-spacing.md
        '@typescript-eslint/type-annotation-spacing': ['error', {
            before: false,
            after: true,
            overrides: {
                arrow: { before: true, after: true },
            },
        }],

        // - Cette règle oblige a spécifier explicitement le type de certains éléments du code:
        //   - Les paramètres des fonctions, fonctions flêchées et des méthodes.
        //   - Les propriétés, que ce soit de classe ou des objets littéraux de type.
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/typedef.md
        '@typescript-eslint/typedef': ['error', {
            arrayDestructuring: false,
            arrowParameter: true,
            memberVariableDeclaration: true,
            objectDestructuring: false,
            parameter: true,
            propertyDeclaration: true,
            variableDeclaration: false,
            variableDeclarationIgnoreFunction: true,
        }],

        // - Vérifie que les surcharges de méthode ne peuvent pas être fusionnées en une seule signature.
        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unified-signatures.md
        '@typescript-eslint/unified-signatures': ['error'],

        //
        // - Règles qui sont en dehors de la responsabilité du type-checking?
        //   (devrait être prises en charges par d'autres configs / règles / plugins)
        //

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/await-thenable.md
        '@typescript-eslint/await-thenable': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-ordering.md
        '@typescript-eslint/member-ordering': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dynamic-delete.md
        '@typescript-eslint/no-dynamic-delete': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-parens.md
        '@typescript-eslint/no-extra-parens': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md
        '@typescript-eslint/no-floating-promises': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-for-in-array.md
        '@typescript-eslint/no-for-in-array': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implied-eval.md
        '@typescript-eslint/no-implied-eval': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-invalid-this.md
        '@typescript-eslint/no-invalid-this': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
        '@typescript-eslint/no-magic-numbers': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-promises.md
        '@typescript-eslint/no-misused-promises': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-assertion.md
        '@typescript-eslint/no-non-null-assertion': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-require-imports.md
        '@typescript-eslint/no-require-imports': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-this-alias.md
        '@typescript-eslint/no-this-alias': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md
        '@typescript-eslint/no-throw-literal': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-boolean-literal-compare.md
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars-experimental.md
        '@typescript-eslint/no-unused-vars-experimental': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-var-requires.md
        '@typescript-eslint/no-var-requires': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-for-of.md
        '@typescript-eslint/prefer-for-of': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-includes.md
        '@typescript-eslint/prefer-includes': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-nullish-coalescing.md
        '@typescript-eslint/prefer-nullish-coalescing': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-optional-chain.md
        '@typescript-eslint/prefer-optional-chain': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-regexp-exec.md
        '@typescript-eslint/prefer-regexp-exec': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-string-starts-ends-with.md
        '@typescript-eslint/prefer-string-starts-ends-with': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/promise-function-async.md
        '@typescript-eslint/promise-function-async': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-array-sort-compare.md
        '@typescript-eslint/require-array-sort-compare': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-await.md
        '@typescript-eslint/require-await': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/strict-boolean-expressions.md
        '@typescript-eslint/strict-boolean-expressions': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unbound-method.md
        '@typescript-eslint/unbound-method': ['off'],

        //
        // - Rgèles incompatible / non-optimisées.
        //

        // @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/exports-last.md
        'import/exports-last': ['off'],

        // @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/named.md
        'import/named': ['off'],

        // @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
        'import/order': ['off'],

        // @see https://eslint.org/docs/rules/valid-jsdoc
        'valid-jsdoc': ['off'],

        //
        // - Règles désactivées.
        //

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
        '@typescript-eslint/consistent-type-definitions': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
        '@typescript-eslint/explicit-module-boundary-types': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-interface.md
        '@typescript-eslint/no-empty-interface': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/init-declarations.md
        '@typescript-eslint/init-declarations': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md
        '@typescript-eslint/no-explicit-any': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-inferrable-types.md
        '@typescript-eslint/no-inferrable-types': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-type-alias.md
        '@typescript-eslint/no-type-alias': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-condition.md
        '@typescript-eslint/no-unnecessary-condition': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-assignment.md
        '@typescript-eslint/no-unsafe-assignment': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-call.md
        '@typescript-eslint/no-unsafe-call': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-member-access.md
        '@typescript-eslint/no-unsafe-member-access': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-return.md
        '@typescript-eslint/no-unsafe-return': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-readonly.md
        '@typescript-eslint/prefer-readonly': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-ts-expect-error.md
        '@typescript-eslint/prefer-ts-expect-error': ['off'],

        // @see https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-readonly-parameter-types.md
        '@typescript-eslint/prefer-readonly-parameter-types': ['off'],
    },
};
