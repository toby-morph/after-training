<template>
  <LibContentSectionWrapper
    :section-id="sectionId"
    :theme="theme"
    :section-spacing="sectionSpacing"
    content-class="flow"
  >
    <div class="lg:w-9/12">
      <LibBaseProse
        v-if="content"
      >
        <div
          class="flow"
          v-html="$md.render(content)"
        />
      </LibBaseProse>
    </div>
    <LibCardGrid
      class="pt-4"
      :cards="section.cards"
      :section-type="sectionType"
      :max-cards-per-row="parseInt(maxCardsPerRow)"
      :header-font-size="headerFontSize"
      :header-level="headerLevel"
      :theme="cardTheme"
      :align="align"
      :whole-clickable="wholeClickable"
      :numbered-cards="numberedCards"
    />
  </LibContentSectionWrapper>
</template>

<script>
export default {
  props: {
    section: {
      type: Object,
      required: true,
    },
    sectionType: {
      type: String,
      default: 'text_and_image',
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
    maxCardsPerRow: {
      type: String,
      default: '3',
    },
    align: {
      type: String,
      default: 'center',
    },
    headerLevel: {
      type: String,
      default: '3',
    },
    headerFontSize: {
      type: String,
      default: '3',
    },
    wholeClickable: {
      type: Boolean,
      default: false,
    },
    numberedCards: {
      type: Boolean,
      default: false,
    },
    cardTheme: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    content() {
      return this.section.text
    },
  },
}
</script>

<style lang="scss" scoped></style>
