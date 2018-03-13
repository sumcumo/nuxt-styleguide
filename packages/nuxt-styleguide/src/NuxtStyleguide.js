import extendVueLoaders from './extendVueLoaders';
import extendRoutes from './extendRoutes';
import buildProxyComponents from './buildProxyComponents';
import getPages from './getPages';
import * as path from 'path';
import options from '@sum.cumo/nuxt-styleguide-config';
import getFiles from '@sum.cumo/nuxt-styleguide-files';

const tmpDir = path.resolve(__dirname, '..', '.tmp');

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
  let pages = null;
  let componentPaths = null;
  this.nuxt.hook('build:done', (b) => {
    builder = b;
  });

  this.nuxt.hook('build:extendRoutes', (routes) => {
    return extendRoutes(options, routes, componentPaths, pagesDir, pages);
  });

  const components = getFiles(
    options.extends.concat(path.join(options.srcDir, 'components')),
    '**/*.vue'
  );

  components.on('updateAll', (componentList) => {
    componentPaths = componentList.map(({ name }) => {
      return { name, proxyPath: path.join(tmpDir, `${name}.js`) };
    });

    if (builder) {
      builder.generateRoutesAndFiles();
    }
  });

  return Promise.all([
    buildProxyComponents(components, tmpDir),
    getPages(options, pagesDir, (p) => {
      pages = p;

      if (builder) {
        builder.generateRoutesAndFiles();
      }
    }),
  ]);
}
