const config = require('@sum.cumo/nuxt-styleguide-config');
const getFiles = require('@sum.cumo/nuxt-styleguide-files');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const exec = require('child_process').exec;

exports.pkg = {
  name: config.name,
  version: config.version,
  main: './index.vue',
  description: config.description,
  private: config.private,
  repository: config.repository,
  keywords: config.keywords,
  author: config.author,
  license: config.license,
  bugs: config.bugs,
  homepage: config.homepage,
  dependencies: config.dependencies,
};

const componentsDir = path.join(config.srcDir, 'components');
const indexFile = path.join(componentsDir, 'index.vue');
const packageFile = path.join(componentsDir, 'package.json');

exports.componentsDir = componentsDir;

exports.publish = function() {
  console.log(chalk.yellow('Starting publish process'));

  config.dev = false;

  const indexPromise = new Promise((resolve, reject) => {
    getFiles(path.join(config.srcDir, 'components'), '**/*.vue')
      .on('error', reject)
      .on('updateAll', (components) => {
        resolve(
          components
            .map((component) => {
              return `export { default as ${component.name} } from '.${
                path.sep
              }${path.relative(componentsDir, component.file)}';`;
            })
            .join('\n')
        );
      });
  }).then((componentsIndex) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        indexFile,
        `<script>\n${componentsIndex}\nexport default {}\n</script>`,
        (err) => {
          return err ? reject(err) : resolve(indexFile);
        }
      );
    });
  });

  function cleanup() {
    try {
      fs.unlinkSync(indexFile);
      fs.unlinkSync(packageFile);
    } catch (e) {}
  }

  indexPromise
    .then((indexFile) => {
      return new Promise((resolve, reject) => {
        fs.writeFile(
          packageFile,
          JSON.stringify(exports.pkg, null, 2),
          (err) => {
            return err ? reject(err) : resolve(packageFile);
          }
        );
      }).then((packageFile) => {
        return [packageFile, indexFile];
      });
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        exec(`cd ${componentsDir} && npm publish`, (err, stdout, stderr) => {
          return err ? reject(err) : resolve(stdout);
        });
      });
    })
    .then(console.log)
    .then(() => {
      console.log(chalk.green('OK!'));
    })
    .then(() => cleanup())
    .catch((err) => {
      cleanup();
      console.error(chalk.red(err));
      process.exit(1);
    });
};
