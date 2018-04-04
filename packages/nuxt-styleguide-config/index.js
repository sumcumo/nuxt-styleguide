const parseArgs = require('minimist')
const { Utils, Options } = require('nuxt')
const { resolve } = require('path')
const { existsSync } = require('fs')

const argv = parseArgs(process.argv.slice(2), {
  alias: {
    c: 'config-file',
  },
  string: ['c'],
  default: {
    c: 'nuxt.config.js',
  },
})

const rootDir = resolve(argv._[0] || '.')
const nuxtConfigFile = resolve(rootDir, argv['config-file'])

let options = {}

if (existsSync(nuxtConfigFile)) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  options = require(nuxtConfigFile)
} else if (argv['config-file'] !== 'nuxt.config.js') {
  Utils.fatalError(`Could not load config file: ${argv['config-file']}`)
}

if (typeof options.rootDir !== 'string') {
  options.rootDir = rootDir
}

if (typeof options.srcDir !== 'string') {
  options.srcDir = rootDir
}

// eslint-disable-next-line global-require, import/no-dynamic-require
const pkg = require(resolve(options.rootDir, 'package.json'))

const moduleOptions = Object.assign(
  {},
  options.styleguide || {},
  (options.modules || [])
    .filter(
      (module) =>
        module === '@sum.cumo/nuxt-styleguide' ||
        (Array.isArray(module) && module[0] === '@sum.cumo/nuxt-styleguide')
    )
    .reduce((memo, module) => {
      if (Array.isArray(module)) {
        return Object.assign({}, memo, module[1] || {})
      }

      return memo
    }, {})
)

module.exports = Object.assign(
  Options.defaults,
  options,
  pkg,
  {
    path: '/',
    designTokenName: 'design-tokens',
    importFrom: 'package',
    docsDir: 'docs',
    iconName: 'icons',
    renderer: '@sum.cumo/nuxt-styleguide-renderer-default',
  },
  moduleOptions,
  {
    extends:
      moduleOptions.extends && !Array.isArray(moduleOptions.extends)
        ? [moduleOptions.extends]
        : moduleOptions.extends || [],
  }
)
