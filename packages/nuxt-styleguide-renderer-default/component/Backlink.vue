<template lang="html">
  <a
    :href="href"
    class="backlink"
  >
    <span class="backlink-icon">&lt;</span>Back
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="css">
.backlink {
  text-decoration: none;
  padding: 0.2em 0;
  font-size: 20px;
  color: black;
  font-weight: 900;
  text-transform: uppercase;
}
.backlink-icon {
  margin-right: 0.3em;
}
</style>
