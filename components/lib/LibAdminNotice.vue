<template>
  <div v-if="show" :class="noticeClass" class="rounded p-4">
    <LibBaseProse><slot /></LibBaseProse>
  </div>
</template>

<script>
export default {
  props: {
    noticeType: {
      type: String,
      default: 'notice',
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    noticeClass() {
      const noticeClass = []
      switch (this.noticeType) {
        case 'warning':
          noticeClass.push('bg-warning-light')
          break
        default:
          noticeClass.push('bg-notice-light')
      }
      return noticeClass.join(' ')
    },
  },
}
</script>

<style lang="scss" scoped></style>
