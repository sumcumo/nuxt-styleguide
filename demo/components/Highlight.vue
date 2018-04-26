<template>
  <div class="highlight">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ScHighlight',
}
</script>

<style>
.highlight {
  margin: 2rem;
  padding: 1rem;
  background: #90bb4f;
  color: #34662a;
}
</style>
