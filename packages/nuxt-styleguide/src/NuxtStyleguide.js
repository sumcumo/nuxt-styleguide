import extendVueLoaders from './extendVueLoaders';
import extendRouter from './extendRouter';
import getComponents from './getComponents';
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

  return getComponents(options)
    .then((components) => {
      return buildProxyComponents(options, components);
    })
    .then((proxyComponents) => {
      return extendRouter(options, proxyComponents);
    });
}
