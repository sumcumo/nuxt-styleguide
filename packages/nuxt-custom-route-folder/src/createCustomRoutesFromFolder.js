import path from 'path'
import fs from 'fs'
import crypto from 'crypto'
import minimatch from 'minimatch'
import kebabCase from 'lodash.kebabcase'
import observe from './observe'
import getRoutes from './getRoutes'
import { tmpDir, CHUNK_PREFIX, readFile, writeFile } from './common'

export default function createCustomRoutesFromFolder({
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
    .concatMap(async (message) => {
      return {
        ...message,
        include: ['ready', 'unlink'].includes(message.event)
          ? true
          : await filter(message.file),
      }
    })
    .filter(({ include }) => include)
    .map((message) => {
      if (message.event === 'ready' || !transform) {
        return message
      }
      return {
        ...message,
        proxyPath: path.join(
          tmpDir,
          `${crypto
            .createHash('md5')
            .update(message.file)
            .digest('hex')}.${transformExt}`
        ),
      }
    })
    .concatMap(async (message) => {
      const { event, file: component } = message
      if (['ready', 'unlink'].includes(event)) {
        return message
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

      const [routePath, name] = await Promise.all([
        mapRoutePath(`/${urlPath}`),
        mapRouteName(basePath, component),
      ])

      return {
        ...message,
        route: {
          path: routePath,
          priority,
          component,
          chunkName,
          name,
        },
      }
    })
    .concatMap(async (message) => {
      const { event, file, route, proxyPath } = message

      if (!transform || !['add', 'change'].includes(event)) {
        return message
      }

      const { contents } = await Promise.all([
        transform(await readFile(file), route),
        new Promise((resolve) => {
          /* If the transform happens to fast, the file change
             is not picked up by nuxt watchers and the change
             is not visible in the preview */
          setTimeout(resolve, 250)
        }),
      ])

      await writeFile(proxyPath, contents)

      return {
        ...message,
        route: {
          ...message.route,
          component: proxyPath,
        },
      }
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
