import * as path from 'path';
import urlJoin from 'url-join';
import kebabCase from 'lodash.kebabcase';

function ucFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function extendRouter(
  options,
  routes,
  componentPaths,
  pagesDir,
  pages
) {
  const renderer = options.renderer;

  const conflictingRoutes = routes.filter((route) => {
    return route.path.indexOf(options.path) === 0;
  });

  conflictingRoutes.forEach((route) => {
    routes.splice(routes.indexOf(route), 1);
  });

  pages.forEach((page) => {
    const relPath = path.relative(pagesDir, page).replace(/\.vue$/, '');
    const pathTokens = relPath.split(path.sep);

    const routePath = (pathTokens[pathTokens.length - 1] === 'index'
      ? pathTokens.splice(0, pathTokens.length - 2)
      : pathTokens
    ).join('/');

    routes.push({
      name: `styleguide:Pages:${pathTokens
        .map((token) => {
          return ucFirst(token);
        })
        .join(':')}`,
      path: urlJoin(options.path, routePath),
      component: page,
      chunkName: `styleguide/page/${relPath}`,
    });
  });

  componentPaths.forEach(({ name, proxyPath }) => {
    const kebabName = kebabCase(name);

    routes.push({
      name: `styleguide:Components:${name}`,
      path: urlJoin(options.path, 'components', kebabName),
      component: proxyPath,
      chunkName: `styleguide/component/${kebabName}`,
    });
  });
}
