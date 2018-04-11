const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const minimatch = require('minimatch')
const kebabCase = require('lodash.kebabcase')

const observe = require('./observe')
const getRoutes = require('./getRoutes')
const { tmpDir, CHUNK_PREFIX, readFile, writeFile } = require('./common')

module.exports = function createCustomRoutesFromFolder({
  nuxt,
  glob,
  transform,
  priority = 0,
  mapRouteName = (basePath) => basePath.replace(/\//g, ':'),
  mapRoutePath = (p) => p,
  filter = () => true,
  transformExt = 'js',
  srcDir = nuxt.options.srcDir,
  watch = nuxt.options.dev,
}) {
  const routes = getRoutes(nuxt)

  const observer = observe(srcDir, watch)
    .filter(({ file, event }) => {
      return event === 'ready' || minimatch(file, glob)
    })
    .concatMap((message) => {
      return Promise.resolve(
        ['ready', 'unlink'].includes(message.event)
          ? true
          : filter(message.file)
      ).then((include) => {
        return Object.assign({}, message, { include })
      })
    })
    .filter(({ include }) => include)
    .map((message) => {
      if (message.event === 'ready' || !transform) {
        return message
      }
      return Object.assign({}, message, {
        proxyPath: path.join(
          tmpDir,
          `${crypto
            .createHash('md5')
            .update(message.file)
            .digest('hex')}.${transformExt}`
        ),
      })
    })
    .concatMap((message) => {
      const { event, file: component } = message
      if (['ready', 'unlink'].includes(event)) {
        return Promise.resolve(message)
      }

      const basePath = path
        .relative(srcDir, component)
        .replace(new RegExp(`${path.extname(component)}$`), '')
      const urlPath = basePath
        .split(path.sep)
        .map((t) => kebabCase(t))
        .join('/')
        .replace(/index$/, '')
      const chunkName = `${CHUNK_PREFIX}/${basePath}`

      return Promise.all([
        mapRoutePath(`/${urlPath}`),
        mapRouteName(basePath, component),
      ]).then(([routePath, name]) => {
        return Object.assign({}, message, {
          route: {
            path: routePath,
            priority,
            component,
            chunkName,
            name,
          },
        })
      })
    })
    .concatMap((message) => {
      const { event, file, route, proxyPath } = message

      if (!transform || !['add', 'change'].includes(event)) {
        return Promise.resolve(message)
      }

      return readFile(file)
        .then((contents) => {
          const transformPromise = transform(contents, route)
          return new Promise((resolve) => {
            /* If the transform happens to fast, the file change
               is not picked up by nuxt watchers and the change
               is not visible in the preview */
            setTimeout(resolve, 250)
          }).then(() => {
            return transformPromise
          })
        })
        .then(({ contents }) => {
          return writeFile(proxyPath, contents)
        })
        .then(() => {
          return Object.assign(message, {
            route: Object.assign({}, message.route, {
              component: proxyPath,
            }),
          })
        })
    })

  observer
    .filter(({ event }) => {
      return ['add', 'unlink', 'change'].includes(event)
    })
    .forEach(({ event, route, proxyPath }) => {
      if (event === 'unlink') {
        routes.unlink(route)
      } else {
        routes.add(route)
      }

      if (proxyPath && event === 'unlink') {
        fs.unlink(proxyPath)
      }
    })

  return new Promise((resolve, reject) => {
    observer.subscribe(({ event }) => {
      if (event === 'ready') {
        resolve()
      }
    }, reject)
  })
}
