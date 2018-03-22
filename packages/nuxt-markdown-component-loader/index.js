'use strict';

module.exports = function NuxtMarkdownComponentLoader(moduleOptions) {
  const options = Object.assign(
    {
      components: this.options.markdownComponents,
      marked: this.options.marked,
    },
    {
      components: moduleOptions.components,
      marked: moduleOptions.marked,
    }
  );

  this.extendBuild((config) => {
    config.module.rules.push(
      Object.assign({}, moduleOptions.loader || {}, {
        test: /\.md?$/,
        loader: '@sum.cumo/vue-markdown-component-loader',
        options,
      })
    );
  });
};
