'use strict';

module.exports = {
    // - Parseur
    parser: '@typescript-eslint/parser',
    parserOptions: {
        warnOnUnsupportedTypeScriptVersion: true,
    },

    // - Plugins
    plugins: ['@typescript-eslint'],

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
        // @see https://typescript-eslint.io/rules/adjacent-overload-signatures
        '@typescript-eslint/adjacent-overload-signatures': ['error'],

        // @see https://typescript-eslint.io/rules/array-type
        '@typescript-eslint/array-type': ['error', {
            default: 'array-simple',
            readonly: 'array-simple',
        }],

        // @see https://typescript-eslint.io/rules/ban-ts-comment
        '@typescript-eslint/ban-ts-comment': ['error', {
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': 'allow-with-description',
            'ts-nocheck': true,
            'ts-check': true,
        }],

        // @see https://typescript-eslint.io/rules/ban-tslint-comment
        '@typescript-eslint/ban-tslint-comment': ['error'],

        // @see https://typescript-eslint.io/rules/ban-types
        '@typescript-eslint/ban-types': ['error', {
            extendDefaults: false,
            types: {
                'String': { message: 'Use string instead', fixWith: 'string' },
                'Boolean': { message: 'Use boolean instead', fixWith: 'boolean' },
                'Number': { message: 'Use number instead', fixWith: 'number' },
                'Symbol': { message: 'Use symbol instead', fixWith: 'symbol' },
                'BigInt': { message: 'Use bigint instead', fixWith: 'bigint' },
                'Object': { message: 'Use Record<string, any> instead', fixWith: 'Record<string, any>' },
                'object': { message: 'Use Record<string, any> instead', fixWith: 'Record<string, any>' },
                '{}': { message: 'Use Record<string, any> instead', fixWith: 'Record<string, any>' },
            },
        }],

        // @see https://typescript-eslint.io/rules/brace-style
        'brace-style': ['off'],
        '@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: true }],

        // @see https://typescript-eslint.io/rules/class-literal-property-style
        '@typescript-eslint/class-literal-property-style': ['error', 'fields'],

        // @see https://typescript-eslint.io/rules/comma-dangle
        'comma-dangle': ['off'],
        '@typescript-eslint/comma-dangle': ['error', {
            arrays: 'always-multiline',
            enums: 'always-multiline',
            exports: 'always-multiline',
            functions: 'always-multiline',
            generics: 'always-multiline',
            imports: 'always-multiline',
            objects: 'always-multiline',
            tuples: 'always-multiline',
        }],

        // @see https://typescript-eslint.io/rules/comma-spacing
        'comma-spacing': ['off'],
        '@typescript-eslint/comma-spacing': ['error', { before: false, after: true }],

        // @see https://typescript-eslint.io/rules/consistent-indexed-object-style
        '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],

        // @see https://typescript-eslint.io/rules/consistent-type-assertions
        '@typescript-eslint/consistent-type-assertions': ['error', {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow',
        }],

        // @see https://typescript-eslint.io/rules/consistent-type-exports
        '@typescript-eslint/consistent-type-exports': ['error'],

        // @see https://typescript-eslint.io/rules/consistent-type-imports
        '@typescript-eslint/consistent-type-imports': ['error', {
            prefer: 'type-imports',
            disallowTypeAnnotations: true,
        }],

        // @see https://typescript-eslint.io/rules/default-param-last
        'default-param-last': ['off'],
        '@typescript-eslint/default-param-last': ['error'],

        // @see https://typescript-eslint.io/rules/dot-notation
        'dot-notation': ['off'],
        '@typescript-eslint/dot-notation': ['error', {
            allowKeywords: true,
            allowPrivateClassPropertyAccess: false,
            allowProtectedClassPropertyAccess: false,
        }],

        // @see https://typescript-eslint.io/rules/explicit-function-return-type
        '@typescript-eslint/explicit-function-return-type': ['error', {
            allowedNames: [],
            allowIIFEs: true,
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
            allowFunctionsWithoutTypeParameters: false,
            allowConciseArrowFunctionExpressionsStartingWithVoid: false,
        }],

        // @see https://typescript-eslint.io/rules/explicit-member-accessibility
        '@typescript-eslint/explicit-member-accessibility': ['error', {
            accessibility: 'explicit',
            ignoredMethodNames: [],
            overrides: {
                constructors: 'no-public',
            },
        }],

        // @see https://typescript-eslint.io/rules/func-call-spacing
        'func-call-spacing': ['off'],
        '@typescript-eslint/func-call-spacing': ['error', 'never'],

        // @see https://typescript-eslint.io/rules/indent
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

        // @see https://typescript-eslint.io/rules/keyword-spacing
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

        // @see https://typescript-eslint.io/rules/lines-around-comment
        'lines-around-comment': ['off'],
        '@typescript-eslint/lines-around-comment': ['error', {
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

        // @see https://typescript-eslint.io/rules/lines-between-class-members
        'lines-between-class-members': ['off'],
        '@typescript-eslint/lines-between-class-members': ['error', 'always', {
            exceptAfterOverload: true,
            exceptAfterSingleLine: false,
        }],

        // @see https://typescript-eslint.io/rules/member-delimiter-style
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

        // @see https://typescript-eslint.io/rules/method-signature-style
        '@typescript-eslint/method-signature-style': ['error', 'method'],

        // @see https://typescript-eslint.io/rules/naming-convention
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

        // @see https://typescript-eslint.io/rules/non-nullable-type-assertion-style
        '@typescript-eslint/non-nullable-type-assertion-style': ['error'],

        // @see https://typescript-eslint.io/rules/no-array-constructor
        'no-array-constructor': ['off'],
        '@typescript-eslint/no-array-constructor': ['error'],

        // @see https://typescript-eslint.io/rules/no-base-to-string
        '@typescript-eslint/no-base-to-string': ['error', {
            ignoredTypeNames: ['Error'],
        }],

        // @see https://typescript-eslint.io/rules/no-confusing-non-null-assertion
        '@typescript-eslint/no-confusing-non-null-assertion': ['error'],

        // @see https://typescript-eslint.io/rules/no-confusing-void-expression
        '@typescript-eslint/no-confusing-void-expression': ['error', {
            ignoreArrowShorthand: false,
            ignoreVoidOperator: false,
        }],

        // @see https://typescript-eslint.io/rules/no-dupe-class-members
        'no-dupe-class-members': ['off'],
        '@typescript-eslint/no-dupe-class-members': ['error'],

        // @see https://typescript-eslint.io/rules/no-duplicate-enum-values
        '@typescript-eslint/no-duplicate-enum-values': ['error'],

        // @see https://typescript-eslint.io/rules/no-empty-function
        'no-empty-function': ['off'],
        '@typescript-eslint/no-empty-function': ['error', {
            allow: [
                'arrowFunctions',
                'decoratedFunctions',
                'functions',
                'methods',
            ],
        }],

        // @see https://typescript-eslint.io/rules/no-extra-non-null-assertion
        '@typescript-eslint/no-extra-non-null-assertion': ['error'],

        // @see https://typescript-eslint.io/rules/no-extra-semi
        'no-extra-semi': ['off'],
        '@typescript-eslint/no-extra-semi': ['error'],

        // @see https://typescript-eslint.io/rules/no-extraneous-class
        '@typescript-eslint/no-extraneous-class': ['error', {
            allowConstructorOnly: true,
            allowStaticOnly: true,
            allowWithDecorator: true,
            allowEmpty: false,
        }],

        // @see https://typescript-eslint.io/rules/no-import-type-side-effects
        '@typescript-eslint/no-import-type-side-effects': ['error'],

        // @see https://typescript-eslint.io/rules/no-invalid-void-type
        '@typescript-eslint/no-invalid-void-type': ['error', {
            allowInGenericTypeArguments: true,
        }],

        // @see https://typescript-eslint.io/rules/no-loop-func
        'no-loop-func': ['off'],
        '@typescript-eslint/no-loop-func': ['error'],

        // @see https://typescript-eslint.io/rules/no-loss-of-precision
        'no-loss-of-precision': ['off'],
        '@typescript-eslint/no-loss-of-precision': ['error'],

        // @see https://typescript-eslint.io/rules/no-meaningless-void-operator
        '@typescript-eslint/no-meaningless-void-operator': ['error', {
            checkNever: false,
        }],

        // @see https://typescript-eslint.io/rules/no-non-null-asserted-nullish-coalescing
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': ['error'],

        // @see https://typescript-eslint.io/rules/no-misused-new
        '@typescript-eslint/no-misused-new': ['error'],

        // @see https://typescript-eslint.io/rules/no-mixed-enums
        '@typescript-eslint/no-mixed-enums': ['error'],

        // @see https://typescript-eslint.io/rules/no-namespace
        '@typescript-eslint/no-namespace': ['error', {
            allowDeclarations: false,
            allowDefinitionFiles: true,
        }],

        // @see https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain
        '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],

        // @see https://typescript-eslint.io/rules/no-redeclare
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': ['error', {
            ignoreDeclarationMerge: true,
        }],

        // @see https://typescript-eslint.io/rules/no-shadow
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error', {
            ignoreTypeValueShadow: false,
            ignoreFunctionTypeParameterNameValueShadow: false,
        }],

        // @see https://typescript-eslint.io/rules/no-unnecessary-qualifier
        '@typescript-eslint/no-unnecessary-qualifier': ['error'],

        // @see https://typescript-eslint.io/rules/no-unnecessary-type-arguments
        '@typescript-eslint/no-unnecessary-type-arguments': ['error'],

        // @see https://typescript-eslint.io/rules/no-unnecessary-type-assertion
        '@typescript-eslint/no-unnecessary-type-assertion': ['error', {
            typesToIgnore: [],
        }],

        // @see https://typescript-eslint.io/rules/no-unnecessary-type-constraint
        '@typescript-eslint/no-unnecessary-type-constraint': ['error'],

        // @see https://typescript-eslint.io/rules/no-unsafe-enum-comparison
        '@typescript-eslint/no-unsafe-enum-comparison': ['error'],

        // @see https://typescript-eslint.io/rules/no-unused-expressions
        'no-unused-expressions': ['off'],
        '@babel/no-unused-expressions': ['off'],
        '@typescript-eslint/no-unused-expressions': ['error', {
            allowShortCircuit: false,
            allowTaggedTemplates: false,
            allowTernary: true,
        }],

        // @see https://typescript-eslint.io/rules/no-unused-vars
        'no-unused-vars': ['off'],
        '@typescript-eslint/no-unused-vars': ['error', {
            args: 'after-used',
            ignoreRestSiblings: true,
            vars: 'all',
        }],

        // @see https://typescript-eslint.io/rules/no-use-before-define
        'no-use-before-define': ['off'],
        '@typescript-eslint/no-use-before-define': ['error', {
            classes: true,
            enums: true,
            functions: true,
            typedefs: true,
            variables: true,
        }],

        // @see https://typescript-eslint.io/rules/no-useless-constructor
        'no-useless-constructor': ['off'],
        '@typescript-eslint/no-useless-constructor': ['error'],

        // @see https://typescript-eslint.io/rules/no-useless-empty-export
        '@typescript-eslint/no-useless-empty-export': ['error'],

        // @see https://typescript-eslint.io/rules/object-curly-spacing
        'object-curly-spacing': ['off'],
        '@babel/object-curly-spacing': ['off'],
        '@typescript-eslint/object-curly-spacing': ['error', 'always'],

        // @see https://typescript-eslint.io/rules/parameter-properties
        '@typescript-eslint/parameter-properties': ['error', {
            prefer: 'class-properties',
        }],

        // @see https://typescript-eslint.io/rules/prefer-as-const
        '@typescript-eslint/prefer-as-const': ['error'],

        // @see https://typescript-eslint.io/rules/prefer-enum-initializers
        '@typescript-eslint/prefer-enum-initializers': ['error'],

        // @see https://typescript-eslint.io/rules/prefer-function-type
        '@typescript-eslint/prefer-function-type': ['error'],

        // @see https://typescript-eslint.io/rules/prefer-namespace-keyword
        '@typescript-eslint/prefer-namespace-keyword': ['error'],

        // @see https://typescript-eslint.io/rules/prefer-reduce-type-parameter
        '@typescript-eslint/prefer-reduce-type-parameter': ['error'],

        // @see https://www.typescriptlang.org/docs/handbook/2/classes.html#this-types
        // @see https://typescript-eslint.io/rules/prefer-return-this-type
        '@typescript-eslint/prefer-return-this-type': ['error'],

        // @see https://typescript-eslint.io/rules/prefer-ts-expect-error
        '@typescript-eslint/prefer-ts-expect-error': ['error'],

        // @see https://typescript-eslint.io/rules/quotes
        'quotes': ['off'],
        '@typescript-eslint/quotes': ['error', 'single', { allowTemplateLiterals: true }],

        // @see https://typescript-eslint.io/rules/restrict-plus-operands
        '@typescript-eslint/restrict-plus-operands': ['error', {
            checkCompoundAssignments: true,
            allowAny: false,
        }],

        // @see https://typescript-eslint.io/rules/restrict-template-expressions
        '@typescript-eslint/restrict-template-expressions': ['error', {
            allowNumber: true,
            allowAny: true,
            allowNever: true,
            allowBoolean: false,
            allowNullable: false,
            allowRegExp: false,
        }],

        // @see https://typescript-eslint.io/rules/return-await
        'no-return-await': ['off'],
        '@typescript-eslint/return-await': ['error', 'in-try-catch'],

        // @see https://typescript-eslint.io/rules/semi
        'semi': ['off'],
        '@babel/semi': ['off'],
        '@typescript-eslint/semi': ['error', 'always'],

        // @see https://typescript-eslint.io/rules/space-before-blocks
        'space-before-blocks': ['off'],
        '@typescript-eslint/space-before-blocks': ['error'],

        // @see https://typescript-eslint.io/rules/space-before-function-paren
        'space-before-function-paren': ['off'],
        '@typescript-eslint/space-before-function-paren': ['error', {
            anonymous: 'never',
            asyncArrow: 'always',
            named: 'never',
        }],

        // @see https://typescript-eslint.io/rules/space-infix-ops
        'space-infix-ops': ['off'],
        '@typescript-eslint/space-infix-ops': ['error', { int32Hint: false }],

        // @see https://typescript-eslint.io/rules/strict-boolean-expressions
        '@typescript-eslint/strict-boolean-expressions': ['error', {
            allowAny: true,
            allowString: false,
            allowNumber: false,
            allowNullableObject: true,
            allowNullableBoolean: false,
            allowNullableString: false,
            allowNullableNumber: false,
            allowNullableEnum: true,
            allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
        }],

        // @see https://typescript-eslint.io/rules/switch-exhaustiveness-check
        '@typescript-eslint/switch-exhaustiveness-check': ['error'],

        // @see https://typescript-eslint.io/rules/triple-slash-reference
        '@typescript-eslint/triple-slash-reference': ['error', {
            path: 'never',
            types: 'never',
            lib: 'never',
        }],

        // @see https://typescript-eslint.io/rules/type-annotation-spacing
        '@typescript-eslint/type-annotation-spacing': ['error', {
            before: false,
            after: true,
            overrides: {
                arrow: { before: true, after: true },
            },
        }],

        // @see https://typescript-eslint.io/rules/typedef
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

        // @see https://typescript-eslint.io/rules/unified-signatures
        '@typescript-eslint/unified-signatures': ['error', {
            ignoreDifferentlyNamedParameters: true,
        }],

        // @see https://github.com/benmosher/eslint-plugin-import/blob/main/docs/rules/extensions.md
        'import/extensions': ['error', 'ignorePackages', {
            js: 'never',
            cjs: 'never',
            mjs: 'never',
            ts: 'never',
            cts: 'never',
            mts: 'never',
        }],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/no-types.md
        'jsdoc/no-types': ['error'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-description.md
        'jsdoc/require-description': ['error', {
            checkConstructors: false,
            exemptedBy: ['inheritDoc', 'see'],
        }],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-param-description.md
        'jsdoc/require-param-description': ['error'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-returns-description.md
        'jsdoc/require-returns-description': ['error'],

        //
        // - Règles qui sont en dehors de la responsabilité du type-checking.
        //   (devrait être prises en charges par d'autres configs / règles / plugins)
        //

        // @see https://typescript-eslint.io/rules/await-thenable
        '@typescript-eslint/await-thenable': ['off'],

        // @see https://typescript-eslint.io/rules/member-ordering
        '@typescript-eslint/member-ordering': ['off'],

        // @see https://typescript-eslint.io/rules/no-dynamic-delete
        '@typescript-eslint/no-dynamic-delete': ['off'],

        // @see https://typescript-eslint.io/rules/no-extra-parens
        '@typescript-eslint/no-extra-parens': ['off'],

        // @see https://typescript-eslint.io/rules/no-floating-promises
        '@typescript-eslint/no-floating-promises': ['off'],

        // @see https://typescript-eslint.io/rules/no-for-in-array
        '@typescript-eslint/no-for-in-array': ['off'],

        // @see https://typescript-eslint.io/rules/no-implied-eval
        '@typescript-eslint/no-implied-eval': ['off'],

        // @see https://typescript-eslint.io/rules/no-invalid-this
        '@typescript-eslint/no-invalid-this': ['off'],

        // @see https://typescript-eslint.io/rules/no-magic-numbers
        '@typescript-eslint/no-magic-numbers': ['off'],

        // @see https://typescript-eslint.io/rules/no-misused-promises
        '@typescript-eslint/no-misused-promises': ['off'],

        // @see https://typescript-eslint.io/rules/no-require-imports
        '@typescript-eslint/no-require-imports': ['off'],

        // @see https://typescript-eslint.io/rules/no-this-alias
        '@typescript-eslint/no-this-alias': ['off'],

        // @see https://typescript-eslint.io/rules/no-throw-literal
        '@typescript-eslint/no-throw-literal': ['off'],

        // @see https://typescript-eslint.io/rules/no-unnecessary-boolean-literal-compare
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['off'],

        // @see https://typescript-eslint.io/rules/no-var-requires
        '@typescript-eslint/no-var-requires': ['off'],

        // @see https://typescript-eslint.io/rules/prefer-for-of
        '@typescript-eslint/prefer-for-of': ['off'],

        // @see https://typescript-eslint.io/rules/prefer-includes
        '@typescript-eslint/prefer-includes': ['off'],

        // @see https://typescript-eslint.io/rules/prefer-nullish-coalescing
        '@typescript-eslint/prefer-nullish-coalescing': ['off'],

        // @see https://typescript-eslint.io/rules/prefer-optional-chain
        '@typescript-eslint/prefer-optional-chain': ['off'],

        // @see https://typescript-eslint.io/rules/prefer-regexp-exec
        '@typescript-eslint/prefer-regexp-exec': ['off'],

        // @see https://typescript-eslint.io/rules/prefer-string-starts-ends-with
        '@typescript-eslint/prefer-string-starts-ends-with': ['off'],

        // @see https://typescript-eslint.io/rules/promise-function-async
        '@typescript-eslint/promise-function-async': ['off'],

        // @see https://typescript-eslint.io/rules/require-array-sort-compare
        '@typescript-eslint/require-array-sort-compare': ['off'],

        // @see https://typescript-eslint.io/rules/require-await
        '@typescript-eslint/require-await': ['off'],

        // @see https://typescript-eslint.io/rules/unbound-method
        '@typescript-eslint/unbound-method': ['off'],

        //
        // - Règles incompatible / non-optimisées.
        //

        // TODO: À re-activer lorsque typescript-eslint#1236 aura été fixé.
        // @see https://github.com/typescript-eslint/typescript-eslint/issues/1236
        // @see https://eslint.org/docs/rules/func-style
        'func-style': ['off'],

        // @see https://eslint.org/docs/rules/no-undef
        'no-undef': ['off'],

        // @see https://github.com/benmosher/eslint-plugin-import/blob/main/docs/rules/exports-last.md
        'import/exports-last': ['off'],

        //
        // - Règles désactivées.
        //

        // @see https://typescript-eslint.io/rules/consistent-generic-constructors
        '@typescript-eslint/consistent-generic-constructors': ['off'],

        // @see https://typescript-eslint.io/rules/consistent-type-definitions
        '@typescript-eslint/consistent-type-definitions': ['off'],

        // @see https://typescript-eslint.io/rules/explicit-module-boundary-types
        '@typescript-eslint/explicit-module-boundary-types': ['off'],

        // @see https://typescript-eslint.io/rules/no-empty-interface
        '@typescript-eslint/no-empty-interface': ['off'],

        // @see https://typescript-eslint.io/rules/init-declarations
        '@typescript-eslint/init-declarations': ['off'],

        // @see https://typescript-eslint.io/rules/no-duplicate-type-constituents
        '@typescript-eslint/no-duplicate-type-constituents': ['off'],

        // @see https://typescript-eslint.io/rules/no-explicit-any
        '@typescript-eslint/no-explicit-any': ['off'],

        // @see https://typescript-eslint.io/rules/no-implicit-any-catch
        '@typescript-eslint/no-implicit-any-catch': ['off'],

        // @see https://typescript-eslint.io/rules/no-inferrable-types
        '@typescript-eslint/no-inferrable-types': ['off'],

        // @see https://typescript-eslint.io/rules/no-non-null-assertion
        '@typescript-eslint/no-non-null-assertion': ['off'],

        // @see https://typescript-eslint.io/rules/no-redundant-type-constituents
        '@typescript-eslint/no-redundant-type-constituents': ['off'],

        // @see https://typescript-eslint.io/rules/no-restricted-imports
        '@typescript-eslint/no-restricted-imports': ['off'],

        // @see https://typescript-eslint.io/rules/no-type-alias
        '@typescript-eslint/no-type-alias': ['off'],

        // @see https://typescript-eslint.io/rules/no-unnecessary-condition
        '@typescript-eslint/no-unnecessary-condition': ['off'],

        // @see https://typescript-eslint.io/rules/no-unsafe-argument
        '@typescript-eslint/no-unsafe-argument': ['off'],

        // @see https://typescript-eslint.io/rules/no-unsafe-assignment
        '@typescript-eslint/no-unsafe-assignment': ['off'],

        // @see https://typescript-eslint.io/rules/no-unsafe-call
        '@typescript-eslint/no-unsafe-call': ['off'],

        // @see https://typescript-eslint.io/rules/no-unsafe-declaration-merging
        '@typescript-eslint/no-unsafe-declaration-merging': ['off'],

        // @see https://typescript-eslint.io/rules/no-unsafe-member-access
        '@typescript-eslint/no-unsafe-member-access': ['off'],

        // @see https://typescript-eslint.io/rules/no-unsafe-return
        '@typescript-eslint/no-unsafe-return': ['off'],

        // @see https://typescript-eslint.io/rules/padding-line-between-statements
        '@typescript-eslint/padding-line-between-statements': ['off'],

        // @see https://typescript-eslint.io/rules/prefer-literal-enum-member
        '@typescript-eslint/prefer-literal-enum-member': ['off'],

        // @see https://typescript-eslint.io/rules/prefer-readonly
        '@typescript-eslint/prefer-readonly': ['off'],

        // @see https://typescript-eslint.io/rules/prefer-readonly-parameter-types
        '@typescript-eslint/prefer-readonly-parameter-types': ['off'],

        // @see https://typescript-eslint.io/rules/sort-type-union-intersection-members
        '@typescript-eslint/sort-type-union-intersection-members': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-param-type.md
        'jsdoc/require-param-type': ['off'],

        // - Désactivée car son utilisation avec des overloads TS successifs est fastidieux (chaque overload doit avoir sa propre doc...).
        // @see https://github.com/gajus/eslint-plugin-jsdoc/issues/903#issuecomment-1287848062
        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/check-param-names.md
        'jsdoc/check-param-names': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-property-type.md
        'jsdoc/require-property-type': ['off'],

        // - Désactivée car son utilisation avec des overloads TS successifs est fastidieux (chaque overload doit avoir sa propre doc...).
        // @see https://github.com/gajus/eslint-plugin-jsdoc/issues/903#issuecomment-1287848062
        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-returns-check.md
        'jsdoc/require-returns-check': ['off'],

        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-returns-type.md
        'jsdoc/require-returns-type': ['off'],

        // - Désactivée car son utilisation avec des overloads TS successifs est fastidieux (chaque overload doit avoir sa propre doc...).
        // @see https://github.com/gajus/eslint-plugin-jsdoc/issues/903#issuecomment-1287848062
        // @see https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-yields-check.md
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
