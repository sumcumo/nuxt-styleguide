<template lang="html">
  <div class="nsg-color-grid">
    <div
      v-for="(clr) in data"
      :key="clr.name"
      class="nsg-color-demo"
    >
      <div
        :style="{backgroundColor: clr.value}"
        class="nsg-color-field"
      />
      <label class="nsg-color-value">
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
      default() {
        return []
      },
    },
  },
}
</script>

<style lang="css">
.nsg-color-grid{
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(200px, auto));
  grid-gap: 1em;
}
.nsg-color-value{
  font-weight: 900;
  display: block;
  text-transform: uppercase;
}
.nsg-color-demo {
  grid-column-gap: 1em;
  justify-content: start;
  align-items: center;
}
.nsg-color-field {
  width: 100%;
  height: 100px;
}
</style>
