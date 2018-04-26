<template>
  <sg-frame>
    <h1>All components</h1>
    <ul>
      <li
        v-for="(route) in $styleguide.routes"
        v-if="route.category === 'Components'"
        :key="route.path"
      >
        <a :href="route.path">{{ route.name }}</a>
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
}
</script>
