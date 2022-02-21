<template>
  <button ref="button" class="underline" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  methods: {
    focus() {
      this.$refs.button.focus()
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
