<template>
<div>
  <h1>All Icons</h1>
  <div v-for="(icon) in icons">
    <a :href="icon.path">
      <component :is="icon.component" v-bind="{ single: true }" />
    </a>
  </div>
</div>
</template>


<script>
export default {
  data() {
    return {
      icons: []
    }
  },
  mounted() {
    Promise.all(this.$styleguide.routes
      .filter(({ category }) => category === 'Icons')
      .map((route) => {
        return route.component().then(c => {
          return {
            ...route,
            component: c
          }
        })
      })
    ).then(components => {
      this.icons = components
    })
  }
};</script>
