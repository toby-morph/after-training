<template>
  <div
    class="
      BaseCard
      flow
      rounded-lg
      shadow-lg
      mx-auto
      group
      transition-color
      duration-200
      relative
    "
    :class="cardClasses"
    :tabindex="wholeClickable ? '0' : false"
    v-on="$listeners"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'light',
    },
    align: {
      type: String,
      default: 'center',
    },
    wholeClickable: {
      type: Boolean,
      default: false,
    },
    headerLevel: {
      type: String,
      default: '2',
    },
    headerFontSize: {
      type: String,
      default: '2',
    },
    maxCardWidth: {
      type: String,
      default: 'max-w-md',
    },
  },
  computed: {
    alignClasses() {
      const alignClasses = ['text-' + this.align]
      return alignClasses
    },
    wholeClickableClasses() {
      return this.wholeClickable
        ? ['hover:cursor-pointer', 'hover:shadow-2xl']
        : []
    },
    themeClasses() {
      let themeClasses = []
      switch (this.theme) {
        case 'primary':
          themeClasses = ['bg-primary', 'text-white']
          if (this.wholeClickable) themeClasses.push('hover:bg-primary-dark')
          break
        case 'secondary':
          themeClasses = ['bg-secondary', 'text-white']
          if (this.wholeClickable) themeClasses.push('hover:bg-secondary-dark')
          break
        case 'light':
          themeClasses = ['bg-grey-light', 'text-primary']
          if (this.wholeClickable) themeClasses.push('hover:bg-white')
          break
        default:
          themeClasses = ['bg-white', 'text-primary']
          if (this.wholeClickable) themeClasses.push('hover:bg-grey-light')
      }
      return themeClasses
    },
    focusClasses() {
      let focusClasses = []
      if (this.wholeClickable) {
        focusClasses = ['focus:outline-none', 'focus:shadow-outline-on-light']
      }
      return focusClasses
    },
    cardClasses() {
      return [
        ...this.themeClasses,
        ...this.alignClasses,
        ...this.wholeClickableClasses,
        ...this.focusClasses,
        this.maxCardWidth,
      ].join(' ')
    },
  },
}
</script>

<style lang="scss" scoped></style>
