<template>
  <span>
    <template
      v-if="isNuxtLink"
    ><nuxt-link
      :class="linkClass"
      :to="link"
      :target="target"
    ><slot /></nuxt-link>
    </template>
    <template
      v-else
    ><a :class="linkClass" :href="link" :target="target"><slot /></a></template>
  </span>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    isNuxtLink: {
      type: Boolean,
      default: true,
    },
    link: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      default: null,
    },
    linkClass: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
</style>