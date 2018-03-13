const parseArgs = require('minimist');
const Utils = require('nuxt').Utils;
const Options = require('nuxt').Options;
const resolve = require('path').resolve;
const existsSync = require('fs').existsSync;

const argv = parseArgs(process.argv.slice(2), {
  alias: {
    c: 'config-file',
  },
  string: ['c'],
  default: {
    c: 'nuxt.config.js',
  },
});

const rootDir = resolve(argv._[0] || '.');
const nuxtConfigFile = resolve(rootDir, argv['config-file']);

let options = {};

if (existsSync(nuxtConfigFile)) {
  options = require(nuxtConfigFile);
} else if (argv['config-file'] !== 'nuxt.config.js') {
  Utils.fatalError('Could not load config file: ' + argv['config-file']);
}

if (typeof options.rootDir !== 'string') {
  options.rootDir = rootDir;
}

if (typeof options.srcDir !== 'string') {
  options.srcDir = rootDir;
}

const pkg = require(resolve(options.rootDir, 'package.json'));

const moduleOptions = Object.assign(
  {},
  options.styleguide || {},
  (options.modules || [])
    .filter((module) => {
      return (
        module === '@sum.cumo/nuxt-styleguide' ||
        (Array.isArray(module) && module[0] === '@sum.cumo/nuxt-styleguide')
      );
    })
    .reduce((memo, module) => {
      if (Array.isArray(module)) {
        return Object.assign({}, memo, module[1] || {});
      }

      return memo;
    }, {})
);

module.exports = Object.assign(
  Options.defaults,
  options,
  pkg,
  {
    path: '/styleguide',
    variablesName: 'variables',
    renderer: '@sum.cumo/nuxt-styleguide-renderer-default',
  },
  moduleOptions,
  {
    extends:
      moduleOptions.extends && !Array.isArray(moduleOptions.extends)
        ? [moduleOptions.extends]
        : moduleOptions.extends || [],
  }
);
