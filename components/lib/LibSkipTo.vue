<template>
  <!-- see https://css-tricks.com/how-to-create-a-skip-to-content-link/ -->
  <a
    :href="`#${targetId}`"
    class="
      skip-to-content-link
      bg-primary
      text-white
      border-0
      p-2
      left-0
      absolute
      transform
      transition-transform
      -translate-y-full
      focus:translate-y-0
    "
  >{{ label }
    }</a>
</template>


<script>
export default {
  props: {
    targetId: {
      type: String,
      default: 'main',
    },
    label: {
      type: String,
      default: 'Skip to main content',
    },
  },
}
</script>

<style lang="scss" scoped>
</style>