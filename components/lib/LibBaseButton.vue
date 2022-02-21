<template>
  <button ref="button" class="btn" :class="btnClass" v-on="$listeners">
    <span>
      <span
        class="btn-text"
        :class="'text-' + labelAlign"
      ><slot
        name="text"
      /></span>
      <span v-if="hasIcon" class="btn-icon" :class="iconClass">
        <slot
          name="icon"
        /></span>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'primary', // primary, primary-filled, secondary, secondary-filled
    },
    onBackground: {
      type: String,
      default: 'light', // light, dark
    },
    iconPosition: {
      type: String,
      default: 'right',
    },
    labelAlign: {
      type: String,
      default: 'left',
    },
  },
  computed: {
    btnClass() {
      const btnClass = []
      btnClass.push('btn-' + this.theme)
      if (this.onBackground === 'dark') {
        btnClass.push('btn-on-dark')
      }
      return btnClass.join(' ')
    },
    iconClass() {
      return this.iconPosition === 'left' ? 'mr-2 order-first' : 'ml-2'
    },
    hasIcon() {
      return this.$slots.icon
    },
  },
  methods: {
    focus() {
      this.$refs.button.focus()
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
