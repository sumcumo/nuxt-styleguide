<template>
  <div v-html="doc" />
</template>

<script>
export default {
  props: {
    doc: String
  }
}
</script>