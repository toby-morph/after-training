<template>
  <LibContentSectionWrapper
    :section-id="sectionId"
    :theme="theme"
    :section-spacing="sectionSpacing"
  >
    <div class="flow lg:w-9/12">
      <LibBaseProse
        v-if="content"
      >
        <div
          class="flow"
          v-html="$md.render(content)"
        />
      </LibBaseProse>
      <LibContentSectionLinks v-if="links" :links="links" />
    </div>
  </LibContentSectionWrapper>
</template>

<script>
export default {
  props: {
    section: {
      type: Object,
      required: true,
    },
    sectionId: {
      type: String,
      default: null,
    },
    theme: {
      type: String,
      default: 'transparent',
    },
    sectionSpacing: {
      type: String,
      default: 'regular',
    },
  },
  computed: {
    content() {
      return this.section.text
    },
    links() {
      return this.section.links
    },
  },
}
</script>

<style lang="scss" scoped></style>
