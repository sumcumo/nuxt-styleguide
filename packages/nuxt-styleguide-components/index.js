const config = require('@sum.cumo/nuxt-styleguide-config');
const chokidar = require('chokidar');
const path = require('path');
const EventEmitter = require('events');

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

module.exports = function getComponents(sourceDirs) {
  const components = new EventEmitter();

  const sources = (Array.isArray(sourceDirs) ? sourceDirs : [sourceDirs]).map(
    (sourceDir) => {
      return {
        importPath: path.join(sourceDir, COMPONENTS_DIRNAME),
        relPath: path.join(
          getRelPath(config.srcDir, sourceDir),
          COMPONENTS_DIRNAME
        ),
      };
    }
  );

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

      const fileObj = {
        file,
        sourceIndex,
        name,
        relPath: path.join(
          source.relPath,
          path.relative(source.importPath, file)
        ),
      };

      components.emit('add', fileObj);
      files.push(fileObj);

      if (ready) {
        update();
      }
    })
    .on('unlink', (file) => {
      if (path.extname(file) !== '.vue') {
        return;
      }

      const fileObj = files.find(({ file: f }) => f === file);

      components.emit('unlink', fileObj);
      files.splice(files.indexOf(fileObj), 1);

      update();
    })
    .on('change', (file) => {
      if (path.extname(file) !== '.vue') {
        return;
      }

      files.find(({ file: f }) => f === file).upToDate = false;

      update();
    })
    .on('error', (error) => components.emit('error', error))
    .on('ready', () => {
      if (!config.dev) {
        watcher.close();
      }
      update();
      ready = true;
      components.emit('ready');
    });

  function update() {
    const existingNames = [];
    const sourceFiles = files
      .sort(({ sourceIndex: a }, { sourceIndex: b }) => {
        return b - a;
      })
      .filter((entry) => {
        if (existingNames.indexOf(entry.name) === -1) {
          existingNames.push(entry.name);
          return true;
        }

        return false;
      });

    sourceFiles
      .filter((entry) => {
        return !entry.upToDate;
      })
      .forEach((file) => {
        components.emit('update', file);
        file.upToDate = true;
      });

    components.emit('updateAll', sourceFiles);
  }

  return components;
};
