import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    css: true,
  },
  rules: {
    'style/brace-style': 0,
    'jsdoc/empty-tags': 0,
  },
})
