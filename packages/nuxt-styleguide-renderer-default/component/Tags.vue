<template>
<div>
  <h4 v-if="hasTags">Tags</h4>
  <ul v-if="hasTags">
    <li v-for="(tagEntries, name) in tags">
      @{{name}} <span v-if="tagEntries.length === 1" v-html="tagEntries[0].description" />
      <ul v-if="tagEntries.length > 1">
        <li v-for="(tag) in tagEntries">
          <span v-html="tag.description" />
        </li>
      </ul>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    tags: Object
  },
  computed: {
    hasTags() {
      return Object.keys(this.tags || {}).length > 0;
    }
  }
}
</script>