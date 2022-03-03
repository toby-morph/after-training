<template>
  <PitCollapseNavWrapper>
    <div v-if="!isVersionLanding">
      <PitCollapseNavLink
        :link-class="isGetStarted ? 'is-current' : ''"
        :route="'/get-started'"
        :is-enabled="navIsOpen"
        @enabled-click="toggleCollapseNav"
      >
        Get started
      </PitCollapseNavLink>
      <PitCollapseNavLink
        v-for="(step, index) in activeSteps"
        :key="index"
        :is-enabled="isEnabled(index + 1)"
        :route="'/steps/' + (index + 1)"
        :link-class="menuLinkClass(index + 1)"
        @enabled-click="toggleCollapseNav"
      >
        <PitStepNumIcon :step="step" class="mr-4" />
        {{ step.step_title }}
      </PitCollapseNavLink>
      <PitCollapseNavLink
        :link-class="isThankyou ? 'is-current' : ''"
        route="/thankyou"
        :is-enabled="navIsOpen && allStepsCompleted"
        @enabled-click="toggleCollapseNav"
      >
        Next steps
      </PitCollapseNavLink>
    </div>
    <hr class="border border-white rounded my-4 mx-4 opacity-50">
    <div class="pb-8">
      <PitCollapseNavInfoLink
        route="/privacy"
        :is-enabled="navIsOpen"
        @enabled-click="toggleCollapseNav"
      >
        Privacy
      </PitCollapseNavInfoLink>
      <PitCollapseNavInfoLink
        route="/cookies"
        :is-enabled="navIsOpen"
        @enabled-click="toggleCollapseNav"
      >
        Cookie Policy
      </PitCollapseNavInfoLink>
      <PitCollapseNavInfoLink
        route="/accessibility"
        :is-enabled="navIsOpen"
        @enabled-click="toggleCollapseNav"
      >
        Accessibility
      </PitCollapseNavInfoLink>
    </div>
  </PitCollapseNavWrapper>
</template>

<script>
import { mapState } from 'vuex'

import { currentPage } from '@/mixins/currentPage.js'
import { activeSteps } from '@/mixins/activeSteps.js'
import { toggleCollapseNav } from '@/mixins/toggleCollapseNav.js'

export default {
  mixins: [activeSteps, currentPage, toggleCollapseNav],
  computed: {
    ...mapState({
      steps: (state) => state.steps.steps,
      completedSteps: (state) => state.steps.completedSteps,
      fullScreen: (state) => state.site.fullScreen,
      parentSite: (state) => state.site.parentSiteDetails.siteName,
      navIsOpen: (state) => state.site.navIsOpen,
    }),
    allStepsCompleted() {
      const lastCompletedStep = this.completedSteps.reduce(function (a, b) {
        return Math.max(a, b)
      }, 0)
      return parseInt(this.totalSteps) === lastCompletedStep
    },
    showTooltips() {
      return false
    },
  },
  methods: {
    isCompletedStep(stepNum) {
      return !!this.completedSteps.includes(stepNum)
    },
    isCurrentStep(stepNum) {
      return parseInt(this.$route.params.step) === parseInt(stepNum)
    },
    isNextStep(stepNum) {
      // the step following the last completed step needs to be accessible from menu and steps icon
      return (
        parseInt(Math.max(...this.completedSteps)) === parseInt(stepNum - 1)
      )
    },
    isEnabled(stepNum) {
      return (
        this.navIsOpen &&
        (this.isCompletedStep(stepNum) ||
          this.isCurrentStep(stepNum) ||
          this.isNextStep(stepNum))
      )
    },
    menuLinkClass(stepNum) {
      let menuLinkClasses = ''
      if (this.isCompletedStep(stepNum)) {
        menuLinkClasses += ' is-completed'
      }
      if (this.isCurrentStep(stepNum)) {
        menuLinkClasses += ' is-current'
      }
      return menuLinkClasses
    },
  },
}
</script>

<style lang="scss" scoped></style>
