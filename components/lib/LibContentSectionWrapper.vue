<template>
  <LibUtilWrapperEl
    :id="sectionId"
    :el="wrapperEl"
    class="section"
    :class="sectionClasses"
  >
    <div class="section-inner" :class="contentClass">
      <slot>Section content</slot>
    </div>
  </LibUtilWrapperEl>
</template>

<script>
export default {
  props: {
    contentClass: {
      type: String,
      default: '',
    },
    sectionId: {
      type: String,
      default: null,
    },
    sectionSpacing: {
      type: String,
      default: 'regular',
    },
    theme: {
      type: String,
      default: 'transparent',
    },
    wrapperEl: {
      type: String,
      default: 'div',
    },
  },
  computed: {
    themeClasses() {
      const themeClasses = []
      switch (this.theme) {
        case 'primary':
          themeClasses.push('bg-primary')
          break
        case 'secondary':
          themeClasses.push('bg-secondary')
          break
        case 'light':
          themeClasses.push('bg-content-section-light')
          break
        case 'mid':
          themeClasses.push('bg-content-section-mid')
          break
        case 'white':
          themeClasses.push('bg-white')
          break
        default:
          themeClasses.push('bg-transparent')
      }
      return themeClasses
    },
    spacingClasses() {
      const spacingClasses = []
      switch (this.sectionSpacing) {
        case 'tight':
          spacingClasses.push('pt-6', 'pb-10', 'md:pt-10', 'md:pb-14')
          break
        case 'page-title':
          spacingClasses.push('pt-10', 'md:pt-16', 'pb-4')
          break
        case 'none':
          // spacingClasses.push('pt-6', 'pb-10', 'md:pt-10', 'md:pb-14')
          break
        default:
          spacingClasses.push('pt-10', 'pb-14', 'md:pt-16', 'md:pb-20')
      }
      return spacingClasses
    },
    sectionClasses() {
      return [...this.themeClasses, ...this.spacingClasses].join(' ')
    },
  },
}
</script>

<style lang="scss" scoped>
a {
  @apply underline text-primary;
  &:hover {
    @apply text-secondary;
  }
}
</style>
