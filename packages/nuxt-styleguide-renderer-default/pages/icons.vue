<template>
<Frame>
  <Backlink href="../"></Backlink>
  <h1>All Icons</h1>
  <div class="iconGrid">
  <div v-for="(icon) in icons">
    <a :href="icon.path">
      <component :is="icon.component" v-bind="{ single: true }" />
    </a>
  </div>
</div>
</Frame>
</template>


<script>
import Frame from '../frame';
import Backlink from '../component/Backlink';
export default {
  components: { Frame, Backlink },
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


<style>
.iconGrid{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1em;
}</style>
