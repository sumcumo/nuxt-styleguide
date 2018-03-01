import extendVueLoaders from './extendVueLoaders';
import extendRoutes from './extendRoutes';
import normalizeExtends from './normalizeExtends';
import buildProxyComponents from './buildProxyComponents';

export default function NuxtStyleguide(moduleOptions) {
  const options = {
    ...this.options,
    path: '/styleguide',
    renderer: 'nuxt-styleguide-renderer-default',
    ...moduleOptions,
    extends: normalizeExtends(moduleOptions.extends),
  };

  extendVueLoaders(this.nuxt);

  let builder = null;
  let components = null;
  this.nuxt.hook('build:done', (b) => {
    builder = b;
  });

  this.nuxt.hook('build:extendRoutes', (routes) => {
    return extendRouter(options, routes, components);
  });

  return buildProxyComponents(options, this.nuxt, (c) => {
    components = c;

    if (builder) {
      builder.generateRoutesAndFiles();
    }
  });
}
