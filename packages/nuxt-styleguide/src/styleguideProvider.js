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
    const sgRoutes = routes.filter((route) => route.meta && route.meta.nsg)

    getRoutes.cache = sgRoutes
      .filter((route) => {
        if (route.name === 'icons:index') {
          return (
            sgRoutes.filter(({ meta: { category } }) => category === 'Icons')
              .length > 1
          )
        }

        return true
      })
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
      .sort((a, b) => {
        if (a.meta.order === b.meta.order) {
          if (a.meta.name > b.meta.name) {
            return 1
          } else if (a.meta.name < b.meta.name) {
            return -1
          }

          return 0
        }

        return a.meta.order - b.meta.order
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
