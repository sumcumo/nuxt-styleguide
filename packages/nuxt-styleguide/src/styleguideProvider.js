// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue'

Vue.use({
  install() {
    Vue.prototype.$styleguide = Object.assign(JSON.parse('<%= options.data %>'))
  },
})

function getRoutes(routes) {
  if (!getRoutes.cache) {
    getRoutes.cache = routes
      .filter((route) => route.name.indexOf('NSG:') === 0)
      .map((route) => {
        const { name, category } = JSON.parse(route.name.replace(/^NSG:/, ''))

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
