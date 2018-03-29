<template lang="html">
  <div>
    <span>{{this.family}}</span>
    <h1 :style='{fontFamily: this.family}'>The lazy dog jumps ofer the quick brown fox</h1>
  </div>
</template>

<script>
export default {
  props: {
    family: String,
  }
}
</script>

<style lang="css">
</style>
