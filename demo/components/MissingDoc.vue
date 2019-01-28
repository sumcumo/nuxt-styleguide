<template>
  <span :title="hint" :class="$style.elm">
    <slot />
  </span>
</template>

<script>
export default {
  computed: {
    hint() {
      return [
        'Sorry. This documentation is not written yet.',
        'If you know something about this topic, please contribute to the documentation.',
      ].join(' ')
    },
  },
}
</script>

<style lang="scss" module>
.elm {
  color: red;
  cursor: help;
}
</style>
