import extendVueLoaders from './extendVueLoaders';
import extendRoutes from './extendRoutes';
import buildProxyComponents from './buildProxyComponents';
import getPages from './getPages';
import * as path from 'path';
import options from '@sum.cumo/nuxt-styleguide-config';

export default function NuxtStyleguide() {
  const pagesDir = path.join(
    path.dirname(require.resolve(path.join(options.renderer, 'component.vue'))),
    'pages'
  );

  extendVueLoaders(this.nuxt);

  this.addPlugin({
    src: path.resolve(__dirname, 'styleguideProvider.js'),
    options: {
      data: JSON.stringify({
        name: options.name,
        version: options.version,
        description: options.description,
        homepage: options.homepage,
        path: options.path,
      }),
    },
  });

  let builder = null;
  let components = null;
  let pages = null;
  this.nuxt.hook('build:done', (b) => {
    builder = b;
  });

  this.nuxt.hook('build:extendRoutes', (routes) => {
    return extendRoutes(options, routes, components, pagesDir, pages);
  });

  return Promise.all([
    buildProxyComponents(options, this.nuxt, (c) => {
      components = c;

      if (builder) {
        builder.generateRoutesAndFiles();
      }
    }),
    getPages(options, pagesDir, (p) => {
      pages = p;

      if (builder) {
        builder.generateRoutesAndFiles();
      }
    }),
  ]);
}
