<template lang="html">
  <div>
    <h3>Other:</h3>
    <div
      v-for="(token) in data"
      :key="token.name"
    >
      <code class="nsg-default-dt-label">
        {{ token.name }}:
      </code>
      <code>
        {{ token.value }}
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
.nsg-default-dt-label {
  font-weight: bold
}
</style>
