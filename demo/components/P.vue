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
  max-width: 640px;
}
</style>
