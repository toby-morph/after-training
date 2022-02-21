<template>
  <LibContentSectionWrapper
    wrapper-el="header"
    :section-spacing="sectionSpacing"
    :theme="theme"
    content-class="flow"
  >
    <p
      v-if="pageStrapline"
      class="text-xs-base mb-4 strapline"
    >
      {{ pageStrapline }}
    </p>
    <h1
      class="
        text-color-h1
        font-weight-h1
        text-xs-h1
        leading-xs-h1
        sm:text-h1 sm:leading-h1
        out-of-flow
      "
    >
      <slot name="page-title" />
      <span class="block my-4 border-b-4 w-14 h-0" />
    </h1>
    <p
      v-if="pageSubTitle"
      class="text-color-h1 text-xs-h4 leading-xs-h4 md:text-h4 md:leading-h4"
    >
      {{ pageSubTitle }}
    </p>
    <slot name="additional-content" />
  </LibContentSectionWrapper>
</template>

<script>
export default {
  props: {
    pageSubTitle: {
      type: String,
      default: null,
    },
    pageStrapline: {
      type: String,
      default: null,
    },
    sectionSpacing: {
      type: String,
      default: 'page-title',
    },
    theme: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped></style>
