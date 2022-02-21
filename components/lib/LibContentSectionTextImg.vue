<template>
  <LibContentSectionWrapper
    :section-id="sectionId"
    :theme="theme"
    :section-spacing="sectionSpacing"
  >
    <div class="md:flex md:flex-row md:items-top">
      <div class="mb-4 md:w-7/12 md:mb-0 flow">
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
      <div v-if="image && image.url" class="pt-4 md:pt-0 md:w-5/12 md:pl-5">
        <LibBaseImg
          :src="image.url"
          :alt="image.alt"
          :width="image.width"
          :height="image.height"
          sizes="md:100vw lg:332px xl:446px"
          :caption="image.caption"
        />
      </div>
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
    image() {
      return this.section.image
    },
  },
}
</script>

<style lang="scss" scoped></style>
