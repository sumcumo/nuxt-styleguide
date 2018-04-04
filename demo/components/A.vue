<template>
  <a :href="target">
    <!-- @slot clickable content of the link -->
    <slot />
  </a>
</template>

<styleguide-doc>
### Meta Warning!

This component is used in the documentation you are just reading.
It is not part of the re-usable packages and mainly exits for demonstration purposes.
</styleguide-doc>

<styleguide-states>
[{ "content": "Click me!", "props": { "href": "#" } }]
</styleguide-states>

<script>
export default {
  name: 'A',
  props: {
    /**
     * target url of the link
     * use `~` prefix for absolute project-internal links
     */
    href: { type: String, required: true },
  },
  computed: {
    target() {
      if (!this.href) {
        return null
      }

      return this.href.replace(/^~/, this.$styleguide.path.replace(/\/$/, ''))
    },
  },
}
</script>
