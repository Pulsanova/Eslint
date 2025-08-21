import stylisticPlugin from '@stylistic/eslint-plugin';
import unicornPlugin from 'eslint-plugin-unicorn';
import importPlugin from 'eslint-plugin-import';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import jsonConfig from './extensions/json.js';
import {
    createConfig as typescriptConfig,
    DEFAULT_EXTENSIONS as DEFAULT_TS_EXTENSIONS,
} from './extensions/typescript.js';

export const DEFAULT_EXTENSIONS = {
    js: ['js'],
    ts: DEFAULT_TS_EXTENSIONS,
};

export const createConfig = (additionalExtensions = {}) => {
    const extensions = {
        js: [...new Set([...DEFAULT_EXTENSIONS.js, ...additionalExtensions.js ?? []])],
        ts: [...new Set([...DEFAULT_EXTENSIONS.ts, ...additionalExtensions.ts ?? []])],
    };

    const base = {
        // - Fichiers
        files: [`**/*.{${Object.values(extensions).flat().join(',')}}`],

        // - Parseur
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'script',
        },

        // - Linter
        linterOptions: {
            reportUnusedDisableDirectives: 'warn',
            reportUnusedInlineConfigs: 'warn',
        },

        // - Configuration
        settings: {
            'import/core-modules': [],
            'import/extensions': ['.js'],
            'import/external-module-folders': [],
            'import/resolver': {
                node: {
                    extensions: ['.js', '.json'],
                },
                // - Ce résolveur est uniquement utilisé pour résoudre un problème avec les `exports` dans les `package.json`.
                //   (Sinon on utiliserait le mécanisme de résolution par défaut (= Node ci-dessus)).
                // See https://github.com/import-js/eslint-plugin-import/issues/1868#issuecomment-2034198702
                typescript: {
                    extensions: ['.js', '.json'],
                    conditionNames: [],
                    extensionAlias: {},
                    mainFields: ['main'],
                },
            },
            'jsdoc': {
                tagNamePreference: {
                    member: 'var',
                    return: 'returns',
                    returns: 'returns',
                    todo: 'TODO',
                    var: 'var',
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
        plugins: {
            '@stylistic': stylisticPlugin,
            'unicorn': unicornPlugin,
            'import': importPlugin,
            'jsdoc': jsdocPlugin,
        },

        // - Règles
        rules: {
            // https://eslint.style/rules/array-bracket-spacing
            '@stylistic/array-bracket-spacing': ['error', 'never'],

            // https://eslint.style/rules/arrow-parens
            '@stylistic/arrow-parens': ['error', 'always'],

            // https://eslint.style/rules/arrow-spacing
            '@stylistic/arrow-spacing': ['error', { before: true, after: true }],

            // https://eslint.style/rules/block-spacing
            '@stylistic/block-spacing': ['error', 'always'],

            // https://eslint.style/rules/brace-style
            '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],

            // https://eslint.style/rules/comma-dangle
            '@stylistic/comma-dangle': ['error', {
                arrays: 'always-multiline',
                exports: 'always-multiline',
                functions: 'always-multiline',
                imports: 'always-multiline',
                objects: 'always-multiline',
                importAttributes: 'always-multiline',
                dynamicImports: 'always-multiline',
            }],

            // https://eslint.style/rules/comma-spacing
            '@stylistic/comma-spacing': ['error', { before: false, after: true }],

            // https://eslint.style/rules/comma-style
            '@stylistic/comma-style': ['error', 'last', {
                exceptions: {
                    ArrayExpression: false,
                    ArrayPattern: false,
                    ArrowFunctionExpression: false,
                    CallExpression: false,
                    FunctionDeclaration: false,
                    FunctionExpression: false,
                    ImportDeclaration: false,
                    NewExpression: false,
                    ObjectExpression: false,
                    ObjectPattern: false,
                    VariableDeclaration: false,
                },
            }],

            // https://eslint.style/rules/computed-property-spacing
            '@stylistic/computed-property-spacing': ['error', 'never'],

            // https://eslint.style/rules/curly-newline
            '@stylistic/curly-newline': ['error', {
                consistent: true,
                multiline: true,
            }],

            // https://eslint.style/rules/dot-location
            '@stylistic/dot-location': ['error', 'property'],

            // https://eslint.style/rules/eol-last
            '@stylistic/eol-last': ['error', 'always'],

            // https://eslint.style/rules/function-call-argument-newline
            '@stylistic/function-call-argument-newline': ['error', 'consistent'],

            // https://eslint.style/rules/function-call-spacing
            '@stylistic/func-call-spacing': ['off'],
            '@stylistic/function-call-spacing': ['error', 'never'],

            // https://eslint.style/rules/function-paren-newline
            '@stylistic/function-paren-newline': ['error', 'multiline-arguments'],

            // https://eslint.style/rules/generator-star-spacing
            '@stylistic/generator-star-spacing': ['error', { before: false, after: true }],

            // https://eslint.style/rules/implicit-arrow-linebreak
            '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],

            // https://eslint.style/rules/indent
            '@stylistic/indent': ['error', 4, {
                ArrayExpression: 1,
                CallExpression: { arguments: 1 },
                flatTernaryExpressions: false,
                FunctionDeclaration: { parameters: 1, body: 1 },
                FunctionExpression: { parameters: 1, body: 1 },
                ignoreComments: false,
                ImportDeclaration: 1,
                ObjectExpression: 1,
                outerIIFEBody: 1,
                SwitchCase: 1,
                VariableDeclarator: 1,

                // https://github.com/benjamn/ast-types/blob/master/def/jsx.ts
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

            // https://eslint.style/rules/key-spacing
            '@stylistic/key-spacing': ['error', {
                beforeColon: false,
                afterColon: true,
            }],

            // https://eslint.style/rules/keyword-spacing
            '@stylistic/keyword-spacing': ['error', {
                before: true,
                after: true,
                overrides: {
                    return: { after: true },
                    throw: { after: true },
                    case: { after: true },
                },
            }],

            // https://eslint.style/rules/linebreak-style
            '@stylistic/linebreak-style': ['error', 'unix'],

            // https://eslint.style/rules/lines-around-comment
            '@stylistic/lines-around-comment': ['error', {
                beforeBlockComment: true,
                afterBlockComment: false,
                beforeLineComment: false,
                afterLineComment: false,
                afterHashbangComment: true,
                allowObjectStart: true,
                allowObjectEnd: true,
                allowBlockStart: true,
                allowBlockEnd: true,
                allowClassStart: true,
                allowClassEnd: true,
                allowArrayStart: true,
                allowArrayEnd: true,
            }],

            // https://eslint.style/rules/lines-between-class-members
            '@stylistic/lines-between-class-members': ['error', 'always', {
                exceptAfterSingleLine: false,
            }],

            // https://eslint.style/rules/max-len
            '@stylistic/max-len': ['error', 150, 4, {
                ignoreComments: true,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreTrailingComments: true,
                ignoreUrls: true,
            }],

            // https://eslint.style/rules/new-parens
            '@stylistic/new-parens': ['error'],

            // https://eslint.style/rules/newline-per-chained-call
            '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],

            // https://eslint.style/rules/no-confusing-arrow
            '@stylistic/no-confusing-arrow': ['error', {
                allowParens: true,
            }],

            // https://eslint.style/rules/no-extra-semi
            '@stylistic/no-extra-semi': ['error'],

            // https://eslint.style/rules/no-floating-decimal
            '@stylistic/no-floating-decimal': ['error'],

            // https://eslint.style/rules/no-mixed-operators
            '@stylistic/no-mixed-operators': ['error', {
                groups: [
                    ['%', '**'],
                    ['%', '+'],
                    ['%', '-'],
                    ['%', '*'],
                    ['%', '/'],
                    ['/', '*'],
                    ['&', '|', '<<', '>>', '>>>'],
                    ['==', '!=', '===', '!=='],
                    ['&&', '||'],
                ],
                allowSamePrecedence: false,
            }],

            // https://eslint.style/rules/no-mixed-spaces-and-tabs
            '@stylistic/no-mixed-spaces-and-tabs': ['error'],

            // https://eslint.style/rules/no-multi-spaces
            '@stylistic/no-multi-spaces': ['error', {
                ignoreEOLComments: false,
            }],

            // https://eslint.style/rules/no-multiple-empty-lines
            '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],

            // https://eslint.style/rules/no-tabs
            '@stylistic/no-tabs': ['error'],

            // https://eslint.style/rules/no-trailing-spaces
            '@stylistic/no-trailing-spaces': ['error', {
                ignoreComments: false,
                skipBlankLines: false,
            }],

            // https://eslint.style/rules/no-whitespace-before-property
            '@stylistic/no-whitespace-before-property': ['error'],

            // https://eslint.style/rules/nonblock-statement-body-position
            '@stylistic/nonblock-statement-body-position': ['error', 'beside', { overrides: {} }],

            // https://eslint.style/rules/object-curly-newline
            '@stylistic/object-curly-newline': ['error', {
                consistent: true,
                multiline: true,
            }],

            // https://eslint.style/rules/object-curly-spacing
            '@stylistic/object-curly-spacing': ['error', 'always'],

            // https://eslint.style/rules/object-property-newline
            '@stylistic/object-property-newline': ['error', {
                allowAllPropertiesOnSameLine: true,
            }],

            // https://eslint.style/rules/one-var-declaration-per-line
            '@stylistic/one-var-declaration-per-line': ['error', 'always'],

            // https://eslint.style/rules/operator-linebreak
            '@stylistic/operator-linebreak': ['error', 'after', {
                overrides: {
                    '=': 'none',
                    '?': 'before',
                    ':': 'before',
                },
            }],

            // https://eslint.style/rules/padded-blocks
            '@stylistic/padded-blocks': [
                'error',
                {
                    blocks: 'never',
                    classes: 'never',
                    switches: 'never',
                },
                {
                    allowSingleLineBlocks: true,
                },
            ],

            // https://eslint.style/rules/quote-props
            '@stylistic/quote-props': ['error', 'consistent'],

            // https://eslint.style/rules/quotes
            '@stylistic/quotes': ['error', 'single', {
                allowTemplateLiterals: 'always',
                ignoreStringLiterals: false,
                avoidEscape: false,
            }],

            // https://eslint.style/rules/rest-spread-spacing
            '@stylistic/rest-spread-spacing': ['error', 'never'],

            // https://eslint.style/rules/semi
            '@stylistic/semi': ['error', 'always'],

            // https://eslint.style/rules/semi-spacing
            '@stylistic/semi-spacing': ['error', { before: false, after: true }],

            // https://eslint.style/rules/semi-style
            '@stylistic/semi-style': ['error', 'last'],

            // https://eslint.style/rules/space-before-blocks
            '@stylistic/space-before-blocks': ['error'],

            // https://eslint.style/rules/space-before-function-paren
            '@stylistic/space-before-function-paren': ['error', {
                anonymous: 'always',
                asyncArrow: 'always',
                named: 'never',
            }],

            // https://eslint.style/rules/space-in-parens
            '@stylistic/space-in-parens': ['error', 'never'],

            // https://eslint.style/rules/space-infix-ops
            '@stylistic/space-infix-ops': ['error', { int32Hint: false }],

            // https://eslint.style/rules/space-unary-ops
            '@stylistic/space-unary-ops': ['error', {
                nonwords: false,
                overrides: {},
                words: true,
            }],

            // https://eslint.style/rules/spaced-comment
            '@stylistic/spaced-comment': ['error', 'always', {
                block: {
                    balanced: true,
                    exceptions: ['-', '+'],
                    markers: ['=', '!', ':', '::'],
                },
                line: {
                    exceptions: ['-', '+'],
                    markers: ['=', '!', '/'],
                },
            }],

            // https://eslint.style/rules/switch-colon-spacing
            '@stylistic/switch-colon-spacing': ['error', { after: true, before: false }],

            // https://eslint.style/rules/template-curly-spacing
            '@stylistic/template-curly-spacing': ['error'],

            // https://eslint.style/rules/template-tag-spacing
            '@stylistic/template-tag-spacing': ['error', 'never'],

            // https://eslint.style/rules/wrap-iife.html
            '@stylistic/wrap-iife': ['error', 'outside', {
                functionPrototypeMethods: false,
            }],

            // https://eslint.style/rules/yield-star-spacing
            '@stylistic/yield-star-spacing': ['error', 'after'],

            // https://eslint.org/docs/rules/array-callback-return
            'array-callback-return': ['error', {
                allowImplicit: false,
                allowVoid: false,
            }],

            // https://eslint.org/docs/rules/arrow-body-style
            'arrow-body-style': ['error', 'as-needed', {
                requireReturnForObjectLiteral: false,
            }],

            // https://eslint.org/docs/rules/block-scoped-var
            'block-scoped-var': ['error'],

            // https://eslint.org/docs/rules/camelcase
            'camelcase': ['error', {
                ignoreDestructuring: false,
                properties: 'never',
            }],

            // https://eslint.org/docs/rules/class-methods-use-this
            'class-methods-use-this': ['error', {
                exceptMethods: [],
                enforceForClassFields: true,
            }],

            // https://eslint.org/docs/rules/consistent-return
            'consistent-return': ['error'],

            // https://eslint.org/docs/rules/constructor-super
            'constructor-super': ['error'],

            // https://eslint.org/docs/rules/curly
            'curly': ['error', 'all'],

            // https://eslint.org/docs/rules/default-case
            'default-case': ['error', {
                commentPattern: String.raw`^(-\s)?[Nn]o default\.?$`,
            }],

            // https://eslint.org/docs/rules/default-case-last
            'default-case-last': ['error'],

            // https://eslint.org/docs/rules/default-param-last
            'default-param-last': ['error'],

            // https://eslint.org/docs/rules/dot-notation
            'dot-notation': ['error', { allowKeywords: true }],

            // https://eslint.org/docs/rules/eqeqeq
            'eqeqeq': ['error', 'always', { null: 'always' }],

            // https://eslint.org/docs/rules/for-direction
            'for-direction': ['error'],

            // https://eslint.org/docs/rules/func-name-matching
            'func-name-matching': ['error', 'always', {
                considerPropertyDescriptor: true,
                includeCommonJSModuleExports: false,
            }],

            // https://eslint.org/docs/rules/func-names
            'func-names': ['warn', 'as-needed'],

            // https://eslint.org/docs/rules/func-style
            'func-style': ['error', 'expression'],

            // https://eslint.org/docs/rules/getter-return
            'getter-return': ['error', { allowImplicit: true }],

            // https://eslint.org/docs/rules/grouped-accessor-pairs
            'grouped-accessor-pairs': ['error', 'getBeforeSet'],

            // https://eslint.org/docs/rules/guard-for-in
            'guard-for-in': ['error'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/consistent-type-specifier-style.md
            'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/export.md
            'import/export': ['error'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
            'import/extensions': ['error', 'ignorePackages'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md
            'import/first': ['error'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/named.md#when-not-to-use-it
            'import/named': ['error'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/newline-after-import.md
            'import/newline-after-import': ['error'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-absolute-path.md
            'import/no-absolute-path': ['error'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-amd.md
            'import/no-amd': ['error'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md
            'no-duplicate-imports': ['off'],
            'import/no-duplicates': ['error'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-dynamic-require.md
            'import/no-dynamic-require': ['error'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-empty-named-blocks.md
            'import/no-empty-named-blocks': ['error'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md
            'import/no-extraneous-dependencies': ['error', {
                devDependencies: [
                    'tests/**',
                    '**/__tests__/**',
                    '**/__mocks__/**',
                    '**/*.{test,spec}.{cjs,mjs,js,cts,mts,ts,tsx}',
                    '**/{test,spec}.{cjs,mjs,js,cts,mts,ts,tsx}',
                    '**/gulpfile.{cjs,mjs,js,cts,mts,ts}',
                    '**/vue.config.{cjs,mjs,js,cts,mts,ts}',
                    '**/rollup.config.{cjs,mjs,js,cts,mts,ts}',
                    '**/webpack.config.{cjs,mjs,js,cts,mts,ts}',
                    '**/postcss.config.{cjs,mjs,js,cts,mts,ts}',
                    '**/next.config.{cjs,mjs,js,cts,mts,ts}',
                    '**/.eslintrc.{cjs,mjs,js,cts,mts,ts}',
                    '**/.stylelintrc.{cjs,mjs,js,cts,mts,ts}',
                    '**/stylelint.config.{cjs,mjs,js,cts,mts,ts}',
                    '**/eslint.config.{cjs,mjs,js,cts,mts,ts}',
                    '**/vitest.config.{cjs,mjs,js,cts,mts,ts}',
                    '**/vite.config.{cjs,mjs,js,cts,mts,ts}',
                    '**/cypress.config.{cjs,mjs,js,cts,mts,ts}',
                ],
                optionalDependencies: false,
            }],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-mutable-exports.md
            'import/no-mutable-exports': ['error'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-as-default.md
            'import/no-named-as-default': ['error'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-default.md
            'import/no-named-default': ['error'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-relative-packages.md
            'import/no-relative-packages': ['error'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-self-import.md
            'import/no-self-import': ['error'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md
            'import/no-unresolved': ['error', {
                caseSensitive: true,
                commonjs: true,
            }],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-useless-path-segments.md
            'import/no-useless-path-segments': ['error', { commonjs: true }],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-webpack-loader-syntax.md
            'import/no-webpack-loader-syntax': ['error'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
            'import/order': ['error', {
                'groups': [
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
                'pathGroups': [
                    { pattern: './*.scss', group: 'builtin', position: 'before' },
                    { pattern: '**/*.scss', group: 'builtin', position: 'before' },
                ],
                'warnOnUnassignedImports': true,
                'newlines-between': 'always-and-inside-groups',
                'distinctGroup': false,
            }],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md
            'import/prefer-default-export': ['error', {
                target: 'single',
            }],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/check-access.md
            'jsdoc/check-access': ['error'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/check-alignment.md
            'jsdoc/check-alignment': ['error'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/check-line-alignment.md
            'jsdoc/check-line-alignment': ['error', 'never', {
                disableWrapIndent: true,
            }],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/check-param-names.md
            'jsdoc/check-param-names': ['error', {
                checkRestProperty: false,
                checkDestructured: false,
                allowExtraTrailingParamDocs: false,
                disableExtraPropertyReporting: false,
                useDefaultObjectProperties: false,
            }],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/check-tag-names.md
            'jsdoc/check-tag-names': ['error', {
                definedTags: ['TODO', 'TODO:'],
            }],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/check-types.md
            'jsdoc/check-types': ['error'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/check-values.md
            'jsdoc/check-values': ['error'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/empty-tags.md
            'jsdoc/empty-tags': ['error'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/implements-on-classes.md
            'jsdoc/implements-on-classes': ['error'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/match-description.md
            'jsdoc/match-description': ['error', {
                message: 'Description should begin with a capital letter and end with a dot (exceptions: ()`_?!{}).',
                matchDescription: '^\n?([{\\-(A-Z`\\d_][\\s\\S]*[.?!`)}]\\s*)?$',
                tags: { param: true, returns: true, throws: true },
            }],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/multiline-blocks.md
            'jsdoc/multiline-blocks': ['error', {
                noZeroLineText: true,
                noFinalLineText: true,
                noSingleLineBlocks: false,
                noMultilineBlocks: false,
            }],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/no-bad-blocks.md
            'jsdoc/no-bad-blocks': ['error'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/no-blank-blocks.md
            'jsdoc/no-blank-blocks': ['error'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/no-multi-asterisks.md
            'jsdoc/no-multi-asterisks': ['error', {
                allowWhitespace: false,
                preventAtMiddleLines: true,
                preventAtEnd: true,
            }],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-asterisk-prefix.md
            'jsdoc/require-asterisk-prefix': ['error', 'always'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-description.md
            'jsdoc/require-description': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-hyphen-before-param-description.md
            'jsdoc/require-hyphen-before-param-description': ['error'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-param.md
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
                    'VariableDeclarator:not([id.name=/^[A-Z_].*/]) > ArrowFunctionExpression',

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

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-param-name.md
            'jsdoc/require-param-name': ['error'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-param-type.md
            'jsdoc/require-param-type': ['error'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-property.md
            'jsdoc/require-property': ['error'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-property-name.md
            'jsdoc/require-property-name': ['error'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-property-type.md
            'jsdoc/require-property-type': ['error'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-returns-check.md
            'jsdoc/require-returns-check': ['error', {
                reportMissingReturnForUndefinedTypes: false,
                exemptGenerators: true,
                exemptAsync: true,
            }],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-returns-type.md
            'jsdoc/require-returns-type': ['error'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-yields-check.md
            'jsdoc/require-yields-check': ['error'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/valid-types.md
            'jsdoc/valid-types': ['error'],

            // https://eslint.org/docs/latest/rules/logical-assignment-operators
            'logical-assignment-operators': ['error', 'always', {
                enforceForIfStatements: true,
            }],

            // https://eslint.org/docs/rules/max-classes-per-file
            'max-classes-per-file': ['error', 1],

            // https://eslint.org/docs/rules/new-cap
            'new-cap': ['error', {
                capIsNew: false,
                newIsCap: true,
                newIsCapExceptions: [],
                capIsNewExceptions: [
                    'Immutable.Map',
                    'Immutable.Set',
                    'Immutable.List',
                ],
            }],

            // https://eslint.org/docs/rules/no-alert
            'no-alert': ['error'],

            // https://eslint.org/docs/rules/no-array-constructor
            'no-array-constructor': ['error'],

            // https://eslint.org/docs/rules/no-async-promise-executor
            'no-async-promise-executor': ['error'],

            // https://eslint.org/docs/rules/no-await-in-loop
            'no-await-in-loop': ['error'],

            // https://eslint.org/docs/rules/no-bitwise
            'no-bitwise': ['error'],

            // https://eslint.org/docs/rules/no-caller
            'no-caller': ['error'],

            // https://eslint.org/docs/rules/no-case-declarations
            'no-case-declarations': ['error'],

            // https://eslint.org/docs/rules/no-class-assign
            'no-class-assign': ['error'],

            // https://eslint.org/docs/rules/no-compare-neg-zero
            'no-compare-neg-zero': ['error'],

            // https://eslint.org/docs/rules/no-cond-assign
            'no-cond-assign': ['error', 'always'],

            // https://eslint.org/docs/rules/no-console
            'no-console': ['warn'],

            // https://eslint.org/docs/rules/no-const-assign
            'no-const-assign': ['error'],

            // https://eslint.org/docs/rules/no-constant-binary-expression
            'no-constant-binary-expression': ['error'],

            // https://eslint.org/docs/rules/no-constant-condition
            'no-constant-condition': ['warn'],

            // https://eslint.org/docs/rules/no-constructor-return
            'no-constructor-return': ['error'],

            // https://eslint.org/docs/rules/no-control-regex
            'no-control-regex': ['error'],

            // https://eslint.org/docs/rules/no-debugger
            'no-debugger': ['error'],

            // https://eslint.org/docs/rules/no-delete-var
            'no-delete-var': ['error'],

            // https://eslint.org/docs/rules/no-dupe-args
            'no-dupe-args': ['error'],

            // https://eslint.org/docs/rules/no-dupe-class-members
            'no-dupe-class-members': ['error'],

            // https://eslint.org/docs/rules/no-dupe-else-if
            'no-dupe-else-if': ['error'],

            // https://eslint.org/docs/rules/no-dupe-keys
            'no-dupe-keys': ['error'],

            // https://eslint.org/docs/rules/no-duplicate-case
            'no-duplicate-case': ['error'],

            // https://eslint.org/docs/rules/no-else-return
            'no-else-return': ['error', { allowElseIf: false }],

            // https://eslint.org/docs/rules/no-empty
            'no-empty': ['error', { allowEmptyCatch: true }],

            // https://eslint.org/docs/rules/no-empty-character-class
            'no-empty-character-class': ['error'],

            // https://eslint.org/docs/rules/no-empty-function
            'no-empty-function': ['error', {
                allow: ['arrowFunctions', 'functions', 'methods'],
            }],

            // https://eslint.org/docs/rules/no-empty-pattern
            'no-empty-pattern': ['error', {
                allowObjectPatternsAsParameters: false,
            }],

            // https://eslint.org/docs/rules/no-empty-static-block
            'no-empty-static-block': ['error'],

            // https://eslint.org/docs/rules/no-eval
            'no-eval': ['error'],

            // https://eslint.org/docs/rules/no-ex-assign
            'no-ex-assign': ['error'],

            // https://eslint.org/docs/rules/no-extend-native
            'no-extend-native': ['error'],

            // https://eslint.org/docs/rules/no-extra-bind
            'no-extra-bind': ['error'],

            // https://eslint.org/docs/rules/no-extra-boolean-cast
            'no-extra-boolean-cast': ['error', {
                enforceForInnerExpressions: true,
            }],

            // https://eslint.org/docs/rules/no-extra-label
            'no-extra-label': ['error'],

            // https://eslint.org/docs/rules/no-fallthrough
            'no-fallthrough': ['error'],

            // https://eslint.org/docs/rules/no-func-assign
            'no-func-assign': ['error'],

            // https://eslint.org/docs/rules/no-global-assign
            'no-global-assign': ['error', { exceptions: [] }],

            // https://eslint.org/docs/rules/no-implicit-globals
            'no-implicit-globals': ['error'],

            // https://eslint.org/docs/rules/no-implied-eval
            'no-implied-eval': ['error'],

            // https://eslint.org/docs/rules/no-import-assign
            'no-import-assign': ['error'],

            // https://eslint.org/docs/rules/no-inner-declarations
            'no-inner-declarations': ['error'],

            // https://eslint.org/docs/rules/no-invalid-regexp
            'no-invalid-regexp': ['error'],

            // https://eslint.org/docs/rules/no-irregular-whitespace
            'no-irregular-whitespace': ['error', {
                skipJSXText: false,
                skipRegExps: false,
                skipStrings: false,
                skipTemplates: false,
            }],

            // https://eslint.org/docs/rules/no-iterator
            'no-iterator': ['error'],

            // https://eslint.org/docs/rules/no-label-var
            'no-label-var': ['error'],

            // https://eslint.org/docs/rules/no-labels
            'no-labels': ['error', {
                allowLoop: false,
                allowSwitch: false,
            }],

            // https://eslint.org/docs/rules/no-lone-blocks
            'no-lone-blocks': ['error'],

            // https://eslint.org/docs/rules/no-lonely-if
            'no-lonely-if': ['error'],

            // https://eslint.org/docs/rules/no-loop-func
            'no-loop-func': ['error'],

            // https://eslint.org/docs/rules/no-loss-of-precision
            'no-loss-of-precision': ['error'],

            // https://eslint.org/docs/rules/no-misleading-character-class
            'no-misleading-character-class': ['error'],

            // https://eslint.org/docs/rules/no-multi-assign
            'no-multi-assign': ['error'],

            // https://eslint.org/docs/rules/no-multi-str
            'no-multi-str': ['error'],

            // https://eslint.org/docs/rules/no-nested-ternary
            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-nested-ternary.md
            'no-nested-ternary': ['off'],
            'unicorn/no-nested-ternary': ['error'],

            // https://eslint.org/docs/rules/no-new
            'no-new': ['error'],

            // https://eslint.org/docs/rules/no-new-func
            'no-new-func': ['error'],

            // https://eslint.org/docs/rules/no-new-native-nonconstructor
            'no-new-native-nonconstructor': ['error'],

            // https://eslint.org/docs/rules/no-new-wrappers
            'no-new-wrappers': ['error'],

            // https://eslint.org/docs/rules/no-nonoctal-decimal-escape
            'no-nonoctal-decimal-escape': ['error'],

            // https://eslint.org/docs/rules/no-obj-calls
            'no-obj-calls': ['error'],

            // https://eslint.org/docs/rules/no-object-constructor
            'no-object-constructor': ['error'],

            // https://eslint.org/docs/rules/no-octal
            'no-octal': ['error'],

            // https://eslint.org/docs/rules/no-octal-escape
            'no-octal-escape': ['error'],

            // https://eslint.org/docs/rules/no-plusplus
            'no-plusplus': ['error', {
                allowForLoopAfterthoughts: true,
            }],

            // https://eslint.org/docs/rules/no-promise-executor-return
            'no-promise-executor-return': ['error', {
                allowVoid: false,
            }],

            // https://eslint.org/docs/rules/no-proto
            'no-proto': ['error'],

            // https://eslint.org/docs/rules/no-prototype-builtins
            'no-prototype-builtins': ['error'],

            // https://eslint.org/docs/rules/no-redeclare
            'no-redeclare': ['error'],

            // https://eslint.org/docs/rules/no-regex-spaces
            'no-regex-spaces': ['error'],

            // https://eslint.org/docs/rules/no-restricted-exports
            'no-restricted-exports': ['error', {
                restrictedNamedExports: ['then'],
            }],

            // https://eslint.org/docs/rules/no-restricted-globals
            'no-restricted-globals': (
                [
                    'error',
                    {
                        name: 'isFinite',
                        message: 'Use Number.isFinite instead.`',
                    },
                    {
                        name: 'isNaN',
                        message: 'Use Number.isNaN instead.',
                    },
                ]
            ),

            // https://eslint.org/docs/rules/no-restricted-properties
            'no-restricted-properties': [
                'error',
                {
                    object: 'arguments',
                    property: 'callee',
                    message: 'arguments.callee is deprecated',
                },
                {
                    object: 'global',
                    property: 'isFinite',
                    message: 'Please use Number.isFinite instead',
                },
                {
                    object: 'self',
                    property: 'isFinite',
                    message: 'Please use Number.isFinite instead',
                },
                {
                    object: 'window',
                    property: 'isFinite',
                    message: 'Please use Number.isFinite instead',
                },
                {
                    object: 'global',
                    property: 'isNaN',
                    message: 'Please use Number.isNaN instead',
                },
                {
                    object: 'self',
                    property: 'isNaN',
                    message: 'Please use Number.isNaN instead',
                },
                {
                    object: 'window',
                    property: 'isNaN',
                    message: 'Please use Number.isNaN instead',
                },
                {
                    property: '__defineGetter__',
                    message: 'Please use Object.defineProperty instead.',
                },
                {
                    property: '__defineSetter__',
                    message: 'Please use Object.defineProperty instead.',
                },
                {
                    object: 'Math',
                    property: 'pow',
                    message: 'Use the exponentiation operator (**) instead.',
                },
            ],

            // https://eslint.org/docs/rules/no-restricted-syntax
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'ForInStatement',
                    message: (
                        'for..in loops iterate over the entire prototype chain, ' +
                        'which is virtually never what you want. Use Object.{keys,values,entries}, ' +
                        'and iterate over the resulting array.'
                    ),
                },
                {
                    selector: 'ForOfStatement',
                    message: (
                        'iterators/generators require regenerator-runtime, which is ' +
                        'too heavyweight for this guide to allow them. Separately, ' +
                        'loops should be avoided in favor of array iterations.'
                    ),
                },
                {
                    selector: 'LabeledStatement',
                    message: (
                        'Labels are a form of GOTO; using them makes code confusing ' +
                        'and hard to maintain and understand.'
                    ),
                },
                {
                    selector: 'WithStatement',
                    message: (
                        '`with` is disallowed in strict mode because it makes code ' +
                        'impossible to predict and optimize.'
                    ),
                },
            ],

            // https://eslint.org/docs/rules/no-return-assign
            'no-return-assign': ['error', 'always'],

            // https://eslint.org/docs/rules/no-script-url
            'no-script-url': ['error'],

            // https://eslint.org/docs/rules/no-self-assign
            'no-self-assign': ['error', {
                props: true,
            }],

            // https://eslint.org/docs/rules/no-self-compare
            'no-self-compare': ['error'],

            // https://eslint.org/docs/rules/no-sequences
            'no-sequences': ['error'],

            // https://eslint.org/docs/rules/no-setter-return
            'no-setter-return': ['error'],

            // https://eslint.org/docs/rules/no-shadow
            'no-shadow': ['error'],

            // https://eslint.org/docs/rules/no-shadow-restricted-names
            'no-shadow-restricted-names': ['error'],

            // https://eslint.org/docs/rules/no-sparse-arrays
            'no-sparse-arrays': ['error'],

            // https://eslint.org/docs/rules/no-template-curly-in-string
            'no-template-curly-in-string': ['error'],

            // https://eslint.org/docs/rules/no-this-before-super
            'no-this-before-super': ['error'],

            // https://eslint.org/docs/rules/no-throw-literal
            'no-throw-literal': ['error'],

            // https://eslint.org/docs/rules/no-unassigned-vars
            'no-unassigned-vars': ['error'],

            // https://eslint.org/docs/rules/no-undef
            'no-undef': ['error'],

            // https://eslint.org/docs/rules/no-undef-init
            'no-undef-init': ['error'],

            // https://eslint.org/docs/rules/no-unexpected-multiline
            'no-unexpected-multiline': ['error'],

            // https://eslint.org/docs/rules/no-unneeded-ternary
            'no-unneeded-ternary': ['error', { defaultAssignment: false }],

            // https://eslint.org/docs/rules/no-unreachable
            'no-unreachable': ['error'],

            // https://eslint.org/docs/rules/no-unreachable-loop
            'no-unreachable-loop': ['error', {
                ignore: [], // WhileStatement, DoWhileStatement, ForStatement, ForInStatement, ForOfStatement
            }],

            // https://eslint.org/docs/rules/no-unsafe-finally
            'no-unsafe-finally': ['error'],

            // https://eslint.org/docs/rules/no-unsafe-negation
            'no-unsafe-negation': ['error'],

            // https://eslint.org/docs/rules/no-unsafe-optional-chaining
            'no-unsafe-optional-chaining': ['error', { disallowArithmeticOperators: true }],

            // https://eslint.org/docs/rules/no-unused-expressions
            'no-unused-expressions': ['error', {
                allowShortCircuit: false,
                allowTaggedTemplates: false,
                allowTernary: false,
            }],

            // https://eslint.org/docs/rules/no-unused-labels
            'no-unused-labels': ['error'],

            // https://eslint.org/docs/rules/no-unused-private-class-members
            'no-unused-private-class-members': ['error'],

            // https://eslint.org/docs/rules/no-unused-vars
            'no-unused-vars': ['error', {
                args: 'after-used',
                caughtErrors: 'all',
                ignoreRestSiblings: false,
                ignoreClassWithStaticInitBlock: false,
                vars: 'all',
            }],

            // https://eslint.org/docs/rules/no-use-before-define
            'no-use-before-define': ['error', {
                classes: true,
                functions: true,
                variables: true,
            }],

            // https://eslint.org/docs/rules/no-useless-assignment
            'no-useless-assignment': ['error'],

            // https://eslint.org/docs/rules/no-useless-backreference
            'no-useless-backreference': ['error'],

            // https://eslint.org/docs/rules/no-useless-catch
            'no-useless-catch': ['error'],

            // https://eslint.org/docs/rules/no-useless-computed-key
            'no-useless-computed-key': ['error', {
                enforceForClassMembers: true,
            }],

            // https://eslint.org/docs/rules/no-useless-concat
            'no-useless-concat': ['error'],

            // https://eslint.org/docs/rules/no-useless-constructor
            'no-useless-constructor': ['error'],

            // https://eslint.org/docs/rules/no-useless-escape
            'no-useless-escape': ['error'],

            // https://eslint.org/docs/rules/no-useless-rename
            'no-useless-rename': ['error', {
                ignoreDestructuring: false,
                ignoreExport: false,
                ignoreImport: false,
            }],

            // https://eslint.org/docs/rules/no-useless-return
            'no-useless-return': ['error'],

            // https://eslint.org/docs/rules/no-var
            'no-var': ['error'],

            // https://eslint.org/docs/rules/no-void
            'no-void': ['error'],

            // https://eslint.org/docs/rules/no-with
            'no-with': ['error'],

            // https://eslint.org/docs/rules/object-shorthand
            'object-shorthand': ['error', 'always', {
                avoidQuotes: true,
                ignoreConstructors: false,
            }],

            // https://eslint.org/docs/rules/one-var
            'one-var': ['error', 'never'],

            // https://eslint.org/docs/rules/operator-assignment
            'operator-assignment': ['error', 'always'],

            // https://eslint.org/docs/rules/prefer-arrow-callback
            'prefer-arrow-callback': ['error', {
                allowNamedFunctions: true,
                allowUnboundThis: true,
            }],

            // https://eslint.org/docs/rules/'prefer-const
            'prefer-const': ['error', {
                destructuring: 'any',
                ignoreReadBeforeAssign: true,
            }],

            // https://eslint.org/docs/rules/prefer-destructuring
            'prefer-destructuring': [
                'error',
                {
                    AssignmentExpression: { array: true, object: false },
                    VariableDeclarator: { array: false, object: true },
                },
                {
                    enforceForRenamedProperties: false,
                },
            ],

            // https://eslint.org/docs/rules/prefer-exponentiation-operator
            'prefer-exponentiation-operator': ['error'],

            // https://eslint.org/docs/rules/prefer-named-capture-group
            'prefer-named-capture-group': ['error'],

            // https://eslint.org/docs/rules/prefer-numeric-literals
            'prefer-numeric-literals': ['error'],

            // https://eslint.org/docs/rules/prefer-object-has-own
            'prefer-object-has-own': ['error'],

            // https://eslint.org/docs/rules/prefer-object-spread
            'prefer-object-spread': ['error'],

            // https://eslint.org/docs/rules/prefer-promise-reject-errors
            'prefer-promise-reject-errors': ['error', {
                allowEmptyReject: true,
            }],

            // https://eslint.org/docs/rules/prefer-regex-literals
            'prefer-regex-literals': ['error', {
                disallowRedundantWrapping: true,
            }],

            // https://eslint.org/docs/rules/prefer-rest-params
            'prefer-rest-params': ['error'],

            // https://eslint.org/docs/rules/prefer-spread
            'prefer-spread': ['error'],

            // https://eslint.org/docs/rules/prefer-template
            'prefer-template': ['error'],

            // https://eslint.org/docs/rules/radix
            'radix': ['error'],

            // https://eslint.org/docs/rules/require-yield
            'require-yield': ['error'],

            // https://eslint.org/docs/rules/strict
            'strict': ['error', 'safe'],

            // https://eslint.org/docs/rules/symbol-description
            'symbol-description': ['error'],

            // https://eslint.org/docs/rules/unicode-bom
            'unicode-bom': ['error', 'never'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-empty-array-spread.md
            'unicorn/consistent-empty-array-spread': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/custom-error-definition.md
            'unicorn/custom-error-definition': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/error-message.md
            'unicorn/error-message': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/escape-case.md
            'unicorn/escape-case': ['error', 'uppercase'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/expiring-todo-comments.md
            'unicorn/expiring-todo-comments': ['warn', {
                allowWarningComments: true,
                terms: ['TODO', 'FIXME', '@TODO'],
            }],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/new-for-builtins.md
            'unicorn/new-for-builtins': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-accessor-recursion.md
            'unicorn/no-accessor-recursion': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-method-this-argument.md
            'unicorn/no-array-method-this-argument': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reverse.md
            'unicorn/no-array-reverse': ['error', {
                allowExpressionStatement: false,
            }],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-await-in-promise-methods.md
            'unicorn/no-await-in-promise-methods': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-console-spaces.md
            'unicorn/no-console-spaces': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-invalid-fetch-options.md
            'unicorn/no-invalid-fetch-options': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-invalid-remove-event-listener.md
            'unicorn/no-invalid-remove-event-listener': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-negation-in-equality-check.md
            'unicorn/no-negation-in-equality-check': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-new-array.md
            'unicorn/no-new-array': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-new-buffer.md
            'unicorn/no-new-buffer': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-single-promise-in-promise-methods.md
            'unicorn/no-single-promise-in-promise-methods': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-thenable.md
            'unicorn/no-thenable': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-array-flat-depth.md
            'unicorn/no-unnecessary-array-flat-depth': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-array-splice-count.md
            'unicorn/no-unnecessary-array-splice-count': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-await.md
            'unicorn/no-unnecessary-await': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-slice-end.md
            'unicorn/no-unnecessary-slice-end': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unreadable-array-destructuring.md
            'unicorn/no-unreadable-array-destructuring': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unreadable-iife.md
            'unicorn/no-unreadable-iife': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unused-properties.md
            'unicorn/no-unused-properties': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-error-capture-stack-trace.md
            'unicorn/no-useless-error-capture-stack-trace': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-fallback-in-spread.md
            'unicorn/no-useless-fallback-in-spread': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-length-check.md
            'unicorn/no-useless-length-check': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-spread.md
            'unicorn/no-useless-spread': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/number-literal-case.md
            'unicorn/number-literal-case': ['error', {
                hexadecimalValue: 'uppercase',
            }],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/numeric-separators-style.md
            'unicorn/numeric-separators-style': ['error', {
                onlyIfContainsSeparator: true,
                number: {
                    minimumDigits: 5,
                    onlyIfContainsSeparator: false,
                },
            }],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-find.md
            'unicorn/prefer-array-find': ['error', { checkFromLast: true }],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat.md
            'unicorn/prefer-array-flat': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat-map.md
            'unicorn/prefer-array-flat-map': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-index-of.md
            'unicorn/prefer-array-index-of': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-some.md
            'unicorn/prefer-array-some': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-at.md
            'unicorn/prefer-at': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-code-point.md
            'unicorn/prefer-code-point': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-date-now.md
            'unicorn/prefer-date-now': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-includes.md
            'unicorn/prefer-includes': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-logical-operator-over-ternary.md
            'unicorn/prefer-logical-operator-over-ternary': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-math-min-max.md
            'unicorn/prefer-math-min-max': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-math-trunc.md
            'unicorn/prefer-math-trunc': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-modern-math-apis.md
            'unicorn/prefer-modern-math-apis': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-native-coercion-functions.md
            'unicorn/prefer-native-coercion-functions': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-negative-index.md
            'unicorn/prefer-negative-index': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-optional-catch-binding.md
            'unicorn/prefer-optional-catch-binding': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-prototype-methods.md
            'unicorn/prefer-prototype-methods': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-set-size.md
            'unicorn/prefer-set-size': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-replace-all.md
            'unicorn/prefer-string-replace-all': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-starts-ends-with.md
            'unicorn/prefer-string-starts-ends-with': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-trim-start-end.md
            'unicorn/prefer-string-trim-start-end': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-structured-clone.md
            'unicorn/prefer-structured-clone': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/relative-url-style.md
            'unicorn/relative-url-style': ['error', 'always'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-array-join-separator.md
            'unicorn/require-array-join-separator': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-module-specifiers.md
            'unicorn/require-module-specifiers': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-number-to-fixed-digits-argument.md
            'unicorn/require-number-to-fixed-digits-argument': ['error'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/switch-case-braces.md
            'unicorn/switch-case-braces': ['error', 'always'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/text-encoding-identifier-case.md
            'unicorn/text-encoding-identifier-case': ['error'],

            // https://eslint.org/docs/rules/use-isnan
            'use-isnan': ['error'],

            // https://eslint.org/docs/rules/valid-typeof
            'valid-typeof': ['error', { requireStringLiterals: true }],

            // https://eslint.org/docs/rules/vars-on-top
            'vars-on-top': ['error'],

            // https://eslint.org/docs/rules/yoda
            'yoda': ['error'],

            //
            // - Règles désactivées.
            //

            // https://eslint.style/rules/array-bracket-newline
            '@stylistic/array-bracket-newline': ['off'],

            // https://eslint.style/rules/array-element-newline
            '@stylistic/array-element-newline': ['off'],

            // https://eslint.style/rules/jsx-quotes
            '@stylistic/jsx-quotes': ['off'],

            // https://eslint.style/rules/indent-binary-ops
            '@stylistic/indent-binary-ops': ['off'],

            // https://eslint.style/rules/jsx-child-element-spacing
            '@stylistic/jsx-child-element-spacing': ['off'],

            // https://eslint.style/rules/jsx-closing-bracket-location
            '@stylistic/jsx-closing-bracket-location': ['off'],

            // https://eslint.style/rules/jsx-closing-tag-location
            '@stylistic/jsx-closing-tag-location': ['off'],

            // https://eslint.style/rules/jsx-curly-brace-presence
            '@stylistic/jsx-curly-brace-presence': ['off'],

            // https://eslint.style/rules/jsx-curly-newline
            '@stylistic/jsx-curly-newline': ['off'],

            // https://eslint.style/rules/jsx-curly-spacing
            '@stylistic/jsx-curly-spacing': ['off'],

            // https://eslint.style/rules/jsx-equals-spacing
            '@stylistic/jsx-equals-spacing': ['off'],

            // https://eslint.style/rules/jsx-first-prop-new-line
            '@stylistic/jsx-first-prop-new-line': ['off'],

            // https://eslint.style/rules/jsx-function-call-newline
            '@stylistic/jsx-function-call-newline': ['off'],

            // https://eslint.style/rules/jsx-indent-props
            '@stylistic/jsx-indent-props': ['off'],

            // https://eslint.style/rules/jsx-max-props-per-line
            '@stylistic/jsx-max-props-per-line': ['off'],

            // https://eslint.style/rules/jsx-newline
            '@stylistic/jsx-newline': ['off'],

            // https://eslint.style/rules/jsx-one-expression-per-line
            '@stylistic/jsx-one-expression-per-line': ['off'],

            // https://eslint.style/rules/jsx-pascal-case
            '@stylistic/jsx-pascal-case': ['off'],

            // https://eslint.style/rules/jsx-props-no-multi-spaces
            '@stylistic/jsx-props-no-multi-spaces': ['off'],

            // https://eslint.style/rules/jsx-self-closing-comp
            '@stylistic/jsx-self-closing-comp': ['off'],

            // https://eslint.style/rules/jsx-sort-props
            '@stylistic/jsx-sort-props': ['off'],

            // https://eslint.style/rules/jsx-tag-spacing
            '@stylistic/jsx-tag-spacing': ['off'],

            // https://eslint.style/rules/jsx-wrap-multilines
            '@stylistic/jsx-wrap-multilines': ['off'],

            // https://eslint.style/rules/line-comment-position
            '@stylistic/line-comment-position': ['off'],

            // https://eslint.style/rules/max-statements-per-line
            '@stylistic/max-statements-per-line': ['off'],

            // https://eslint.style/rules/member-delimiter-style
            '@stylistic/member-delimiter-style': ['off'],

            // https://eslint.style/rules/multiline-comment-style
            '@stylistic/multiline-comment-style': ['off'],

            // https://eslint.style/rules/multiline-ternary
            '@stylistic/multiline-ternary': ['off'],

            // https://eslint.style/rules/no-extra-parens
            '@stylistic/no-extra-parens': ['off'],

            // https://eslint.style/rules/padding-line-between-statements
            '@stylistic/padding-line-between-statements': ['off'],

            // https://eslint.style/rules/type-annotation-spacing
            '@stylistic/type-annotation-spacing': ['off'],

            // https://eslint.style/rules/type-generic-spacing
            '@stylistic/type-generic-spacing': ['off'],

            // https://eslint.style/rules/type-named-tuple-spacing
            '@stylistic/type-named-tuple-spacing': ['off'],

            // https://eslint.style/rules/wrap-regex
            '@stylistic/wrap-regex': ['off'],

            // https://eslint.org/docs/rules/accessor-pairs
            'accessor-pairs': ['off'],

            // https://eslint.org/docs/rules/capitalized-comments
            'capitalized-comments': ['off'],

            // https://eslint.org/docs/rules/complexity
            'complexity': ['off'],

            // https://eslint.org/docs/rules/consistent-this
            'consistent-this': ['off'],

            // https://eslint.org/docs/rules/id-denylist
            'id-denylist': ['off'],

            // https://eslint.org/docs/rules/id-length
            'id-length': ['off'],

            // https://eslint.org/docs/rules/id-match
            'id-match': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/default.md#when-not-to-use-it
            'import/default': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/dynamic-import-chunkname.md
            'import/dynamic-import-chunkname': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/enforce-node-protocol-usage.md
            'import/enforce-node-protocol-usage': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/exports-last.md
            'import/exports-last': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/group-exports.md
            'import/group-exports': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/max-dependencies.md
            'import/max-dependencies': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/namespace.md
            'import/namespace': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-anonymous-default-export.md
            'import/no-anonymous-default-export': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-commonjs.md
            'import/no-commonjs': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md
            'import/no-cycle': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md
            'import/no-default-export': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-deprecated.md
            'import/no-deprecated': ['off'],

            // - Faux positifs avec les imports dynamiques (= `import(...).then((>>> module <<<) => {});`)
            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-import-module-exports.md
            'import/no-import-module-exports': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-internal-modules.md
            'import/no-internal-modules': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-as-default-member.md
            'import/no-named-as-default-member': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-export.md
            'import/no-named-export': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-namespace.md
            'import/no-namespace': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-nodejs-modules.md
            'import/no-nodejs-modules': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-relative-parent-imports.md
            'import/no-relative-parent-imports': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-restricted-paths.md
            'import/no-restricted-paths': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unassigned-import.md
            // importing for side effects is perfectly acceptable, if you need side effects.
            'import/no-unassigned-import': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unused-modules.md
            'import/no-unused-modules': ['off'],

            // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/unambiguous.md
            'import/unambiguous': ['off'],

            // https://eslint.org/docs/rules/init-declarations
            'init-declarations': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/check-examples.md
            'jsdoc/check-examples': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/check-indentation.md
            'jsdoc/check-indentation': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/check-property-names.md
            'jsdoc/check-property-names': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/check-syntax.md
            'jsdoc/check-syntax': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/check-template-names.md
            'jsdoc/check-template-names': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/convert-to-jsdoc-comments.md
            'jsdoc/convert-to-jsdoc-comments': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/imports-as-dependencies.md
            'jsdoc/imports-as-dependencies': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/informative-docs.md
            'jsdoc/informative-docs': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/lines-before-block.md
            'jsdoc/lines-before-block': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/match-name.md
            'jsdoc/match-name': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/no-blank-block-descriptions.md
            'jsdoc/no-blank-block-descriptions': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/no-defaults.md
            'jsdoc/no-defaults': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/no-missing-syntax.md
            'jsdoc/no-missing-syntax': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/no-restricted-syntax.md
            'jsdoc/no-restricted-syntax': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/no-types.md
            'jsdoc/no-types': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/no-undefined-types.md
            'jsdoc/no-undefined-types': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-description-complete-sentence.md
            'jsdoc/require-description-complete-sentence': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-example.md
            'jsdoc/require-example': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-file-overview.md
            'jsdoc/require-file-overview': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-jsdoc.md
            'jsdoc/require-jsdoc': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-param-description.md
            'jsdoc/require-param-description': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-property-description.md
            'jsdoc/require-property-description': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-returns.md
            'jsdoc/require-returns': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-returns-description.md
            'jsdoc/require-returns-description': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-template.md
            'jsdoc/require-template': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-throws.md
            'jsdoc/require-throws': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/require-yields.md
            'jsdoc/require-yields': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/sort-tags.md
            'jsdoc/sort-tags': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/tag-lines.md
            'jsdoc/tag-lines': ['off'],

            // https://github.com/gajus/eslint-plugin-jsdoc/blob/main/.README/rules/text-escaping.md
            'jsdoc/text-escaping': ['off'],

            // https://eslint.org/docs/rules/max-depth
            'max-depth': ['off'],

            // https://eslint.org/docs/rules/max-lines
            'max-lines': ['off'],

            // https://eslint.org/docs/rules/max-lines-per-function
            'max-lines-per-function': ['off'],

            // https://eslint.org/docs/rules/max-nested-callbacks
            'max-nested-callbacks': ['off'],

            // https://eslint.org/docs/rules/max-params
            'max-params': ['off'],

            // https://eslint.org/docs/rules/max-statements
            'max-statements': ['off'],

            // https://eslint.org/docs/rules/no-continue
            'no-continue': ['off'],

            // https://eslint.org/docs/rules/no-div-regex
            'no-div-regex': ['off'],

            // https://eslint.org/docs/rules/no-eq-null
            'no-eq-null': ['off'],

            // https://eslint.org/docs/rules/no-implicit-coercion
            'no-implicit-coercion': ['off'],

            // https://eslint.org/docs/rules/no-inline-comments
            'no-inline-comments': ['off'],

            // https://eslint.org/docs/rules/no-invalid-this
            'no-invalid-this': ['off'],

            // https://eslint.org/docs/rules/no-magic-numbers
            'no-magic-numbers': ['off'],

            // https://eslint.org/docs/rules/no-negated-condition
            'no-negated-condition': ['off'],

            // https://eslint.org/docs/rules/no-param-reassign
            'no-param-reassign': ['off'],

            // https://eslint.org/docs/rules/no-restricted-imports
            'no-restricted-imports': ['off'],

            // https://eslint.org/docs/rules/no-ternary
            'no-ternary': ['off'],

            // https://eslint.org/docs/rules/no-undefined
            'no-undefined': ['off'],

            // https://eslint.org/docs/rules/no-underscore-dangle
            'no-underscore-dangle': ['off'],

            // https://eslint.org/docs/rules/no-unmodified-loop-condition
            'no-unmodified-loop-condition': ['off'],

            // https://eslint.org/docs/rules/no-useless-call
            'no-useless-call': ['off'],

            // https://eslint.org/docs/rules/no-warning-comments
            'no-warning-comments': ['off'],

            // - Désactivée car complètement buguée.
            // https://eslint.org/docs/rules/require-atomic-updates
            'require-atomic-updates': ['off'],

            // https://eslint.org/docs/rules/require-await
            'require-await': ['off'],

            // https://eslint.org/docs/rules/require-unicode-regexp
            'require-unicode-regexp': ['off'],

            // https://eslint.org/docs/rules/sort-imports
            'sort-imports': ['off'],

            // https://eslint.org/docs/rules/sort-keys
            'sort-keys': ['off'],

            // https://eslint.org/docs/rules/sort-vars
            'sort-vars': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/better-regex.md
            'unicorn/better-regex': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/catch-error-name.md
            'unicorn/catch-error-name': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-assert.md
            'unicorn/consistent-assert': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-date-clone.md
            'unicorn/consistent-date-clone': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-destructuring.md
            'unicorn/consistent-destructuring': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-existence-index-check.md
            'unicorn/consistent-existence-index-check': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-function-scoping.md
            'unicorn/consistent-function-scoping': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/empty-brace-spaces.md
            'unicorn/empty-brace-spaces': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/explicit-length-check.md
            'unicorn/explicit-length-check': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
            'unicorn/filename-case': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/import-style.md
            'unicorn/import-style': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-abusive-eslint-disable.md
            'unicorn/no-abusive-eslint-disable': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-anonymous-default-export.md
            'unicorn/no-anonymous-default-export': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-callback-reference.md
            'unicorn/no-array-callback-reference': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-for-each.md
            'unicorn/no-array-for-each': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reduce.md
            'unicorn/no-array-reduce': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-await-expression-member.md
            'unicorn/no-await-expression-member': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-document-cookie.md
            'unicorn/no-document-cookie': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-empty-file.md
            'unicorn/no-empty-file': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-for-loop.md
            'unicorn/no-for-loop': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-hex-escape.md
            'unicorn/no-hex-escape': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-instanceof-builtins.md
            'unicorn/no-instanceof-builtins': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-keyword-prefix.md
            'unicorn/no-keyword-prefix': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-lonely-if.md
            'unicorn/no-lonely-if': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-magic-array-flat-depth.md
            'unicorn/no-magic-array-flat-depth': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-named-default.md
            'unicorn/no-named-default': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-negated-condition.md
            'unicorn/no-negated-condition': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-null.md
            'unicorn/no-null': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-object-as-default-parameter.md
            'unicorn/no-object-as-default-parameter': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-process-exit.md
            'unicorn/no-process-exit': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-static-only-class.md
            'unicorn/no-static-only-class': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-this-assignment.md
            'unicorn/no-this-assignment': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-typeof-undefined.md
            'unicorn/no-typeof-undefined': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-polyfills.md
            'unicorn/no-unnecessary-polyfills': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-promise-resolve-reject.md
            'unicorn/no-useless-promise-resolve-reject': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-switch-case.md
            'unicorn/no-useless-switch-case': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-undefined.md
            'unicorn/no-useless-undefined': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-zero-fractions.md
            'unicorn/no-zero-fractions': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-add-event-listener.md
            'unicorn/prefer-add-event-listener': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-blob-reading-methods.md
            'unicorn/prefer-blob-reading-methods': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-class-fields.md
            'unicorn/prefer-class-fields': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-default-parameters.md
            'unicorn/prefer-default-parameters': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-append.md
            'unicorn/prefer-dom-node-append': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-dataset.md
            'unicorn/prefer-dom-node-dataset': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-remove.md
            'unicorn/prefer-dom-node-remove': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-text-content.md
            'unicorn/prefer-dom-node-text-content': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-event-target.md
            'unicorn/prefer-event-target': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-export-from.md
            'unicorn/prefer-export-from': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-global-this.md
            'unicorn/prefer-global-this': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-import-meta-properties.md
            'unicorn/prefer-import-meta-properties': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-json-parse-buffer.md
            'unicorn/prefer-json-parse-buffer': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-keyboard-event-key.md
            'unicorn/prefer-keyboard-event-key': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-modern-dom-apis.md
            'unicorn/prefer-modern-dom-apis': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md
            'unicorn/prefer-module': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md
            'unicorn/prefer-node-protocol': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-number-properties.md
            'unicorn/prefer-number-properties': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-object-from-entries.md
            'unicorn/prefer-object-from-entries': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-query-selector.md
            'unicorn/prefer-query-selector': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-reflect-apply.md
            'unicorn/prefer-reflect-apply': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-regexp-test.md
            'unicorn/prefer-regexp-test': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-set-has.md
            'unicorn/prefer-set-has': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-single-call.md
            'unicorn/prefer-single-call': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md
            'unicorn/prefer-spread': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-slice.md
            'unicorn/prefer-string-slice': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-raw.md
            'unicorn/prefer-string-raw': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-switch.md
            'unicorn/prefer-switch': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-ternary.md
            'unicorn/prefer-ternary': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-top-level-await.md
            'unicorn/prefer-top-level-await': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-type-error.md
            'unicorn/prefer-type-error': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md
            'unicorn/prevent-abbreviations': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-post-message-target-origin.md
            'unicorn/require-post-message-target-origin': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/string-content.md
            'unicorn/string-content': ['off'],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/template-indent.md
            'unicorn/template-indent': ['off'],

            // - Faux positifs avec les variables qui contiennent le mot "error"
            //   (par ex. nécessiterait d'écrire `new wakeupError()` pour un appel de fonction `wakeupError();`).
            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/throw-new-error.md
            'unicorn/throw-new-error': ['off'],
        },
    };

    return [
        base,
        ...typescriptConfig(extensions.ts),
        ...jsonConfig,
    ];
};

export default createConfig();
