import * as fs from 'fs';
import * as path from 'path';
import osTmpdir from 'os-tmpdir';
import chokidar from 'chokidar';
import _template from 'lodash.template';
import { parse } from 'vue-docgen-api';
import chalk from 'chalk';
import Deferred from './Deferred';

const styleguideSrcDir = path.resolve(__dirname, '..', 'src');
const tmpDir = path.resolve(__dirname, '..', '.tmp');
const proxyTemplatePromise = new Promise((resolve, reject) => {
  fs.readFile(
    path.resolve(styleguideSrcDir, 'proxyComponent', 'proxyComponent.tjs'),
    (err, content) => {
      return err ? reject(err) : resolve(_template(content.toString()));
    }
  );
});

const COMPONENTS_DIRNAME = 'components';
let i = 0;

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

function getInfo(file, relPath, log) {
  try {
    return parse(file);
  } catch (e) {
    if (log) {
      if (e.message.indexOf('SyntaxError: unknown: Unexpected token') === 0) {
        console.warn(
          `${chalk.dim('  nuxt:styleguide')} ${chalk.yellow(
            'WARNING'
          )}(${chalk.dim(
            relPath
          )}):\n    Could not generate docs. Ensure <script> tag is present.`
        );
      } else {
        console.warn(
          `${chalk.dim('  nuxt:styleguide')} ${chalk.yellow(
            'WARNING'
          )}(${chalk.dim(relPath)}):\n    ${e.message}`
        );
      }
    }

    return {};
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
    .on('change', (file) => {
      if (path.extname(file) !== '.vue') {
        return;
      }

      files.find(({ file: f }) => f === file).upToDate = false;

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

    proxyTemplatePromise
      .then((template) => {
        Promise.all(
          Object.keys(sourceFiles).map((name) => {
            const { relPath, proxyPath, upToDate, file } = sourceFiles[name];

            if (upToDate) {
              return Promise.resolve();
            }

            return new Promise((resolve, reject) => {
              const componentInfo = getInfo(file, relPath, options.dev);

              const content = template({
                rendererPath: require.resolve(
                  path.join(options.renderer, 'component.vue')
                ),
                normalizeStatesPath: path.resolve(
                  styleguideSrcDir,
                  'proxyComponent',
                  'normalizeStates.js'
                ),
                componentInfo: JSON.stringify(componentInfo),
                buildId: i++,
                name,
                relPath,
              });

              fs.writeFile(proxyPath, content, (err) => {
                return err ? reject(err) : resolve();
              });
            }).then(() => {
              sourceFiles[name].upToDate = true;
            });
          })
        );
      })
      .then(() => {
        updated(sourceFiles);
        if (!ready) {
          ready = true;
          d.resolve();
        }
      })
      .catch((e) => {
        process.stderr.write(e.stack);
      });
  }

  return d.promise;
}
