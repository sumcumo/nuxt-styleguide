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
      .filter((route) => route.name.split(':')[0] === 'styleguide')
      .map((route) => {
        const tokens = route.name.split(':')
        const hasCat = tokens.length > 2
        const category = hasCat ? tokens[1] : null
        const name = tokens.slice(hasCat ? 2 : 1).join(':')

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
