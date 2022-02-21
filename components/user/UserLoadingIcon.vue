<template>
  <Loading class="h-16 w-16 w-auto mx-auto animate-spin" :class="`fill-${fill}`" />
</template>

<script>
import Loading from '@/assets/icons/loading.svg?inline'
export default {
  components: {
    Loading,
  },
  props: {
      fill: {
          type: String,
          default: 'primary'
      }
  }
}
</script>

<style lang="scss" scoped>
</style>