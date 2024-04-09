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
                extensions: ['.d.ts', '.ts', '.tsx', '.js', '.jsx', '.json'],
            },
        },
        'react': {
            pragma: 'React',
            version: 'detect',
        },
        'propWrapperFunctions': [
            'forbidExtraProps', // https://www.npmjs.com/package/airbnb-prop-types
            'exact', // https://www.npmjs.com/package/prop-types-exact
            'Object.freeze', // https://tc39.github.io/ecma262/#sec-object.freeze
        ],
    },

    // - Plugins
    plugins: [
        'react',
        'jsx-a11y',
        '@tanstack/query',
        'react-hooks-configurable',
        'class-methods-use-this-regex',
    ],

    // - Règles
    extends: '@pulsanova/browser',
    rules: {
        // https://eslint.style/rules/js/jsx-quotes
        '@stylistic/js/jsx-quotes': ['error', 'prefer-double'],

        // https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query
        '@tanstack/query/exhaustive-deps': ['error'],
        '@tanstack/query/no-rest-destructuring': ['error'],
        '@tanstack/query/stable-query-client': ['error'],

        // https://eslint.org/docs/rules/class-methods-use-this
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

        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
        'import/extensions': ['error', 'ignorePackages', {
            cjs: 'never',
            cts: 'never',
            js: 'never',
            jsx: 'never',
            mjs: 'never',
            mts: 'never',
            ts: 'never',
            tsx: 'never',
        }],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md
        'jsx-a11y/alt-text': ['error', {
            'area': [],
            'elements': ['img', 'object', 'area', 'input[type="image"]'],
            'img': [],
            'input[type="image"]': [],
            'object': [],
        }],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-has-content.md
        'jsx-a11y/anchor-has-content': ['error', { components: [] }],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-is-valid.md
        'jsx-a11y/anchor-is-valid': ['error', {
            aspects: ['noHref', 'invalidHref', 'preferButton'],
            components: [],
            specialLink: ['to'],
        }],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-activedescendant-has-tabindex.md
        'jsx-a11y/aria-activedescendant-has-tabindex': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-props.md
        'jsx-a11y/aria-props': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-proptypes.md
        'jsx-a11y/aria-proptypes': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-role.md
        'jsx-a11y/aria-role': ['error', { ignoreNonDOM: false }],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/aria-unsupported-elements.md
        'jsx-a11y/aria-unsupported-elements': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/control-has-associated-label.md
        'jsx-a11y/control-has-associated-label': ['error', {
            controlComponents: [],
            depth: 5,
            ignoreElements: [
                'audio',
                'canvas',
                'embed',
                'input',
                'textarea',
                'tr',
                'video',
            ],
            ignoreRoles: [
                'grid',
                'listbox',
                'menu',
                'menubar',
                'radiogroup',
                'row',
                'tablist',
                'toolbar',
                'tree',
                'treegrid',
            ],
            labelAttributes: ['label'],
        }],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/heading-has-content.md
        'jsx-a11y/heading-has-content': ['error', { components: [''] }],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/html-has-lang.md
        'jsx-a11y/html-has-lang': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/iframe-has-title.md
        'jsx-a11y/iframe-has-title': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/img-redundant-alt.md
        'jsx-a11y/img-redundant-alt': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/interactive-supports-focus.md
        'jsx-a11y/interactive-supports-focus': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/lang.md
        'jsx-a11y/lang': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/media-has-caption.md
        'jsx-a11y/media-has-caption': ['error', {
            audio: [],
            track: [],
            video: [],
        }],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-access-key.md
        'jsx-a11y/no-access-key': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-aria-hidden-on-focusable.md
        'jsx-a11y/no-aria-hidden-on-focusable': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-autofocus.md
        'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: true }],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-distracting-elements.md
        'jsx-a11y/no-distracting-elements': ['error', {
            elements: ['marquee', 'blink'],
        }],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-interactive-element-to-noninteractive-role.md
        'jsx-a11y/no-interactive-element-to-noninteractive-role': ['error', {
            tr: ['none', 'presentation'],
        }],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-interactions.md
        'jsx-a11y/no-noninteractive-element-interactions': ['error', {
            handlers: [
                'onClick',
                'onMouseDown',
                'onMouseUp',
                'onKeyPress',
                'onKeyDown',
                'onKeyUp',
            ],
        }],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-to-interactive-role.md
        'jsx-a11y/no-noninteractive-element-to-interactive-role': ['error', {
            ul: [
                'listbox',
                'menu',
                'menubar',
                'radiogroup',
                'tablist',
                'tree',
                'treegrid',
            ],
            ol: [
                'listbox',
                'menu',
                'menubar',
                'radiogroup',
                'tablist',
                'tree',
                'treegrid',
            ],
            li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
            table: ['grid'],
            td: ['gridcell'],
        }],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-tabindex.md
        'jsx-a11y/no-noninteractive-tabindex': ['error', {
            roles: ['tabpanel'],
            tags: [],
        }],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-redundant-roles.md
        'jsx-a11y/no-redundant-roles': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
        'jsx-a11y/no-static-element-interactions': ['error', {
            handlers: [
                'onClick',
                'onMouseDown',
                'onMouseUp',
                'onKeyPress',
                'onKeyDown',
                'onKeyUp',
            ],
        }],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-has-required-aria-props.md
        'jsx-a11y/role-has-required-aria-props': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/role-supports-aria-props.md
        'jsx-a11y/role-supports-aria-props': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/scope.md
        'jsx-a11y/scope': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/tabindex-no-positive.md
        'jsx-a11y/tabindex-no-positive': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/button-has-type.md
        'react/button-has-type': ['error', {
            button: true,
            reset: false,
            submit: true,
        }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md
        'react/forbid-foreign-prop-types': ['warn', { allowInPropTypes: true }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md
        'react/forbid-prop-types': ['error', {
            checkChildContextTypes: true,
            checkContextTypes: true,
            forbid: ['any', 'array', 'object'],
        }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
        'react/function-component-definition': ['error', {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
        }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/iframe-missing-sandbox.md
        'react/iframe-missing-sandbox': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
        'react/jsx-boolean-value': ['error', 'never', { always: [] }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
        'react/jsx-closing-bracket-location': ['error', 'line-aligned'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md
        'react/jsx-closing-tag-location': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
        'react/jsx-curly-brace-presence': ['error', {
            children: 'never',
            propElementValues: 'always',
            props: 'never',
        }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-newline.md
        'react/jsx-curly-newline': ['error', {
            multiline: 'consistent',
            singleline: 'consistent',
        }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
        'react/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md
        'react/jsx-equals-spacing': ['error', 'never'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-filename-extension': ['error', {
            allow: 'always',
            extensions: ['.js', '.tsx'],
        }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
        'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
        'react/jsx-fragments': ['error', 'element'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
        'react/jsx-handler-names': ['error', {
            checkInlineFunction: false,
            eventHandlerPrefix: 'handle',
            eventHandlerPropPrefix: 'on',
        }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
        'react/jsx-indent': ['error', 4],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
        'react/jsx-indent-props': ['error', 4],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md
        'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
        'react/jsx-no-bind': ['error', {
            allowArrowFunctions: true,
            allowBind: false,
            allowFunctions: false,
            ignoreDOMComponents: true,
            ignoreRefs: true,
        }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md
        'react/jsx-no-comment-textnodes': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
        'react/jsx-no-constructed-context-values': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
        'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-script-url.md
        'react/jsx-no-script-url': ['error', [
            { name: 'Link', props: ['to'] },
            { name: 'Button', props: ['to'] },
        ]],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
        'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md
        'react/jsx-no-undef': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
        'react/jsx-no-useless-fragment': ['error', {
            allowExpressions: false,
        }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
        'react/jsx-pascal-case': ['error', {
            allowAllCaps: false,
            allowLeadingUnderscore: false,
            allowNamespace: false,
            ignore: [],
        }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-multi-spaces.md
        'react/jsx-props-no-multi-spaces': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md
        'react/jsx-tag-spacing': ['error', {
            afterOpening: 'never',
            beforeClosing: 'never',
            beforeSelfClosing: 'always',
            closingSlash: 'never',
        }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md
        'react/jsx-uses-vars': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md
        'react/jsx-wrap-multilines': ['error', {
            arrow: 'parens-new-line',
            assignment: 'parens-new-line',
            condition: 'parens-new-line',
            declaration: 'parens-new-line',
            logical: 'parens-new-line',
            prop: 'parens-new-line',
            return: 'parens-new-line',
        }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-access-state-in-setstate.md
        'react/no-access-state-in-setstate': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
        'react/no-array-index-key': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md
        'react/no-children-prop': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger.md
        'react/no-danger': ['warn'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md
        'react/no-danger-with-children': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md
        'react/no-deprecated': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md
        'react/no-did-update-set-state': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
        'react/no-direct-mutation-state': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md
        'react/no-find-dom-node': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-invalid-html-attribute.md
        'react/no-invalid-html-attribute': ['error', ['rel']],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md
        'react/no-is-mounted': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-namespace.md
        'react/no-namespace': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/HEAD/docs/rules/no-object-type-as-default-prop.md
        'react/no-object-type-as-default-prop': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-redundant-should-component-update.md
        'react/no-redundant-should-component-update': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md
        'react/no-render-return-value': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
        'react/no-string-refs': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-this-in-sfc.md
        'react/no-this-in-sfc': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-typos.md
        'react/no-typos': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
        'react/no-unescaped-entities': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
        'react/no-unknown-property': ['error', {
            requireDataLowercase: true,
        }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
        'react/no-unstable-nested-components': ['error', { allowAsProps: true }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unused-class-component-methods.md
        'react/no-unused-class-component-methods': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/pull/1103/
        'react/no-unused-state': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-will-update-set-state.md
        'react/no-will-update-set-state': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md
        'react/prefer-es6-class': ['error', 'always'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-exact-props.md
        'react/prefer-exact-props': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
        'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md
        'react/prop-types': ['error', {
            customValidators: [],
            ignore: [],
            skipUndeclared: false,
        }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
        'react/require-default-props': ['error', {
            classes: 'defaultProps',
            forbidDefaultForRequired: true,
            functions: 'ignore',
        }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-render-return.md
        'react/require-render-return': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
        'react/self-closing-comp': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
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

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/static-property-placement.md
        'react/static-property-placement': ['error', 'static public field'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/style-prop-object.md
        'react/style-prop-object': ['error'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md
        'react/void-dom-elements-no-children': ['error'],

        // https://github.com/facebook/react/issues/14920#issue-413077280
        'react-hooks-configurable/exhaustive-deps': ['warn', {
            additionalHooks: '(useUpdateEffect)',
            additionalStableHooks: {
                '(use.+Ref|useErrorHandler)': true,
                'useAnimation': true, // - Pour `framer-motion`.
                'useAnimationControls': true, // - Pour `framer-motion`.
                'useEvent': true,
            },
        }],

        // https://reactjs.org/docs/hooks-rules.html
        'react-hooks-configurable/rules-of-hooks': ['error'],

        //
        // - Règles désactivées.
        //

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-ambiguous-text.md
        'jsx-a11y/anchor-ambiguous-text': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/autocomplete-valid.md
        'jsx-a11y/autocomplete-valid': ['off'],

        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/click-events-have-key-events.md
        'jsx-a11y/click-events-have-key-events': ['off'],

        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
        'jsx-a11y/label-has-associated-control': ['off'],

        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
        'jsx-a11y/mouse-events-have-key-events': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/prefer-tag-over-role.md
        'jsx-a11y/prefer-tag-over-role': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/boolean-prop-naming.md
        'react/boolean-prop-naming': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/checked-requires-onchange-or-readonly.md
        'react/checked-requires-onchange-or-readonly': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/default-props-match-prop-types.md
        'react/default-props-match-prop-types': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
        'react/destructuring-assignment': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
        'react/display-name': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forbid-component-props.md
        'react/forbid-component-props': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forbid-dom-props.md
        'react/forbid-dom-props': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forbid-elements.md
        'react/forbid-elements': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md
        'react/hook-use-state': ['off'],

        // Ensures inline tags are not rendered without spaces between them
        'react/jsx-child-element-spacing': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
        'react/jsx-key': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-max-depth.md
        'react/jsx-max-depth': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-newline.md
        'react/jsx-newline': ['off'],

        // TODO: À activer lorsqu'on pourra ignorer certains patterns dans la partie gauche des conditions
        //       parce qu'en l'état, on est forcé de "contraindre" (coerce) même les booléens (e.g. `{!!isBoolean && 'foo'}`) ...
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/v7.30.0/docs/rules/jsx-no-leaked-render.md
        'react/jsx-no-leaked-render': ['off', {
            validStrategies: ['ternary', 'coerce'],
        }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md
        'react/jsx-no-literals': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-one-expression-per-line.md
        'react/jsx-one-expression-per-line': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
        'react/jsx-props-no-spreading': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
        'react/jsx-sort-props': ['off'],

        // - Plus utile avec le nouveau mécanisme de transformation du JSX.
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
        'react/jsx-uses-react': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-adjacent-inline-elements.md
        'react/no-adjacent-inline-elements': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-arrow-function-lifecycle.md
        'react/no-arrow-function-lifecycle': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
        'react/no-did-mount-set-state': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md
        'react/no-multi-comp': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-set-state.md
        'react/no-set-state': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unsafe.md
        'react/no-unsafe': ['off'],

        // NOTE: Trop de faux positifs avec les composants fonctionnels...
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
        'react/no-unused-prop-types': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-read-only-props.md
        'react/prefer-read-only-props': ['off'],

        // - Plus utile avec le nouveau mécanisme de transformation du JSX.
        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
        'react/react-in-jsx-scope': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-optimization.md
        'react/require-optimization': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-default-props.md
        'react/sort-default-props': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-prop-types.md
        'react/sort-prop-types': ['off'],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/state-in-constructor.md
        'react/state-in-constructor': ['off'],
    },

    // - Overrides
    overrides: [
        {
            files: ['**/*.?({c,m})ts', '**/*.tsx'],
            ...require('./overrides/typescript.js'),
        },
    ],
};
