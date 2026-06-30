import tanstackQueryPlugin from '@tanstack/eslint-plugin-query';
import reactHooksConfigurablePlugin from 'eslint-plugin-react-hooks-configurable';
import classMethodsUseThisRegexPlugin from 'eslint-plugin-class-methods-use-this-regex';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y-x';
import eslintReact from '@eslint-react/eslint-plugin';
import { createNodeResolver } from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import {
    createConfig as browserConfig,
    DEFAULT_EXTENSIONS as BASE_EXTENSIONS,
} from '@pulsanova/eslint-config-browser/esnext';
import typescriptConfig, {
    EXTENSIONS as TS_EXTENSIONS,
} from './extensions/typescript.js';

export const EXTENSIONS = {
    js: [...BASE_EXTENSIONS.js, 'jsx'],
    ts: TS_EXTENSIONS,
};

const base = [
    ...browserConfig(EXTENSIONS),
    {
        // - Fichiers
        files: [`**/*.{${Object.values(EXTENSIONS).flat().join(',')}}`],

        // - Parseur
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        // - Configuration
        settings: {
            'import-x/extensions': ['.d.ts', '.ts', '.tsx', '.js', '.jsx'],
            'import-x/parsers': {
                '@typescript-eslint/parser': ['.mts', '.cts', '.ts', '.tsx'],
            },
            'import-x/resolver-next': [
                createNodeResolver({
                    extensions: ['.d.ts', '.ts', '.tsx', '.js', '.jsx', '.json'],
                }),
                createTypeScriptImportResolver({
                    extensions: ['.d.ts', '.ts', '.tsx', '.js', '.jsx', '.json'],
                }),
            ],
            'react-x': {
                version: 'detect',
                importSource: 'react',
                polymorphicPropName: 'as',
            },
        },

        // - Plugins
        plugins: {
            'react': eslintReact,
            'jsx-a11y': jsxA11yPlugin,
            '@tanstack/query': tanstackQueryPlugin,
            'react-hooks-configurable': reactHooksConfigurablePlugin,
            'class-methods-use-this-regex': classMethodsUseThisRegexPlugin,
        },

        // - Règles
        rules: {
            // https://eslint.style/rules/indent
            '@stylistic/indent': ['error', 4, {
                ArrayExpression: 1,
                CallExpression: { arguments: 1 },
                flatTernaryExpressions: false,
                offsetTernaryExpressions: false,
                FunctionDeclaration: { parameters: 1, body: 1 },
                FunctionExpression: { parameters: 1, body: 1 },
                ignoreComments: false,
                ImportDeclaration: 1,
                ObjectExpression: 1,
                outerIIFEBody: 1,
                SwitchCase: 1,
                VariableDeclarator: 1,
            }],

            // https://eslint.style/rules/jsx-function-call-newline
            '@stylistic/jsx-function-call-newline': ['error', 'multiline'],

            // https://eslint.style/rules/jsx-quotes
            '@stylistic/jsx-quotes': ['error', 'prefer-double'],

            // https://tanstack.com/query/latest/docs/eslint/exhaustive-deps
            '@tanstack/query/exhaustive-deps': ['error'],

            // https://tanstack.com/query/latest/docs/eslint/infinite-query-property-order
            '@tanstack/query/infinite-query-property-order': ['error'],

            // https://tanstack.com/query/latest/docs/eslint/mutation-property-order
            '@tanstack/query/mutation-property-order': ['error'],

            // https://tanstack.com/query/latest/docs/eslint/no-rest-destructuring
            '@tanstack/query/no-rest-destructuring': ['error'],

            // https://tanstack.com/query/latest/docs/eslint/no-unstable-deps
            '@tanstack/query/no-unstable-deps': ['error'],

            // https://tanstack.com/query/latest/docs/eslint/stable-query-client
            '@tanstack/query/stable-query-client': ['error'],

            // https://tanstack.com/query/latest/docs/eslint/no-void-query-fn
            '@tanstack/query/no-void-query-fn': ['error'],

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

            // https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/extensions.md
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

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/alt-text.md
            'jsx-a11y/alt-text': ['error', {
                'area': [],
                'elements': ['img', 'object', 'area', 'input[type="image"]'],
                'img': [],
                'input[type="image"]': [],
                'object': [],
            }],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/anchor-has-content.md
            'jsx-a11y/anchor-has-content': ['error', { components: [] }],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/anchor-is-valid.md
            'jsx-a11y/anchor-is-valid': ['error', {
                aspects: ['noHref', 'invalidHref', 'preferButton'],
                components: [],
                specialLink: ['to'],
            }],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/aria-activedescendant-has-tabindex.md
            'jsx-a11y/aria-activedescendant-has-tabindex': ['error'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/aria-props.md
            'jsx-a11y/aria-props': ['error'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/aria-proptypes.md
            'jsx-a11y/aria-proptypes': ['error'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/aria-role.md
            'jsx-a11y/aria-role': ['error', { ignoreNonDOM: false }],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/aria-unsupported-elements.md
            'jsx-a11y/aria-unsupported-elements': ['error'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/control-has-associated-label.md
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

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/heading-has-content.md
            'jsx-a11y/heading-has-content': ['error', { components: [''] }],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/html-has-lang.md
            'jsx-a11y/html-has-lang': ['error'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/iframe-has-title.md
            'jsx-a11y/iframe-has-title': ['error'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/img-redundant-alt.md
            'jsx-a11y/img-redundant-alt': ['error'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/interactive-supports-focus.md
            'jsx-a11y/interactive-supports-focus': ['error'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/lang.md
            'jsx-a11y/lang': ['error'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/media-has-caption.md
            'jsx-a11y/media-has-caption': ['error', {
                audio: [],
                track: [],
                video: [],
            }],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/no-access-key.md
            'jsx-a11y/no-access-key': ['error'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/no-aria-hidden-on-focusable.md
            'jsx-a11y/no-aria-hidden-on-focusable': ['error'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/no-autofocus.md
            'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: true }],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/no-distracting-elements.md
            'jsx-a11y/no-distracting-elements': ['error', {
                elements: ['marquee', 'blink'],
            }],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/no-interactive-element-to-noninteractive-role.md
            'jsx-a11y/no-interactive-element-to-noninteractive-role': ['error', {
                tr: ['none', 'presentation'],
            }],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/no-noninteractive-element-interactions.md
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

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/no-noninteractive-element-to-interactive-role.md
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

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/no-noninteractive-tabindex.md
            'jsx-a11y/no-noninteractive-tabindex': ['error', {
                roles: ['tabpanel'],
                tags: [],
            }],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/no-redundant-roles.md
            'jsx-a11y/no-redundant-roles': ['error'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/no-static-element-interactions.md
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

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/role-has-required-aria-props.md
            'jsx-a11y/role-has-required-aria-props': ['error'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/role-supports-aria-props.md
            'jsx-a11y/role-supports-aria-props': ['error'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/scope.md
            'jsx-a11y/scope': ['error'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/tabindex-no-positive.md
            'jsx-a11y/tabindex-no-positive': ['error'],

            // - Regles JSX de formatage (deplacees vers @stylistic)
            // https://eslint.style/rules/jsx-closing-bracket-location
            '@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],

            // https://eslint.style/rules/jsx-closing-tag-location
            '@stylistic/jsx-closing-tag-location': ['error', 'tag-aligned'],

            // https://eslint.style/rules/jsx-curly-brace-presence
            '@stylistic/jsx-curly-brace-presence': ['error', {
                children: 'never',
                propElementValues: 'always',
                props: 'never',
            }],

            // https://eslint.style/rules/jsx-curly-newline
            '@stylistic/jsx-curly-newline': ['error', {
                multiline: 'consistent',
                singleline: 'consistent',
            }],

            // https://eslint.style/rules/jsx-curly-spacing
            '@stylistic/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],

            // https://eslint.style/rules/jsx-equals-spacing
            '@stylistic/jsx-equals-spacing': ['error', 'never'],

            // https://eslint.style/rules/jsx-first-prop-new-line
            '@stylistic/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],

            // https://eslint.style/rules/jsx-indent-props
            '@stylistic/jsx-indent-props': ['error', 4],

            // https://eslint.style/rules/jsx-max-props-per-line
            '@stylistic/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],

            // https://eslint.style/rules/jsx-tag-spacing
            '@stylistic/jsx-tag-spacing': ['error', {
                afterOpening: 'never',
                beforeClosing: 'never',
                beforeSelfClosing: 'always',
                closingSlash: 'never',
            }],

            // https://eslint.style/rules/jsx-wrap-multilines
            '@stylistic/jsx-wrap-multilines': ['error', {
                arrow: 'parens-new-line',
                assignment: 'parens-new-line',
                condition: 'parens-new-line',
                declaration: 'parens-new-line',
                logical: 'parens-new-line',
                prop: 'parens-new-line',
                return: 'parens-new-line',
            }],

            // https://eslint.style/rules/jsx-self-closing-comp
            '@stylistic/jsx-self-closing-comp': ['error'],

            // - @eslint-react
            // https://eslint-react.xyz/docs/rules/dom-no-dangerously-set-innerhtml
            'react/dom-no-dangerously-set-innerhtml': ['error'],

            // https://eslint-react.xyz/docs/rules/dom-no-dangerously-set-innerhtml-with-children
            'react/dom-no-dangerously-set-innerhtml-with-children': ['error'],

            // https://eslint-react.xyz/docs/rules/dom-no-find-dom-node
            'react/dom-no-find-dom-node': ['error'],

            // https://eslint-react.xyz/docs/rules/dom-no-flush-sync
            'react/dom-no-flush-sync': ['error'],

            // https://eslint-react.xyz/docs/rules/dom-no-hydrate
            'react/dom-no-hydrate': ['error'],

            // https://eslint-react.xyz/docs/rules/dom-no-missing-button-type
            'react/dom-no-missing-button-type': ['error'],

            // https://eslint-react.xyz/docs/rules/dom-no-missing-iframe-sandbox
            'react/dom-no-missing-iframe-sandbox': ['error'],

            // https://eslint-react.xyz/docs/rules/dom-no-render
            'react/dom-no-render': ['error'],

            // https://eslint-react.xyz/docs/rules/dom-no-render-return-value
            'react/dom-no-render-return-value': ['error'],

            // https://eslint-react.xyz/docs/rules/dom-no-script-url
            'react/dom-no-script-url': ['error'],

            // https://eslint-react.xyz/docs/rules/dom-no-string-style-prop
            'react/dom-no-string-style-prop': ['error'],

            // https://eslint-react.xyz/docs/rules/dom-no-unknown-property
            'react/dom-no-unknown-property': ['error'],

            // https://eslint-react.xyz/docs/rules/dom-no-unsafe-iframe-sandbox
            'react/dom-no-unsafe-iframe-sandbox': ['error'],

            // https://eslint-react.xyz/docs/rules/dom-no-unsafe-target-blank
            'react/dom-no-unsafe-target-blank': ['error'],

            // https://eslint-react.xyz/docs/rules/dom-no-use-form-state
            'react/dom-no-use-form-state': ['error'],

            // https://eslint-react.xyz/docs/rules/dom-no-void-elements-with-children
            'react/dom-no-void-elements-with-children': ['error'],

            // https://eslint-react.xyz/docs/rules/error-boundaries
            'react/error-boundaries': ['error'],

            // https://github.com/facebook/react/issues/14920
            'react/x-exhaustive-deps': ['off'],
            'react/exhaustive-deps': ['error'],

            // https://eslint-react.xyz/docs/rules/jsx-no-children-prop
            'react/jsx-no-children-prop': ['error'],

            // https://eslint-react.xyz/docs/rules/jsx-no-children-prop-with-children
            'react/jsx-no-children-prop-with-children': ['error'],

            // https://eslint-react.xyz/docs/rules/jsx-no-comment-textnodes
            'react/jsx-no-comment-textnodes': ['error'],

            // https://eslint-react.xyz/docs/rules/jsx-no-key-after-spread
            'react/jsx-no-key-after-spread': ['error'],

            // https://eslint-react.xyz/docs/rules/jsx-no-leaked-dollar
            'react/jsx-no-leaked-dollar': ['error'],

            // https://eslint-react.xyz/docs/rules/jsx-no-leaked-semicolon
            'react/jsx-no-leaked-semicolon': ['error'],

            // https://eslint-react.xyz/docs/rules/jsx-no-namespace
            'react/jsx-no-namespace': ['error'],

            // https://eslint-react.xyz/docs/rules/jsx-no-useless-fragment
            'react/jsx-no-useless-fragment': ['error'],

            // https://eslint-react.xyz/docs/rules/naming-convention-context-name
            'react/naming-convention-context-name': ['error'],

            // https://eslint-react.xyz/docs/rules/naming-convention-id-name
            'react/naming-convention-id-name': ['error'],

            // https://eslint-react.xyz/docs/rules/naming-convention-ref-name
            'react/naming-convention-ref-name': ['error'],

            // https://eslint-react.xyz/docs/rules/no-access-state-in-setstate
            'react/x-no-access-state-in-setstate': ['off'],
            'react/no-access-state-in-setstate': ['error'],

            // https://eslint-react.xyz/docs/rules/no-array-index-key
            'react/x-no-array-index-key': ['off'],
            'react/no-array-index-key': ['error'],

            // https://eslint-react.xyz/docs/rules/no-children-count
            'react/x-no-children-count': ['off'],
            'react/no-children-count': ['error'],

            // https://eslint-react.xyz/docs/rules/no-children-for-each
            'react/x-no-children-for-each': ['off'],
            'react/no-children-for-each': ['error'],

            // https://eslint-react.xyz/docs/rules/no-children-map
            'react/x-no-children-map': ['off'],
            'react/no-children-map': ['error'],

            // https://eslint-react.xyz/docs/rules/no-children-only
            'react/x-no-children-only': ['off'],
            'react/no-children-only': ['error'],

            // https://eslint-react.xyz/docs/rules/no-children-to-array
            'react/x-no-children-to-array': ['off'],
            'react/no-children-to-array': ['error'],

            // https://eslint-react.xyz/docs/rules/no-clone-element
            'react/x-no-clone-element': ['off'],
            'react/no-clone-element': ['error'],

            // https://eslint-react.xyz/docs/rules/no-component-will-mount
            'react/x-no-component-will-mount': ['off'],
            'react/no-component-will-mount': ['error'],

            // https://eslint-react.xyz/docs/rules/no-component-will-receive-props
            'react/x-no-component-will-receive-props': ['off'],
            'react/no-component-will-receive-props': ['error'],

            // https://eslint-react.xyz/docs/rules/no-component-will-update
            'react/x-no-component-will-update': ['off'],
            'react/no-component-will-update': ['error'],

            // https://eslint-react.xyz/docs/rules/no-context-provider
            'react/x-no-context-provider': ['off'],
            'react/no-context-provider': ['error'],

            // https://eslint-react.xyz/docs/rules/no-create-ref
            'react/x-no-create-ref': ['off'],
            'react/no-create-ref': ['error'],

            // https://eslint-react.xyz/docs/rules/no-direct-mutation-state
            'react/x-no-direct-mutation-state': ['off'],
            'react/no-direct-mutation-state': ['error'],

            // https://eslint-react.xyz/docs/rules/no-forward-ref
            'react/x-no-forward-ref': ['off'],
            'react/no-forward-ref': ['error'],

            // https://eslint-react.xyz/docs/rules/no-missing-key
            'react/x-no-missing-key': ['off'],
            'react/no-missing-key': ['error'],

            // https://eslint-react.xyz/docs/rules/no-nested-component-definitions
            'react/x-no-nested-component-definitions': ['off'],
            'react/no-nested-component-definitions': ['error'],

            // https://eslint-react.xyz/docs/rules/no-nested-lazy-component-declarations
            'react/x-no-nested-lazy-component-declarations': ['off'],
            'react/no-nested-lazy-component-declarations': ['error'],

            // https://eslint-react.xyz/docs/rules/no-set-state-in-component-did-mount
            'react/x-no-set-state-in-component-did-mount': ['off'],
            'react/no-set-state-in-component-did-mount': ['error'],

            // https://eslint-react.xyz/docs/rules/no-set-state-in-component-did-update
            'react/x-no-set-state-in-component-did-update': ['off'],
            'react/no-set-state-in-component-did-update': ['error'],

            // https://eslint-react.xyz/docs/rules/no-set-state-in-component-will-update
            'react/x-no-set-state-in-component-will-update': ['off'],
            'react/no-set-state-in-component-will-update': ['error'],

            // https://eslint-react.xyz/docs/rules/no-unnecessary-use-prefix
            'react/x-no-unnecessary-use-prefix': ['off'],
            'react/no-unnecessary-use-prefix': ['error'],

            // https://eslint-react.xyz/docs/rules/no-unsafe-component-will-mount
            'react/x-no-unsafe-component-will-mount': ['off'],
            'react/no-unsafe-component-will-mount': ['error'],

            // https://eslint-react.xyz/docs/rules/no-unsafe-component-will-receive-props
            'react/x-no-unsafe-component-will-receive-props': ['off'],
            'react/no-unsafe-component-will-receive-props': ['error'],

            // https://eslint-react.xyz/docs/rules/no-unsafe-component-will-update
            'react/x-no-unsafe-component-will-update': ['off'],
            'react/no-unsafe-component-will-update': ['error'],

            // https://eslint-react.xyz/docs/rules/no-unstable-context-value
            'react/x-no-unstable-context-value': ['off'],
            'react/no-unstable-context-value': ['error'],

            // https://eslint-react.xyz/docs/rules/no-unstable-default-props
            'react/x-no-unstable-default-props': ['off'],
            'react/no-unstable-default-props': ['error'],

            // https://eslint-react.xyz/docs/rules/no-unused-class-component-members
            'react/x-no-unused-class-component-members': ['off'],
            'react/no-unused-class-component-members': ['error'],

            // https://eslint-react.xyz/docs/rules/no-unused-state
            'react/x-no-unused-state': ['off'],
            'react/no-unused-state': ['error'],

            // https://eslint-react.xyz/docs/rules/no-use-context
            'react/x-no-use-context': ['off'],
            'react/no-use-context': ['error'],

            // https://eslint-react.xyz/docs/rules/purity
            'react/purity': ['error'],

            // https://eslint-react.xyz/docs/rules/rsc-function-definition
            'react/rsc-function-definition': ['error'],

            // https://react.dev/reference/rules/rules-of-hooks
            'react/rules-of-hooks': ['error'],

            // https://eslint-react.xyz/docs/rules/set-state-in-effect
            'react/set-state-in-effect': ['error'],

            // https://eslint-react.xyz/docs/rules/set-state-in-render
            'react/set-state-in-render': ['error'],

            // https://eslint-react.xyz/docs/rules/static-components
            'react/static-components': ['error'],

            // https://eslint-react.xyz/docs/rules/unsupported-syntax
            'react/unsupported-syntax': ['error'],

            // https://eslint-react.xyz/docs/rules/use-memo
            'react/use-memo': ['error'],

            // https://eslint-react.xyz/docs/rules/use-state
            'react/x-use-state': ['off'],
            'react/use-state': ['error'],

            // https://eslint-react.xyz/docs/rules/web-api-no-leaked-event-listener
            'react/web-api-no-leaked-event-listener': ['error'],

            // https://eslint-react.xyz/docs/rules/web-api-no-leaked-fetch
            'react/web-api-no-leaked-fetch': ['error'],

            // https://eslint-react.xyz/docs/rules/web-api-no-leaked-intersection-observer
            'react/web-api-no-leaked-intersection-observer': ['error'],

            // https://eslint-react.xyz/docs/rules/web-api-no-leaked-interval
            'react/web-api-no-leaked-interval': ['error'],

            // https://eslint-react.xyz/docs/rules/web-api-no-leaked-resize-observer
            'react/web-api-no-leaked-resize-observer': ['error'],

            // https://eslint-react.xyz/docs/rules/web-api-no-leaked-timeout
            'react/web-api-no-leaked-timeout': ['error'],

            // https://react.dev/reference/eslint-plugin-react-hooks/lints/error-boundaries
            'react-hooks-configurable/error-boundaries': ['error'],

            // https://github.com/facebook/react/issues/14920
            // https://react.dev/reference/rules/rules-of-hooks
            // https://github.com/facebook/react/issues/14920#issue-413077280
            'react-hooks-configurable/exhaustive-deps': ['warn', {
                additionalHooks: '(useUpdateEffect)',
                additionalStableHooks: {
                    '(use.+Ref|useErrorHandler)': true,
                    'useAnimation': true, // - Pour le paquet `motion`.
                    'useAnimationControls': true, // - Pour le paquet `motion`.
                    'useEvent': true,
                },
            }],

            // https://react.dev/reference/eslint-plugin-react-hooks/lints/globals
            'react-hooks-configurable/globals': ['error'],

            // https://react.dev/reference/eslint-plugin-react-hooks/lints/immutability
            'react-hooks-configurable/immutability': ['error'],

            // https://react.dev/reference/eslint-plugin-react-hooks/lints/incompatible-library
            'react-hooks-configurable/incompatible-library': ['error'],

            // https://react.dev/reference/eslint-plugin-react-hooks/lints/preserve-manual-memoization
            'react-hooks-configurable/preserve-manual-memoization': ['error'],

            // https://react.dev/reference/eslint-plugin-react-hooks/lints/purity
            'react-hooks-configurable/purity': ['error'],

            // https://react.dev/reference/eslint-plugin-react-hooks/lints/refs
            'react-hooks-configurable/refs': ['error'],

            // https://reactjs.org/docs/hooks-rules.html
            'react-hooks-configurable/rules-of-hooks': ['error'],

            // https://react.dev/reference/eslint-plugin-react-hooks/lints/unsupported-syntax
            'react-hooks-configurable/unsupported-syntax': ['error'],

            // https://react.dev/reference/eslint-plugin-react-hooks/lints/use-memo
            'react-hooks-configurable/use-memo': ['error'],

            //
            // - Règles désactivées car non documentées / internes / expérimentales
            //   TODO: À activer au cas par cas lorsqu'elles seront stables.
            //

            // https://eslint-react.xyz/docs/rules/no-implicit-ref
            'react/no-implicit-ref': ['off'],
            'react/x-no-implicit-ref': ['off'],

            // https://eslint-react.xyz/docs/rules/no-implicit-children
            'react/no-implicit-children': ['off'],
            'react/x-no-implicit-children': ['off'],

            // https://eslint-react.xyz/docs/rules/no-misused-capture-owner-stack
            'react/no-misused-capture-owner-stack': ['off'],
            'react/x-no-misused-capture-owner-stack': ['off'],

            // https://eslint-react.xyz/docs/rules/no-unused-props
            'react/no-unused-props': ['off'],
            'react/x-no-unused-props': ['off'],

            // See https://github.com/react/react/blob/v19.2.7/compiler/packages/babel-plugin-react-compiler/src/CompilerError.ts
            'react-hooks-configurable/capitalized-calls': ['off'],
            'react-hooks-configurable/exhaustive-effect-dependencies': ['off'],
            'react-hooks-configurable/fbt': ['off'],
            'react-hooks-configurable/hooks': ['off'],
            'react-hooks-configurable/invariant': ['off'],
            'react-hooks-configurable/memo-dependencies': ['off'],
            'react-hooks-configurable/memoized-effect-dependencies': ['off'],
            'react-hooks-configurable/no-deriving-state-in-effects': ['off'],
            'react-hooks-configurable/rule-suppression': ['off'],
            'react-hooks-configurable/syntax': ['off'],
            'react-hooks-configurable/todo': ['off'],
            'react-hooks-configurable/void-use-memo': ['off'],

            //
            // - Règles déjà prises en charge par `react-hooks-configurable`
            //

            'react/globals': ['off'],
            'react/immutability': ['off'],
            'react/refs': ['off'],
            'react/x-error-boundaries': ['off'],
            'react/x-globals': ['off'],
            'react/x-immutability': ['off'],
            'react/x-purity': ['off'],
            'react/x-refs': ['off'],
            'react/x-rules-of-hooks': ['off'],
            'react/x-set-state-in-effect': ['off'],
            'react/x-set-state-in-render': ['off'],
            'react/x-static-components': ['off'],
            'react/x-unsupported-syntax': ['off'],
            'react/x-use-memo': ['off'],

            //
            // - Règles désactivées.
            //

            // https://tanstack.com/query/latest/docs/eslint/prefer-query-options
            '@tanstack/query/prefer-query-options': ['off'],

            // https://eslint-react.xyz/docs/rules/no-class-component
            'react/no-class-component': ['off'],
            'react/x-no-class-component': ['off'],

            // https://eslint-react.xyz/docs/rules/no-duplicate-key
            'react/x-no-duplicate-key': ['off'],
            'react/no-duplicate-key': ['off'],

            // https://eslint-react.xyz/docs/rules/no-implicit-key
            'react/x-no-implicit-key': ['off'],
            'react/no-implicit-key': ['off'],

            // https://eslint-react.xyz/docs/rules/no-leaked-conditional-rendering
            'react/x-no-leaked-conditional-rendering': ['off'],
            'react/no-leaked-conditional-rendering': ['off'],

            // https://eslint-react.xyz/docs/rules/no-missing-component-display-name
            'react/x-no-missing-component-display-name': ['off'],
            'react/no-missing-component-display-name': ['off'],

            // https://eslint-react.xyz/docs/rules/no-missing-context-display-name
            'react/x-no-missing-context-display-name': ['off'],
            'react/no-missing-context-display-name': ['off'],

            // https://eslint.style/rules/jsx-child-element-spacing
            '@stylistic/jsx-child-element-spacing': ['off'],

            // https://eslint.style/rules/jsx-newline
            '@stylistic/jsx-newline': ['off'],

            // https://eslint.style/rules/jsx-one-expression-per-line
            '@stylistic/jsx-one-expression-per-line': ['off'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/anchor-ambiguous-text.md
            'jsx-a11y/anchor-ambiguous-text': ['off'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/autocomplete-valid.md
            'jsx-a11y/autocomplete-valid': ['off'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/click-events-have-key-events.md
            'jsx-a11y/click-events-have-key-events': ['off'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/label-has-associated-control.md
            'jsx-a11y/label-has-associated-control': ['off'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/mouse-events-have-key-events.md
            'jsx-a11y/mouse-events-have-key-events': ['off'],

            // https://github.com/es-tooling/eslint-plugin-jsx-a11y-x/blob/main/docs/rules/prefer-tag-over-role.md
            'jsx-a11y/prefer-tag-over-role': ['off'],

            // https://react.dev/reference/eslint-plugin-react-hooks/lints/config
            'react-hooks-configurable/config': ['off'],

            // https://react.dev/reference/eslint-plugin-react-hooks/lints/gating
            'react-hooks-configurable/gating': ['off'],

            // https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-effect
            'react-hooks-configurable/set-state-in-effect': ['off'],

            // https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-render
            'react-hooks-configurable/set-state-in-render': ['off'],

            // https://react.dev/reference/eslint-plugin-react-hooks/lints/static-components
            'react-hooks-configurable/static-components': ['off'],
        },
    },
];

export default [
    ...base,
    ...typescriptConfig,
];
