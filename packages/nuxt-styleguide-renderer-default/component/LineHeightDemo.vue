<template lang="html">
  <div>
    <div v-for="size in data" :key="size.name" class="nsg-line-height-demo">
      <span class="nsg-line-height-name">
        {{ size.name }}
      </span>
      <div class="nsg-line-height-demo-box">
        <div
          :style="{ height: size.value }"
          class="nsg-line-height-demo-paragraph"
        >
          The lazy dog jumps ofer the quick brown fox
        </div>
      </div>
      {{ size.value }}
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

.nsg-line-height-name{
  font-size: 20px;
  display: block;
}
.nsg-line-height-demo {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
}

.nsg-line-height-demo-box {
  background: AliceBlue;
  padding: 1em 0;
}
.nsg-line-height-demo-paragraph{
  box-sizing: border-box;
  padding: 0 1em;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
}
</style>
