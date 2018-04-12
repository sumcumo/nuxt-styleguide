<template lang="html">
  <div >
    <div v-for="(size) in data" class="font-size-demo">
      <span class="font-size-value">
        {{size.value}}
      </span>
      {{size.name}}
      <div :style="{fontSize: size.value}">The lazy dog jumps ofer the quick brown fox</div>
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
  .font-size-value{
    font-size: 30px;
    font-weight: 900;  
  }
  .font-size-demo{
    font-size: 20px;
    margin-bottom: 1em;
  }
</style>
