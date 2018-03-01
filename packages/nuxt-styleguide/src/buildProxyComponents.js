import * as fs from 'fs';
import * as path from 'path';
import osTmpdir from 'os-tmpdir';
import chokidar from 'chokidar';

// const tmpDir = osTmpdir();
const tmpDir = path.resolve(__dirname, '..', '.tmp');

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

class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

export default function buildProxyComponents(options, nuxt, updated) {
  const d = new Deferred();
  const sources = options.extends.concat(options.srcDir).map((extend) => {
    return {
      importPath: path.join(extend, COMPONENTS_DIRNAME),
      relPath: path.join(
        getRelPath(options.srcDir, extend),
        COMPONENTS_DIRNAME
      ),
    };
  });

  const watcher = chokidar.watch(
    sources.map(({ importPath }) => {
      return path.join(importPath, '**');
    })
  );

  let ready = false;
  const files = [];

  watcher
    .on('add', (file) => {
      if (path.extname(file) !== '.vue') {
        return;
      }

      const source = sources.find(({ importPath }) => {
        return file.indexOf(importPath) === 0;
      });
      const sourceIndex = sources.indexOf(source);

      const name = path.basename(file, path.extname(file));

      files.push({
        file,
        sourceIndex,
        name,
        proxyPath: path.join(tmpDir, `${name}.js`),
        relPath: path.join(
          source.relPath,
          path.relative(source.importPath, file)
        ),
      });

      if (ready) {
        update();
      }
    })
    .on('unlink', (file) => {
      if (path.extname(file) !== '.vue') {
        return;
      }

      const entry = files.find(({ file: f }) => f === file);

      files.splice(files.indexOf(entry), 1);
      fs.unlinkSync(entry.proxyPath);

      update();
    })
    .on('error', (error) => d.reject(error))
    .on('ready', () => {
      if (!options.dev) {
        watcher.close();
      }
      update();
    });

  function update() {
    const sourceFiles = files
      .sort(({ sourceIndex: a }, { sourceIndex: b }) => {
        return a - b;
      })
      .reduce((memo, entry) => {
        memo[entry.name] = entry;

        return memo;
      }, {});

    Promise.all(
      Object.keys(sourceFiles).map((name) => {
        const { relPath, proxyPath, upToDate } = sourceFiles[name];

        if (upToDate) {
          return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
          fs.writeFile(
            proxyPath,
            `
              import Vue from 'vue';
              import Comp from '${relPath}';
              import Renderer from '${require.resolve(
                path.join(options.renderer, 'component.vue')
              )}';
              const styleguide = Comp.__styleguide || {};

              function getDefault(type) {
                switch(type) {
                  case String:
                    return 'Hello World';
                  case Number:
                    return 42
                  case Boolean:
                    return true;
                  case Function:
                    return () => {};
                  case Object:
                    return {};
                  case Array:
                    return [];
                  case Symbol:
                    return Symbol('Hello World');
                }
              }

              if (!styleguide.states || !styleguide.states.length) {
                function defaultProps(props) {
                  if (!props || Array.isArray(props)) {
                    return {};
                  }

                  return Object.keys(Comp.props).reduce((memo, propName) => {
                    const def = Comp.props[propName];

                    if (def.default) {
                      memo[propName] = def.default;
                    } else if (def.type && def.required) {
                      memo[propName] = getDefault(def.type);
                    }

                    return memo;
                  }, {});
                }

                styleguide.states = [{
                  title: 'Default',
                  props: defaultProps(Comp.props),
                  slots: { default: 'Hello World' }
                }]
              }

              export default Vue.component('nuxt-styleguide-${name}', {
                render: function(createElement) {
                  return createElement(Renderer, { props: {
                    Comp,
                    name: '${name}',
                    importPath: '${relPath}',
                    states: styleguide.states,
                    docs: styleguide.docs,
                  } });
                },
              });
              `,
            (err) => {
              return err ? reject(err) : resolve();
            }
          );
        }).then(() => {
          sourceFiles[name].upToDate = true;
        });
      })
    )
      .then(() => {
        updated(sourceFiles);
        if (!ready) {
          ready = true;
          d.resolve();
        }
      })
      .catch((e) => {
        process.stderr.write(e);
      });
  }

  return d.promise;
}
