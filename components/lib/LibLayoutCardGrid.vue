<template>
  <div class="LayoutCardGrid grid gap-4 grid-gap-4" :class="gridRowsClasses">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    maxCardsPerRow: {
      type: Number,
      default: 4,
    },
  },
  computed: {
    gridRowsClasses() {
      const gridRowsClasses = ['grid-cols-1']
      switch (parseInt(this.maxCardsPerRow)) {
        case 2:
          gridRowsClasses.push('md:grid-cols-2')
          break
        case 3:
          gridRowsClasses.push('md:grid-cols-3')
          break
        case 4:
          gridRowsClasses.push('sm:grid-cols-2', 'lg:grid-cols-4')
          break
      }
      return gridRowsClasses.join(' ')
    },
  },
}
</script>

<style lang="scss" scoped>
.LayoutCardGrid {
  grid-template-rows: auto;
  > * {
    @apply h-full;
  }
}
</style>
