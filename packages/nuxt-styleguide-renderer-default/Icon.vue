<template>
  <div v-if="single" class="nsg-single-icon">
    <img :src="iconUrl" />
    {{ name }}
  </div>
  <sg-frame v-else>
    <h1>{{ name }}</h1>
    <img :src="iconUrl" />
  </sg-frame>
</template>

<script>
import SgFrame from './frame.vue'

export default {
  components: { SgFrame },
  props: {
    single: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: null,
    },
    iconUrl: {
      type: String,
      default: null,
    },
    importPath: {
      type: String,
      default: null,
    },
  },
}
</script>

<style>
.nsg-single-icon {
  display: flex;
  align-items: center;
}
.nsg-single-icon img {
  margin-right: 0.3em;
}
</style>
