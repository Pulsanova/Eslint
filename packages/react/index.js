'use strict';

// - Corrige la prise en charge des plugins chargés dans les configs. partagées.
//   (@see https://github.com/eslint/eslint/issues/3458)
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
        'import/extensions': ['.ts', '.tsx', '.js', '.jsx'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.mts', '.cts', '.ts', '.tsx'],
        },
        'import/resolver': {
            node: {
                extensions: ['.ts', '.tsx', '.js', '.jsx'],
            },
        },
    },

    // - Plugins
    plugins: [
        '@tanstack/query',
        'react-hooks-configurable',
        'class-methods-use-this-regex',
    ],

    // - Règles
    extends: [
        '@pulsanova/eslint-config-browser',
        'eslint-config-airbnb/rules/react',
        'eslint-config-airbnb/rules/react-a11y',
    ].map(require.resolve),
    rules: {
        // @see https://tanstack.com/query/v4/docs/eslint/exhaustive-deps
        '@tanstack/query/exhaustive-deps': ['error'],

        // @see https://tanstack.com/query/v4/docs/eslint/prefer-query-object-syntax
        '@tanstack/query/prefer-query-object-syntax': ['error'],

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

        // @see https://github.com/benmosher/eslint-plugin-import/blob/main/docs/rules/extensions.md
        'import/extensions': ['error', 'ignorePackages', {
            js: 'never',
            jsx: 'never',
            cjs: 'never',
            mjs: 'never',
            ts: 'never',
            tsx: 'never',
            cts: 'never',
            mts: 'never',
        }],

        // @see https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/0745af376cdc8686d85a361ce36952b1fb1ccf6e/docs/rules/anchor-is-valid.md
        'jsx-a11y/anchor-is-valid': ['error', {
            components: [],
            specialLink: ['to'],
            aspects: ['noHref', 'invalidHref', 'preferButton'],
        }],

        // @see https://github.com/facebook/react/issues/14920#issue-413077280
        'react-hooks-configurable/exhaustive-deps': ['warn', {
            additionalHooks: '(useUpdateEffect)',
            additionalStableHooks: {
                '(use.+Ref|useErrorHandler)': true,
                'useAnimationControls': true, // - Pour `framer-motion`.
                'useAnimation': true, // - Pour `framer-motion`.
                'useEvent': true,
            },
        }],

        // @see https://reactjs.org/docs/hooks-rules.html
        'react-hooks-configurable/rules-of-hooks': ['error'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
        'react/function-component-definition': ['error', {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
        }],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/iframe-missing-sandbox.md
        'react/iframe-missing-sandbox': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
        'react/jsx-curly-brace-presence': ['error', {
            props: 'never',
            children: 'never',
            propElementValues: 'always',
        }],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-filename-extension': ['error', {
            allow: 'always',
            extensions: ['.js', '.tsx'],
        }],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
        'react/jsx-fragments': ['error', 'element'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
        'react/jsx-handler-names': ['error', {
            eventHandlerPrefix: 'handle',
            eventHandlerPropPrefix: 'on',
            checkInlineFunction: false,
        }],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
        'react/jsx-indent': ['error', 4],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
        'react/jsx-indent-props': ['error', 4],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/e2eaadae316f9506d163812a09424eb42698470a/docs/rules/jsx-no-constructed-context-values.md
        'react/jsx-no-constructed-context-values': ['error'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-script-url.md
        'react/jsx-no-script-url': ['error', [
            { name: 'Link', props: ['to'] },
            { name: 'Button', props: ['to'] },
        ]],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
        'react/jsx-no-useless-fragment': ['error', {
            allowExpressions: false,
        }],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
        'react/jsx-pascal-case': ['error', {
            allowAllCaps: false,
            allowLeadingUnderscore: false,
            allowNamespace: false,
            ignore: [],
        }],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
        'react/no-direct-mutation-state': ['error'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-invalid-html-attribute.md
        'react/no-invalid-html-attribute': ['error', ['rel']],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-namespace.md
        'react/no-namespace': ['error'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
        'react/no-unstable-nested-components': ['error', { allowAsProps: true }],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-exact-props.md
        'react/prefer-exact-props': ['error'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
        'react/require-default-props': ['error', {
            forbidDefaultForRequired: true,
            functions: 'ignore',
            classes: 'defaultProps',
        }],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
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

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/static-property-placement.md
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

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/default-props-match-prop-types.md
        'react/default-props-match-prop-types': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
        'react/destructuring-assignment': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md
        'react/hook-use-state': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/e2eaadae316f9506d163812a09424eb42698470a/docs/rules/jsx-newline.md
        'react/jsx-newline': 'off',

        // TODO: À activer lorsqu'on pourra ignorer certains patterns dans la partie gauche des conditions
        //       parce qu'en l'état, on est forcé de "contraindre" (coerce) même les booléens (e.g. `{!!isBoolean && 'foo'}`) ...
        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/v7.30.0/docs/rules/jsx-no-leaked-render.md
        'react/jsx-no-leaked-render': ['off', {
            validStrategies: ['ternary', 'coerce'],
        }],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-one-expression-per-line.md
        'react/jsx-one-expression-per-line': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
        'react/jsx-props-no-spreading': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
        'react/jsx-uses-react': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-adjacent-inline-elements.md
        'react/no-adjacent-inline-elements': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-arrow-function-lifecycle.md
        'react/no-arrow-function-lifecycle': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
        'react/no-unused-prop-types': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
        'react/react-in-jsx-scope': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/state-in-constructor.md
        'react/state-in-constructor': ['off'],
    },

    // - Overrides
    overrides: [
        {
            files: ['**/*.?({c,m})ts', '**/*.tsx'],
            ...require('./overrides/typescript'),
        },
    ],
};
