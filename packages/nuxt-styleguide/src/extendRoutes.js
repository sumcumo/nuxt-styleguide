import * as path from 'path';
import urlJoin from 'url-join';
import kebabCase from 'lodash.kebabcase';

export default function extendRouter(options, routes, components) {
  const renderer = options.renderer;

  const conflictingRoutes = routes.filter((route) => {
    return route.path.indexOf(options.path) === 0;
  });

  conflictingRoutes.forEach((route) => {
    routes.splice(routes.indexOf(route), 1);
  });

  routes.push({
    name: 'styleguide:index',
    path: options.path,
    component: require.resolve(path.join(options.renderer, 'index.vue')),
    chunkName: `styleguide/index`,
  });

  Object.keys(components).forEach((name) => {
    const { proxyPath } = components[name];
    const kebabName = kebabCase(name);

    routes.push({
      name: `styleguide:component:${name}`,
      path: urlJoin(options.path, 'components', kebabName),
      component: proxyPath,
      chunkName: `styleguide/component/${name}`,
    });
  });
}
