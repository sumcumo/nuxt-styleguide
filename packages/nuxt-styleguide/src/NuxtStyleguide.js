import extendVueLoaders from './extendVueLoaders';
import extendRoutes from './extendRoutes';
import buildProxyComponents from './buildProxyComponents';
import getPages from './getPages';
import * as path from 'path';
import * as fs from 'fs';
import options from '@sum.cumo/nuxt-styleguide-config';
import getFiles from '@sum.cumo/nuxt-styleguide-files';
import buildProxyVariables from './buildProxyVariables';
import urlJoin from 'url-join';

const tmpDir = path.resolve(__dirname, '..', '.tmp');
try {
  fs.mkdirSync(tmpDir);
} catch (e) {
  /* noop */
}

export default function NuxtStyleguide() {
  const pagesDir = path.join(
    path.dirname(require.resolve(path.join(options.renderer, 'component.vue'))),
    'pages'
  );

  const docsDir = path.resolve(options.srcDir, options.docsDir);

  extendVueLoaders(this);

  this.extendBuild((config) => {
    config.module.rules.push({
      test: /\.md?$/,
      loader: '@sum.cumo/vue-markdown-component-loader',
      include: docsDir,
      options: {
        components: this.options.markdownComponents,
        marked: this.options.marked,
        wrapper: require.resolve(path.join(options.renderer, 'doc.vue')),
      },
    });
  });

  const basePath = `${this.nuxt.options.router.base.replace(/\/$/, '')}/`;

  this.addPlugin({
    src: path.resolve(__dirname, 'styleguideProvider.js'),
    options: {
      data: JSON.stringify({
        name: options.name,
        version: options.version,
        description: options.description,
        homepage: options.homepage,
        basePath,
        path: `${urlJoin(basePath, options.path).replace(/\/$/, '')}`,
      }),
    },
  });

  let builder = null;
  let pages = null;
  let componentPaths = null;
  let variablesPaths = null;
  let docsPaths = null;
  this.nuxt.hook('build:done', (b) => {
    builder = b;
  });

  this.nuxt.hook('build:extendRoutes', (routes) => {
    return extendRoutes(
      options,
      routes,
      docsPaths,
      componentPaths,
      variablesPaths,
      pagesDir,
      docsDir,
      pages
    );
  });

  const components = getFiles(
    options.extends.concat(path.join(options.srcDir, 'components')),
    '**/*.vue'
  );

  const docs = getFiles(docsDir, '**/*.+(md|vue)');

  const variables = getFiles(
    path.resolve(options.srcDir, options.variablesName),
    '**/*.+(scss|sass)'
  );

  docs.on('updateAll', (docList) => {
    docsPaths = docList;

    if (builder) {
      builder.generateRoutesAndFiles();
    }
  });

  variables.on('updateAll', (variableList) => {
    variablesPaths = variableList.map(({ name }) => {
      return { name, proxyPath: path.join(tmpDir, `${name}.vars.js`) };
    });

    if (builder) {
      builder.generateRoutesAndFiles();
    }
  });

  components.on('updateAll', (componentList) => {
    componentPaths = componentList.map(({ name }) => {
      return { name, proxyPath: path.join(tmpDir, `${name}.comp.js`) };
    });

    if (builder) {
      builder.generateRoutesAndFiles();
    }
  });

  return Promise.all([
    buildProxyVariables(variables, tmpDir),
    buildProxyComponents(components, tmpDir),
    getPages(options, pagesDir, (p) => {
      pages = p;

      if (builder) {
        builder.generateRoutesAndFiles();
      }
    }),
  ]);
}
