import * as path from 'path'

export default function addStyleguideLoaders(module) {
  const docLoader = path.resolve(__dirname, 'loaders', 'doc-loader.js')
  const statesLoader = path.resolve(__dirname, 'loaders', 'states-loader.js')

  module.extendBuild((config) => {
    const vueLoaderRule = config.module.rules.find(
      (rule) => rule.loader === 'vue-loader'
    )

    if (
      vueLoaderRule &&
      vueLoaderRule.options &&
      vueLoaderRule.options.loaders
    ) {
      vueLoaderRule.options.loaders['styleguide-doc'] = docLoader
      vueLoaderRule.options.loaders['nsg-doc'] = docLoader
      vueLoaderRule.options.loaders['styleguide-states'] = statesLoader
      vueLoaderRule.options.loaders['nsg-states'] = statesLoader
    }

    config.module.rules.push(
      {
        resourceQuery: /blockType=styleguide-doc/,
        loader: docLoader,
      },
      {
        resourceQuery: /blockType=nsg-doc/,
        loader: docLoader,
      },
      {
        resourceQuery: /blockType=styleguide-states/,
        loader: statesLoader,
      },
      {
        resourceQuery: /blockType=nsg-states/,
        loader: statesLoader,
      }
    )
  })
}
