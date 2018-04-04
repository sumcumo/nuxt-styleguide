<template>
  <component :is="elm">
    <span v-if="anchor">
      <a
        :id="anchor"
        :href="`#${anchor}`"
      >#</a>&nbsp;
    </span>
    <!-- @slot headline content -->
    <slot />
  </component>
</template>

<styleguide-states>
[{
  "title": "Default",
  "content": "Hello World!"
}, {
  "title": "With anchor",
  "content": "Hello See!",
  "props": {
    "anchor": "hello-see"
  }
}]
</styleguide-states>

<script>
/**
 * ### Meta Warning!
 *
 * This component is used in the documentation you are just reading.
 * It is not part of the re-usable packages and mainly exits for demonstration purposes.
 */
export default {
  name: 'Headline',
  props: {
    /**
     * Level of the headline (1-6)
     * Default: `2`
     */
    level: {
      type: [Number, String],
      default: 2,
    },
    /**
     * Anchor of the headline
     */
    anchor: { type: String, default: null },
  },
  computed: {
    elm() {
      return `h${this.level}`
    },
  },
}
</script>
