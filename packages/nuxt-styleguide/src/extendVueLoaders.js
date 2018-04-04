import * as path from 'path'

export default function addStyleguideLoaders(module) {
  module.extendBuild((config) => {
    const vueLoaderRule = config.module.rules.find(
      (rule) => rule.loader === 'vue-loader'
    )

    vueLoaderRule.options.loaders['styleguide-doc'] = path.resolve(
      __dirname,
      'loaders',
      'doc-loader.js'
    )
    vueLoaderRule.options.loaders['styleguide-states'] = path.resolve(
      __dirname,
      'loaders',
      'states-loader.js'
    )
  })
}
