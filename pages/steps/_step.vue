<template>
  <main class="main">
    <LibBasePageTitle
      :page-strapline="strapline"
      :page-sub-title="step.step_subtitle"
    >
      <template #page-title>
        {{ step.step_title }}
      </template><template #additional-content>
        <LibPageContentList
          v-if="hasContentList"
          :links="step.page_content_list.content_links"
          :back-to-top="true"
          :back-to-top-position-classes="[
            'bottom-20',
            'right-2',
            'md:bottom-28',
          ]"
        />
      </template>
    </LibBasePageTitle>
    <LibContentSection
      v-for="(section, index) in step.step_content"
      :key="index"
      :section-id="`content-section-${index + 1}`"
      :section-type="section.type"
      :section="section"
      theme="mid"
    />
    <span id="endOfContent" />
  </main>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import { step } from '@/mixins/step.js'
import { scrolledToBottom } from '@/mixins/scrolledToBottom.js'
import { pageTransitions } from '@/mixins/pageTransitions.js'
import { GAMethods } from '@/mixins/GAMethods.js'

export default {
  mixins: [
    step,
    scrolledToBottom,
    pageTransitions,
    GAMethods,
  ],
  data() {
    return {
      step: null,
      timePageLoaded: new Date(),
    }
  },
  beforeRouteLeave(to, from, next) {
    this.leavePage(to)
    next()
  },
  beforeRouteUpdate(to, from, next) {
    this.leavePage(to)
    next()
  },
  computed: {
    ...mapState({
      currentStep: (state) => parseInt(state.steps.currentStep),
      completedSteps: (state) => state.steps.completedSteps,
    }),
    ...mapGetters('steps', ['getStepByNumber']),
  },
  mounted() {
    this.setScrolledToBottom(false)
    this.timePageLoaded = new Date()
  },
  created() {
    this.step = this.getStepByNumber(this.currentStep)
  },
  methods: {
    ...mapActions('steps', ['addCompletedStep']),
    ...mapActions('site', ['setScrolledToBottom', 'setCurrentPageTitle']),
    contentSectionBg(index) {
      return index % 2 === 0
        ? 'bg-content-section-light'
        : 'bg-content-section-mid'
    },
    leavePage(to) {
      this.$root.$emit('movedNextPage', 0)
      const timeOnPage = (new Date() - this.timePageLoaded) / 1000
      this.gaLogEvent(window.location.pathname, {
        'Time on page': timeOnPage,
      })
      const nextStep = parseInt(to.params.step)
      if (nextStep in this.completedSteps) {
        // if (this.currentStep in this.completedSteps) {
        //   const nextStep = parseInt(to.params.step)
        const eventProp = { 'From/To': this.currentStep + '->' + nextStep }
        this.gaLogEvent('Page Revisit', eventProp)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.page-title {
  @apply opacity-100 translate-x-0;
}
</style>
