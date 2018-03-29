<template lang="html">
  <span :style='{fontSize: this.size}'>This is the a {{this.size}} font size</span>
</template>

<script>
export default {
  props: {
    size: String,
  }
}
</script>

<style lang="css">
</style>
