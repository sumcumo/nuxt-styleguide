// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue'

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
      .filter((route) => route.meta && route.meta.nsg)
      .map((route) => {
        const { name, category } = route.meta

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
