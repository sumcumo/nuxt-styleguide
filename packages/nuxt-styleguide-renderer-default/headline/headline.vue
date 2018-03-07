<template lang="html">
  <component v-bind:is="Elm">
    <slot></slot>
  </component>
</template>

<script>
export default {
  computed: {
    Elm() {
      return `h${this.level}`;
    },
  },
  props: {
    level: {
      type: String | Number,
      default: 1,
    },
  },
};
</script>

<style lang="scss">
h1,h2,h3,h4,h5,h6{
  text-transform: uppercase;
  margin: 0;
  padding: 0;
  font-family: var(--sum-font-black);
}
</style>
