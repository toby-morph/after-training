<template>
  <LibContentSectionWrapper
    :section-id="section.sectionId"
    :theme="theme"
    :section-spacing="sectionSpacing"
  >
    <div class="mb-6 md:w-10/12 lg:w-8/12 flow">
      <!-- eslint-disable -->
      <LibBaseProse v-if="content"
        ><div class="flow" v-html="$md.render(content)"
      /></LibBaseProse>
      <LibContentSectionLinks v-if="links" :links="links" />
    </div>
    <div v-if="video" class="md:w-10/12 lg:w-8/12">
      <!-- See https://www.aditus.io/patterns/accordion/ -->
      <LibVideoWithTranscript
        :video-id="video.vimeo_id"
        :video-title="video.vimeo_title"
        :video-transcript="video.video_transcript"
      />
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
    video() {
      return this.section.video
    },
  },
}
</script>

<style lang="scss" scoped></style>
