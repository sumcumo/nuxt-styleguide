<template>
  <sg-frame>
    <h1>{{ name }}</h1>
    <div v-html="description" />
    <sg-tags :tags="tags" />
    <code><pre>@import "{{ importPath }}";</pre></code>

    <sg-color-demo
      v-if="colors.length"
      :data="colors"
    />
    <sg-font-family-demo
      v-if="fontFamilies.length"
      :data="fontFamilies"
    />
    <sg-font-size-demo
      v-if="fontSizes.length"
      :data="fontSizes"
    />
    <sg-line-height-demo
      v-if="lineHeights.length"
      :data="lineHeights"
    />
    <sg-default-dt-demo
      v-if="other.length"
      :data="other"
    />
  </sg-frame>
</template>

<script>
import SgTags from './component/Tags.vue'
import SgColorDemo from './component/ColorDemo.vue'
import SgDefaultDtDemo from './component/SgDefaultDtDemo.vue'
import SgFontFamilyDemo from './component/FontFamilyDemo.vue'
import SgFontSizeDemo from './component/FontSizeDemo.vue'
import SgLineHeightDemo from './component/LineHeightDemo.vue'
import SgFrame from './frame.vue'

export default {
  components: {
    SgTags,
    SgFrame,
    SgColorDemo,
    SgFontSizeDemo,
    SgFontFamilyDemo,
    SgLineHeightDemo,
    SgDefaultDtDemo,
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
  computed: {
    colors() {
      if (!this.declarations) {
        return []
      }
      return this.declarations.filter(({ render }) => {
        return render === 'color'
      })
    },
    fontSizes() {
      if (!this.declarations) {
        return []
      }
      return this.declarations.filter(({ render }) => {
        return render === 'fontSize'
      })
    },
    fontFamilies() {
      if (!this.declarations) {
        return []
      }
      return this.declarations.filter(({ render }) => {
        return render === 'fontFamily'
      })
    },
    lineHeights() {
      if (!this.declarations) {
        return []
      }
      return this.declarations.filter(({ render }) => {
        return render === 'lineHeight'
      })
    },
    other() {
      if (!this.declarations) {
        return []
      }

      return this.declarations.filter(
        ({ render }) =>
          ['color', 'fontSize', 'fontFamily', 'lineHeight'].indexOf(render) ===
          -1
      )
    },
  },
}
</script>

<style>
.variable {
  margin-bottom: 6em;
}
</style>
