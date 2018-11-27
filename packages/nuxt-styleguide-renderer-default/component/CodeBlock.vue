<template>
  <Prism :language="language">
    <slot />
  </Prism>
</template>

<style>
@import 'prismjs/themes/prism.css';
</style>

<script>
import 'prismjs'
import Prism from 'vue-prism-component'

export default {
  name: 'CodeBlock',
  components: {
    Prism,
  },
  props: {
    language: {
      type: String,
      default: 'html',
    },
  },
}
</script>
