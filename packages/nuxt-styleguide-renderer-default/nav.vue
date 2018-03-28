<template>
<div>
  <nav class="nav" v-for="(subRoutes, name) in routes">
    <h3 v-if="name !== rootCategory">{{name}}</h3>
    <ul>
      <li v-for="(route) in subRoutes">
        <a v-bind:href="route.path">{{route.name}}</a>
      </li>
    </ul>
  </nav>
</div>
</template>

<style lang="scss">
.nav{
  padding: 1em;
  box-sizing: border-box;

  a {
    color: inherit;
  }
  ul{
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
}


</style>

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
      }, {}),
    };
  },
};</script>
