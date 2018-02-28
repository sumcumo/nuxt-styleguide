import * as path from 'path';
import urlJoin from 'url-join';
import kebabCase from 'lodash.kebabcase';

export default function extendRouter(options, components) {
  const originalExtendRoutes = options.router.extendRoutes;
  const renderer = options.renderer;

  options.router.extendRoutes = (originalRoutes) => {
    const routes = originalExtendRoutes
      ? originalExtendRoutes(originalRoutes)
      : originalRoutes;

    const r = routes
      .filter((route) => {
        return route.path.indexOf(options.path) !== 0;
      })
      .concat({
        name: 'styleguide:index',
        path: options.path,
        component: require.resolve(path.join(options.renderer, 'index.vue')),
        chunkName: `styleguide/index`,
      })
      .concat(
        components.map(({ name, filePath }) => {
          const kebabName = kebabCase(name);

          // const meta = JSON.stringify({
          //   name,
          //   importPath: components[name],
          //   renderer: require.resolve(
          //     path.join(options.renderer, 'component.vue')
          //   ),
          // });

          const route = {
            name: `styleguide:component:${name}`,
            path: urlJoin(options.path, 'components', kebabName),
            component: filePath,
            chunkName: `styleguide/component/${name}`,
          };

          return route;
        })
      );

    console.log(r);

    return r;
  };
}
