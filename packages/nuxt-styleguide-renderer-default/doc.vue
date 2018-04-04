<template>
  <sg-frame>
    <slot />
  </sg-frame>
</template>

<script>
import SgFrame from './frame.vue'

export default {
  components: {
    SgFrame,
  },
}
</script>
