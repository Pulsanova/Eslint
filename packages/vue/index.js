'use strict';

// - Corrige la prise en charge des plugins chargés dans les configs. partagées.
// @see https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    // - Parseur
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
        parser: require.resolve('@babel/eslint-parser'),
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        vueFeatures: {
            interpolationAsNonHTML: false,
        },
    },

    // - Configuration
    settings: {
        'import/extensions': [
            '.vue',
            '.mjs',
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.d.ts',
        ],
        'import/resolver': {
            node: {
                extensions: [
                    '.mjs',
                    '.cjs',
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx',
                    '.d.ts',
                    '.json',
                ],
            },
        },
        'react': {
            pragma: 'h',
            fragment: 'Fragment',

            // NOTE: Permet de désactiver l'alerte concernant la détection de React tout en
            // nous permettant d'utiliser les règles relatives au JSX.
            version: '999.999.999',
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
        },
    },

    // - Plugins
    plugins: ['vue'],

    // - Règles
    extends: [
        'eslint-plugin-vue/lib/configs/recommended',
        '@pulsanova/eslint-config-browser',
        'eslint-config-airbnb/rules/react',
    ].map(require.resolve),
    rules: {
        // - L'extension ne doit pas être spécifiée dans les imports de fichiers contenant du JavaScript.
        //   (Le support des fichiers `.vue` est ajouté dans cet overwrite)
        // @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
        'import/extensions': ['error', 'ignorePackages', {
            vue: 'never',
            js: 'never',
            jsx: 'never',
            mjs: 'never',
            ts: 'never',
            tsx: 'never',
        }],

        // - Le HTML de vue doit être indenté avec 4 espaces.
        // @see https://eslint.vuejs.org/rules/html-indent.html
        'vue/html-indent': ['error', 4],

        // - Les méthodes de classe doivent utiliser `this` ou être extraites dans des fonctions pures externes à la classe.
        // @see https://eslint.org/docs/rules/class-methods-use-this
        'class-methods-use-this': ['error', {
            enforceForClassFields: true,
            exceptMethods: [],
        }],

        // - Pas d'utilisation de l'extension `.jsx` mais uniquement `.js` ou `.tsx`.
        //   Cette extension (`.jsx`) n'est plus recommandée (voir lien ci-dessous), il n'y a pas de raison de continuer à l'utiliser.
        // @see https://github.com/facebookincubator/create-react-app/issues/87#issuecomment-234627904
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-filename-extension': ['error', {
            allow: 'always',
            extensions: ['.js', '.tsx'],
        }],

        // - Normalisation des noms des events handlers en JSX.
        //
        //   - Les méthodes "event handlers" dans les classes `React.Component` doivent être préfixées avec `handle`.
        //     (e.g. `<MyComponent handleChange={this.handleChange} />`)
        //
        //   - Les props "event handlers" doivent être préfixées avec `on`.
        //     (e.g. `<MyComponent onChange={this.props.onFoo} />`)
        //
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
        'react/jsx-handler-names': ['error', {
            eventHandlerPrefix: 'handle',
            eventHandlerPropPrefix: 'on',
            checkInlineFunction: false,
        }],

        // - Le JSX doit être indenté avec 4 espaces.
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
        'react/jsx-indent': ['error', 4],

        // - Les props sur plusieurs lignes doivent être indentées avec 4 espaces.
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
        'react/jsx-indent-props': ['error', 4],

        // - Utilisation de PascalCase (UpperCamelCase) pour nommé les components.
        //   Les components doivent être en PascalCase, les components tout en majuscule sont interdits.
        //
        //    @example
        //    ```jsx
        //    <MyComponent />
        //    <HTMLComponent />
        //
        //    // ET NON:
        //
        //    <My_component />
        //    <MY_COMPONENT />
        //    ```
        //
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
        'react/jsx-pascal-case': ['error', {
            allowLeadingUnderscore: true,
            allowAllCaps: false,
            ignore: [],
        }],

        // - Empêche l'utilisation de valeurs invalides pour certains attributs HTML :
        //   - Vérifie que la valeur des attributs `rel` est correcte en fonction de la balise l'utilisant.
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-invalid-html-attribute.md
        'react/no-invalid-html-attribute': ['error', ['rel']],

        // - Cf. la règle `array-bracket-spacing` (cette version ne fait que prendre en charge la règle dans les `<template>`).
        // @see https://eslint.org/docs/rules/arrow-spacing
        // @see https://eslint.vuejs.org/rules/array-bracket-spacing.html
        'vue/array-bracket-spacing': ['error', 'never'],

        // Cf. la règle `arrow-spacing` (cette version ne fait que prendre en charge la règle dans les `<template>`).
        // @see https://eslint.org/docs/rules/arrow-spacing
        // @see https://eslint.vuejs.org/rules/arrow-spacing.html
        'vue/arrow-spacing': ['error', { before: true, after: true }],

        // - S'assure de la non utilisation des tirets pour les props de components.
        // @see https://eslint.vuejs.org/rules/attribute-hyphenation.html
        'vue/attribute-hyphenation': ['error', 'never', {
            ignore: [],
        }],

        // Cf. la règle `block-spacing` (cette version ne fait que prendre en charge la règle dans les `<template>`).
        // @see https://eslint.org/docs/rules/block-spacing
        // @see https://eslint.vuejs.org/rules/block-spacing
        'vue/block-spacing': ['error', 'always'],

        // - Contrôle la gestion des nouvelles lignes dans la déclation des blocks Vue (`<template>`, `<script>`) :
        //   - Il doit toujours y avoir un saut de ligne avant et après le contenu des blocks.
        //   - Il ne doit pas y avoir de lignes vides au début et à la fin des blocks.
        // @see https://eslint.vuejs.org/rules/block-tag-newline
        'vue/block-tag-newline': ['error', {
            singleline: 'always',
            multiline: 'always',
            maxEmptyLines: 0,
        }],

        // Cf. la règle `brace-style` (cette version ne fait que prendre en charge la règle dans les `<template>`).
        // @see https://eslint.org/docs/rules/brace-style
        // @see https://eslint.vuejs.org/rules/brace-style
        'vue/brace-style': ['error', '1tbs', { allowSingleLine: true }],

        // - Ordre des éléments dans les fichiers vue: <template>, <style> puis <script>.
        // @see https://eslint.vuejs.org/rules/component-tags-order.html
        'vue/component-tags-order': ['error', {
            order: ['template', 'style', 'script'],
        }],

        // - Contrôle le positionnement du premier attribut dans les composants :
        //   - Si le composant est sur une ligne :
        //   - Si le composant est sur plusieurs lignes :
        // @see https://eslint.vuejs.org/rules/first-attribute-linebreak.html
        'vue/first-attribute-linebreak': ['error', {
            singleline: 'beside',
            multiline: 'below',
        }],

        // - Utilise les auto-fermeture pour tous les types de tags.
        //   (même si en HTML natif on ne le fait pas pour les `<div>` par exemple)
        // @see https://eslint.vuejs.org/rules/html-self-closing.html
        'vue/html-self-closing': ['error', {
            svg: 'always',
            math: 'always',
            html: {
                component: 'always',
                normal: 'always',
                void: 'always',
            },
        }],

        // - Contrôle le nombre de props par ligne :
        //   - Pas de limite pour les components single-line.
        //   - Une seule prop. par ligne sur les components multi-ligne.
        // @see https://eslint.vuejs.org/rules/max-attributes-per-line.html
        'vue/max-attributes-per-line': ['error', {
            singleline: { max: Infinity },
            multiline: { max: 1 },
        }],

        // - Interdit l'usage de l'attribut `tag` (déprécié en Vue 3.x) dans les `<RouterLink>` (ou `<router-link>`).
        // @see https://eslint.vuejs.org/rules/no-deprecated-router-link-tag-prop.html
        'vue/no-deprecated-router-link-tag-prop': ['error'],

        // - Interdit l'utilisation de `expose({ ... })` (Vue 3) après un `await` => Doit obligatoirement être synchrone.
        // @see https://eslint.vuejs.org/rules/no-expose-after-await.html
        'vue/no-expose-after-await': ['error'],

        // - Interdit l'utilisation de `v-text` au profit des `children`.
        // @see https://eslint.vuejs.org/rules/no-v-text.html
        'vue/no-v-text': ['error'],

        // Cf. la règle `no-useless-concat` (cette version ne fait que prendre en charge la règle dans les `<template>`).
        // @see https://eslint.org/docs/rules/no-useless-concat
        // @see https://eslint.vuejs.org/rules/no-useless-concat
        'vue/no-useless-concat': ['error'],

        // - Empêche l'utilsation de chaînes quotées inutilement (e.g. `{{ 'Hello' }}`).
        // @see https://eslint.vuejs.org/rules/no-useless-mustaches
        'vue/no-useless-mustaches': ['error', {
            ignoreIncludesComment: false,
            ignoreStringEscape: false,
        }],

        //
        // - Règles désactivées (spécifiques à Vue 3).
        //

        // @see https://eslint.vuejs.org/rules/valid-define-emits
        'vue/valid-define-emits': ['off'],

        // @see https://eslint.vuejs.org/rules/valid-define-props
        'vue/valid-define-props': ['off'],

        // @see https://eslint.vuejs.org/rules/valid-v-memo
        'vue/valid-v-memo': ['off'],

        //
        // - Règles désactivées.
        //

        // @see https://eslint.org/docs/rules/no-underscore-dangle
        'no-underscore-dangle': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
        'react/no-unstable-nested-components': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/default-props-match-prop-types.md
        'react/default-props-match-prop-types': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
        'react/destructuring-assignment': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
        'react/function-component-definition': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md
        'react/forbid-foreign-prop-types': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
        'react/jsx-fragments': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-newline.md
        'react/jsx-newline': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-script-url.md
        'react/jsx-no-script-url': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/pull/1103/
        'react/no-unused-state': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
        'react/jsx-no-useless-fragment': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
        'react/jsx-no-constructed-context-values': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-one-expression-per-line.md
        'react/jsx-one-expression-per-line': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
        'react/jsx-props-no-spreading': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
        'react/jsx-uses-react': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-access-state-in-setstate.md
        'react/no-access-state-in-setstate': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
        'react/no-array-index-key': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-arrow-function-lifecycle.md
        'react/no-arrow-function-lifecycle': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger.md
        'react/no-danger': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md
        'react/no-danger-with-children': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md
        'react/no-deprecated': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
        //      https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md
        //      https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-will-update-set-state.md
        //      https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
        'react/no-did-mount-set-state': ['off'],
        'react/no-did-update-set-state': ['off'],
        'react/no-will-update-set-state': ['off'],
        'react/no-direct-mutation-state': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md
        'react/no-find-dom-node': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md
        'react/no-is-mounted': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-namespace.md
        'react/no-namespace': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-redundant-should-component-update.md
        'react/no-redundant-should-component-update': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md
        'react/no-render-return-value': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
        'react/no-string-refs': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-this-in-sfc.md
        'react/no-this-in-sfc': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-typos.md
        'react/no-typos': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
        'react/no-unknown-property': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
        'react/no-unused-prop-types': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-exact-props.md
        'react/prefer-exact-props': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/state-in-constructor.md
        'react/state-in-constructor': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md
        'react/prefer-es6-class': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
        'react/prefer-stateless-function': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
        'react/prop-types': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
        'react/react-in-jsx-scope': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
        'react/require-default-props': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/static-property-placement.md
        'react/static-property-placement': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/style-prop-object.md
        'react/style-prop-object': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
        'react/sort-comp': ['off'],

        // @see https://eslint.vuejs.org/rules/array-bracket-newline.html
        'vue/array-bracket-newline': ['off'],

        // @see https://eslint.vuejs.org/rules/attributes-order.html
        'vue/attributes-order': ['off'],

        // - Désactivé car nous utilisons `babel-preset-vca-jsx` qui nous permet de définir les
        //   fonctions `setup` de manière simplifiée avec un sucre syntaxique.
        // @see https://eslint.vuejs.org/rules/component-api-style.html
        'vue/component-api-style': ['off'],

        // @see https://eslint.vuejs.org/rules/multi-word-component-names.html
        'vue/multi-word-component-names': ['off'],

        // @see https://eslint.vuejs.org/rules/no-child-content.html
        'vue/no-child-content': ['off'],

        // - Désactivée car très contraignante (notamment lors de l'accès aux propriétés d'objets passés en prop)
        // @see https://eslint.vuejs.org/rules/no-undef-properties.html
        'vue/no-undef-properties': null,

        // @see https://eslint.vuejs.org/rules/no-restricted-class.html
        'vue/no-restricted-class': ['off'],

        // - Désactivé car rapporte des faux positifs (au moins en Vue 2) : Les `class` sur les `<template>` sont bien utile.
        // @see https://eslint.vuejs.org/rules/no-useless-template-attributes.html
        'vue/no-useless-template-attributes': ['off'],

        // @see https://eslint.vuejs.org/rules/singleline-html-element-content-newline.html
        'vue/singleline-html-element-content-newline': ['off'],
    },

    // - Overrides
    overrides: [
        { files: ['**/*.ts?(x)'], ...require('./overrides/typescript.js') },
    ],
};
