<script>
export default {
  name: 'LibUtilWrapperEl',
  props: {
    el: {
      type: String,
      default: 'div',
    },
  },
  render(createElement) {
    return createElement(
      this.$props.el, // tag name
      this.$slots.default // array of children
    )
  },
}
</script>

