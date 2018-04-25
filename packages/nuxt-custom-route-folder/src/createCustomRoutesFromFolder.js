import path from 'path'
import fs from 'fs'
import crypto from 'crypto'
import minimatch from 'minimatch'
import kebabCase from 'lodash.kebabcase'
import { Observable } from 'rxjs'
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

  const observer = observe(glob, watch)

  const readyObs = Observable.create((obs) => {
    const subscription = observer
      .filter(({ event }) => event === 'ready')
      .subscribe(() => {
        setTimeout(() => {
          obs.next()
          obs.complete()
        }, 0)
        subscription.unsubscribe()
      })
  })

  const transformFile = async ({ file: component, event }, route) => {
    const proxyPath = path.join(
      tmpDir,
      `${crypto
        .createHash('md5')
        .update(component)
        .digest('hex')}.${transformExt}`
    )

    const retVal = {
      route: {
        ...route,
        component: proxyPath,
      },
      proxyPath,
    }

    if (event === 'unlink') {
      return retVal
    }

    const [{ contents }] = await Promise.all([
      transform(await readFile(component), route),
      new Promise((resolve) => {
        /* If the transform happens to fast, the file change
        is not picked up by nuxt watchers and the change
        is not visible in the preview */
        setTimeout(resolve, 250)
      }),
    ])

    await writeFile(proxyPath, contents)

    return retVal
  }

  const getRoute = async ({ file: component }) => {
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
      path: routePath,
      priority,
      component,
      chunkName,
      name,
    }
  }

  const processFileMsg = async (message) => {
    if (message.event === 'ready') {
      return message
    }

    const include = message.event === 'unlink' || (await filter(message.file))

    if (!include) {
      return null
    }

    const directRoute = await getRoute(message)

    const { route, proxyPath } =
      ['add', 'change', 'unlink'].includes(message.event) && transform
        ? await transformFile(message, directRoute)
        : { route: directRoute }

    return {
      ...message,
      route,
      proxyPath,
    }
  }

  const fsEvents = observer
    .filter(({ file, event }) => {
      return event === 'ready' || minimatch(file, glob)
    })
    .buffer(readyObs)
    .take(Infinity)
    .concatMap((messages) => {
      return Promise.all(messages.map(processFileMsg))
    })
    .flatMap((m) => {
      return m
    })
    .filter((m) => m)

  fsEvents
    .filter(({ event }) => event !== 'ready')
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
    fsEvents.filter(({ event }) => event === 'ready').subscribe(() => {
      setTimeout(resolve, 0)
    }, reject)
  })
}
