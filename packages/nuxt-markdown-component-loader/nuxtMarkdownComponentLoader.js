module.exports = function NuxtMarkdownComponentLoader(moduleOptions) {
  const options = {
    components: moduleOptions.components || this.options.markdownComponents,
  }

  this.extendBuild((config) => {
    config.module.rules.push(
      Object.assign({}, moduleOptions.loader || {}, {
        test: /\.md?$/,
        loader: '@sum.cumo/vue-markdown-component-loader',
        options,
      })
    )
  })
}
