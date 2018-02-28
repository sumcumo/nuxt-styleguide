import glob from 'fast-glob';
import * as path from 'path';

const COMPONENTS_DIRNAME = 'components';

function getRelPath(srcDir, extend) {
  try {
    require.resolve(extend);
    return extend;
  } catch (e) {
    if (e.message.indexOf('Cannot find module') !== 0) {
      throw e;
    }

    const relPath = path.relative(srcDir, extend);

    if (relPath.indexOf('..') !== 0) {
      return `~/${relPath}`;
    }

    return path.resolve(extend);
  }
}

export default function getComponents(options) {
  // console.log(options.extends);

  const sources = options.extends.concat(options.srcDir).map((extend) => {
    return {
      importPath: path.join(extend, COMPONENTS_DIRNAME),
      relPath: path.join(
        getRelPath(options.srcDir, extend),
        COMPONENTS_DIRNAME
      ),
    };
  });

  return Promise.all(
    sources.map(({ importPath, relPath }) => {
      return glob('**/*.vue', {
        cwd: importPath,
      }).then((components) => {
        return components.reduce((memo, component) => {
          const name = path.basename(component, path.extname(component));

          memo[name] = path.join(relPath, component);

          return memo;
        }, {});
      });
    })
  ).then((allComponents) => {
    return allComponents.reduce((memo, collection) => {
      return {
        ...memo,
        ...collection,
      };
    }, {});
  });
}
