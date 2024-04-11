'use strict';

module.exports = {
    // - Parseur
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
        warnOnUnsupportedTypeScriptVersion: true,
    },

    // - Plugins
    plugins: [
        '@typescript-eslint',
        '@stylistic/ts',
    ],

    // - Configuration
    settings: {
        jsdoc: {
            tagNamePreference: {
                access: false,
                package: false,
                private: false,
                protected: false,
                public: false,
                static: false,
                typedef: false,
            },
            mode: 'typescript',
        },
    },

    // - Règles
    rules: {
        // https://typescript-eslint.io/rules/adjacent-overload-signatures
        '@typescript-eslint/adjacent-overload-signatures': ['error'],

        // https://typescript-eslint.io/rules/array-type
        '@typescript-eslint/array-type': ['error', {
            default: 'array-simple',
            readonly: 'array-simple',
        }],

        // https://typescript-eslint.io/rules/ban-ts-comment
        '@typescript-eslint/ban-ts-comment': ['error', {
            'ts-check': true,
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': 'allow-with-description',
            'ts-nocheck': true,
        }],

        // https://typescript-eslint.io/rules/ban-tslint-comment
        '@typescript-eslint/ban-tslint-comment': ['error'],

        // https://typescript-eslint.io/rules/ban-types
        '@typescript-eslint/ban-types': ['error', {
            extendDefaults: false,
            types: {
                'BigInt': { message: 'Use bigint instead', fixWith: 'bigint' },
                'Boolean': { message: 'Use boolean instead', fixWith: 'boolean' },
                'Number': { message: 'Use number instead', fixWith: 'number' },
                'String': { message: 'Use string instead', fixWith: 'string' },
                'Symbol': { message: 'Use symbol instead', fixWith: 'symbol' },
                'Object': {
                    message: [
                        'The `Object` type actually means "any non-nullish value".',
                        '- If you want a type meaning "any object literal", you probably want `Record<string, any>` instead.',
                        '- If you really want a type meaning "any non-nullish value", you probably want `NonNullable<unknown>` instead.',
                    ].join('\n'),
                    suggest: [
                        'Record<string, any>',
                        'NonNullable<unknown>',
                    ],
                },
                'object': { message: 'Use Record<string, any> instead', fixWith: 'Record<string, any>' },
                '{}': {
                    message: [
                        '`{}` actually means "any non-nullish value".',
                        '- If you want a type meaning "any object literal", you probably want `Record<string, any>` instead.',
                        '- If you want a type meaning "empty object", you probably want `Record<string, never>` instead.',
                        '- If you really want a type meaning "any non-nullish value", you probably want `NonNullable<unknown>` instead.',
                    ].join('\n'),
                    suggest: [
                        'Record<string, any>',
                        'Record<string, never>',
                        'NonNullable<unknown>',
                    ],
                },
            },
        }],

        // https://eslint.style/rules/default/block-spacing
        '@stylistic/js/block-spacing': ['off'],
        '@stylistic/ts/block-spacing': ['error', 'always'],

        // https://eslint.style/rules/default/brace-style
        '@stylistic/js/brace-style': ['off'],
        '@stylistic/ts/brace-style': ['error', '1tbs', { allowSingleLine: true }],

        // https://typescript-eslint.io/rules/class-literal-property-style
        '@typescript-eslint/class-literal-property-style': ['error', 'fields'],

        // https://typescript-eslint.io/rules/class-methods-use-this
        'class-methods-use-this': ['off'],
        '@typescript-eslint/class-methods-use-this': ['error', {
            ignoreClassesThatImplementAnInterface: true,
            exceptMethods: [],
        }],

        // https://eslint.style/rules/default/comma-dangle
        '@stylistic/js/comma-dangle': ['off'],
        '@stylistic/ts/comma-dangle': ['error', {
            arrays: 'always-multiline',
            enums: 'always-multiline',
            exports: 'always-multiline',
            functions: 'always-multiline',
            generics: 'always-multiline',
            imports: 'always-multiline',
            objects: 'always-multiline',
            tuples: 'always-multiline',
        }],

        // https://eslint.style/rules/default/comma-spacing
        '@stylistic/js/comma-spacing': ['off'],
        '@stylistic/ts/comma-spacing': ['error', { before: false, after: true }],

        // https://typescript-eslint.io/rules/consistent-indexed-object-style
        '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],

        // https://typescript-eslint.io/rules/consistent-return
        'consistent-return': ['error'],
        '@typescript-eslint/consistent-return': ['error'],

        // https://typescript-eslint.io/rules/consistent-type-assertions
        '@typescript-eslint/consistent-type-assertions': ['error', {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow',
        }],

        // https://typescript-eslint.io/rules/consistent-type-exports
        '@typescript-eslint/consistent-type-exports': ['error'],

        // https://typescript-eslint.io/rules/consistent-type-imports
        '@typescript-eslint/consistent-type-imports': ['error', {
            prefer: 'type-imports',
            disallowTypeAnnotations: true,
        }],

        // https://typescript-eslint.io/rules/default-param-last
        'default-param-last': ['off'],
        '@typescript-eslint/default-param-last': ['error'],

        // https://typescript-eslint.io/rules/dot-notation
        'dot-notation': ['off'],
        '@typescript-eslint/dot-notation': ['error', {
            allowKeywords: true,
            allowPrivateClassPropertyAccess: false,
            allowProtectedClassPropertyAccess: false,
        }],

        // https://typescript-eslint.io/rules/explicit-function-return-type
        '@typescript-eslint/explicit-function-return-type': ['error', {
            allowedNames: [],
            allowIIFEs: true,
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
            allowFunctionsWithoutTypeParameters: false,
            allowConciseArrowFunctionExpressionsStartingWithVoid: false,
        }],

        // https://typescript-eslint.io/rules/explicit-member-accessibility
        '@typescript-eslint/explicit-member-accessibility': ['error', {
            accessibility: 'explicit',
            ignoredMethodNames: [],
            overrides: {
                constructors: 'no-public',
            },
        }],

        // https://eslint.style/rules/ts/block-spacing
        '@stylistic/ts/func-call-spacing': ['off'],
        '@stylistic/js/function-call-spacing': ['off'],
        '@stylistic/ts/function-call-spacing': ['error', 'never'],

        // https://eslint.style/rules/default/indent
        // NOTE: https://github.com/typescript-eslint/typescript-eslint/issues/1824
        '@stylistic/js/indent': ['off'],
        '@stylistic/ts/indent': ['error', 4, {
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

            // https://github.com/benjamn/ast-types/blob/main/def/jsx.ts
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

        // https://eslint.style/rules/js/key-spacing
        '@stylistic/js/key-spacing': ['off'],
        '@stylistic/ts/key-spacing': ['error', {
            beforeColon: false,
            afterColon: true,
        }],

        // https://eslint.style/rules/default/keyword-spacing
        '@stylistic/js/keyword-spacing': ['off'],
        '@stylistic/ts/keyword-spacing': ['error', {
            after: true,
            before: true,
            overrides: {
                case: { after: true },
                return: { after: true },
                throw: { after: true },
            },
        }],

        // https://eslint.style/rules/default/lines-around-comment
        '@stylistic/js/lines-around-comment': ['off'],
        '@stylistic/ts/lines-around-comment': ['error', {
            beforeBlockComment: true,
            afterBlockComment: false,
            beforeLineComment: false,
            afterLineComment: false,
            // afterHashbangComment: true,
            allowObjectStart: true,
            allowObjectEnd: true,
            allowBlockStart: true,
            allowBlockEnd: true,
            allowClassStart: true,
            allowClassEnd: true,
            allowArrayStart: true,
            allowArrayEnd: true,
            allowEnumEnd: true,
            allowEnumStart: true,
            allowInterfaceEnd: true,
            allowInterfaceStart: true,
            allowModuleEnd: true,
            allowModuleStart: true,
            allowTypeEnd: true,
            allowTypeStart: true,
        }],

        // https://eslint.style/rules/default/lines-between-class-members
        '@stylistic/js/lines-between-class-members': ['off'],
        '@stylistic/ts/lines-between-class-members': ['error', 'always', {
            exceptAfterOverload: true,
            exceptAfterSingleLine: false,
        }],

        // https://eslint.style/rules/default/member-delimiter-style
        '@stylistic/ts/member-delimiter-style': ['error', {
            multiline: { delimiter: 'comma', requireLast: true },
            singleline: { delimiter: 'comma', requireLast: false },
            overrides: {
                interface: {
                    multiline: { delimiter: 'semi', requireLast: true },
                    singleline: { delimiter: 'semi', requireLast: true },
                },
            },
        }],

        // https://typescript-eslint.io/rules/method-signature-style
        '@typescript-eslint/method-signature-style': ['error', 'method'],

        // https://typescript-eslint.io/rules/naming-convention
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'enumMember',
                format: ['UPPER_CASE'],
            },
            {
                selector: 'typeProperty',
                modifiers: ['requiresQuotes'],
                format: null,
            },
            {
                selector: ['typeProperty', 'typeMethod'],
                format: ['camelCase'],
                leadingUnderscore: 'allowSingleOrDouble',
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
        ],

        // https://typescript-eslint.io/rules/non-nullable-type-assertion-style
        '@typescript-eslint/non-nullable-type-assertion-style': ['error'],

        // https://typescript-eslint.io/rules/no-array-constructor
        'no-array-constructor': ['off'],
        '@typescript-eslint/no-array-constructor': ['error'],

        // https://typescript-eslint.io/rules/no-base-to-string
        '@typescript-eslint/no-base-to-string': ['error', {
            ignoredTypeNames: ['Error'],
        }],

        // https://typescript-eslint.io/rules/no-confusing-non-null-assertion
        '@typescript-eslint/no-confusing-non-null-assertion': ['error'],

        // https://typescript-eslint.io/rules/no-confusing-void-expression
        '@typescript-eslint/no-confusing-void-expression': ['error', {
            ignoreArrowShorthand: false,
            ignoreVoidOperator: false,
        }],

        // https://typescript-eslint.io/rules/no-dupe-class-members
        'no-dupe-class-members': ['off'],
        '@typescript-eslint/no-dupe-class-members': ['error'],

        // https://typescript-eslint.io/rules/no-duplicate-enum-values
        '@typescript-eslint/no-duplicate-enum-values': ['error'],

        // https://typescript-eslint.io/rules/no-empty-function
        'no-empty-function': ['off'],
        '@typescript-eslint/no-empty-function': ['error', {
            allow: [
                'arrowFunctions',
                'decoratedFunctions',
                'functions',
                'methods',
            ],
        }],

        // https://typescript-eslint.io/rules/no-extra-non-null-assertion
        '@typescript-eslint/no-extra-non-null-assertion': ['error'],

        // https://eslint.style/rules/default/no-extra-semi
        '@stylistic/js/no-extra-semi': ['off'],
        '@stylistic/ts/no-extra-semi': ['error'],

        // https://typescript-eslint.io/rules/no-extraneous-class
        '@typescript-eslint/no-extraneous-class': ['error', {
            allowConstructorOnly: true,
            allowStaticOnly: true,
            allowWithDecorator: true,
            allowEmpty: false,
        }],

        // https://typescript-eslint.io/rules/no-import-type-side-effects
        '@typescript-eslint/no-import-type-side-effects': ['error'],

        // https://typescript-eslint.io/rules/no-invalid-void-type
        '@typescript-eslint/no-invalid-void-type': ['error', {
            allowInGenericTypeArguments: true,
        }],

        // https://typescript-eslint.io/rules/no-loop-func
        'no-loop-func': ['off'],
        '@typescript-eslint/no-loop-func': ['error'],

        // https://typescript-eslint.io/rules/no-loss-of-precision
        'no-loss-of-precision': ['off'],
        '@typescript-eslint/no-loss-of-precision': ['error'],

        // https://typescript-eslint.io/rules/no-meaningless-void-operator
        '@typescript-eslint/no-meaningless-void-operator': ['error', {
            checkNever: false,
        }],

        // https://typescript-eslint.io/rules/no-non-null-asserted-nullish-coalescing
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': ['error'],

        // https://typescript-eslint.io/rules/no-misused-new
        '@typescript-eslint/no-misused-new': ['error'],

        // https://typescript-eslint.io/rules/no-mixed-enums
        '@typescript-eslint/no-mixed-enums': ['error'],

        // https://typescript-eslint.io/rules/no-namespace
        '@typescript-eslint/no-namespace': ['error', {
            allowDeclarations: false,
            allowDefinitionFiles: true,
        }],

        // https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain
        '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],

        // https://typescript-eslint.io/rules/no-redeclare
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': ['error', {
            ignoreDeclarationMerge: true,
        }],

        // https://typescript-eslint.io/rules/no-shadow
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error', {
            ignoreTypeValueShadow: false,
            ignoreFunctionTypeParameterNameValueShadow: false,
        }],

        // https://typescript-eslint.io/rules/no-unnecessary-qualifier
        '@typescript-eslint/no-unnecessary-qualifier': ['error'],

        // https://typescript-eslint.io/rules/no-unnecessary-type-arguments
        '@typescript-eslint/no-unnecessary-type-arguments': ['error'],

        // https://typescript-eslint.io/rules/no-unnecessary-type-assertion
        '@typescript-eslint/no-unnecessary-type-assertion': ['error', {
            typesToIgnore: [],
        }],

        // https://typescript-eslint.io/rules/no-unnecessary-type-constraint
        '@typescript-eslint/no-unnecessary-type-constraint': ['error'],

        // https://typescript-eslint.io/rules/no-unsafe-enum-comparison
        '@typescript-eslint/no-unsafe-enum-comparison': ['error'],

        // https://typescript-eslint.io/rules/no-unused-expressions
        'no-unused-expressions': ['off'],
        '@babel/no-unused-expressions': ['off'],
        '@typescript-eslint/no-unused-expressions': ['error', {
            allowShortCircuit: false,
            allowTaggedTemplates: false,
            allowTernary: true,
        }],

        // https://typescript-eslint.io/rules/no-unused-vars
        'no-unused-vars': ['off'],
        '@typescript-eslint/no-unused-vars': ['error', {
            args: 'after-used',
            ignoreRestSiblings: true,
            vars: 'all',
        }],

        // https://typescript-eslint.io/rules/no-use-before-define
        'no-use-before-define': ['off'],
        '@typescript-eslint/no-use-before-define': ['error', {
            classes: true,
            enums: true,
            functions: true,
            typedefs: true,
            variables: true,
        }],

        // https://typescript-eslint.io/rules/no-useless-constructor
        'no-useless-constructor': ['off'],
        '@typescript-eslint/no-useless-constructor': ['error'],

        // https://typescript-eslint.io/rules/no-useless-empty-export
        '@typescript-eslint/no-useless-empty-export': ['error'],

        // https://eslint.style/rules/default/object-curly-spacing
        '@stylistic/js/object-curly-spacing': ['off'],
        '@babel/object-curly-spacing': ['off'],
        '@stylistic/ts/object-curly-spacing': ['error', 'always'],

        // https://typescript-eslint.io/rules/parameter-properties
        '@typescript-eslint/parameter-properties': ['error', {
            prefer: 'class-property',
        }],

        // https://typescript-eslint.io/rules/prefer-as-const
        '@typescript-eslint/prefer-as-const': ['error'],

        // https://typescript-eslint.io/rules/prefer-destructuring
        'prefer-destructuring': ['off'],
        '@typescript-eslint/prefer-destructuring': [
            'error',
            {
                AssignmentExpression: { array: true, object: false },
                VariableDeclarator: { array: false, object: true },
            },
            {
                enforceForRenamedProperties: false,
            },
        ],

        // https://typescript-eslint.io/rules/prefer-enum-initializers
        '@typescript-eslint/prefer-enum-initializers': ['error'],

        // https://typescript-eslint.io/rules/prefer-function-type
        '@typescript-eslint/prefer-function-type': ['error'],

        // https://typescript-eslint.io/rules/prefer-namespace-keyword
        '@typescript-eslint/prefer-namespace-keyword': ['error'],

        // https://typescript-eslint.io/rules/prefer-promise-reject-errors
        'prefer-promise-reject-errors': ['off'],
        '@typescript-eslint/prefer-promise-reject-errors': ['error', {
            allowEmptyReject: true,
        }],

        // https://typescript-eslint.io/rules/prefer-reduce-type-parameter
        '@typescript-eslint/prefer-reduce-type-parameter': ['error'],

        // https://www.typescriptlang.org/docs/handbook/2/classes.html#this-types
        // https://typescript-eslint.io/rules/prefer-return-this-type
        '@typescript-eslint/prefer-return-this-type': ['error'],

        // https://typescript-eslint.io/rules/prefer-ts-expect-error
        '@typescript-eslint/prefer-ts-expect-error': ['error'],

        // https://eslint.style/rules/default/quotes
        '@stylistic/js/quotes': ['off'],
        '@stylistic/ts/quotes': ['error', 'single', { allowTemplateLiterals: true }],

        // https://eslint.style/rules/js/quote-props
        '@stylistic/js/quote-props': ['off'],
        '@stylistic/ts/quote-props': ['error', 'consistent'],

        // https://typescript-eslint.io/rules/restrict-plus-operands
        '@typescript-eslint/restrict-plus-operands': ['error', {
            skipCompoundAssignments: false,
            allowAny: false,
        }],

        // https://typescript-eslint.io/rules/restrict-template-expressions
        '@typescript-eslint/restrict-template-expressions': ['error', {
            allowNumber: true,
            allowAny: true,
            allowNever: true,
            allowArray: false,
            allowBoolean: false,
            allowNullish: false,
            allowRegExp: false,
        }],

        // https://typescript-eslint.io/rules/return-await
        'no-return-await': ['off'],
        '@typescript-eslint/return-await': ['error', 'in-try-catch'],

        // https://eslint.style/rules/default/semi
        '@stylistic/js/semi': ['off'],
        '@babel/semi': ['off'],
        '@stylistic/ts/semi': ['error', 'always'],

        // https://eslint.style/rules/default/space-before-blocks
        '@stylistic/js/space-before-blocks': ['off'],
        '@stylistic/ts/space-before-blocks': ['error'],

        // https://eslint.style/rules/default/space-before-function-paren
        '@stylistic/js/space-before-function-paren': ['off'],
        '@stylistic/ts/space-before-function-paren': ['error', {
            anonymous: 'never',
            asyncArrow: 'always',
            named: 'never',
        }],

        // https://eslint.style/rules/default/space-infix-ops
        '@stylistic/js/space-infix-ops': ['off'],
        '@stylistic/ts/space-infix-ops': ['error', { int32Hint: false }],

        // https://typescript-eslint.io/rules/switch-exhaustiveness-check
        '@typescript-eslint/switch-exhaustiveness-check': ['error', {
            allowDefaultCaseForExhaustiveSwitch: true,
            requireDefaultForNonUnion: false,
        }],

        // https://typescript-eslint.io/rules/triple-slash-reference
        '@typescript-eslint/triple-slash-reference': ['error', {
            path: 'never',
            types: 'never',
            lib: 'never',
        }],

        // https://eslint.style/rules/default/type-annotation-spacing
        '@stylistic/ts/type-annotation-spacing': ['error', {
            before: false,
            after: true,
            overrides: {
                arrow: { before: true, after: true },
            },
        }],

        // https://typescript-eslint.io/rules/typedef
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

        // https://typescript-eslint.io/rules/unified-signatures
        '@typescript-eslint/unified-signatures': ['error', {
            ignoreDifferentlyNamedParameters: true,
        }],

        // https://typescript-eslint.io/rules/use-unknown-in-catch-callback-variable
        '@typescript-eslint/use-unknown-in-catch-callback-variable': ['error'],

        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
        'import/extensions': ['error', 'ignorePackages', {
            js: 'never',
            cjs: 'never',
            mjs: 'never',
            ts: 'never',
            cts: 'never',
            mts: 'never',
        }],

        // https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/no-types.md
        'jsdoc/no-types': ['error'],

        // https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-description.md
        'jsdoc/require-description': ['error', {
            checkConstructors: false,
            exemptedBy: ['inheritDoc', 'see'],
        }],

        // https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-param-description.md
        'jsdoc/require-param-description': ['error'],

        // https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-returns-description.md
        'jsdoc/require-returns-description': ['error'],

        //
        // - Règles qui sont en dehors de la responsabilité du type-checking.
        //   (devrait être prises en charges par d'autres configs / règles / plugins)
        //

        // https://typescript-eslint.io/rules/await-thenable
        '@typescript-eslint/await-thenable': ['off'],

        // https://typescript-eslint.io/rules/member-ordering
        '@typescript-eslint/member-ordering': ['off'],

        // https://typescript-eslint.io/rules/no-array-delete
        '@typescript-eslint/no-array-delete': ['off'],

        // https://typescript-eslint.io/rules/no-dynamic-delete
        '@typescript-eslint/no-dynamic-delete': ['off'],

        // https://eslint.style/rules/default/no-extra-parens
        '@stylistic/ts/no-extra-parens': ['off'],

        // https://typescript-eslint.io/rules/no-floating-promises
        '@typescript-eslint/no-floating-promises': ['off'],

        // https://typescript-eslint.io/rules/no-for-in-array
        '@typescript-eslint/no-for-in-array': ['off'],

        // https://typescript-eslint.io/rules/no-implied-eval
        '@typescript-eslint/no-implied-eval': ['off'],

        // https://typescript-eslint.io/rules/no-invalid-this
        '@typescript-eslint/no-invalid-this': ['off'],

        // https://typescript-eslint.io/rules/no-magic-numbers
        '@typescript-eslint/no-magic-numbers': ['off'],

        // https://typescript-eslint.io/rules/no-misused-promises
        '@typescript-eslint/no-misused-promises': ['off'],

        // https://typescript-eslint.io/rules/no-require-imports
        '@typescript-eslint/no-require-imports': ['off'],

        // https://typescript-eslint.io/rules/no-this-alias
        '@typescript-eslint/no-this-alias': ['off'],

        // https://eslint.style/rules/default/no-throw-literal
        '@stylistic/ts/no-throw-literal': ['off'],

        // https://typescript-eslint.io/rules/no-unnecessary-boolean-literal-compare
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['off'],

        // https://typescript-eslint.io/rules/no-unsafe-unary-minus
        '@typescript-eslint/no-unsafe-unary-minus': ['off'],

        // https://typescript-eslint.io/rules/no-useless-template-literals
        '@typescript-eslint/no-useless-template-literals': ['off'],

        // https://typescript-eslint.io/rules/no-var-requires
        '@typescript-eslint/no-var-requires': ['off'],

        // https://typescript-eslint.io/rules/only-throw-error
        '@typescript-eslint/only-throw-error': ['off'],

        // https://typescript-eslint.io/rules/prefer-find
        '@typescript-eslint/prefer-find': ['off'],

        // https://typescript-eslint.io/rules/prefer-for-of
        '@typescript-eslint/prefer-for-of': ['off'],

        // https://typescript-eslint.io/rules/prefer-includes
        '@typescript-eslint/prefer-includes': ['off'],

        // https://typescript-eslint.io/rules/prefer-nullish-coalescing
        '@typescript-eslint/prefer-nullish-coalescing': ['off'],

        // https://typescript-eslint.io/rules/prefer-optional-chain
        '@typescript-eslint/prefer-optional-chain': ['off'],

        // https://typescript-eslint.io/rules/prefer-regexp-exec
        '@typescript-eslint/prefer-regexp-exec': ['off'],

        // https://typescript-eslint.io/rules/prefer-string-starts-ends-with
        '@typescript-eslint/prefer-string-starts-ends-with': ['off'],

        // https://typescript-eslint.io/rules/promise-function-async
        '@typescript-eslint/promise-function-async': ['off'],

        // https://typescript-eslint.io/rules/require-array-sort-compare
        '@typescript-eslint/require-array-sort-compare': ['off'],

        // https://typescript-eslint.io/rules/require-await
        '@typescript-eslint/require-await': ['off'],

        // https://typescript-eslint.io/rules/unbound-method
        '@typescript-eslint/unbound-method': ['off'],

        //
        // - Règles incompatible / non-optimisées.
        //

        // TODO: À re-activer lorsque typescript-eslint#1236 aura été fixé.
        // @see https://github.com/typescript-eslint/typescript-eslint/issues/1236
        // https://eslint.org/docs/rules/func-style
        'func-style': ['off'],

        // https://eslint.org/docs/rules/no-undef
        'no-undef': ['off'],

        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/exports-last.md
        'import/exports-last': ['off'],

        //
        // - Règles désactivées.
        //

        // https://typescript-eslint.io/rules/consistent-generic-constructors
        '@typescript-eslint/consistent-generic-constructors': ['off'],

        // https://typescript-eslint.io/rules/consistent-type-definitions
        '@typescript-eslint/consistent-type-definitions': ['off'],

        // https://typescript-eslint.io/rules/explicit-module-boundary-types
        '@typescript-eslint/explicit-module-boundary-types': ['off'],

        // https://typescript-eslint.io/rules/no-empty-interface
        '@typescript-eslint/no-empty-interface': ['off'],

        // https://typescript-eslint.io/rules/init-declarations
        '@typescript-eslint/init-declarations': ['off'],

        // https://typescript-eslint.io/rules/max-params
        '@typescript-eslint/max-params': ['off'],

        // https://typescript-eslint.io/rules/no-duplicate-type-constituents
        '@typescript-eslint/no-duplicate-type-constituents': ['off'],

        // https://typescript-eslint.io/rules/no-explicit-any
        '@typescript-eslint/no-explicit-any': ['off'],

        // https://typescript-eslint.io/rules/no-inferrable-types
        '@typescript-eslint/no-inferrable-types': ['off'],

        // https://typescript-eslint.io/rules/no-non-null-assertion
        '@typescript-eslint/no-non-null-assertion': ['off'],

        // https://typescript-eslint.io/rules/no-redundant-type-constituents
        '@typescript-eslint/no-redundant-type-constituents': ['off'],

        // https://typescript-eslint.io/rules/no-restricted-imports
        '@typescript-eslint/no-restricted-imports': ['off'],

        // https://eslint.style/rules/default/no-type-alias
        '@stylistic/ts/no-type-alias': ['off'],

        // https://typescript-eslint.io/rules/no-unnecessary-condition
        '@typescript-eslint/no-unnecessary-condition': ['off'],

        // https://typescript-eslint.io/rules/no-unsafe-argument
        '@typescript-eslint/no-unsafe-argument': ['off'],

        // https://typescript-eslint.io/rules/no-unsafe-assignment
        '@typescript-eslint/no-unsafe-assignment': ['off'],

        // https://typescript-eslint.io/rules/no-unsafe-call
        '@typescript-eslint/no-unsafe-call': ['off'],

        // https://typescript-eslint.io/rules/no-unsafe-declaration-merging
        '@typescript-eslint/no-unsafe-declaration-merging': ['off'],

        // https://typescript-eslint.io/rules/no-unsafe-member-access
        '@typescript-eslint/no-unsafe-member-access': ['off'],

        // https://typescript-eslint.io/rules/no-unsafe-return
        '@typescript-eslint/no-unsafe-return': ['off'],

        // https://eslint.style/rules/default/padding-line-between-statements
        '@stylistic/ts/padding-line-between-statements': ['off'],

        // https://typescript-eslint.io/rules/prefer-literal-enum-member
        '@typescript-eslint/prefer-literal-enum-member': ['off'],

        // https://typescript-eslint.io/rules/prefer-readonly
        '@typescript-eslint/prefer-readonly': ['off'],

        // https://typescript-eslint.io/rules/prefer-readonly-parameter-types
        '@typescript-eslint/prefer-readonly-parameter-types': ['off'],

        // https://typescript-eslint.io/rules/sort-type-constituents
        '@typescript-eslint/sort-type-constituents': ['off'],

        // https://typescript-eslint.io/rules/strict-boolean-expressions
        '@typescript-eslint/strict-boolean-expressions': ['off'],

        // https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-param-type.md
        'jsdoc/require-param-type': ['off'],

        // - Désactivée car son utilisation avec des overloads TS successifs est fastidieux (chaque overload doit avoir sa propre doc...).
        // @see https://github.com/gajus/eslint-plugin-jsdoc/issues/903#issuecomment-1287848062
        // https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/check-param-names.md
        'jsdoc/check-param-names': ['off'],

        // https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-property-type.md
        'jsdoc/require-property-type': ['off'],

        // - Désactivée car son utilisation avec des overloads TS successifs est fastidieux (chaque overload doit avoir sa propre doc...).
        // @see https://github.com/gajus/eslint-plugin-jsdoc/issues/903#issuecomment-1287848062
        // https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-returns-check.md
        'jsdoc/require-returns-check': ['off'],

        // https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-returns-type.md
        'jsdoc/require-returns-type': ['off'],

        // - Désactivée car son utilisation avec des overloads TS successifs est fastidieux (chaque overload doit avoir sa propre doc...).
        // @see https://github.com/gajus/eslint-plugin-jsdoc/issues/903#issuecomment-1287848062
        // https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-yields-check.md
        'jsdoc/require-yields-check': ['off'],
    },

    // - Overrides
    overrides: [
        {
            files: ['**/*.d.?({c,m})ts', '**/*.d.tsx'],
            rules: {
                '@typescript-eslint/naming-convention': [
                    'error',
                    {
                        selector: 'enumMember',
                        format: ['UPPER_CASE'],
                    },
                    {
                        selector: ['typeProperty', 'typeMethod'],
                        leadingUnderscore: 'allowSingleOrDouble',
                        format: null,
                    },
                    {
                        selector: 'typeLike',
                        format: ['PascalCase'],
                    },
                ],

                //
                // - Règles désactivées
                //

                'max-classes-per-file': ['off'],
                'no-redeclare': ['off'],
                'no-var': ['off'],
                'vars-on-top': ['off'],
                '@typescript-eslint/no-extraneous-class': ['off'],
                '@typescript-eslint/triple-slash-reference': ['off'],
            },
        },
    ],
};
