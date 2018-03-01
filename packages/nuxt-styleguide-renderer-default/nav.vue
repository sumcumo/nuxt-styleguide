<template>
<div>
  <nav v-for="(subRoutes, name) in routes">
    <h3 v-if="name !== rootCategory">{{name}}</h3>
    <ul>
      <li v-for="(route) in subRoutes">
        <a v-bind:href="route.path">{{route.name}}</a>
      </li>
    </ul>
  </nav>
</div>
</template>

<script>
export default {
  data() {
    const rootCategory = '$$root';
    return {
      rootCategory,
      routes: this.$styleguide.routes.reduce((memo, route) => {
        const category = route.category || rootCategory;
        if (!memo[category]) {
          memo[category] = [];
        }

        memo[category].push(route);

        return memo;
      }, {})
    };
  }
}
</script>