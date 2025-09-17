import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    css: true,
  },
  rules: {
    'style/brace-style': 0,
    'jsdoc/empty-tags': 0,
    'style/quote-props': 0,
  },
}, {
  files: [
    './packages/ui/src/locale/**/*.ts',
    './packages/ui/src/locale/**/*.js',
  ],
  rules: {
    'no-template-curly-in-string': 0,
  },
}, {
  files: [
    './playground/**/*',

  ],
  rules: {
    'no-console': 0,
  },
})
