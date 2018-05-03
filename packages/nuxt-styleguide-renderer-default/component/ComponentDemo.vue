<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    comp: {
      type: Object,
      required: true,
    },
  },
  render(createElement) {
    return createElement(this.comp, this.data, this.$slots.default)
  },
}
</script>
