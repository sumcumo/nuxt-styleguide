<template lang="html">
  <div class="color-demo">
    <div class="color-field" :style='{backgroundColor: this.color}'></div>
    {{color}}
  </div>
</template>

<script>
export default {
  props: {
    color: String,
  },
};</script>

<style lang="css">
.color-demo{
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 1em;
  justify-content: start;
  align-items: center;
}
.color-field {
  width: 100px;
  height: 100px;
}
</style>
