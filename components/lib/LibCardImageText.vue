<template>
  <LibBaseCard
    :theme="theme"
    :align="align"
    :whole-clickable="wholeClickable"
    v-on="$listeners"
  >
    <div class="relative">
      <LibBaseImg
        v-if="imgSrc"
        :img-class="imageClass"
        :src="imgSrc"
        :alt="imgAlt"
        :width="imgWidth"
        :height="imgHeight"
        :sizes="imgSizes"
      />
      <slot name="image-overlay" />
    </div>
    <div v-if="title || summary" class="flow px-4 pb-8">
      <LibBaseHtmlHeader
        v-if="title"
        :level="headerLevel"
        :header-font-size="headerFontSize"
      >
        <template
          v-if="link"
        >
          <LibBaseLink
            :link-class="linkClass"
            :link="link"
            :is-nuxt-link="isNuxtLink"
          >
            {{ title }}
          </LibBaseLink>
        </template>
        <template v-else>
          {{ title }}
        </template>
      </LibBaseHtmlHeader>
      <div v-if="summary" v-html="summary" />
    </div>
  </LibBaseCard>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      default: null,
    },
    imgAlt: {
      type: String,
      default: '',
    },
    imgWidth: {
      type: String,
      default: null,
    },
    imgHeight: {
      type: String,
      default: null,
    },
    imgSizes: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    summary: {
      type: String,
      default: null,
    },
    theme: {
      type: String,
      default: 'white',
    },
    align: {
      type: String,
      default: 'center',
    },
    headerLevel: {
      type: String,
      default: '2',
    },
    headerFontSize: {
      type: String,
      default: '2',
    },
    link: {
      type: String,
      default: null,
    },
    isNuxtLink: {
      type: Boolean,
      default: false,
    },
    wholeClickable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    linkClass() {
      const linkClass = []
      if (this.wholeClickable) {
        linkClass.push('stretched-link', 'hover:underline')
      } else {
        linkClass.push('underline')
      }
      return linkClass.join(' ')
    },
    imageClass() {
      const imageClass = ['rounded-t-lg']
      if (!this.title && !this.summary) {
        imageClass.push('rounded-b-lg')
      }
      return imageClass.join(' ')
    },
  },
}
</script>

<style lang="scss" scoped></style>
