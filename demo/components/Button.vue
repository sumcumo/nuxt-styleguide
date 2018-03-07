<template>
  <button :class="$style.button" @click="(e) => this.$emit('click', e)">
    <!-- @slot Content of the button -->
    <slot />
  </button>
</template>

<styleguide-states>
[{
  "content": "Hello World"
}]
</styleguide-states>

<styleguide-doc>
### Hello From Styleguide Doc
</styleguide-doc>


<script>
export default {
  name: 'Button',
};
</script>

<style lang="scss" module>
.button {
  font-family: 'Cabin Sketch', cursive;
  border: 5px solid transparent;
  padding: 0.2em 0.4em;
  font-size: 2rem;
  font-weight: default;
}
.button:hover {
  background-color: fuchsia;
}
</style>
