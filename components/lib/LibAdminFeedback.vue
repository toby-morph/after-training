<template>
  <div
    v-if="show"
    :class="loadingClass"
    class="rounded-lg bg-notice-light p-4 transition-opacity"
  >
    <LibBaseProse><slot /></LibBaseProse>
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
  computed: {
    loadingClass() {
      return this.show ? 'opacity-100' : 'opacity-0'
    },
  },
}
</script>

<style lang="scss" scoped></style>
