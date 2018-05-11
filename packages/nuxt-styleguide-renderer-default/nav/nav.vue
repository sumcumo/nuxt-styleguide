<template>
  <div>
    <nav
      v-for="(subRoutes, name) in routes"
      v-if="name !== 'Pages'"
      :key="name"
      class="nav"
    >
      <h3 class="nav-title" v-if="name !== rootCategory">
        <a class="nav-title__content"
          v-if="subRoutes.find(({ name }) => name.toLowerCase() === 'index')"
          :href="subRoutes.find(({ name }) => name.toLowerCase() === 'index').path"
        >
          {{ name }}
        </a>
        <span class="nav-title__content" v-else>
          {{ name }}
        </span>
      </h3>
      <ul v-if="name !== 'Icons'">
        <li
          v-for="(route) in subRoutes"
          :key="route.name"
        >
          <a 
            class="nav-item"
            v-if="route.name.toLowerCase() !== 'index'"
            :href="route.path"
          >
            {{ route.name }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss">
@import './nav.scss';
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
}
</script>
