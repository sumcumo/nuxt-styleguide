<template>
  <a :href="target">
    <!-- @slot clickable content of the link -->
    <slot />
  </a>
</template>

<script>
export default {
  name: 'A',
  props: {
    /**
     * target url of the link<br>
     * use `~` prefix for absolute project-internal links
     */
    href: { type: String, required: true },
  },
  computed: {
    target() {
      if (!this.href) {
        return null
      }

      return this.href
        .replace(/^~/, this.$styleguide.path.replace(/\/$/, ''))
        .replace(/^#/, `${this.$router.history.base}${this.$route.path}#`)
    },
  },
}
</script>

<styleguide-doc>
### Meta Warning!

This component is used in the documentation you are just reading.
It is not part of the re-usable packages and mainly exits for demonstration purposes.
</styleguide-doc>

<styleguide-states>
[{
  data: {
    props: {
      href: "#"
    },
  },
  content: 'Click me!'
}]
</styleguide-states>
