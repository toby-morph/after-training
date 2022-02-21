<template>
  <div :class="classList" class="rounded p-2">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      default: 'success',
    },
  },
  computed: {
    classList() {
      const classList = []
      switch (this.status) {
        case 'warning':
          classList.push('bg-warning-light')
          break
        case 'success':
          classList.push('bg-success-light')
          break
        default:
          classList.push('bg-grey-light')
      }
      return classList.join(' ')
    },
  },
}
</script>

<style lang="scss" scoped>
</style>