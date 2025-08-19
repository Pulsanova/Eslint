import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export const DEFAULT_EXTENSIONS = ['ts'];

export const createConfig = (additionalExtensions = []) => {
    const extensions = [...new Set([...DEFAULT_EXTENSIONS, ...additionalExtensions])];
    const extensionsGlob = extensions.length > 1
        ? `{${extensions.join(',')}}`
        : [...extensions].shift();

    const base = {
        // - Fichiers
        files: [`**/*.${extensionsGlob}`],

        // - Parseur
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                projectService: true,
                warnOnUnsupportedTypeScriptVersion: true,
            },
        },

        // - Plugins
        plugins: {
            '@typescript-eslint': typescriptPlugin,
        },

        // - Configuration
        settings: {
            'import/extensions': ['.d.ts', '.ts', '.js'],
            'import/external-module-folders': ['node_modules', 'node_modules/@types'],
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts'],
            },
            'import/resolver': {
                node: {
                    extensions: ['.d.ts', '.ts', '.js', '.json'],
                },
            },
            'jsdoc': {
                preferredTypes: {
                    'Object<>': 'Record<>',
                    'Object.<>': 'Record<>',
                },
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
            // https://eslint.style/rules/comma-dangle
            '@stylistic/comma-dangle': ['error', {
                arrays: 'always-multiline',
                enums: 'always-multiline',
                exports: 'always-multiline',
                functions: 'always-multiline',
                generics: 'always-multiline',
                imports: 'always-multiline',
                objects: 'always-multiline',
                tuples: 'always-multiline',
            }],

            // https://eslint.style/rules/lines-between-class-members
            '@stylistic/lines-between-class-members': ['error', 'always', {
                exceptAfterOverload: true,
                exceptAfterSingleLine: false,
            }],

            // https://eslint.style/rules/member-delimiter-style
            '@stylistic/member-delimiter-style': ['error', {
                multiline: { delimiter: 'comma', requireLast: true },
                singleline: { delimiter: 'comma', requireLast: false },
                overrides: {
                    interface: {
                        multiline: { delimiter: 'semi', requireLast: true },
                        singleline: { delimiter: 'semi', requireLast: true },
                    },
                },
            }],

            // https://eslint.style/rules/default/type-annotation-spacing
            '@stylistic/type-annotation-spacing': ['error', {
                before: false,
                after: true,
                overrides: {
                    arrow: { before: true, after: true },
                },
            }],

            // https://eslint.style/rules/type-generic-spacing
            '@stylistic/type-generic-spacing': ['error'],

            // https://eslint.style/rules/type-named-tuple-spacing
            '@stylistic/type-named-tuple-spacing': ['error'],

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

            // https://typescript-eslint.io/rules/class-literal-property-style
            '@typescript-eslint/class-literal-property-style': ['error', 'fields'],

            // https://typescript-eslint.io/rules/class-methods-use-this
            'class-methods-use-this': ['off', {
                exceptMethods: [],
                enforceForClassFields: true,
                ignoreOverrideMethods: false,
                ignoreClassesWithImplements: 'all',
            }],
            '@typescript-eslint/class-methods-use-this': ['error', {
                ignoreClassesThatImplementAnInterface: true,
                exceptMethods: [],
            }],

            // https://typescript-eslint.io/rules/consistent-indexed-object-style
            '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],

            // https://typescript-eslint.io/rules/consistent-return
            'consistent-return': ['error'],
            '@typescript-eslint/consistent-return': ['error'],

            // https://typescript-eslint.io/rules/consistent-type-assertions
            '@typescript-eslint/consistent-type-assertions': ['error', {
                assertionStyle: 'as',
                objectLiteralTypeAssertions: 'allow',
                arrayLiteralTypeAssertions: 'allow',
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
                checkUnknown: false,
                ignoredTypeNames: ['Error'],
            }],

            // https://typescript-eslint.io/rules/no-confusing-non-null-assertion
            '@typescript-eslint/no-confusing-non-null-assertion': ['error'],

            // https://typescript-eslint.io/rules/no-confusing-void-expression
            '@typescript-eslint/no-confusing-void-expression': ['error', {
                ignoreVoidReturningFunctions: false,
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

            // https://typescript-eslint.io/rules/no-empty-object-type
            '@typescript-eslint/no-empty-object-type': ['error', {
                allowInterfaces: 'always',
                allowObjectTypes: 'never',
            }],

            // https://typescript-eslint.io/rules/no-extra-non-null-assertion
            '@typescript-eslint/no-extra-non-null-assertion': ['error'],

            // https://typescript-eslint.io/rules/no-extraneous-class
            '@typescript-eslint/no-extraneous-class': ['error', {
                allowConstructorOnly: true,
                allowStaticOnly: true,
                allowWithDecorator: true,
                allowEmpty: false,
            }],

            // https://typescript-eslint.io/rules/no-import-type-side-effects
            '@typescript-eslint/no-import-type-side-effects': ['error'],

            // https://typescript-eslint.io/rules/no-loop-func
            'no-loop-func': ['off'],
            '@typescript-eslint/no-loop-func': ['error'],

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
            'no-redeclare': ['off'],
            '@typescript-eslint/no-redeclare': ['error', {
                ignoreDeclarationMerge: true,
            }],

            // https://typescript-eslint.io/rules/no-restricted-types
            '@typescript-eslint/no-restricted-types': ['error', {
                types: {
                    object: { message: 'Use Record<string, any> instead', fixWith: 'Record<string, any>' },
                },
            }],

            // https://typescript-eslint.io/rules/no-shadow
            'no-shadow': ['off'],
            '@typescript-eslint/no-shadow': ['error', {
                ignoreTypeValueShadow: false,
                ignoreFunctionTypeParameterNameValueShadow: false,
            }],

            // https://typescript-eslint.io/rules/no-unnecessary-parameter-property-assignment
            '@typescript-eslint/no-unnecessary-parameter-property-assignment': ['error'],

            // https://typescript-eslint.io/rules/no-unnecessary-qualifier
            '@typescript-eslint/no-unnecessary-qualifier': ['error'],

            // https://typescript-eslint.io/rules/no-unnecessary-type-arguments
            '@typescript-eslint/no-unnecessary-type-arguments': ['error'],

            // https://typescript-eslint.io/rules/no-unnecessary-type-assertion
            '@typescript-eslint/no-unnecessary-type-assertion': ['error', {
                checkLiteralConstAssertions: false,
                typesToIgnore: [],
            }],

            // https://typescript-eslint.io/rules/no-unnecessary-type-constraint
            '@typescript-eslint/no-unnecessary-type-constraint': ['error'],

            // https://typescript-eslint.io/rules/no-unsafe-function-type
            '@typescript-eslint/no-unsafe-function-type': ['error'],

            // https://typescript-eslint.io/rules/no-unused-expressions
            'no-unused-expressions': ['off'],
            '@typescript-eslint/no-unused-expressions': ['error', {
                allowShortCircuit: false,
                allowTaggedTemplates: false,
                allowTernary: true,
            }],

            // https://typescript-eslint.io/rules/no-unused-vars
            'no-unused-vars': ['off'],
            '@typescript-eslint/no-unused-vars': ['error', {
                args: 'after-used',
                caughtErrors: 'all',
                ignoreRestSiblings: false,
                ignoreClassWithStaticInitBlock: false,
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

            // https://typescript-eslint.io/rules/no-wrapper-object-types
            '@typescript-eslint/no-wrapper-object-types': ['error'],

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
                allowThrowingAny: true,
                allowThrowingUnknown: true,
                allowEmptyReject: true,
            }],

            // https://typescript-eslint.io/rules/prefer-reduce-type-parameter
            '@typescript-eslint/prefer-reduce-type-parameter': ['error'],

            // https://www.typescriptlang.org/docs/handbook/2/classes.html#this-types
            // https://typescript-eslint.io/rules/prefer-return-this-type
            '@typescript-eslint/prefer-return-this-type': ['error'],

            // https://typescript-eslint.io/rules/restrict-plus-operands
            '@typescript-eslint/restrict-plus-operands': ['error', {
                skipCompoundAssignments: false,
                allowAny: false,
            }],

            // https://typescript-eslint.io/rules/restrict-template-expressions
            '@typescript-eslint/restrict-template-expressions': ['error', {
                allowAny: true,
                allowArray: false,
                allowBoolean: false,
                allowNever: false,
                allowNullish: false,
                allowNumber: true,
                allowRegExp: false,
            }],

            // https://typescript-eslint.io/rules/return-await
            '@typescript-eslint/return-await': ['error', 'in-try-catch'],

            // https://typescript-eslint.io/rules/switch-exhaustiveness-check
            '@typescript-eslint/switch-exhaustiveness-check': ['error', {
                allowDefaultCaseForExhaustiveSwitch: true,
                considerDefaultExhaustiveForUnions: true,
                requireDefaultForNonUnion: false,
                defaultCaseCommentPattern: String.raw`^(-\s)?[Nn]o default\.?$`,
            }],

            // https://typescript-eslint.io/rules/triple-slash-reference
            '@typescript-eslint/triple-slash-reference': ['error', {
                path: 'never',
                types: 'never',
                lib: 'never',
            }],

            // https://typescript-eslint.io/rules/unified-signatures
            '@typescript-eslint/unified-signatures': ['error', {
                ignoreDifferentlyNamedParameters: true,
            }],

            // https://typescript-eslint.io/rules/use-unknown-in-catch-callback-variable
            '@typescript-eslint/use-unknown-in-catch-callback-variable': ['error'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
            'import/extensions': ['error', 'ignorePackages', {
                checkTypeImports: true,
            }],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/no-types.md
            'jsdoc/no-types': ['error'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/master/.README/rules/require-description.md
            'jsdoc/require-description': ['error', {
                checkConstructors: false,
                exemptedBy: ['inheritDoc', 'see', 'deprecated'],
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

            // https://typescript-eslint.io/rules/no-deprecated
            '@typescript-eslint/no-deprecated': ['off'],

            // https://typescript-eslint.io/rules/no-dynamic-delete
            '@typescript-eslint/no-dynamic-delete': ['off'],

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

            // https://typescript-eslint.io/rules/no-unnecessary-boolean-literal-compare
            '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['off'],

            // https://typescript-eslint.io/rules/no-unnecessary-template-expression
            '@typescript-eslint/no-unnecessary-template-expression': ['off'],

            // https://typescript-eslint.io/rules/no-unnecessary-type-conversion
            '@typescript-eslint/no-unnecessary-type-conversion': ['off'],

            // https://typescript-eslint.io/rules/no-unsafe-unary-minus
            '@typescript-eslint/no-unsafe-unary-minus': ['off'],

            // https://typescript-eslint.io/rules/only-throw-error
            '@typescript-eslint/only-throw-error': ['off'],

            // https://typescript-eslint.io/rules/no-misused-spread
            '@typescript-eslint/no-misused-spread': ['off'],

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

            // https://eslint.org/docs/rules/no-undef
            'no-undef': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/exports-last.md
            'import/exports-last': ['off'],

            //
            // - Règles désactivées.
            //

            // - Faux positif avec les commentaires avant les membres d’une union ou d’une intersection.
            // https://eslint.style/rules/lines-around-comment
            '@stylistic/lines-around-comment': ['off'],

            // https://typescript-eslint.io/rules/consistent-generic-constructors
            '@typescript-eslint/consistent-generic-constructors': ['off'],

            // https://typescript-eslint.io/rules/consistent-type-definitions
            '@typescript-eslint/consistent-type-definitions': ['off'],

            // https://typescript-eslint.io/rules/explicit-module-boundary-types
            '@typescript-eslint/explicit-module-boundary-types': ['off'],

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

            // TODO: À réactiver lorsque la règle aura été corrigée / améliorée.
            //       See https://github.com/typescript-eslint/typescript-eslint/issues/8113
            // https://typescript-eslint.io/rules/no-invalid-void-type
            '@typescript-eslint/no-invalid-void-type': ['off', {
                allowInGenericTypeArguments: true,
            }],

            // https://typescript-eslint.io/rules/no-non-null-assertion
            '@typescript-eslint/no-non-null-assertion': ['off'],

            // https://typescript-eslint.io/rules/no-redundant-type-constituents
            '@typescript-eslint/no-redundant-type-constituents': ['off'],

            // https://typescript-eslint.io/rules/no-restricted-imports
            '@typescript-eslint/no-restricted-imports': ['off'],

            // https://typescript-eslint.io/rules/no-unnecessary-condition
            '@typescript-eslint/no-unnecessary-condition': ['off'],

            // - Désactivé car trop de faux positifs (@typescript-eslint/eslint-plugin#8.24.0).
            // https://typescript-eslint.io/rules/no-unnecessary-type-parameters
            '@typescript-eslint/no-unnecessary-type-parameters': ['off'],

            // https://typescript-eslint.io/rules/no-unsafe-argument
            '@typescript-eslint/no-unsafe-argument': ['off'],

            // https://typescript-eslint.io/rules/no-unsafe-assignment
            '@typescript-eslint/no-unsafe-assignment': ['off'],

            // https://typescript-eslint.io/rules/no-unsafe-call
            '@typescript-eslint/no-unsafe-call': ['off'],

            // https://typescript-eslint.io/rules/no-unsafe-declaration-merging
            '@typescript-eslint/no-unsafe-declaration-merging': ['off'],

            // NOTE: Reporte n'importe quelle comparaison avec un enum si l'un des sides n'est
            //       pas explicitement du type de l'enum, trop fastidieux / inutile en l'état.
            // https://typescript-eslint.io/rules/no-unsafe-enum-comparison
            '@typescript-eslint/no-unsafe-enum-comparison': ['off'],

            // https://typescript-eslint.io/rules/no-unsafe-member-access
            '@typescript-eslint/no-unsafe-member-access': ['off'],

            // https://typescript-eslint.io/rules/no-unsafe-return
            '@typescript-eslint/no-unsafe-return': ['off'],

            // https://typescript-eslint.io/rules/no-unsafe-type-assertion
            '@typescript-eslint/no-unsafe-type-assertion': ['off'],

            // https://typescript-eslint.io/rules/prefer-literal-enum-member
            '@typescript-eslint/prefer-literal-enum-member': ['off'],

            // https://typescript-eslint.io/rules/prefer-readonly
            '@typescript-eslint/prefer-readonly': ['off'],

            // https://typescript-eslint.io/rules/prefer-readonly-parameter-types
            '@typescript-eslint/prefer-readonly-parameter-types': ['off'],

            // https://typescript-eslint.io/rules/related-getter-setter-pairs
            '@typescript-eslint/related-getter-setter-pairs': ['off'],

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
    };

    const overrides = [
        // - Fichiers de définition.
        {
            files: [`**/*.d.${extensionsGlob}`],
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

                '@typescript-eslint/no-extraneous-class': ['off'],
                '@typescript-eslint/no-unused-vars': ['off'],
                '@typescript-eslint/triple-slash-reference': ['off'],
                'max-classes-per-file': ['off'],
                'no-redeclare': ['off'],
                'no-var': ['off'],
                'vars-on-top': ['off'],
                'unicorn/require-module-specifiers': ['off'],
            },
        },
    ];

    return [base, ...overrides];
};

export default createConfig();
