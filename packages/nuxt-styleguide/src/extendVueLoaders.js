import * as path from 'path'

export default function addStyleguideLoaders(module) {
  module.extendBuild((config) => {
    const vueLoaderRule = config.module.rules.find(
      (rule) => rule.loader === 'vue-loader'
    )

    if (
      vueLoaderRule &&
      vueLoaderRule.options &&
      vueLoaderRule.options.loaders
    ) {
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
    }

    config.module.rules.push({
      resourceQuery: /blockType=styleguide-doc/,
      loader: path.resolve(__dirname, 'loaders', 'doc-loader.js'),
    })

    config.module.rules.push({
      resourceQuery: /blockType=styleguide-states/,
      loader: path.resolve(__dirname, 'loaders', 'states-loader.js'),
    })
  })
}
