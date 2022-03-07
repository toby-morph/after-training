<template>
  <LibBaseModal
    :title="loadingMessage"
    :show-close="false"
    text-align="center"
    :show="show"
    theme="dark-primary"
    :custom-size="['w-9/12','sm:max-w-sm']"
  >
    <WidgetLoadingIcon fill="white" />
  </LibBaseModal>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    loadingMessage: {
      type: String,
      default: 'Loading',
    },
  },
}
</script>

<style lang="scss" scoped>
</style>