<template>
  <sg-frame>
    <h1>All Icons</h1>
    <div class="nsg-iconGrid">
      <div v-for="icon in icons" :key="icon.path">
        <a :href="icon.path">
          <component :is="icon.component" v-bind="{ single: true }" />
        </a>
      </div>
    </div>
  </sg-frame>
</template>

<script>
import SgFrame from '../../frame.vue'

export default {
  layout(context) {
    return context.env.nsgLayout
  },
  components: { SgFrame },
  data() {
    return {
      icons: [],
    }
  },
  mounted() {
    Promise.all(
      this.$styleguide.routes
        .filter(
          ({ category, name }) => category === 'Icons' && name !== 'Index'
        )
        .map((route) => {
          return route.component().then((c) => {
            return {
              ...route,
              component: c,
            }
          })
        })
    ).then((components) => {
      this.icons = components
    })
  },
}
</script>

<style>
.nsg-iconGrid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1em;
}
</style>
