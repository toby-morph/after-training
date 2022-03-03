<template>
  <LibBaseButton
    :theme="theme"
    on-background="dark"
    class="
      pl-2
      pr-2
      min-w-0
      xs:min-w-125
      focus:shadow-outline-on-dark focus:outline-none
    "
    :disabled="!prevEnabled"
    icon-position="left"
    label-align="right"
    @click="prevStep"
  >
    <PrevIcon class="prev-icon mr-2 flex-shrink-0" /><span
      class="inline-block w-full text-center"
    >Previous</span>
    <template v-slot:text>
      Previous
    </template><template v-slot:icon>
      <PrevIcon class="h-6 w-6" />
    </template>
  </LibBaseButton>
</template>

<script>
import { mapState } from 'vuex'

import { currentPage } from '@/mixins/currentPage.js'
import { GAMethods } from '@/mixins/GAMethods.js'

import PrevIcon from '@/assets/icons/arrow-left-sm.svg?inline'

export default {
  components: {
    PrevIcon,
  },
  mixins: [currentPage, GAMethods],
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
      totalActiveSteps: (state) => state.steps.totalActiveSteps,
    }),
    prevEnabled() {
      return this.currentStep > 0 || this.isThankyou
    },
  },
  methods: {
    prevStep() {
      if (this.prevEnabled) {
        this.gaLogEvent('Nav: Clicked previous', {
          page: window.location.pathname,
        })

        let path = null
        let prevStep = 0
        // if thank you page, return to last completed step (should be last step)
        if (parseInt(this.currentStep) === 100) {
          prevStep = this.totalActiveSteps
        } else if (parseInt(this.currentStep) > 1) {
          prevStep = parseInt(this.currentStep - 1)
        }
        if (prevStep === 0) {
          path = '/get-started'
        } else {
          path = '/steps/' + parseInt(prevStep)
        }
        if (path) {
          this.$router.push(path)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.next-step {
  min-width: 100px;
}
</style>
