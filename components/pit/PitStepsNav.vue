<template>
  <div class="steps-nav text-center opacity-0">
    <template v-if="currentStep === 0">
      <p class="text-white sr-only">
        Start
      </p>
    </template>
    <template v-else>
      <p
        :class="textStepsNavClass"
        class="current-steps text-xs-base leading-xs-base font-bold text-white"
      >
        {{ currentStep }} of {{ totalSteps }}
      </p>

      <div
        :class="iconStepsNavClass"
        class="steps-nav-icons hidden flex-row items-center justify-center"
      >
        <PitStepsNavStep
          v-for="(step, index) in activeSteps"
          :key="index"
          :is-completed-step="isCompletedStep(index + 1)"
          :is-current-step="isCurrentStep(index + 1)"
          :is-next-step="isNextStep(index + 1)"
          :step="step"
          :theme="theme"
          class="steps-nav-item mx-1"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { activeSteps } from '@/mixins/activeSteps.js'

export default {
  mixins: [activeSteps],
  props: {
    theme: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    ...mapState({
      currentStep: (state) => parseInt(state.steps.currentStep),
      steps: (state) => state.steps.steps,
      completedSteps: (state) => state.steps.completedSteps,
    }),
    navExpandBreakpoint() {
      // options = start, text, icons
      let navExpandBreakpoint = 'md'
      if ((this.totalSteps > 8) & (this.totalSteps <= 14)) {
        navExpandBreakpoint = 'lg'
      } else if (this.totalSteps > 14) {
        navExpandBreakpoint = 'xl'
      }
      return navExpandBreakpoint
    },
    iconStepsNavClass() {
      return `${this.navExpandBreakpoint}:flex`
    },
    textStepsNavClass() {
      return `${this.navExpandBreakpoint}:hidden`
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$animations.stepsNavAnimation()
    })
  },
  methods: {
    isCompletedStep(stepNum) {
      return !!this.completedSteps.includes(stepNum)
    },
    isCurrentStep(stepNum) {
      // no current steps on thank you page
      if (this.$route.name === 'thankyou') {
        return false
      }
      return stepNum === this.currentStep
    },
    isNextStep(stepNum) {
      // the step following the last completed step needs to be accessible from menu and steps icon
      return (
        parseInt(Math.max(...this.completedSteps)) === parseInt(stepNum - 1)
      )
    },
  },
}
</script>

<style lang="scss" scoped>
/* some crude fixes for when text is set to large */
.large-text {
  .current-steps {
    @apply hidden;
    @screen sm {
      display: block !important;
    }
    @screen lg {
      display: none !important;
    }
  }
  .steps-nav-icons {
    display: none !important;
    @screen lg {
      display: flex !important;
    }
  }
}
</style>
