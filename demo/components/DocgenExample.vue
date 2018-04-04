<template>
  <div>
    <!-- @slot Use this slot header -->
    <slot name="header" />

    <table class="grid">
      <!-- -->
    </table>

    <!-- @slot Use this slot footer -->
    <slot name="footer" />
  </div>
</template>

<script>
/**
 * ### Meta Warning!
 *
 * This component overuses documentation and its main purpose
 * is to demonstrate what is technically possible.
 *
 * @version 1.0.5
 * @author [Rafael](https://github.com/rafaesc92)
 * @since Version 1.0.1
 */
export default {
  name: 'DocgenExample',
  filters: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
  },
  props: {
    /**
     * object/array defaults should be returned from a factory function
     * @version 1.0.5
     * @since Version 1.0.1
     * @see See [Wikipedia](https://en.wikipedia.org/wiki/Web_colors#HTML_color_names) for a list of color names
     * @link See [Wikipedia](https://en.wikipedia.org/wiki/Web_colors#HTML_color_names) for a list of color names
     */
    msg: {
      type: [String, Number],
      default: 'lol',
    },
    /**
     * Model example
     * @model
     */
    value: {
      type: String,
      default: null,
    },
    /**
     * describe data
     * @version 1.0.5
     */
    data: {
      type: [Array],
      default() {
        return []
      },
    },
    /**
     * get columns list
     */
    columns: {
      type: [Array],
      default() {
        return []
      },
    },
    /**
     * filter key
     * @ignore
     */
    filterKey: {
      type: String,
      default: 'example',
    },
  },
  data() {
    const sortOrders = {}
    this.columns.forEach((key) => {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders,
    }
  },
  computed: {
    filteredData() {
      let { data } = this
      const { sortKey } = this
      const filterKey = this.filterKey && this.filterKey.toLowerCase()
      const order = this.sortOrders[sortKey] || 1
      if (filterKey) {
        data = data.filter((row) => {
          return Object.keys(row).some((key) => {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(filterKey) > -1
            )
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort((a, b) => {
          // eslint-disable-next-line no-param-reassign
          a = a[sortKey]
          // eslint-disable-next-line no-param-reassign
          b = b[sortKey]
          // eslint-disable-next-line no-nested-ternary
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    },
  },
  methods: {
    /**
     * Sets the order
     *
     * @public
     * @version 1.0.5
     * @since Version 1.0.1
     * @param {string} key Key to order
     * @returns {string} Test
     */
    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1

      /**
       * Success event.
       *
       * @event success
       * @type {object}
       */
      this.$emit('success', {
        demo: 'example',
      })
    },

    hiddenMethod() {},
  },
}
</script>
