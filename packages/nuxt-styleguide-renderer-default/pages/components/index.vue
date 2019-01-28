<template>
  <sg-frame>
    <h1>All components</h1>
    <ul>
      <li v-for="route in componentRoutes" :key="route.path">
        <a :href="route.path">
          {{ route.name }}
        </a>
      </li>
    </ul>
  </sg-frame>
</template>

<script>
import SgFrame from '../../frame.vue'

export default {
  layout(context) {
    return context.env.nsgLayout
  },
  components: { SgFrame },
  computed: {
    componentRoutes() {
      const allRoutes = this.$styleguide.routes
      return Object.keys(allRoutes)
        .filter((route) => {
          return allRoutes[route].category === 'Components'
        })
        .reduce((newRoutes, route) => {
          return {
            ...newRoutes,
            [route]: allRoutes[route],
          }
        }, {})
    },
  },
}
</script>
