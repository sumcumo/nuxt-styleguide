<template lang="html">
  <div>
    <span>{{ family }}</span>
    <h1 :style="{fontFamily: family}">The lazy dog jumps ofer the quick brown fox</h1>
  </div>
</template>

<script>
export default {
  props: {
    family: { type: String, required: true },
  },
}
</script>

<style lang="css">

</style>
