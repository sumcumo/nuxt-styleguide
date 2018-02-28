import * as path from 'path';

export default function addStyleguideLoaders(nuxt) {
  const originalExtend = nuxt.options.build.extend;
  nuxt.options.build.extend = (originalConfig) => {
    const config = originalExtend
      ? originalExtend(originalConfig)
      : originalConfig;

    const vueLoaderRule = config.module.rules.find((rule) => {
      return rule.loader === 'vue-loader';
    });

    vueLoaderRule.options.loaders['styleguide-doc'] = path.resolve(
      __dirname,
      'loaders',
      'doc-loader.js'
    );
    vueLoaderRule.options.loaders['styleguide-states'] = path.resolve(
      __dirname,
      'loaders',
      'states-loader.js'
    );

    return config;
  };
}
