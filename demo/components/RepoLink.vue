<template>
  <a :href="`${$styleguide.repositoryHomepage}/${file}`"><slot /></a>
</template>

<script>
export default {
  props: {
    file: String
  }
}
</script>