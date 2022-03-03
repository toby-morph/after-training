<template>
  <div
    v-if="show"
    class="
      w-full
      h-full
      absolute
      inset-0
      bg-white
      opacity-60
      flex
      items-center
      justify-center
      z-40
    "
  >
    <WidgetLoadingIcon />
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
</style>