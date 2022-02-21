<script>
export default {
  props: {
    level: {
      type: String,
      default: '1',
    },
    headerFontSize: {
      type: String,
      default: null,
    },
    element: {
      type: String,
      default: null,
    },
  },
  computed: {
    headerClasses() {
      const fontSizeLevel = this.headerFontSize
        ? this.headerFontSize
        : this.level
      return (
        'text-xs-h' +
        fontSizeLevel +
        ' leading-xs-h' +
        fontSizeLevel +
        ' sm:text-h' +
        fontSizeLevel +
        ' sm:leading-h' +
        fontSizeLevel
      )
    },
  },
  render(createElement) {
    const elDataObject = {
      class: this.headerClasses,
      props: {},
    }
    if (!this.element) {
      return createElement('h' + this.level, elDataObject, this.$slots.default)
    } else {
      return createElement(this.element, elDataObject, this.$slots.default)
    }
  },
}
</script>
