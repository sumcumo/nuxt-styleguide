<template lang="html">
  <a class="backlink" :href="this.href"><span class="backlink-icon">&lt;</span>Back</a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
    },
  },
};</script>

<style lang="css">
  .backlink{
    text-decoration: none;
    padding: .2em 0;
    font-size: 20px;
    color: black;
    font-weight: 900;
    text-transform: uppercase;
  }
  .backlink-icon{
    margin-right: .3em;
  }
</style>
