import vueParser from 'vue-eslint-parser';
import babelParser from '@babel/eslint-parser';
import vuePlugin from 'eslint-plugin-vue';
import reactPlugin from 'eslint-plugin-react';
import {
    createConfig as browserConfig,
    DEFAULT_EXTENSIONS as BASE_EXTENSIONS,
} from '@pulsanova/eslint-config-browser';
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
            parser: vueParser,
            parserOptions: {
                parser: babelParser,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
                vueFeatures: {
                    interpolationAsNonHTML: false,
                },
            },
        },

        // - Configuration
        settings: {
            'import/extensions': ['.vue', '.d.ts', '.ts', '.tsx', '.js', '.jsx'],
            'import/parsers': {
                '@typescript-eslint/parser': ['.mts', '.cts', '.ts', '.tsx'],
            },
            'import/resolver': {
                node: {
                    extensions: ['.d.ts', '.ts', '.tsx', '.js', '.jsx', '.json'],
                    // - Ce résolveur est uniquement utilisé pour résoudre un problème avec les `exports` dans les `package.json`.
                    //   (Sinon on utiliserait le mécanisme de résolution par défaut (= Node ci-dessus)).
                    // See https://github.com/import-js/eslint-plugin-import/issues/1868#issuecomment-2034198702
                    typescript: {
                        extensions: ['.d.ts', '.ts', '.tsx', '.js', '.jsx', '.json'],
                    },
                },
            },
            'react': {
                fragment: 'Fragment',
                pragma: 'h',

                // NOTE: Permet de désactiver l'alerte concernant la détection de React tout en
                // nous permettant d'utiliser les règles relatives au JSX.
                version: '999.999.999',
            },
        },

        // - Plugins
        plugins: {
            vue: vuePlugin,
            react: reactPlugin,
        },

        // - Règles
        rules: {
            // https://eslint.style/rules/jsx-function-call-newline
            '@stylistic/jsx-function-call-newline': ['error', 'multiline'],

            // https://eslint.style/rules/jsx-quotes
            '@stylistic/jsx-quotes': ['error', 'prefer-double'],

            // https://eslint.org/docs/rules/class-methods-use-this
            'class-methods-use-this': ['error', {
                enforceForClassFields: true,
                exceptMethods: [],
            }],

            // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
            'import/extensions': ['error', 'ignorePackages', {
                cjs: 'never',
                cts: 'never',
                js: 'never',
                jsx: 'never',
                mjs: 'never',
                mts: 'never',
                ts: 'never',
                tsx: 'never',
                vue: 'never',
            }],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/button-has-type.md
            'react/button-has-type': ['error', {
                button: true,
                reset: false,
                submit: true,
            }],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md
            'react/forbid-prop-types': ['error', {
                checkChildContextTypes: true,
                checkContextTypes: true,
                forbid: ['any', 'array', 'object'],
            }],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/iframe-missing-sandbox.md
            'react/iframe-missing-sandbox': ['error'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
            'react/jsx-boolean-value': ['error', 'never', { always: [] }],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
            'react/jsx-closing-bracket-location': ['error', 'line-aligned'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md
            'react/jsx-closing-tag-location': ['error', 'tag-aligned'],

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

            // https://github.com/facebookincubator/create-react-app/issues/87#issuecomment-234627904
            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
            'react/jsx-filename-extension': ['error', {
                allow: 'always',
                extensions: ['.js', '.tsx'],
            }],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
            'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
            'react/jsx-handler-names': ['error', {
                checkInlineFunction: false,
                eventHandlerPrefix: 'handle',
                eventHandlerPropPrefix: 'on',
            }],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
            'react/jsx-indent': ['error', 4],

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

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
            'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
            'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md
            'react/jsx-no-undef': ['error'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-multi-spaces.md
            'react/jsx-props-no-multi-spaces': ['error'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spread-multi.md
            'react/jsx-props-no-spread-multi': ['error'],

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

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
            'react/jsx-indent-props': ['error', 4],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
            'react/jsx-pascal-case': ['error', {
                allowAllCaps: false,
                allowLeadingUnderscore: false,
                allowNamespace: false,
                ignore: [],
            }],

            // https://eslint.vuejs.org/rules/match-component-import-name.html
            'vue/match-component-import-name': ['error'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md
            'react/no-children-prop': ['error'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-invalid-html-attribute.md
            'react/no-invalid-html-attribute': ['error', ['rel']],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
            'react/no-unescaped-entities': ['error'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unused-class-component-methods.md
            'react/no-unused-class-component-methods': ['error'],

            // https://eslint.vuejs.org/rules/padding-lines-in-component-definition.html
            'vue/padding-lines-in-component-definition': ['error', {
                groupSingleLineProperties: true,
                betweenOptions: 'never',
                withinOption: {
                    props: 'ignore',
                    data: 'ignore',
                    computed: {
                        betweenItems: 'always',
                        withinEach: 'ignore',
                    },
                    methods: {
                        betweenItems: 'always',
                        withinEach: 'ignore',
                    },
                },
            }],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-render-return.md
            'react/require-render-return': ['error'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
            'react/self-closing-comp': ['error'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md
            'react/void-dom-elements-no-children': ['error'],

            // https://eslint.vuejs.org/rules/array-bracket-spacing.html
            'vue/array-bracket-spacing': ['error', 'never'],

            // https://eslint.vuejs.org/rules/arrow-spacing.html
            'vue/arrow-spacing': ['error', { before: true, after: true }],

            // https://eslint.vuejs.org/rules/attribute-hyphenation.html
            'vue/attribute-hyphenation': ['error', 'never', {
                ignore: [],
            }],

            // https://eslint.vuejs.org/rules/block-order.html
            'vue/block-order': ['error', {
                order: ['template', 'style', 'script'],
            }],

            // https://eslint.vuejs.org/rules/block-spacing
            'vue/block-spacing': ['error', 'always'],

            // https://eslint.vuejs.org/rules/block-tag-newline
            'vue/block-tag-newline': ['error', {
                maxEmptyLines: 0,
                multiline: 'always',
                singleline: 'always',
            }],

            // https://eslint.vuejs.org/rules/brace-style
            'vue/brace-style': ['error', '1tbs', { allowSingleLine: true }],

            // https://eslint.vuejs.org/rules/component-definition-name-casing.html
            'vue/component-definition-name-casing': ['error'],

            // https://eslint.vuejs.org/rules/custom-event-name-casing.html
            'vue/custom-event-name-casing': ['error', 'camelCase'],

            // https://eslint.vuejs.org/rules/first-attribute-linebreak.html
            'vue/first-attribute-linebreak': ['error', {
                multiline: 'below',
                singleline: 'beside',
            }],

            // https://eslint.vuejs.org/rules/html-closing-bracket-newline.html
            'vue/html-closing-bracket-newline': ['error'],

            // https://eslint.vuejs.org/rules/html-closing-bracket-spacing.html
            'vue/html-closing-bracket-spacing': ['error'],

            // https://eslint.vuejs.org/rules/html-end-tags.html
            'vue/html-end-tags': ['error'],

            // https://eslint.vuejs.org/rules/html-indent.html
            'vue/html-indent': ['error', 4],

            // https://eslint.vuejs.org/rules/html-quotes.html
            'vue/html-quotes': ['error'],

            // https://eslint.vuejs.org/rules/html-self-closing.html
            'vue/html-self-closing': ['error', {
                math: 'always',
                svg: 'always',
                html: {
                    component: 'always',
                    normal: 'always',
                    void: 'always',
                },
            }],

            // https://eslint.vuejs.org/rules/max-attributes-per-line.html
            'vue/max-attributes-per-line': ['error', {
                multiline: { max: 1 },
                singleline: { max: Infinity },
            }],

            // https://eslint.vuejs.org/rules/multiline-html-element-content-newline.html
            'vue/multiline-html-element-content-newline': ['error'],

            // https://eslint.vuejs.org/rules/mustache-interpolation-spacing.html
            'vue/mustache-interpolation-spacing': ['error'],

            // TODO: Utiliser le format `promise` ?
            // https://eslint.vuejs.org/rules/next-tick-style.html
            'vue/next-tick-style': ['error', 'callback'],

            // https://eslint.vuejs.org/rules/no-arrow-functions-in-watch.html
            'vue/no-arrow-functions-in-watch': ['error'],

            // https://eslint.vuejs.org/rules/no-async-in-computed-properties.html
            'vue/no-async-in-computed-properties': ['error'],

            // https://eslint.vuejs.org/rules/no-computed-properties-in-data.html
            'vue/no-computed-properties-in-data': ['error'],

            // https://eslint.vuejs.org/rules/no-custom-modifiers-on-v-model.html
            'vue/no-custom-modifiers-on-v-model': ['error'],

            // https://eslint.vuejs.org/rules/no-deprecated-router-link-tag-prop.html
            'vue/no-deprecated-router-link-tag-prop': ['error'],

            // https://eslint.vuejs.org/rules/no-dupe-keys.html
            'vue/no-dupe-keys': ['error'],

            // https://eslint.vuejs.org/rules/no-dupe-v-else-if.html
            'vue/no-dupe-v-else-if': ['error'],

            // https://eslint.vuejs.org/rules/no-duplicate-attributes.html
            'vue/no-duplicate-attributes': ['error'],

            // https://eslint.vuejs.org/rules/no-export-in-script-setup.html
            'vue/no-export-in-script-setup': ['error'],

            // https://eslint.vuejs.org/rules/no-expose-after-await.html
            'vue/no-expose-after-await': ['error'],

            // https://eslint.vuejs.org/rules/no-lifecycle-after-await.html
            'vue/no-lifecycle-after-await': ['error'],

            // https://eslint.vuejs.org/rules/no-lone-template.html
            'vue/no-lone-template': ['error'],

            // https://eslint.vuejs.org/rules/no-multi-spaces.html
            'vue/no-multi-spaces': ['error'],

            // https://eslint.vuejs.org/rules/no-multiple-slot-args.html
            'vue/no-multiple-slot-args': ['error'],

            // https://eslint.vuejs.org/rules/no-mutating-props.html
            'vue/no-mutating-props': ['error'],

            // https://eslint.vuejs.org/rules/no-parsing-error.html
            'vue/no-parsing-error': ['error'],

            // https://eslint.vuejs.org/rules/no-potential-component-option-typo.html
            'vue/no-potential-component-option-typo': ['error', {
                presets: ['vue', 'vue-router'],
                custom: ['modal'],
            }],

            // https://eslint.vuejs.org/rules/no-ref-as-operand.html
            'vue/no-ref-as-operand': ['error'],

            // https://eslint.vuejs.org/rules/no-required-prop-with-default.html
            'vue/no-required-prop-with-default': ['error'],

            // https://eslint.vuejs.org/rules/no-reserved-keys.html
            'vue/no-reserved-keys': ['error'],

            // https://eslint.vuejs.org/rules/no-reserved-props': ['error', { vueVers.html
            'vue/no-reserved-props': ['error', { vueVersion: 2 }],

            // https://eslint.vuejs.org/rules/no-shared-component-data.html
            'vue/no-shared-component-data': ['error'],

            // https://eslint.vuejs.org/rules/no-side-effects-in-computed-properties.html
            'vue/no-side-effects-in-computed-properties': ['error'],

            // https://eslint.vuejs.org/rules/no-spaces-around-equal-signs-in-attribute.html
            'vue/no-spaces-around-equal-signs-in-attribute': ['error'],

            // https://eslint.vuejs.org/rules/no-template-key.html
            'vue/no-template-key': ['error'],

            // https://eslint.vuejs.org/rules/no-template-shadow.html
            'vue/no-template-shadow': ['error'],

            // https://eslint.vuejs.org/rules/no-textarea-mustache.html
            'vue/no-textarea-mustache': ['error'],

            // https://eslint.vuejs.org/rules/no-this-in-before-route-enter.html
            'vue/no-this-in-before-route-enter': ['error'],

            // https://eslint.vuejs.org/rules/no-undef-components.html
            'vue/no-undef-components': ['error'],

            // https://eslint.vuejs.org/rules/no-undef-properties.html
            'vue/no-undef-properties': ['error'],

            // https://eslint.vuejs.org/rules/no-unused-components.html
            'vue/no-unused-components': ['error'],

            // https://eslint.vuejs.org/rules/no-unused-emit-declarations.html
            'vue/no-unused-emit-declarations': ['error'],

            // https://eslint.vuejs.org/rules/no-unused-properties.html
            'vue/no-unused-properties': ['error'],

            // https://eslint.vuejs.org/rules/no-unused-refs.html
            'vue/no-unused-refs': ['error'],

            // https://eslint.vuejs.org/rules/no-unused-vars.html
            'vue/no-unused-vars': ['error'],

            // https://eslint.vuejs.org/rules/no-use-computed-property-like-method.html
            'vue/no-use-computed-property-like-method': ['error'],

            // https://eslint.vuejs.org/rules/no-use-v-if-with-v-for.html
            'vue/no-use-v-if-with-v-for': ['error'],

            // https://eslint.vuejs.org/rules/no-useless-concat
            'vue/no-useless-concat': ['error'],

            // https://eslint.vuejs.org/rules/no-useless-mustaches
            'vue/no-useless-mustaches': ['error', {
                ignoreIncludesComment: false,
                ignoreStringEscape: false,
            }],

            // https://eslint.vuejs.org/rules/no-v-html.html
            'vue/no-v-html': ['error'],

            // https://eslint.vuejs.org/rules/no-v-text.html
            'vue/no-v-text': ['error'],

            // https://eslint.vuejs.org/rules/no-v-text-v-html-on-component.html
            'vue/no-v-text-v-html-on-component': ['error'],

            // https://eslint.vuejs.org/rules/one-component-per-file.html
            'vue/one-component-per-file': ['error'],

            // https://eslint.vuejs.org/rules/order-in-components.html
            'vue/order-in-components': ['error'],

            // https://eslint.vuejs.org/rules/prefer-import-from-vue.html
            'vue/prefer-import-from-vue': ['error'],

            // https://eslint.vuejs.org/rules/prefer-prop-type-boolean-first.html
            'vue/prefer-prop-type-boolean-first': ['error'],

            // https://eslint.vuejs.org/rules/prop-name-casing.html
            'vue/prop-name-casing': ['error'],

            // https://eslint.vuejs.org/rules/require-component-is.html
            'vue/require-component-is': ['error'],

            // https://eslint.vuejs.org/rules/require-default-prop.html
            'vue/require-default-prop': ['error'],

            // https://eslint.vuejs.org/rules/require-explicit-emits.html
            'vue/require-explicit-emits': ['error'],

            // https://eslint.vuejs.org/rules/require-name-property.html
            'vue/require-name-property': ['error'],

            // https://eslint.vuejs.org/rules/require-prop-type-constructor.html
            'vue/require-prop-type-constructor': ['error'],

            // https://eslint.vuejs.org/rules/require-prop-types.html
            'vue/require-prop-types': ['error'],

            // https://eslint.vuejs.org/rules/require-render-return.html
            'vue/require-render-return': ['error'],

            // https://eslint.vuejs.org/rules/require-v-for-key.html
            'vue/require-v-for-key': ['error'],

            // https://eslint.vuejs.org/rules/require-valid-default-prop.html
            'vue/require-valid-default-prop': ['error'],

            // https://eslint.vuejs.org/rules/return-in-computed-property.html
            'vue/return-in-computed-property': ['error'],

            // https://eslint.vuejs.org/rules/return-in-emits-validator.html
            'vue/return-in-emits-validator': ['error'],

            // https://eslint.vuejs.org/rules/slot-name-casing.html
            'vue/slot-name-casing': ['error', 'kebab-case'],

            // https://eslint.vuejs.org/rules/this-in-template.html
            'vue/this-in-template': ['error'],

            // https://eslint.vuejs.org/rules/use-v-on-exact.html
            'vue/use-v-on-exact': ['error'],

            // https://eslint.vuejs.org/rules/v-bind-style.html
            'vue/v-bind-style': ['error'],

            // https://eslint.vuejs.org/rules/v-on-style.html
            'vue/v-on-style': ['error'],

            // https://eslint.vuejs.org/rules/v-slot-style.html
            'vue/v-slot-style': ['error'],

            // https://eslint.vuejs.org/rules/valid-attribute-name.html
            'vue/valid-attribute-name': ['error'],

            // https://eslint.vuejs.org/rules/valid-next-tick.html
            'vue/valid-next-tick': ['error'],

            // https://eslint.vuejs.org/rules/valid-template-root.html
            'vue/valid-template-root': ['error'],

            // https://eslint.vuejs.org/rules/valid-v-bind.html
            'vue/valid-v-bind': ['error'],

            // https://eslint.vuejs.org/rules/valid-v-cloak.html
            'vue/valid-v-cloak': ['error'],

            // https://eslint.vuejs.org/rules/valid-v-else-if.html
            'vue/valid-v-else-if': ['error'],

            // https://eslint.vuejs.org/rules/valid-v-else.html
            'vue/valid-v-else': ['error'],

            // https://eslint.vuejs.org/rules/valid-v-for.html
            'vue/valid-v-for': ['error'],

            // https://eslint.vuejs.org/rules/valid-v-html.html
            'vue/valid-v-html': ['error'],

            // https://eslint.vuejs.org/rules/valid-v-if.html
            'vue/valid-v-if': ['error'],

            // https://eslint.vuejs.org/rules/valid-v-model.html
            'vue/valid-v-model': ['error'],

            // https://eslint.vuejs.org/rules/valid-v-on.html
            'vue/valid-v-on': ['error'],

            // https://eslint.vuejs.org/rules/valid-v-once.html
            'vue/valid-v-once': ['error'],

            // https://eslint.vuejs.org/rules/valid-v-pre.html
            'vue/valid-v-pre': ['error'],

            // https://eslint.vuejs.org/rules/valid-v-show.html
            'vue/valid-v-show': ['error'],

            // https://eslint.vuejs.org/rules/valid-v-slot.html
            'vue/valid-v-slot': ['error'],

            // https://eslint.vuejs.org/rules/valid-v-text.html
            'vue/valid-v-text': ['error'],

            //
            // - Règles désactivées (spécifiques à Vue 3).
            //

            // https://eslint.vuejs.org/rules/define-emits-declaration
            'vue/define-emits-declaration': ['off'],

            // https://eslint.vuejs.org/rules/define-macros-order.html
            'vue/define-macros-order': ['off'],

            // https://eslint.vuejs.org/rules/define-props-declaration.html
            'vue/define-props-declaration': ['off'],

            // https://eslint.vuejs.org/rules/enforce-style-attribute.html
            'vue/enforce-style-attribute': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-data-object-declaration.html
            'vue/no-deprecated-data-object-declaration': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-delete-set.html
            'vue/no-deprecated-delete-set': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-destroyed-lifecycle.html
            'vue/no-deprecated-destroyed-lifecycle': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-dollar-listeners-api.html
            'vue/no-deprecated-dollar-listeners-api': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-dollar-scopedslots-api.html
            'vue/no-deprecated-dollar-scopedslots-api': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-events-api.html
            'vue/no-deprecated-events-api': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-filter.html
            'vue/no-deprecated-filter': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-functional-template.html
            'vue/no-deprecated-functional-template': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-html-element-is.html
            'vue/no-deprecated-html-element-is': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-inline-template.html
            'vue/no-deprecated-inline-template': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-model-definition.html
            'vue/no-deprecated-model-definition': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-props-default-this.html
            'vue/no-deprecated-props-default-this': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-scope-attribute.html
            'vue/no-deprecated-scope-attribute': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-v-bind-sync.html
            'vue/no-deprecated-v-bind-sync': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-v-is.html
            'vue/no-deprecated-v-is': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-v-on-native-modifier.html
            'vue/no-deprecated-v-on-native-modifier': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-v-on-number-modifiers.html
            'vue/no-deprecated-v-on-number-modifiers': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-vue-config-keycodes.html
            'vue/no-deprecated-vue-config-keycodes': ['off'],

            // https://eslint.vuejs.org/rules/no-ref-object-reactivity-loss.html
            'vue/no-ref-object-reactivity-loss': ['off'],

            // https://eslint.vuejs.org/rules/no-restricted-call-after-await.html
            'vue/no-restricted-call-after-await': ['off'],

            // https://eslint.vuejs.org/rules/no-setup-props-reactivity-loss.html
            'vue/no-setup-props-reactivity-loss': ['off'],

            // https://eslint.vuejs.org/rules/no-watch-after-await.html
            'vue/no-watch-after-await': ['off'],

            // https://eslint.vuejs.org/rules/prefer-define-options.html
            'vue/prefer-define-options': ['off'],

            // https://eslint.vuejs.org/rules/prefer-use-template-ref.html
            'vue/prefer-use-template-ref': ['off'],

            // https://eslint.vuejs.org/rules/require-explicit-slots.html
            'vue/require-explicit-slots': ['off'],

            // https://eslint.vuejs.org/rules/require-expose.html
            'vue/require-expose': ['off'],

            // https://eslint.vuejs.org/rules/require-macro-variable-name.html
            'vue/require-macro-variable-name': ['off'],

            // https://eslint.vuejs.org/rules/require-slots-as-functions.html
            'vue/require-slots-as-functions': ['off'],

            // https://eslint.vuejs.org/rules/valid-define-emits
            'vue/valid-define-emits': ['off'],

            // https://eslint.vuejs.org/rules/valid-define-options.html
            'vue/valid-define-options': ['off'],

            // https://eslint.vuejs.org/rules/valid-define-props
            'vue/valid-define-props': ['off'],

            // https://eslint.vuejs.org/rules/valid-v-memo
            'vue/valid-v-memo': ['off'],

            //
            // - Règles liées aux `<template>` ou `.vue`, non utilisés.
            //   (nous utilisons du JSX / TSX pour les components Vue)
            //

            // https://eslint.vuejs.org/rules/array-bracket-newline.html
            'vue/array-bracket-newline': ['off'],

            // https://eslint.vuejs.org/rules/array-element-newline.html
            'vue/array-element-newline': ['off'],

            // https://eslint.vuejs.org/rules/attributes-order.html
            'vue/attributes-order': ['off'],

            // https://eslint.vuejs.org/rules/block-lang.html
            'vue/block-lang': ['off'],

            // https://eslint.vuejs.org/rules/camelcase.html
            'vue/camelcase': ['off'],

            // https://eslint.vuejs.org/rules/comma-dangle.html
            'vue/comma-dangle': ['off'],

            // https://eslint.vuejs.org/rules/comma-spacing.html
            'vue/comma-spacing': ['off'],

            // https://eslint.vuejs.org/rules/comma-style.html
            'vue/comma-style': ['off'],

            // https://eslint.vuejs.org/rules/comment-directive.html
            'vue/comment-directive': ['off'],

            // https://eslint.vuejs.org/rules/component-name-in-template-casing.html
            'vue/component-name-in-template-casing': ['off'],

            // https://eslint.vuejs.org/rules/component-options-name-casing.html
            'vue/component-options-name-casing': ['off'],

            // https://eslint.vuejs.org/rules/dot-location.html
            'vue/dot-location': ['off'],

            // https://eslint.vuejs.org/rules/dot-notation.html
            'vue/dot-notation': ['off'],

            // https://eslint.vuejs.org/rules/eqeqeq.html
            'vue/eqeqeq': ['off'],

            // https://eslint.vuejs.org/rules/func-call-spacing.html
            'vue/func-call-spacing': ['off'],

            // https://eslint.vuejs.org/rules/html-button-has-type.html
            'vue/html-button-has-type': ['off'],

            // https://eslint.vuejs.org/rules/html-comment-content-newline.html
            'vue/html-comment-content-newline': ['off'],

            // https://eslint.vuejs.org/rules/html-comment-content-spacing.html
            'vue/html-comment-content-spacing': ['off'],

            // https://eslint.vuejs.org/rules/html-comment-indent.html
            'vue/html-comment-indent': ['off'],

            // https://eslint.vuejs.org/rules/key-spacing.html
            'vue/key-spacing': ['off'],

            // https://eslint.vuejs.org/rules/keyword-spacing.html
            'vue/keyword-spacing': ['off'],

            // https://eslint.vuejs.org/rules/max-len.html
            'vue/max-len': ['off'],

            // https://eslint.vuejs.org/rules/max-lines-per-block.html
            'vue/max-lines-per-block': ['off'],

            // https://eslint.vuejs.org/rules/max-template-depth.html
            'vue/max-template-depth': ['off'],

            // https://eslint.vuejs.org/rules/multiline-ternary.html
            'vue/multiline-ternary': ['off'],

            // https://eslint.vuejs.org/rules/no-bare-strings-in-template.html
            'vue/no-bare-strings-in-template': ['off'],

            // https://eslint.vuejs.org/rules/no-console.html
            'vue/no-console': ['off'],

            // https://eslint.vuejs.org/rules/no-constant-condition.html
            'vue/no-constant-condition': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-slot-attribute.html
            'vue/no-deprecated-slot-attribute': ['off'],

            // https://eslint.vuejs.org/rules/no-deprecated-slot-scope-attribute.html
            'vue/no-deprecated-slot-scope-attribute': ['off'],

            // https://eslint.vuejs.org/rules/no-duplicate-attr-inheritance.html
            'vue/no-duplicate-attr-inheritance': ['off'],

            // https://eslint.vuejs.org/rules/no-empty-component-block.html
            'vue/no-empty-component-block': ['off'],

            // https://eslint.vuejs.org/rules/no-empty-pattern.html
            'vue/no-empty-pattern': ['off'],

            // https://eslint.vuejs.org/rules/no-extra-parens.html
            'vue/no-extra-parens': ['off'],

            // https://eslint.vuejs.org/rules/no-irregular-whitespace.html
            'vue/no-irregular-whitespace': ['off'],

            // https://eslint.vuejs.org/rules/no-implicit-coercion.html
            'vue/no-implicit-coercion': ['off'],

            // https://eslint.vuejs.org/rules/no-loss-of-precision.html
            'vue/no-loss-of-precision': ['off'],

            // https://eslint.vuejs.org/rules/no-multiple-objects-in-class.html
            'vue/no-multiple-objects-in-class': ['off'],

            // https://eslint.vuejs.org/rules/no-restricted-block.html
            'vue/no-restricted-block': ['off'],

            // https://eslint.vuejs.org/rules/no-restricted-html-elements.html
            'vue/no-restricted-html-elements': ['off'],

            // https://eslint.vuejs.org/rules/no-restricted-static-attribute.html
            'vue/no-restricted-static-attribute': ['off'],

            // https://eslint.vuejs.org/rules/no-restricted-syntax.html
            'vue/no-restricted-syntax': ['off'],

            // https://eslint.vuejs.org/rules/no-restricted-v-bind.html
            'vue/no-restricted-v-bind': ['off'],

            // https://eslint.vuejs.org/rules/no-restricted-v-on.html
            'vue/no-restricted-v-on': ['off'],

            // https://eslint.vuejs.org/rules/no-root-v-if.html
            'vue/no-root-v-if': ['off'],

            // https://eslint.vuejs.org/rules/no-sparse-arrays.html
            'vue/no-sparse-arrays': ['off'],

            // https://eslint.vuejs.org/rules/no-static-inline-styles.html
            'vue/no-static-inline-styles': ['off'],

            // https://eslint.vuejs.org/rules/no-child-content.html
            'vue/no-child-content': ['off'],

            // https://eslint.vuejs.org/rules/no-multiple-template-root.html
            'vue/no-multiple-template-root': ['off'],

            // https://eslint.vuejs.org/rules/no-negated-condition.html
            'vue/no-negated-condition': ['off'],

            // https://eslint.vuejs.org/rules/no-template-target-blank.html
            'vue/no-template-target-blank': ['off'],

            // https://eslint.vuejs.org/rules/no-use-v-else-with-v-for.html
            'vue/no-use-v-else-with-v-for': ['off'],

            // https://eslint.vuejs.org/rules/no-useless-template-attributes.html
            'vue/no-useless-template-attributes': ['off'],

            // https://eslint.vuejs.org/rules/no-useless-v-bind.html
            'vue/no-useless-v-bind': ['off'],

            // https://eslint.vuejs.org/rules/no-v-for-template-key-on-child.html
            'vue/no-v-for-template-key-on-child': ['off'],

            // https://eslint.vuejs.org/rules/object-curly-newline.html
            'vue/object-curly-newline': ['off'],

            // https://eslint.vuejs.org/rules/object-curly-spacing.html
            'vue/object-curly-spacing': ['off'],

            // https://eslint.vuejs.org/rules/object-property-newline.html
            'vue/object-property-newline': ['off'],

            // https://eslint.vuejs.org/rules/object-shorthand.html
            'vue/object-shorthand': ['off'],

            // https://eslint.vuejs.org/rules/operator-linebreak.html
            'vue/operator-linebreak': ['off'],

            // https://eslint.vuejs.org/rules/padding-line-between-blocks.html
            'vue/padding-line-between-blocks': ['off'],

            // https://eslint.vuejs.org/rules/padding-line-between-tags.html
            'vue/padding-line-between-tags': ['off'],

            // https://eslint.vuejs.org/rules/prefer-template.html
            'vue/prefer-template': ['off'],

            // https://eslint.vuejs.org/rules/prefer-separate-static-class.html
            'vue/prefer-separate-static-class': ['off'],

            // https://eslint.vuejs.org/rules/prefer-true-attribute-shorthand.html
            'vue/prefer-true-attribute-shorthand': ['off'],

            // https://eslint.vuejs.org/rules/quote-props.html
            'vue/quote-props': ['off'],

            // https://eslint.vuejs.org/rules/require-toggle-inside-transition.html
            'vue/require-toggle-inside-transition': ['off'],

            // https://eslint.vuejs.org/rules/require-typed-ref.html
            'vue/require-typed-ref': ['off'],

            // https://eslint.vuejs.org/rules/script-indent.html
            'vue/script-indent': ['off'],

            // https://eslint.vuejs.org/rules/singleline-html-element-content-newline.html
            'vue/singleline-html-element-content-newline': ['off'],

            // https://eslint.vuejs.org/rules/space-in-parens.html
            'vue/space-in-parens': ['off'],

            // https://eslint.vuejs.org/rules/space-infix-ops.html
            'vue/space-infix-ops': ['off'],

            // https://eslint.vuejs.org/rules/space-unary-ops.html
            'vue/space-unary-ops': ['off'],

            // https://eslint.vuejs.org/rules/static-class-names-order.html
            'vue/static-class-names-order': ['off'],

            // https://eslint.vuejs.org/rules/template-curly-spacing.html
            'vue/template-curly-spacing': ['off'],

            // https://eslint.vuejs.org/rules/v-for-delimiter-style.html
            'vue/v-for-delimiter-style': ['off'],

            // https://eslint.vuejs.org/rules/v-if-else-key.html
            'vue/v-if-else-key': ['off'],

            // https://eslint.vuejs.org/rules/v-on-event-hyphenation.html
            'vue/v-on-event-hyphenation': ['off'],

            // https://eslint.vuejs.org/rules/v-on-handler-style.html
            'vue/v-on-handler-style': ['off'],

            // https://eslint.vuejs.org/rules/valid-v-is.html
            'vue/valid-v-is': ['off'],

            //
            // - Règles désactivées.
            //

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

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forbid-foreign-prop-types.md
            'react/forbid-foreign-prop-types': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/forward-ref-uses-ref.md
            'react/forward-ref-uses-ref': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
            'react/function-component-definition': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md
            'react/hook-use-state': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-child-element-spacing.md
            'react/jsx-child-element-spacing': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
            'react/jsx-fragments': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
            'react/jsx-key': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-max-depth.md
            'react/jsx-max-depth': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-newline.md
            'react/jsx-newline': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
            'react/jsx-no-constructed-context-values': ['off'],

            // TODO: À activer lorsqu'on pourra ignorer certains patterns dans la partie gauche des conditions
            //       parce qu'en l'état, on est forcé de "contraindre" (coerce) même les booléens (e.g. `{!!isBoolean && 'foo'}`) ...
            // https://github.com/jsx-eslint/eslint-plugin-react/blob/v7.30.0/docs/rules/jsx-no-leaked-render.md
            'react/jsx-no-leaked-render': ['off', {
                validStrategies: ['ternary', 'coerce'],
            }],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md
            'react/jsx-no-literals': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-script-url.md
            'react/jsx-no-script-url': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
            'react/jsx-no-useless-fragment': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-one-expression-per-line.md
            'react/jsx-one-expression-per-line': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
            'react/jsx-props-no-spreading': ['off'],

            // Deprecated in favor of react/jsx-sort-props
            'react/jsx-sort-prop-types': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
            'react/jsx-sort-props': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
            'react/jsx-uses-react': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-access-state-in-setstate.md
            'react/no-access-state-in-setstate': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-adjacent-inline-elements.md
            'react/no-adjacent-inline-elements': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
            'react/no-array-index-key': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-arrow-function-lifecycle.md
            'react/no-arrow-function-lifecycle': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger.md
            'react/no-danger': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md
            'react/no-danger-with-children': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md
            'react/no-deprecated': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
            'react/no-unstable-nested-components': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/pull/1103/
            'react/no-unused-state': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
            //      https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md
            //      https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-will-update-set-state.md
            //      https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
            'react/no-did-mount-set-state': ['off'],
            'react/no-did-update-set-state': ['off'],
            'react/no-direct-mutation-state': ['off'],
            'react/no-will-update-set-state': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md
            'react/no-find-dom-node': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md
            'react/no-is-mounted': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-multi-comp.md
            'react/no-multi-comp': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-namespace.md
            'react/no-namespace': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/HEAD/docs/rules/no-object-type-as-default-prop.md
            'react/no-object-type-as-default-prop': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-redundant-should-component-update.md
            'react/no-redundant-should-component-update': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md
            'react/no-render-return-value': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-set-state.md
            'react/no-set-state': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
            'react/no-string-refs': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-this-in-sfc.md
            'react/no-this-in-sfc': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-typos.md
            'react/no-typos': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
            'react/no-unknown-property': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unsafe.md
            'react/no-unsafe': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md
            'react/no-unused-prop-types': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-es6-class.md
            'react/prefer-es6-class': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-exact-props.md
            'react/prefer-exact-props': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-read-only-props.md
            'react/prefer-read-only-props': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
            'react/prefer-stateless-function': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md
            'react/prop-types': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
            'react/react-in-jsx-scope': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
            'react/require-default-props': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-optimization.md
            'react/require-optimization': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-comp.md
            'react/sort-comp': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-default-props.md
            'react/sort-default-props': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-prop-types.md
            'react/sort-prop-types': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/state-in-constructor.md
            'react/state-in-constructor': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/static-property-placement.md
            'react/static-property-placement': ['off'],

            // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/style-prop-object.md
            'react/style-prop-object': ['off'],

            // https://eslint.vuejs.org/rules/component-api-style.html
            'vue/component-api-style': ['off'],

            // https://eslint.vuejs.org/rules/define-props-destructuring.html
            'vue/define-props-destructuring': ['off'],

            // - Déjà pris en charge par les règles React.
            // https://eslint.vuejs.org/rules/jsx-uses-vars.html
            'vue/jsx-uses-vars': ['off'],

            // https://eslint.vuejs.org/rules/match-component-file-name.html
            'vue/match-component-file-name': ['off'],

            // https://eslint.vuejs.org/rules/max-props.html
            'vue/max-props': ['off'],

            // https://eslint.vuejs.org/rules/multi-word-component-names.html
            'vue/multi-word-component-names': ['off'],

            // https://eslint.vuejs.org/rules/new-line-between-multi-line-property.html
            'vue/new-line-between-multi-line-property': ['off'],

            // https://eslint.vuejs.org/rules/no-boolean-default.html
            'vue/no-boolean-default': ['off'],

            // https://eslint.vuejs.org/rules/no-import-compiler-macros.html
            'vue/no-import-compiler-macros': ['off'],

            // https://eslint.vuejs.org/rules/no-negated-v-if-condition.html
            'vue/no-negated-v-if-condition': ['off'],

            // https://eslint.vuejs.org/rules/no-reserved-component-names.html
            'vue/no-reserved-component-names': ['off'],

            // https://eslint.vuejs.org/rules/no-restricted-class.html
            'vue/no-restricted-class': ['off'],

            // https://eslint.vuejs.org/rules/no-restricted-component-names.html
            'vue/no-restricted-component-names': ['off'],

            // https://eslint.vuejs.org/rules/no-restricted-component-options.html
            'vue/no-restricted-component-options': ['off'],

            // https://eslint.vuejs.org/rules/no-restricted-custom-event.html
            'vue/no-restricted-custom-event': ['off'],

            // https://eslint.vuejs.org/rules/no-restricted-props.html
            'vue/no-restricted-props': ['off'],

            // https://eslint.vuejs.org/rules/no-unsupported-features.html
            'vue/no-unsupported-features': ['off'],

            // https://eslint.vuejs.org/rules/require-default-export.html
            'vue/require-default-export': ['off'],

            // https://eslint.vuejs.org/rules/require-direct-export.html
            'vue/require-direct-export': ['off'],

            // TODO: À activer ?
            // https://eslint.vuejs.org/rules/require-emit-validator.html
            'vue/require-emit-validator': ['off'],

            // https://eslint.vuejs.org/rules/require-prop-comment.html
            'vue/require-prop-comment': ['off'],

            // https://eslint.vuejs.org/rules/require-typed-object-prop.html
            'vue/require-typed-object-prop': ['off'],

            // https://eslint.vuejs.org/rules/restricted-component-names.html
            'vue/restricted-component-names': ['off'],

            // https://eslint.vuejs.org/rules/sort-keys.html
            'vue/sort-keys': ['off'],
        },
    },
];

export default [
    ...base,
    ...typescriptConfig,
];
