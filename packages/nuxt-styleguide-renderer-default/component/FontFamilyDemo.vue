<template lang="html">
  <div class="nsg-font-family-demo">
    <div v-for="family in data" :key="family.name">
      <span>{{ family.value }}</span>
      <h1 :style="{ fontFamily: family.value }" class="nsg-font-family-demo-h1">
        The lazy dog jumps ofer the quick brown fox
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Array, required: true },
  },
}
</script>

<style lang="css">
.nsg-font-family-demo{
  margin-bottom: 1em ;
}
.nsg-font-family-demo-h1{
  text-transform: initial;
  font-weight: initial;
  padding: 0;
  margin: 0;
}
</style>
