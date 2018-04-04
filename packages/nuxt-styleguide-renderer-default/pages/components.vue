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
import Sgframe from '../frame.vue'

export default {
  components: { Sgframe },
}
</script>
