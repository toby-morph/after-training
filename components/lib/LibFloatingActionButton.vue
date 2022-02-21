<template>
  <div
    class="
      FloatingActionButton
      fixed
      h-12
      w-12
      rounded-full
      flex
      items-center
      justify-center
      z-10
      ease-out
      transform
      transition-all
      hover:cursor-pointer
      hover:scale-105
    "
    :class="themeClasses"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    themeClasses() {
      const themeClasses = []
      switch (this.theme) {
        case 'primary':
          themeClasses.push(
            'bg-primary-dark',
            'hover:bg-primary',
            'theme-primary'
          )
          break
        case 'secondary':
          themeClasses.push(
            'bg-secondary-dark',
            'hover:bg-secondary',
            'theme-secondary'
          )
          break
        case 'white':
          themeClasses.push('bg-grey-light', 'hover:bg-white', 'theme-white')
          break
      }
      return themeClasses
    },
  },
}
</script>

<style lang="scss" scoped>
.FloatingActionButton {
  svg {
    @apply fill-white;
  }
  &.theme-white {
    svg {
      @apply fill-primary;
    }
  }
}
</style>