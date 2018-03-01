<template lang="html">
  <div class="sum-card">
    <div class="sum-card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.sum-card {
  color: inherit;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 30px;
  max-width: 400px;
  font-family: var(--sum-font-black);
  position: relative;
  background: var(--card-color);
}
@media (max-width: 800px) {
  .sum-card {
    font-size: 16px;
  }
}
.sum-card:after {
  content: " ";
  padding-bottom: 100%;
  display: block;
}

.sum-card-content {
  position: absolute;
  top: 0;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
