<template>
  <p class="paragraph">
    <slot />
  </p>
</template>

<script>
export default {
  name: 'P',
}
</script>

<style>
.paragraph {
  margin: 0 0 1rem;
}
</style>
