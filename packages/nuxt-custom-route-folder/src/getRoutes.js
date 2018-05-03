import { CHUNK_PREFIX } from './common'

export default function getRoutes(extendRoutes) {
  if (!getRoutes.cache) {
    const customRoutes = []

    const update = () => {
      extendRoutes((routes) => {
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
    }

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
