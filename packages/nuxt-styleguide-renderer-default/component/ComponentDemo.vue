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
    wrapper: {
      type: Object,
      default: null,
    },
  },
  render(createElement) {
    const elm = createElement(this.comp, this.data, this.$slots.default)
    return this.wrapper ? createElement(this.wrapper, [elm]) : elm
  },
}
</script>
