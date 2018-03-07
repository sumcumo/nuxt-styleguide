import extendVueLoaders from './extendVueLoaders';
import extendRoutes from './extendRoutes';
import normalizeExtends from './normalizeExtends';
import buildProxyComponents from './buildProxyComponents';
import getPages from './getPages';
import * as path from 'path';

export default function NuxtStyleguide(moduleOptions) {
  const pkg = require(path.resolve(this.options.rootDir, 'package.json'));
  const options = {
    ...this.options,
    ...pkg,
    path: '/styleguide',
    renderer: '@sum.cumo/nuxt-styleguide-renderer-default',
    ...moduleOptions,
    extends: normalizeExtends(moduleOptions.extends),
  };
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
