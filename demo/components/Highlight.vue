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
  margin: 2rem 0;
  padding: 1rem 2rem;
  background-color: var(--primary-color-200);
  border-left: 8px solid var(--primary-color-500);
  color: var(--primary-color-800);
  border-radius: 4px;
}
</style>
