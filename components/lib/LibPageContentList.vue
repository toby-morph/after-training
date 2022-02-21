<template>
  <div>
    <nav
      id="pageContentList"
      ref="pageContentList"
      class="rounded-lg p-4 flow"
      :class="`bg-${theme}`"
    >
      <LibBaseHtmlHeader header-level="2" header-font-size="4">
        <slot>Page content</slot>
      </LibBaseHtmlHeader>
      <ol>
        <li v-for="link in links" :key="link.target_id">
          <a
            v-scroll-to="{
              el: formatTargetId(link.target_id),
              container: '#appContent'
            }"
            :href="formatTargetId(link.target_id)"
            class="underline inline-block text-primary hover:cursor-pointer py-1 md:py-0"
          >{{ link.target_title }}</a>
        </li>
      </ol>
    </nav>
    <!-- optional back to top -->
    <LibFloatingActionButton
      v-scroll-to="{
        el: '#main',
        container: '#appContent'
      }"
      :style="showBackToTop ? 'opacity: 100;' : 'opacity: 0;'"
      :class="actionButtonClasses"
    >
      <UpArrowIcon class="h-8 w-8" />
    </LibFloatingActionButton>
  </div>
</template>

<script>
import UpArrowIcon from '@/assets/icons/arrow-up.svg?inline'
export default {
  components: {
    UpArrowIcon,
  },
  props: {
    links: {
      type: Array,
      required: true,
    },
    backToTop: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'white',
    },
    backToTopPositionClasses: {
      type: Array,
      default() {
        return ['bottom-4', 'right-4']
      },
    },
  },
  data() {
    return {
      showBackToTop: false,
    }
  },
  computed: {
    actionButtonClasses() {
      const actionButtonClasses = []
      actionButtonClasses.push(this.backToTopPositionClasses)
      return actionButtonClasses
    },
  },
  mounted() {
    if (this.backToTop) {
      this.initBackToTop()
    }
  },
  methods: {
    formatTargetId(targetId) {
      return targetId.charAt(0) !== '#' ? '#' + targetId : targetId
    },
    initBackToTop() {
      const options = {
        threshold: 0,
      }
      const observer = new IntersectionObserver(this.toggleBackToTop, options)
      observer.observe(this.$refs.pageContentList)
    },
    toggleBackToTop(entries) {
      const pageContentEl = entries[0]
      this.showBackToTop = !pageContentEl.isIntersecting
    },
  },
}
</script>

<style lang="scss" scoped>
</style>