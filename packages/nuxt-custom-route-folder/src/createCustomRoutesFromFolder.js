import path from 'path'
import kebabCase from 'lodash.kebabcase'
import { Observable, interval } from 'rxjs'
import minimatch from 'minimatch'
import {
  concatMap,
  filter as rxFilter,
  take,
  delay,
  flatMap,
  bufferWhen,
} from 'rxjs/operators'
import observe from './observe'
import getRoutes from './getRoutes'
import CHUNK_PREFIX from './chunkPrefix'

export default function createCustomRoutesFromFolder({
  nuxt,
  glob,
  priority = 0,
  mapImport = (p) => p,
  mapRouteName = (basePath) => basePath.replace(/\//g, ':'),
  mapRoutePath = (p) => p,
  mapMeta = () => ({}),
  filter = () => true,
  srcDir = nuxt.options.srcDir,
  watch = nuxt.options.dev,
}) {
  const routes = getRoutes(nuxt)

  const watch$ = observe(srcDir, watch).pipe(
    rxFilter(({ event, file }) => {
      return event === 'ready' || minimatch(file, glob)
    })
  )

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

  const readyFilter = rxFilter(({ event }) => event === 'ready')
  const ready$ = watch$.pipe(
    readyFilter,
    delay(1)
  )
  let rdy = false
  const ready$$ = Observable.create((obs) => {
    const sub = ready$.subscribe({
      next() {
        rdy = true
        obs.complete()
        sub.unsubscribe()
      },
      error() {
        /* noop */
      },
    })
  })
  const throttle = interval(100)

  const fs$ = watch$.pipe(
    bufferWhen(() => (!rdy ? ready$$ : throttle)),
    take(Infinity),
    concatMap((messages) => Promise.all(messages.map(processFileMsg))),
    flatMap((x) => x),
    rxFilter((x) => x)
  )

  fs$.pipe(rxFilter(({ event }) => event !== 'ready')).subscribe({
    next({ event, route }) {
      if (event === 'unlink') {
        routes.unlink(route)
      } else {
        routes.add(route)
      }
    },
    error() {
      /* noop */
    },
  })

  const promise = new Promise((resolve, reject) => {
    const sub = fs$
      .pipe(
        readyFilter,
        delay(2)
      )
      .subscribe({
        complete() {
          resolve()
          sub.unsubscribe()
        },
        error: reject,
      })
  })

  promise.ready$ = ready$

  return promise
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
