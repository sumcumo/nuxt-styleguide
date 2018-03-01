<template>
<div>
  <nav>
    <ul>
      <li v-for="(route) in $styleguide.routes" v-if="route.category === 'Components'">
        <a v-bind:href="route.path">{{route.name}}</a>
      </li>
    </ul>
  </nav>
</div>
</template>

<script>

export default {
  components: {  },
};
</script>

<style lang="scss">
</style>
