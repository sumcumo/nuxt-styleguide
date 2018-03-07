<template>
  <div>
      <h2>Components</h2>
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
export default {};
</script>

<style lang="scss">
</style>
