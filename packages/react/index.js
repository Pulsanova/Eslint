'use strict';

// - Corrige la prise en charge des plugins chargés dans les configs. partagées.
// @see https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    // - Parseur
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },

    // - Configuration
    settings: {
        'import/extensions': [
            '.mjs',
            '.cjs',
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
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx',
                    '.d.ts',
                    '.json',
                ],
            },
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
        },
    },

    // - Plugins
    plugins: [
        'react-hooks',
        'class-methods-use-this-regex',
    ],

    // - Rules
    extends: [
        '@pulsanova/eslint-config-browser',
        'eslint-config-airbnb/rules/react',
        'eslint-config-airbnb/rules/react-a11y',
    ].map(require.resolve),
    rules: {
        // - Les méthodes de classe (hors méthodes React) doivent utiliser `this` ou être
        //   extraites dans des fonctions pures externes à la classe.
        // @see https://eslint.org/docs/rules/class-methods-use-this
        'class-methods-use-this': ['off'],
        'class-methods-use-this-regex/class-methods-use-this': ['error', {
            exceptMethods: [
                '^_?render.*$',
                '^_?(on|handle).+$',
                '^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$',
                '^getDerivedStateFromProps$',
                '^(UNSAFE_)?componentWillMount$',
                '^(UNSAFE_)?componentWillReceiveProps$',
                '^(UNSAFE_)?componentWillUpdate$',
                '^componentDidMount$',
                '^shouldComponentUpdate$',
                '^componentDidUpdate$',
                '^componentWillUnmount$',
                '^componentDidCatch$',
                '^getSnapshotBeforeUpdate$',
            ],
        }],

        // - Vérifie que les balises <a> sont valides.
        // @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/0745af376cdc8686d85a361ce36952b1fb1ccf6e/docs/rules/anchor-is-valid.md
        'jsx-a11y/anchor-is-valid': ['error', {
            components: [],
            specialLink: ['to'],
            aspects: ['noHref', 'invalidHref', 'preferButton'],
        }],

        // - Vérifie que les hooks avec dependances sont bien valides (`useEffect(..., [>> ICI <<])`)
        // @see https://github.com/facebook/react/issues/14920#issue-413077280
        'react-hooks/exhaustive-deps': ['warn'],

        // - Valide ques les règles des hooks sont bien respectées.
        // @see https://reactjs.org/docs/hooks-rules.html
        'react-hooks/rules-of-hooks': ['error'],

        // - Les components sous forme de fonction doivent être définis dans des fonctions fléchés.
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
        'react/function-component-definition': ['error', {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
        }],

        // - Pas d'utilisation de l'extension `.jsx` mais uniquement `.js` ou `.tsx`.
        //   Cette extension (`.jsx`) n'est plus recommandée (voir lien ci-dessous), il n'y a pas de raison de continuer à l'utiliser.
        // @see https://github.com/facebookincubator/create-react-app/issues/87#issuecomment-234627904
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-filename-extension': ['error', {
            allow: 'always',
            extensions: ['.js', '.tsx'],
        }],

        // - Force la syntaxe longue pour les fragments React qui est plus claire que la courte.
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
        'react/jsx-fragments': ['error', 'element'],

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

        // - Interdit l'utilisation de `javascript:` dans les props. connu pour contenir des URLs.
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-script-url.md
        'react/jsx-no-script-url': ['error', [
            { name: 'Link', props: ['to'] },
            { name: 'Button', props: ['to'] },
        ]],

        // - Vérifie qu'il n'y a pas d'utilisation inutile de `<React.Fragment>`.
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
        'react/jsx-no-useless-fragment': ['error', {
            allowExpressions: false,
        }],

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

        // - Empêche l'utilisation de valeur non stables en tant que contexte React.
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
        'react/jsx-no-constructed-context-values': ['error'],

        // - Pas de mutation directe du state.
        //   Interdit les mutations du state hors du constructeur (ou il peut être __assigné__ de manière synchrone),
        //   il faut considérer le state comme étant immutable.
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
        'react/no-direct-mutation-state': ['error'],

        // - Empêche l'utilisation de valeurs invalides pour certains attributs HTML :
        //   - Vérifie que la valeur des attributs `rel` est correcte en fonction de la balise l'utilisant.
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-invalid-html-attribute.md
        'react/no-invalid-html-attribute': ['error', ['rel']],

        // - Interdit l'utilisation de namespaces dans le JSX (e.g. `<ns:Comp />`) car non supportés par React.
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-namespace.md
        'react/no-namespace': ['error'],

        // - Empêche l'utilisation de composants impbriqués instables.
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
        'react/no-unstable-nested-components': ['error', { allowAsProps: true }],

        // - Requiert la définition des `defaultProps` pour chaque prop. qui n'est pas requise.
        //   (Note: Cette règle est désactivée pour les components sous forme de fonction car pour
        //   ceux-ci les defaults doivent être défini inline (e.g. `const Comp = ({ name = 'default' }) => {};`))
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
        'react/require-default-props': ['error', {
            forbidDefaultForRequired: true,

            // @see https://github.com/reactjs/rfcs/pull/107
            // @see https://twitter.com/dan_abramov/status/1133878326358171650
            ignoreFunctionalComponents: true,
        }],

        // - S'assure du bon ordre des éléments dans les composants React.
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
        'react/sort-comp': ['error', {
            order: [
                'type-annotations',
                'displayName',
                'static-variables',
                'state',
                'instance-variables',
                'propTypes',
                'defaultProps',
                'constructor',
                'static-methods',
                'lifecycle',
                'everything-else',
                '/^_?(on|handle).+$/',
                '/^_(?!render|on|handle).+/',
                '/^_?render.*$/',
            ],
        }],

        // - Les propriétés statiques des components React sous forme de classe doivent être dans des propriétés statiques.
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/static-property-placement.md
        'react/static-property-placement': ['error', 'static public field'],

        //
        // - Règles désactivées.
        //

        // @see https://eslint.org/docs/rules/no-underscore-dangle
        'no-underscore-dangle': ['off'],

        // @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/click-events-have-key-events.md
        'jsx-a11y/click-events-have-key-events': ['off'],

        // @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
        'jsx-a11y/label-has-associated-control': ['off'],

        // @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
        'jsx-a11y/mouse-events-have-key-events': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/default-props-match-prop-types.md
        'react/default-props-match-prop-types': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
        'react/destructuring-assignment': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-newline.md
        'react/jsx-newline': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-one-expression-per-line.md
        'react/jsx-one-expression-per-line': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
        'react/jsx-props-no-spreading': ['off'],

        // - Plus nécessaire avec le nouveau mécanisme de transmormation du JSX.
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
        'react/jsx-uses-react': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-adjacent-inline-elements.md
        'react/no-adjacent-inline-elements': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-arrow-function-lifecycle.md
        'react/no-arrow-function-lifecycle': ['off'],

        // NOTE: Too many false positives with functional components ...
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
        'react/no-unused-prop-types': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-exact-props.md
        'react/prefer-exact-props': ['off'],

        // - Plus nécessaire avec le nouveau mécanisme de transmormation du JSX.
        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
        'react/react-in-jsx-scope': ['off'],

        // @see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/state-in-constructor.md
        'react/state-in-constructor': ['off'],
    },

    // - Overrides
    overrides: [
        { files: ['**/*.ts?(x)'], ...require('./overrides/typescript.js') },
    ],
};
