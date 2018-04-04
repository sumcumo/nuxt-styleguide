<template lang="html">
  <span :style="{fontSize: size}">This is the a {{ size }} font size</span>
</template>

<script>
export default {
  props: {
    size: { type: String, required: true },
  },
}
</script>

<style lang="css">

</style>
