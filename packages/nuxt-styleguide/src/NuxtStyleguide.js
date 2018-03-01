import extendVueLoaders from './extendVueLoaders';
import extendRoutes from './extendRoutes';
import normalizeExtends from './normalizeExtends';
import buildProxyComponents from './buildProxyComponents';
import * as path from 'path';

export default function NuxtStyleguide(moduleOptions) {
  const pkg = require(path.resolve(this.options.rootDir, 'package.json'));

  const options = {
    ...this.options,
    ...pkg,
    path: '/styleguide',
    renderer: 'nuxt-styleguide-renderer-default',
    ...moduleOptions,
    extends: normalizeExtends(moduleOptions.extends),
  };

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
  this.nuxt.hook('build:done', (b) => {
    builder = b;
  });

  this.nuxt.hook('build:extendRoutes', (routes) => {
    return extendRoutes(options, routes, components);
  });

  return buildProxyComponents(options, this.nuxt, (c) => {
    components = c;

    if (builder) {
      builder.generateRoutesAndFiles();
    }
  });
}
