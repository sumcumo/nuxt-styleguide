<template lang="html">
  <div class="sum-grid">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.sum-grid {
  margin: 0 auto;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
}

@media (max-width: 800px) {
  .sum-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
