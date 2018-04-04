<template>
<Frame>
  <h1>All components</h1>
    <ul>
      <li v-for="(route) in $styleguide.routes" v-if="route.category === 'Components'">
        <a v-bind:href="route.path">{{route.name}}</a>
      </li>
    </ul>
</Frame>
</template>

<script>
import Frame from '../frame';
export default {
  components: { Frame },
};
</script>

<style lang="scss">
</style>
