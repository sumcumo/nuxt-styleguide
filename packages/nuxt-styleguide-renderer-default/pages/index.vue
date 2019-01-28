<template>
  <sg-frame>
    <main>
      <h1>{{ $styleguide.name }}</h1>
    </main>
  </sg-frame>
</template>

<script>
import SgFrame from '../frame.vue'

export default {
  layout(context) {
    return context.env.nsgLayout || 'NsgDefault'
  },
  components: {
    SgFrame,
  },
}
</script>
