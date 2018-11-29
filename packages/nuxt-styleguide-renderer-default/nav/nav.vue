<template>
  <nav>
    <ul class="nav">
      <li
        v-for="(subRoutes, name) in routes"
        v-if="name !== 'Pages'"
        :key="name"
        class="list-section"
      >
        <h3
          v-if="name !== rootCategory"
          class="title"
        >
          <a
            v-if="findIndex(subRoutes)"
            :href="findIndex(subRoutes).path"
            :class="`title-content ${findIndex(subRoutes).path === $route.path ? 'active' : ''}`"
          >
            {{ name }}
          </a>
          <span
            v-else
            class="title-content"
          >
            {{ name }}
          </span>
        </h3>
        <ul
          v-if="name !== 'Icons'"
          class="nav-list"
        >
          <li
            v-for="(route) in subRoutes"
            :key="route.name"
          >
            <a
              v-if="route.name.toLowerCase() !== 'index'"
              :href="route.path"
              :class="`nav-item ${route.path === $route.path ? 'active' : ''}`"
            >
              {{ route.name }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav {
  margin: 0 0.5rem;
  padding: 5rem 0 1rem;
  box-sizing: border-box;
}

.nav-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.list-section {
  margin-bottom: 2rem;
}

.title {
  padding: 0;
  margin: 0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.title a {
  color: var(--primary-color-500);
  text-decoration: none;
  cursor: pointer;
}

.title-content {
  cursor: default;
  display: inline-block;
  padding: 0.5rem 1rem;
}

.nav-item {
  position: relative;
  display: block;
  margin: 0.25rem 0;
  padding: 0.25em 1rem;
  font-size: 0.9rem;
  box-sizing: border-box;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

.nav-item::before {
  content: '';
  height: 100%;
  width: 4px;
  background-color: var(--secondary-color-500);
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 200ms ease-in-out;
}

.active {
  color: var(--secondary-color-800);
}

.active::before {
  opacity: 0.6;
}

.nav-item:hover,
.nav-item:focus,
.nav-item:active {
  color: var(--secondary-color-800);
}

.nav-item:hover::before,
.nav-item:focus::before,
.nav-item:active::before {
  opacity: 1;
}
</style>

<script>
export default {
  data() {
    const rootCategory = '$$root'
    return {
      rootCategory,
      routes: this.$styleguide.routes.reduce((memo, route) => {
        const category = route.category || rootCategory
        if (!memo[category]) {
          // eslint-disable-next-line no-param-reassign
          memo[category] = []
        }

        memo[category].push(route)

        return memo
      }, {}),
    }
  },
  methods: {
    findIndex(routes) {
      return routes.find(({ name }) => name.toLowerCase() === 'index')
    },
  },
}
</script>
