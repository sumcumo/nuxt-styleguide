<template lang="html">
<div class="color-grid">
  <div class="color-demo" v-for="(clr) in data">
    <div
      :style="{backgroundColor: clr.value}"
      class="color-field"
    />
    <label class="color-value">
      {{ clr.value }}
    </label>
      <code>
        {{ clr.name }}
      </code>
  </div>
</div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
    }
  },
}
</script>

<style lang="css">
.color-grid{
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(200px, auto));
  grid-gap: 1em;
}
.color-value{
  font-weight: 900;
  display: block;
  text-transform: uppercase;
}
.color-demo {
  grid-column-gap: 1em;
  justify-content: start;
  align-items: center;
}
.color-field {
  width: 100%;
  height: 100px;
}
</style>
