import path from 'path'
import kebabCase from 'lodash.kebabcase'
import { Observable } from 'rxjs'
import observe from './observe'
import getRoutes from './getRoutes'
import CHUNK_PREFIX from './chunkPrefix'

export default function createCustomRoutesFromFolder({
  nuxt,
  glob,
  extendRoutes,
  priority = 0,
  mapImport = (p) => p,
  mapRouteName = (basePath) => basePath.replace(/\//g, ':'),
  mapRoutePath = (p) => p,
  mapMeta = () => ({}),
  filter = () => true,
  srcDir = nuxt.options.srcDir,
  watch = nuxt.options.dev,
}) {
  const routes = getRoutes(extendRoutes)

  const observer = observe(glob, watch)

  const readyObs = Observable.create((obs) => {
    const subscription = observer
      .filter(({ event }) => event === 'ready')
      .subscribe(() => {
        setTimeout(() => {
          obs.next()
          obs.complete()
        }, 250)
        subscription.unsubscribe()
      })
  })

  const getRoute = async ({ file }) => {
    const basePath = path
      .relative(srcDir, file)
      .replace(new RegExp(`${path.extname(file)}$`), '')
    const urlPath = basePath
      .split(path.sep)
      .map((t) => kebabCase(t))
      .join('/')
      .replace(/index$/, '')
    const chunkName = `${CHUNK_PREFIX}/${basePath}`

    const [routePath, name, meta, component] = await Promise.all([
      mapRoutePath(`/${urlPath}`),
      mapRouteName(basePath, file),
      mapMeta(basePath, file),
      mapImport(file),
    ])

    return {
      path: routePath,
      priority,
      component,
      meta,
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

    return {
      ...message,
      route: await getRoute(message),
    }
  }

  const fsEvents = observer
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
    .forEach(({ event, route }) => {
      if (event === 'unlink') {
        routes.unlink(route)
      } else {
        routes.add(route)
      }
    })

  return new Promise((resolve, reject) => {
    fsEvents.filter(({ event }) => event === 'ready').subscribe(() => {
      setTimeout(resolve, 0)
    }, reject)
  })
}

createCustomRoutesFromFolder.withOptions = (options) => {
  const factory = (moreOptions) => {
    return createCustomRoutesFromFolder({
      ...options,
      ...moreOptions,
    })
  }

  factory.withOptions = (evenMoreOptions) => {
    return createCustomRoutesFromFolder.withOptions({
      ...options,
      ...evenMoreOptions,
    })
  }

  return factory
}
