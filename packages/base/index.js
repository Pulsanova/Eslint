'use strict';

// - Corrige la prise en charge des plugins chargés dans les configs. partagées.
//   (@see https://github.com/eslint/eslint/issues/3458)
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    env: {
        es6: true,
        node: false,
        browser: false,
    },

    // - Parseur
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script',
    },

    // - Settings
    settings: {
        jsdoc: {
            tagNamePreference: {
                todo: 'TODO',
                var: 'var',
                member: 'var',
                return: 'returns',
                returns: 'returns',
                access: {
                    message: 'Use instead: `@private`, `@protected`, `@public` or `@package`',
                },
            },
            exemptDestructuredRootsFromChecks: true,
            ignoreInternal: true,
            mode: 'jsdoc',
        },
    },

    // - Plugins
    plugins: ['unicorn', 'jsdoc'],

    // - Règles
    extends: 'airbnb-base',
    rules: {
        // @see https://eslint.org/docs/rules/array-callback-return
        'array-callback-return': ['error', { allowImplicit: false }],

        // @see https://eslint.org/docs/rules/curly
        'curly': ['error', 'all'],

        // @see https://eslint.org/docs/rules/eqeqeq
        'eqeqeq': ['error', 'always', { null: 'always' }],

        // @see https://eslint.org/docs/rules/func-name-matching
        'func-name-matching': ['error', 'always', {
            considerPropertyDescriptor: true,
            includeCommonJSModuleExports: false,
        }],

        // @see https://eslint.org/docs/rules/func-style
        'func-style': ['error', 'expression'],

        // @see https://eslint.org/docs/rules/func-names
        'func-names': ['warn', 'as-needed'],

        // @see https://eslint.org/docs/rules/grouped-accessor-pairs
        'grouped-accessor-pairs': ['error', 'getBeforeSet'],

        // @see https://github.com/benmosher/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md
        'import/no-extraneous-dependencies': ['error', {
            devDependencies: [
                'tests/**',
                '**/__tests__/**',
                '**/__mocks__/**',
                '**/*.{test,spec}.{js,ts,tsx}',
                '**/{test,spec}.{js,ts,tsx}',
                '**/gulpfile.?({c,m})js',
                '**/vue.config.?({c,m})js',
                '**/rollup.config.?({c,m})js',
                '**/webpack.config.?({c,m})js',
                '**/postcss.config.?({c,m})js',
                '**/next.config.?({c,m})js',
                '**/.eslintrc.?({c,m})js',
                '**/.stylelintrc.?({c,m})js',
                '**/eslint.config.?({c,m})js',
            ],
            optionalDependencies: false,
        }],

        // @see https://github.com/benmosher/eslint-plugin-import/blob/main/docs/rules/extensions.md
        'import/extensions': ['error', 'ignorePackages', { js: 'never' }],

        // @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
        'import/order': ['error', {
            groups: [
                [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'unknown',
                ],
                'object',
                'type',
            ],
            pathGroups: [
                { pattern: './*.scss', group: 'builtin', position: 'before' },
                { pattern: '**/*.scss', group: 'builtin', position: 'before' },
            ],
            warnOnUnassignedImports: true,

            // TODO [eslint-plugin-import@>=2.27.0]: À activer lorsque la version 2.27.0 sera releasée.
            // 'newlines-between': 'always-and-inside-groups',
            // 'distinctGroup': false,
        }],

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

            // @see https://github.com/benjamn/ast-types/blob/master/def/jsx.ts
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

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/check-access.md
        'jsdoc/check-access': ['error'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/check-alignment.md
        'jsdoc/check-alignment': ['error'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/check-line-alignment.md
        'jsdoc/check-line-alignment': ['error', 'never'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/check-param-names.md
        'jsdoc/check-param-names': ['error', {
            checkRestProperty: false,
            checkDestructured: false,
            allowExtraTrailingParamDocs: false,
            disableExtraPropertyReporting: false,
            useDefaultObjectProperties: false,
        }],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/check-tag-names.md
        'jsdoc/check-tag-names': ['error', {
            definedTags: ['TODO', 'TODO:'],
        }],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/check-types.md
        'jsdoc/check-types': ['error'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/check-values.md
        'jsdoc/check-values': ['error'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/empty-tags.md
        'jsdoc/empty-tags': ['error'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/implements-on-classes.md
        'jsdoc/implements-on-classes': ['error'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/match-description.md
        'jsdoc/match-description': ['error', {
            message: 'Description should begin with a capital letter and end with a dot (exceptions: ()`_?!{}).',
            matchDescription: '^\n?([{\\-(A-Z`\\d_][\\s\\S]*[.?!`)}]\\s*)?$',
            tags: { param: true, returns: true, throws: true },
        }],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/multiline-blocks.md
        'jsdoc/multiline-blocks': ['error', {
            noZeroLineText: true,
            noFinalLineText: true,
            noSingleLineBlocks: false,
            noMultilineBlocks: false,
        }],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/newline-after-description.md
        'jsdoc/newline-after-description': ['error', 'always'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/no-bad-blocks.md
        'jsdoc/no-bad-blocks': ['error'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/no-multi-asterisks.md
        'jsdoc/no-multi-asterisks': ['error', {
            allowWhitespace: false,
            preventAtMiddleLines: true,
            preventAtEnd: true,
        }],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-asterisk-prefix.md
        'jsdoc/require-asterisk-prefix': ['error', 'always'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-description.md
        'jsdoc/require-description': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-hyphen-before-param-description.md
        'jsdoc/require-hyphen-before-param-description': ['error'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-param.md
        'jsdoc/require-param': ['error', {
            enableFixer: false,
            checkConstructors: true,
            checkDestructuredRoots: true,
            checkDestructured: false,
            checkRestProperty: false,
            checkGetters: false,
            checkSetters: false,
            exemptedBy: ['inheritDoc', 'see'],
            contexts: [
                // - `const foo = (param) => {};`
                // - NOT `const _foo = (param) => {};`
                ':not(VariableDeclarator) > ArrowFunctionExpression',
                'VariableDeclarator:not([id.name=/^_.*/]) > ArrowFunctionExpression',

                // - `function foo(param) {}`
                // - NOT `function _foo(param) {}`
                'FunctionDeclaration:not([id.name=/^_.*/])',

                // - `const foo = function (param) {};`
                // - `class MyClass { public foo(param) {} }`
                // - `class MyClass { foo(param) {} }`
                // - NOT `class MyClass { _foo(param) {} }`
                // - NOT `class MyClass { protected foo(param) {} }`
                ':not(MethodDefinition):not(VariableDeclarator) > FunctionExpression',
                'VariableDeclarator:not([id.name=/^_.*/]) > FunctionExpression',
                'MethodDefinition[accessibility=public] > FunctionExpression',
                'MethodDefinition:not([accessibility]):not([key.name=/^_.*/]) > FunctionExpression',
            ],
        }],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-param-name.md
        'jsdoc/require-param-name': ['error'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-param-type.md
        'jsdoc/require-param-type': ['error'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-property.md
        'jsdoc/require-property': ['error'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-property-name.md
        'jsdoc/require-property-name': ['error'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-property-type.md
        'jsdoc/require-property-type': ['error'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-returns-check.md
        'jsdoc/require-returns-check': ['error', {
            reportMissingReturnForUndefinedTypes: false,
            exemptGenerators: true,
            exemptAsync: true,
        }],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-returns-type.md
        'jsdoc/require-returns-type': ['error'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-yields-check.md
        'jsdoc/require-yields-check': ['error'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/valid-types.md
        'jsdoc/valid-types': ['error'],

        // @see https://eslint.org/docs/latest/rules/logical-assignment-operators
        'logical-assignment-operators': ['error', 'always', {
            enforceForIfStatements: false,
        }],

        // @see https://eslint.org/docs/rules/max-len
        'max-len': ['error', 150, 4, {
            ignoreComments: true,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreTrailingComments: true,
            ignoreUrls: true,
        }],

        // @see https://eslint.org/docs/rules/no-constant-binary-expression
        'no-constant-binary-expression': ['error'],

        // @see https://eslint.org/docs/rules/no-empty
        'no-empty': ['error', { allowEmptyCatch: true }],

        // @see https://eslint.org/docs/rules/no-empty-static-block
        'no-empty-static-block': ['error'],

        // @see https://eslint.org/docs/rules/no-implicit-globals
        'no-implicit-globals': ['error'],

        // @see https://eslint.org/docs/rules/no-nested-ternary
        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-nested-ternary.md
        'no-nested-ternary': ['off'],
        'unicorn/no-nested-ternary': ['error'],

        // @see https://eslint.org/docs/rules/no-new-native-nonconstructor
        'no-new-native-nonconstructor': ['error'],

        // @see https://eslint.org/docs/rules/no-plusplus
        'no-plusplus': ['error', {
            allowForLoopAfterthoughts: true,
        }],

        // @see https://eslint.org/docs/rules/no-restricted-exports
        'no-restricted-exports': ['error', {
            restrictedNamedExports: ['then'],
        }],

        // @see https://eslint.org/docs/rules/no-unused-private-class-members
        'no-unused-private-class-members': ['error'],

        // @see https://eslint.org/docs/rules/object-curly-newline
        'object-curly-newline': ['error', {
            ObjectExpression: { multiline: true, consistent: true },
            ObjectPattern: { multiline: true, consistent: true },
            ImportDeclaration: { multiline: true, consistent: true },
            ExportDeclaration: { multiline: true, consistent: true },
        }],

        // @see https://eslint.org/docs/rules/operator-linebreak
        'operator-linebreak': ['error', 'after', {
            overrides: {
                '=': 'none',
                '?': 'before',
                ':': 'before',
            },
        }],

        // @see https://eslint.org/docs/rules/prefer-arrow-callback
        'prefer-arrow-callback': ['error', {
            allowNamedFunctions: true,
            allowUnboundThis: true,
        }],

        // @see https://eslint.org/docs/rules/prefer-named-capture-group
        'prefer-named-capture-group': ['error'],

        // @see https://eslint.org/docs/rules/prefer-object-has-own
        'prefer-object-has-own': ['error'],

        // @see https://eslint.org/docs/rules/quotes
        'quotes': ['error', 'single', { allowTemplateLiterals: true }],

        // @see https://eslint.org/docs/rules/quote-props
        'quote-props': ['error', 'consistent'],

        // @see https://eslint.org/docs/rules/require-atomic-updates
        'require-atomic-updates': ['error', {
            allowProperties: true,
        }],

        // @see https://eslint.org/docs/rules/strict
        'strict': ['error', 'safe'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/custom-error-definition.md
        'unicorn/custom-error-definition': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/error-message.md
        'unicorn/error-message': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/escape-case.md
        'unicorn/escape-case': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/expiring-todo-comments.md
        'unicorn/expiring-todo-comments': ['warn', {
            terms: ['TODO', 'FIXME', '@TODO'],
            allowWarningComments: true,
        }],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/new-for-builtins.md
        'unicorn/new-for-builtins': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-method-this-argument.md
        'unicorn/no-array-method-this-argument': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-console-spaces.md
        'unicorn/no-console-spaces': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-instanceof-array.md
        'unicorn/no-instanceof-array': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-invalid-remove-event-listener.md
        'unicorn/no-invalid-remove-event-listener': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-new-array.md
        'unicorn/no-new-array': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-new-buffer.md
        'unicorn/no-new-buffer': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-thenable.md
        'unicorn/no-thenable': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-await.md
        'unicorn/no-unnecessary-await': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unreadable-array-destructuring.md
        'unicorn/no-unreadable-array-destructuring': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unreadable-iife.md
        'unicorn/no-unreadable-iife': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unused-properties.md
        'unicorn/no-unused-properties': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-fallback-in-spread.md
        'unicorn/no-useless-fallback-in-spread': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-length-check.md
        'unicorn/no-useless-length-check': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-spread.md
        'unicorn/no-useless-spread': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/number-literal-case.md
        'unicorn/number-literal-case': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/numeric-separators-style.md
        'unicorn/numeric-separators-style': ['error', {
            onlyIfContainsSeparator: true,
            number: {
                onlyIfContainsSeparator: false,
                minimumDigits: 6,
            },
        }],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-find.md
        'unicorn/prefer-array-find': ['error', { checkFromLast: true }],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat.md
        'unicorn/prefer-array-flat': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat-map.md
        'unicorn/prefer-array-flat-map': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-index-of.md
        'unicorn/prefer-array-index-of': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-some.md
        'unicorn/prefer-array-some': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-at.md
        'unicorn/prefer-at': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-code-point.md
        'unicorn/prefer-code-point': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-date-now.md
        'unicorn/prefer-date-now': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-includes.md
        'unicorn/prefer-includes': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-logical-operator-over-ternary.md
        'unicorn/prefer-logical-operator-over-ternary': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-math-trunc.md
        'unicorn/prefer-math-trunc': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-modern-math-apis.md
        'unicorn/prefer-modern-math-apis': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-native-coercion-functions.md
        'unicorn/prefer-native-coercion-functions': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-negative-index.md
        'unicorn/prefer-negative-index': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-optional-catch-binding.md
        'unicorn/prefer-optional-catch-binding': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-prototype-methods.md
        'unicorn/prefer-prototype-methods': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-set-size.md
        'unicorn/prefer-set-size': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-replace-all.md
        'unicorn/prefer-string-replace-all': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-starts-ends-with.md
        'unicorn/prefer-string-starts-ends-with': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-trim-start-end.md
        'unicorn/prefer-string-trim-start-end': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/relative-url-style.md
        'unicorn/relative-url-style': ['error', 'always'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-array-join-separator.md
        'unicorn/require-array-join-separator': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-number-to-fixed-digits-argument.md
        'unicorn/require-number-to-fixed-digits-argument': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/text-encoding-identifier-case.md
        'unicorn/text-encoding-identifier-case': ['error'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/throw-new-error.md
        'unicorn/throw-new-error': ['error'],

        //
        // - Règles désactivées.
        //

        // - Faux positifs avec les imports dynamiques (= `import(...).then((>>> module <<<) => {});`)
        // @see https://github.com/benmosher/eslint-plugin-import/blob/1012eb951767279ce3b540a4ec4f29236104bb5b/docs/rules/no-import-module-exports.md
        'import/no-import-module-exports': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/check-examples.md
        'jsdoc/check-examples': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/check-indentation.md
        'jsdoc/check-indentation': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/check-property-names.md
        'jsdoc/check-property-names': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/check-syntax.md
        'jsdoc/check-syntax': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/match-name.md
        'jsdoc/match-name': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/no-defaults.md
        'jsdoc/no-defaults': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/no-missing-syntax.md
        'jsdoc/no-missing-syntax': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/no-restricted-syntax.md
        'jsdoc/no-restricted-syntax': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/no-types.md
        'jsdoc/no-types': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/no-undefined-types.md
        'jsdoc/no-undefined-types': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-description-complete-sentence.md
        'jsdoc/require-description-complete-sentence': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-example.md
        'jsdoc/require-example': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-file-overview.md
        'jsdoc/require-file-overview': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-jsdoc.md
        'jsdoc/require-jsdoc': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-param-description.md
        'jsdoc/require-param-description': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-property-description.md
        'jsdoc/require-property-description': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-returns.md
        'jsdoc/require-returns': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-returns-description.md
        'jsdoc/require-returns-description': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-throws.md
        'jsdoc/require-throws': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-yields.md
        'jsdoc/require-yields': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/sort-tags.md
        'jsdoc/sort-tags': ['off'],

        // TODO: À activer lorsque https://github.com/gajus/eslint-plugin-jsdoc/issues/782 aura été corrigé.
        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/tag-lines.md
        'jsdoc/tag-lines': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/text-escaping.md
        'jsdoc/text-escaping': ['off'],

        // @see https://eslint.org/docs/rules/no-continue
        'no-continue': ['off'],

        // @see https://eslint.org/docs/rules/no-param-reassign
        'no-param-reassign': ['off'],

        // @see https://eslint.org/docs/rules/no-underscore-dangle
        'no-underscore-dangle': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/better-regex.md
        'unicorn/better-regex': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/catch-error-name.md
        'unicorn/catch-error-name': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-destructuring.md
        'unicorn/consistent-destructuring': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-function-scoping.md
        'unicorn/consistent-function-scoping': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/empty-brace-spaces.md
        'unicorn/empty-brace-spaces': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/explicit-length-check.md
        'unicorn/explicit-length-check': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
        'unicorn/filename-case': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/import-index.md
        'unicorn/import-index': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/import-style.md
        'unicorn/import-style': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-abusive-eslint-disable.md
        'unicorn/no-abusive-eslint-disable': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-callback-reference.md
        'unicorn/no-array-callback-reference': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-for-each.md
        'unicorn/no-array-for-each': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-push-push.md
        'unicorn/no-array-push-push': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reduce.md
        'unicorn/no-array-reduce': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-await-expression-member.md
        'unicorn/no-await-expression-member': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-document-cookie.md
        'unicorn/no-document-cookie': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-empty-file.md
        'unicorn/no-empty-file': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-for-loop.md
        'unicorn/no-for-loop': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-hex-escape.md
        'unicorn/no-hex-escape': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-keyword-prefix.md
        'unicorn/no-keyword-prefix': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-lonely-if.md
        'unicorn/no-lonely-if': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-negated-condition.md
        'unicorn/no-negated-condition': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-null.md
        'unicorn/no-null': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-object-as-default-parameter.md
        'unicorn/no-object-as-default-parameter': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-process-exit.md
        'unicorn/no-process-exit': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-static-only-class.md
        'unicorn/no-static-only-class': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-this-assignment.md
        'unicorn/no-this-assignment': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-typeof-undefined.md
        'unicorn/no-typeof-undefined': ['off'],

        // NOTE: Trop de faux positifs.
        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/issues/153
        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unsafe-regex.md
        'unicorn/no-unsafe-regex': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-promise-resolve-reject.md
        'unicorn/no-useless-promise-resolve-reject': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-switch-case.md
        'unicorn/no-useless-switch-case': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-undefined.md
        'unicorn/no-useless-undefined': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-zero-fractions.md
        'unicorn/no-zero-fractions': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-add-event-listener.md
        'unicorn/prefer-add-event-listener': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-default-parameters.md
        'unicorn/prefer-default-parameters': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-append.md
        'unicorn/prefer-dom-node-append': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-dataset.md
        'unicorn/prefer-dom-node-dataset': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-remove.md
        'unicorn/prefer-dom-node-remove': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-text-content.md
        'unicorn/prefer-dom-node-text-content': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-export-from.md
        'unicorn/prefer-export-from': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-event-target.md
        'unicorn/prefer-event-target': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-json-parse-buffer.md
        'unicorn/prefer-json-parse-buffer': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-keyboard-event-key.md
        'unicorn/prefer-keyboard-event-key': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-modern-dom-apis.md
        'unicorn/prefer-modern-dom-apis': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md
        'unicorn/prefer-module': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md
        'unicorn/prefer-node-protocol': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-number-properties.md
        'unicorn/prefer-number-properties': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-object-from-entries.md
        'unicorn/prefer-object-from-entries': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-query-selector.md
        'unicorn/prefer-query-selector': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-reflect-apply.md
        'unicorn/prefer-reflect-apply': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-regexp-test.md
        'unicorn/prefer-regexp-test': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-set-has.md
        'unicorn/prefer-set-has': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md
        'unicorn/prefer-spread': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-slice.md
        'unicorn/prefer-string-slice': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-switch.md
        'unicorn/prefer-switch': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-ternary.md
        'unicorn/prefer-ternary': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-top-level-await.md
        'unicorn/prefer-top-level-await': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-type-error.md
        'unicorn/prefer-type-error': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md
        'unicorn/prevent-abbreviations': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-post-message-target-origin.md
        'unicorn/require-post-message-target-origin': ['off'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/string-content.md
        'unicorn/string-content': ['off'],

        // TODO: À activer ?
        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/switch-case-braces.md
        'unicorn/switch-case-braces': ['off', 'always'],

        // @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/template-indent.md
        'unicorn/template-indent': ['off'],
    },
    reportUnusedDisableDirectives: true,
};
