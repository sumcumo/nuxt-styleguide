const config = require('@sum.cumo/nuxt-styleguide-config');
const chokidar = require('chokidar');
const path = require('path');
const EventEmitter = require('events');
const minimatch = require('minimatch');

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

function toArray(thing) {
  return Array.isArray(thing) ? thing : [thing];
}

function matchesAnyPattern(patterns) {
  return (file) => {
    return patterns.reduce((memo, pattern) => {
      return memo ? memo : minimatch(file, pattern);
    }, false);
  };
}

function defaultGetName(file) {
  return path.basename(file, path.extname(file));
}

module.exports = function getComponents(
  sourceDirs,
  patterns,
  getName = defaultGetName
) {
  const components = new EventEmitter();
  const matches = matchesAnyPattern(toArray(patterns));

  const sources = toArray(sourceDirs).map((sourceDir) => {
    return {
      importPath: sourceDir,
      relPath: path.join(getRelPath(config.srcDir, sourceDir)),
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
      if (!matches(file)) {
        return;
      }

      const source = sources.find(({ importPath }) => {
        return file.indexOf(importPath) === 0;
      });
      const sourceIndex = sources.indexOf(source);
      const relPath = path.join(
        source.relPath,
        path.relative(source.importPath, file)
      );

      Promise.resolve(getName(file, relPath)).then((name) => {
        if (name === false) {
          return;
        }

        const fileObj = {
          file,
          sourceIndex,
          name,
          relPath,
        };

        components.emit('add', fileObj);
        files.push(fileObj);

        if (ready) {
          update();
        }
      });
    })
    .on('unlink', (file) => {
      if (!matches(file)) {
        return;
      }

      const fileObj = files.find(({ file: f }) => f === file);

      components.emit('unlink', fileObj);
      files.splice(files.indexOf(fileObj), 1);

      update();
    })
    .on('change', (file) => {
      if (!matches(file)) {
        return;
      }

      const source = sources.find(({ importPath }) => {
        return file.indexOf(importPath) === 0;
      });
      const sourceIndex = sources.indexOf(source);
      const relPath = path.join(
        source.relPath,
        path.relative(source.importPath, file)
      );

      const fileObj = files.find(({ file: f }) => f === file);

      Promise.resolve(getName(file, relPath)).then((name) => {
        if (name === false && fileObj) {
          files.splice(files.indexOf(fileObj), 1);
        } else if (!fileObj) {
          const fileObj = {
            file,
            sourceIndex,
            name,
            relPath,
          };

          components.emit('add', fileObj);
          files.push(fileObj);
        } else {
          fileObj.name = name;
          fileObj.upToDate = false;
        }

        update();
      });
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
