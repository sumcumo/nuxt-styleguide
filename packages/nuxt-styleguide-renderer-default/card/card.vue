<template lang="html">
  <a class="sum-card" v-bind:href="href">
    <div class="sum-card-content">
      <slot></slot>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
.sum-card {
  color: white;
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
