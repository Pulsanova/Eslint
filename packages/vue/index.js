'use strict';

const webpackConfigPath = require.resolve(
    '@vue/cli-service/webpack.config.js',
);

module.exports = {
    // - Parseur
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
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
            webpack: { config: webpackConfigPath },
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

        // enforce that class methods use "this"
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
            allowAllCaps: false,
            ignore: [],
        }],

        // - S'assure de la non utilisation des tirets pour les props de components.
        // @see https://eslint.vuejs.org/rules/attribute-hyphenation.html
        'vue/attribute-hyphenation': ['error', 'never', {
            ignore: [],
        }],

        // - Ordre des éléments dans les fichiers vue: <template>, <style> puis <script>.
        // @see https://eslint.vuejs.org/rules/component-tags-order.html
        'vue/component-tags-order': ['error', {
            order: ['template', 'style', 'script'],
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

        // - Contrôle le nombre de props par ligne:
        //   - Pas de limite pour les components single-line.
        //   - Une seule prop. par ligne sur les components multi-ligne.
        // @see https://eslint.vuejs.org/rules/max-attributes-per-line.html
        'vue/max-attributes-per-line': ['error', {
            singleline: { max: Infinity, allowFirstLine: true },
            multiline: { max: 1, allowFirstLine: false },
        }],

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

        // @see https://eslint.vuejs.org/rules/attributes-order.html
        'vue/attributes-order': ['off'],

        // @see https://eslint.vuejs.org/rules/singleline-html-element-content-newline.html
        'vue/singleline-html-element-content-newline': ['off'],
    },

    // - Overrides
    overrides: [
        { files: ['**/*.ts?(x)'], ...require('./overrides/typescript') },
    ],
};
