<template>
  <img
    :src="src"
    :alt="alt"
    :class="`img${left === 'true' ? ' img-left' : ''}`"
  >
</template>

<script>
export default {
  name: 'ScImg',
  props: {
    left: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
.img {
  max-width: 100%;
  max-height: 35vh;
  border-radius: 5px;
}
.img-left {
  float: left;
}
</style>
