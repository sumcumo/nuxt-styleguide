import CHUNK_PREFIX from './chunkPrefix'

export default function getRoutes(nuxt) {
  if (!getRoutes.cache) {
    const customRoutes = []

    let builder = null
    let initialUpdate = false
    const update = () => {
      if (builder) {
        builder.generateRoutesAndFiles()
      } else if (nuxt.options.dev) {
        initialUpdate = true
      }
    }

    nuxt.hook('build:done', (b) => {
      builder = b
      if (initialUpdate) {
        // eslint-disable-next-line no-console
        console.log('routes got updated in initial build - rebuilding.')
        b.generateRoutesAndFiles()
      }
    })

    nuxt.hook('build:extendRoutes', (routes) => {
      if (nuxt.options.dev && !builder) {
        return
      }

      customRoutes.forEach((route) => {
        if (!routes.includes(route)) {
          const conflictingRoute = routes.find(
            ({ path: p }) => p === route.path
          )

          if (!conflictingRoute) {
            routes.push(route)
          } else if ((conflictingRoute.priority || -1) <= route.priority) {
            routes.splice(routes.indexOf(conflictingRoute), 1)
            routes.push(route)
          }
        }
      })

      routes.forEach((route) => {
        if (
          route.chunkName.indexOf(CHUNK_PREFIX) === 0 &&
          !customRoutes.includes(route)
        ) {
          routes.splice(routes.indexOf(route), 1)
        }
      })
    })

    getRoutes.cache = {
      add(route) {
        customRoutes.push(route)
        update()
      },
      unlink(route) {
        customRoutes.splice(
          customRoutes.indexOf(
            customRoutes.find(({ component }) => component === route.component)
          ),
          1
        )
        update()
      },
      update,
    }
  }

  return getRoutes.cache
}
