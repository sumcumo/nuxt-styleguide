const marked = require('marked');
const options = require('@sum.cumo/nuxt-styleguide-config');
const path = require('path');

module.exports = function(source, map, meta) {
  try {
    const docsDir = path.resolve(options.srcDir, options.docsDir);

    const name = path
      .relative(docsDir, this.resourcePath)
      .replace(/\.md$/, '')
      .replace(/\W/g, '-');

    const content = marked(source);

    this.callback(
      null,
      `
      import Vue from 'vue';
      import DocComp from '${require.resolve(
        path.join(options.renderer, 'doc.vue')
      )}';

      export default Vue.component('nuxt-styleguide-docs-${name}', {
        render: function (createElement) {
          return createElement(
            DocComp,
            {
              props: {
                doc: ${JSON.stringify(content)}
              }
            }
          )
        }
      })
      `,
      map
    );
  } catch (e) {
    this.callback(e);
  }
};
