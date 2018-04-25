// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue'

function decode(str) {
  if (global.atob) {
    return global.atob(str)
  }

  return Buffer.from(str, 'base64').toString('utf8')
}

function isNsgRoute(routeName) {
  return routeName.indexOf('NSG:') === 0
}

function getRouteInfo(routeName) {
  if (!isNsgRoute(routeName)) {
    return {}
  }

  return JSON.parse(decode(routeName.match(/NSG:(.*):/)[1]))
}

Vue.use({
  install() {
    Vue.prototype.$styleguide = Object.assign(JSON.parse('<%= options.data %>'))
  },
})

function getRoutes(routes) {
  if (!routes.length) {
    return []
  }

  if (!getRoutes.cache) {
    getRoutes.cache = routes
      .filter((route) => isNsgRoute(route.name))
      .map((route) => {
        const { name, category } = getRouteInfo(route.name)

        return {
          ...route,
          name,
          path: `${Vue.prototype.$styleguide.basePath}${route.path.replace(
            /^\//,
            ''
          )}`,
          category,
        }
      })
  }

  return getRoutes.cache
}
getRoutes.cache = null

Vue.mixin({
  created() {
    this.$styleguide.routes = getRoutes(
      this.$router ? this.$router.options.routes : []
    )
  },
})
