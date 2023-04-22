'use strict';

// - Corrige la prise en charge des plugins chargés dans les configs. partagées.
//   (@see https://github.com/eslint/eslint/issues/3458)
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    // - Parseur
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: {
        parser: require.resolve('@babel/eslint-parser'),
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
        vueFeatures: {
            interpolationAsNonHTML: false,
        },
    },

    // - Configuration
    settings: {
        'import/extensions': ['.vue', '.ts', '.tsx', '.js', '.jsx'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.mts', '.cts', '.ts', '.tsx'],
        },
        'import/resolver': {
            node: {
                extensions: ['.ts', '.tsx', '.js', '.jsx'],
            },
        },
        'react': {
            pragma: 'h',
            fragment: 'Fragment',

            // NOTE: Permet de désactiver l'alerte concernant la détection de React tout en
            // nous permettant d'utiliser les règles relatives au JSX.
            version: '999.999.999',
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
        // @see https://eslint.org/docs/rules/class-methods-use-this
        'class-methods-use-this': ['error', {
            enforceForClassFields: true,
            exceptMethods: [],
        }],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/iframe-missing-sandbox.md
        'react/iframe-missing-sandbox': ['error'],

        // @see https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
        'import/extensions': ['error', 'ignorePackages', {
            vue: 'never',
            js: 'never',
            jsx: 'never',
            cjs: 'never',
            mjs: 'never',
            ts: 'never',
            tsx: 'never',
            cts: 'never',
            mts: 'never',
        }],

        // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
        'react/jsx-curly-brace-presence': ['error', {
            props: 'never',
            children: 'never',
            propElementValues: 'always',
        }],

        // @see https://github.com/facebookincubator/create-react-app/issues/87#issuecomment-234627904
        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-filename-extension': ['error', {
            allow: 'always',
            extensions: ['.js', '.tsx'],
        }],

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

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
        'react/jsx-pascal-case': ['error', {
            allowAllCaps: false,
            allowLeadingUnderscore: false,
            allowNamespace: false,
            ignore: [],
        }],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-invalid-html-attribute.md
        'react/no-invalid-html-attribute': ['error', ['rel']],

        // @see https://eslint.org/docs/rules/arrow-spacing
        // @see https://eslint.vuejs.org/rules/array-bracket-spacing.html
        'vue/array-bracket-spacing': ['error', 'never'],

        // @see https://eslint.org/docs/rules/arrow-spacing
        // @see https://eslint.vuejs.org/rules/arrow-spacing.html
        'vue/arrow-spacing': ['error', { before: true, after: true }],

        // @see https://eslint.vuejs.org/rules/attribute-hyphenation.html
        'vue/attribute-hyphenation': ['error', 'never', {
            ignore: [],
        }],

        // @see https://eslint.org/docs/rules/block-spacing
        // @see https://eslint.vuejs.org/rules/block-spacing
        'vue/block-spacing': ['error', 'always'],

        // @see https://eslint.vuejs.org/rules/block-tag-newline
        'vue/block-tag-newline': ['error', {
            singleline: 'always',
            multiline: 'always',
            maxEmptyLines: 0,
        }],

        // @see https://eslint.org/docs/rules/brace-style
        // @see https://eslint.vuejs.org/rules/brace-style
        'vue/brace-style': ['error', '1tbs', { allowSingleLine: true }],

        // @see https://eslint.vuejs.org/rules/component-tags-order.html
        'vue/component-tags-order': ['error', {
            order: ['template', 'style', 'script'],
        }],

        // @see https://eslint.vuejs.org/rules/custom-event-name-casing.html
        'vue/custom-event-name-casing': ['error', 'camelCase'],

        // @see https://eslint.vuejs.org/rules/first-attribute-linebreak.html
        'vue/first-attribute-linebreak': ['error', {
            singleline: 'beside',
            multiline: 'below',
        }],

        // @see https://eslint.vuejs.org/rules/html-indent.html
        'vue/html-indent': ['error', 4],

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

        // @see https://eslint.vuejs.org/rules/max-attributes-per-line.html
        'vue/max-attributes-per-line': ['error', {
            singleline: { max: Infinity },
            multiline: { max: 1 },
        }],

        // @see https://eslint.vuejs.org/rules/no-deprecated-router-link-tag-prop.html
        'vue/no-deprecated-router-link-tag-prop': ['error'],

        // @see https://eslint.vuejs.org/rules/no-expose-after-await.html
        'vue/no-expose-after-await': ['error'],

        // @see https://eslint.vuejs.org/rules/no-lifecycle-after-await.html
        'vue/no-lifecycle-after-await': ['error'],

        // @see https://eslint.vuejs.org/rules/no-v-text.html
        'vue/no-v-text': ['error'],

        // @see https://eslint.org/docs/rules/no-useless-concat
        // @see https://eslint.vuejs.org/rules/no-useless-concat
        'vue/no-useless-concat': ['error'],

        // @see https://eslint.vuejs.org/rules/no-useless-mustaches
        'vue/no-useless-mustaches': ['error', {
            ignoreIncludesComment: false,
            ignoreStringEscape: false,
        }],

        //
        // - Règles désactivées (spécifiques à Vue 3).
        //

        // @see https://eslint.vuejs.org/rules/valid-define-emits
        'vue/valid-define-emits': ['off'],

        // @see https://eslint.vuejs.org/rules/valid-define-props
        'vue/valid-define-props': ['off'],

        // @see https://eslint.vuejs.org/rules/valid-v-memo
        'vue/valid-v-memo': ['off'],

        //
        // - Règles liées aux `<template>` ou `.vue`, non utilisés.
        //   (nous utilisons du JSX / TSX pour les components Vue)
        //

        // @see https://eslint.vuejs.org/rules/array-element-newline.html
        'vue/array-element-newline': ['off'],

        // @see https://eslint.vuejs.org/rules/block-lang.html
        'vue/block-lang': ['off'],

        // @see https://eslint.vuejs.org/rules/camelcase.html
        'vue/camelcase': ['off'],

        // @see https://eslint.vuejs.org/rules/comma-dangle.html
        'vue/comma-dangle': ['off'],

        // @see https://eslint.vuejs.org/rules/comma-spacing.html
        'vue/comma-spacing': ['off'],

        // @see https://eslint.vuejs.org/rules/comma-style.html
        'vue/comma-style': ['off'],

        // @see https://eslint.vuejs.org/rules/component-name-in-template-casing.html
        'vue/component-name-in-template-casing': ['off'],

        // @see https://eslint.vuejs.org/rules/component-options-name-casing.html
        'vue/component-options-name-casing': ['off'],

        // @see https://eslint.vuejs.org/rules/dot-location.html
        'vue/dot-location': ['off'],

        // @see https://eslint.vuejs.org/rules/dot-notation.html
        'vue/dot-notation': ['off'],

        // @see https://eslint.vuejs.org/rules/eqeqeq.html
        'vue/eqeqeq': ['off'],

        // @see https://eslint.vuejs.org/rules/func-call-spacing.html
        'vue/func-call-spacing': ['off'],

        // @see https://eslint.vuejs.org/rules/key-spacing.html
        'vue/key-spacing': ['off'],

        // @see https://eslint.vuejs.org/rules/keyword-spacing.html
        'vue/keyword-spacing': ['off'],

        // @see https://eslint.vuejs.org/rules/multiline-ternary.html
        'vue/multiline-ternary': ['off'],

        // @see https://eslint.vuejs.org/rules/no-constant-condition.html
        'vue/no-constant-condition': ['off'],

        // @see https://eslint.vuejs.org/rules/no-empty-pattern.html
        'vue/no-empty-pattern': ['off'],

        // @see https://eslint.vuejs.org/rules/no-extra-parens.html
        'vue/no-extra-parens': ['off'],

        // @see https://eslint.vuejs.org/rules/no-irregular-whitespace.html
        'vue/no-irregular-whitespace': ['off'],

        // @see https://eslint.vuejs.org/rules/no-loss-of-precision.html
        'vue/no-loss-of-precision': ['off'],

        // @see https://eslint.vuejs.org/rules/no-restricted-syntax.html
        'vue/no-restricted-syntax': ['off'],

        // @see https://eslint.vuejs.org/rules/no-sparse-arrays.html
        'vue/no-sparse-arrays': ['off'],

        // @see https://eslint.vuejs.org/rules/object-curly-newline.html
        'vue/object-curly-newline': ['off'],

        // @see https://eslint.vuejs.org/rules/object-curly-spacing.html
        'vue/object-curly-spacing': ['off'],

        // @see https://eslint.vuejs.org/rules/object-property-newline.html
        'vue/object-property-newline': ['off'],

        // @see https://eslint.vuejs.org/rules/object-shorthand.html
        'vue/object-shorthand': ['off'],

        // @see https://eslint.vuejs.org/rules/operator-linebreak.html
        'vue/operator-linebreak': ['off'],

        // @see https://eslint.vuejs.org/rules/prefer-template.html
        'vue/prefer-template': ['off'],

        // @see https://eslint.vuejs.org/rules/quote-props.html
        'vue/quote-props': ['off'],

        // @see https://eslint.vuejs.org/rules/space-in-parens.html
        'vue/space-in-parens': ['off'],

        // @see https://eslint.vuejs.org/rules/space-infix-ops.html
        'vue/space-infix-ops': ['off'],

        // @see https://eslint.vuejs.org/rules/space-unary-ops.html
        'vue/space-unary-ops': ['off'],

        // @see https://eslint.vuejs.org/rules/template-curly-spacing.html
        'vue/template-curly-spacing': ['off'],

        // @see https://eslint.vuejs.org/rules/valid-v-is.html
        'vue/valid-v-is': ['off'],

        // @see https://eslint.vuejs.org/rules/v-for-delimiter-style.html
        'vue/v-for-delimiter-style': ['off'],

        //
        // - Règles désactivées.
        //

        // @see https://eslint.org/docs/rules/no-underscore-dangle
        'no-underscore-dangle': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
        'react/no-unstable-nested-components': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/default-props-match-prop-types.md
        'react/default-props-match-prop-types': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
        'react/destructuring-assignment': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
        'react/function-component-definition': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md
        'react/forbid-foreign-prop-types': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md
        'react/hook-use-state': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
        'react/jsx-fragments': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-newline.md
        'react/jsx-newline': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-script-url.md
        'react/jsx-no-script-url': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/pull/1103/
        'react/no-unused-state': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
        'react/jsx-no-constructed-context-values': ['off'],

        // TODO: À activer lorsqu'on pourra ignorer certains patterns dans la partie gauche des conditions
        //       parce qu'en l'état, on est forcé de "contraindre" (coerce) même les booléens (e.g. `{!!isBoolean && 'foo'}`) ...
        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/v7.30.0/docs/rules/jsx-no-leaked-render.md
        'react/jsx-no-leaked-render': ['off', {
            validStrategies: ['ternary', 'coerce'],
        }],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
        'react/jsx-no-useless-fragment': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-one-expression-per-line.md
        'react/jsx-one-expression-per-line': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
        'react/jsx-props-no-spreading': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
        'react/jsx-uses-react': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-access-state-in-setstate.md
        'react/no-access-state-in-setstate': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
        'react/no-array-index-key': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-arrow-function-lifecycle.md
        'react/no-arrow-function-lifecycle': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger.md
        'react/no-danger': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md
        'react/no-danger-with-children': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md
        'react/no-deprecated': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
        //      https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md
        //      https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-will-update-set-state.md
        //      https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
        'react/no-did-mount-set-state': ['off'],
        'react/no-did-update-set-state': ['off'],
        'react/no-will-update-set-state': ['off'],
        'react/no-direct-mutation-state': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md
        'react/no-find-dom-node': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md
        'react/no-is-mounted': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-namespace.md
        'react/no-namespace': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/HEAD/docs/rules/no-object-type-as-default-prop.md
        'react/no-object-type-as-default-prop': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-redundant-should-component-update.md
        'react/no-redundant-should-component-update': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md
        'react/no-render-return-value': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
        'react/no-string-refs': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-this-in-sfc.md
        'react/no-this-in-sfc': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-typos.md
        'react/no-typos': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
        'react/no-unknown-property': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
        'react/no-unused-prop-types': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-exact-props.md
        'react/prefer-exact-props': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/state-in-constructor.md
        'react/state-in-constructor': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md
        'react/prefer-es6-class': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
        'react/prefer-stateless-function': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md
        'react/prop-types': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
        'react/react-in-jsx-scope': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
        'react/require-default-props': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/static-property-placement.md
        'react/static-property-placement': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/style-prop-object.md
        'react/style-prop-object': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
        'react/sort-comp': ['off'],

        // @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-default-props.md
        'react/sort-default-props': ['off'],

        // @see https://eslint.vuejs.org/rules/array-bracket-newline.html
        'vue/array-bracket-newline': ['off'],

        // @see https://eslint.vuejs.org/rules/attributes-order.html
        'vue/attributes-order': ['off'],

        // @see https://eslint.vuejs.org/rules/component-api-style.html
        'vue/component-api-style': ['off'],

        // @see https://eslint.vuejs.org/rules/multi-word-component-names.html
        'vue/multi-word-component-names': ['off'],

        // @see https://eslint.vuejs.org/rules/no-boolean-default.html
        'vue/no-boolean-default': ['off'],

        // @see https://eslint.vuejs.org/rules/no-child-content.html
        'vue/no-child-content': ['off'],

        // @see https://eslint.vuejs.org/rules/no-undef-properties.html
        'vue/no-undef-properties': ['off'],

        // @see https://eslint.vuejs.org/rules/no-reserved-component-names.html
        'vue/no-reserved-component-names': ['off'],

        // @see https://eslint.vuejs.org/rules/no-restricted-class.html
        'vue/no-restricted-class': ['off'],

        // @see https://eslint.vuejs.org/rules/no-useless-template-attributes.html
        'vue/no-useless-template-attributes': ['off'],

        // @see https://eslint.vuejs.org/rules/prefer-prop-type-boolean-first.html
        'vue/prefer-prop-type-boolean-first': ['off'],

        // @see https://eslint.vuejs.org/rules/require-direct-export.html
        'vue/require-direct-export': ['off'],

        // @see https://eslint.vuejs.org/rules/singleline-html-element-content-newline.html
        'vue/singleline-html-element-content-newline': ['off'],

        // @see https://eslint.vuejs.org/rules/sort-keys.html
        'vue/sort-keys': ['off'],
    },

    // - Overrides
    overrides: [
        {
            files: ['**/*.?({c,m})ts', '**/*.tsx'],
            ...require('./overrides/typescript'),
        },
    ],
};
