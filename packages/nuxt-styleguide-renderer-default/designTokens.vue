<template>
  <sg-frame>
    <sg-backlink href="../" />
    <h1>{{ name }}</h1>
    <div v-html="description" />
    <sg-tags :tags="tags" />
    <code><pre>@import "{{ importPath }}";</pre></code>
    <div
      v-for="(decl) in declarations"
      :key="decl.name"
      class="variable"
    >
      <h2><pre>{{ decl.name }}</pre></h2>
      <sg-tags :tags="decl.tags" />

      <sg-color-demo
        v-if="decl.render === 'color'"
        :color="decl.value"
      />
      <sg-font-size-demo
        v-else-if="decl.render === 'fontSize'"
        :size="decl.value"
      />
      <sg-line-height-demo
        v-else-if="decl.render === 'lineHeight'"
        :size="decl.value"
      />
      <sg-font-family-demo
        v-else-if="decl.render === 'fontFamily'"
        :family="decl.value"
      />
      <div v-else>
        <h3>Value</h3>
        <code><pre>{{ decl.value }}</pre></code>
      </div>
    </div>
  </sg-frame>
</template>

<script>
import SgTags from './component/Tags.vue'
import SgBacklink from './component/Backlink.vue'
import SgColorDemo from './component/ColorDemo.vue'
import SgFontFamilyDemo from './component/FontFamilyDemo.vue'
import SgFontSizeDemo from './component/FontSizeDemo.vue'
import SgLineHeightDemo from './component/LineHeightDemo.vue'
import SgFrame from './frame.vue'

export default {
  components: {
    SgTags,
    SgFrame,
    SgBacklink,
    SgColorDemo,
    SgFontSizeDemo,
    SgFontFamilyDemo,
    SgLineHeightDemo,
  },
  props: {
    name: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    importPath: {
      type: String,
      default: null,
    },
    tags: {
      type: Object,
      default: null,
    },
    declarations: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style>
.variable {
  margin-bottom: 6em;
}
</style>
