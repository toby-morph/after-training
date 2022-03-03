<template>
  <div class="relative">
    <LibBaseToolTip
      id="disabledNextTooltip"
      ref="tooltip"
      arrow-pos="bottomRight"
      :theme="`dark-${theme}`"
      class="
        disabled-next-tooltip
        absolute
        right-0
        w-48
        transition-opacity
        duration-200
        ease-out
        w-48
      "
      @click="closeTooltip()"
    >
      Please scroll through and read all the page content before continuing.
      Thanks!
    </LibBaseToolTip>
    <div
      :tabindex="!isEnabled ? '0' : '-1'"
      class="rounded-btn"
      :class="
        !isEnabled ? 'focus:shadow-outline-on-dark focus:outline-none' : ''
      "
      aria-describedby="disabledNextTooltip"
      @click.capture="showDisabledMessage()"
      @keyup.enter.capture="showDisabledMessage()"
    >
      <LibBaseButton
        ref="nextStep"
        class="
          next-step
          min-w-0
          xs:min-w-125
          focus:shadow-outline-on-dark focus:outline-none
        "
        :theme="theme"
        on-background="dark"
        :class="!isEnabled ? 'pointer-events-none' : ''"
        :disabled="!isEnabled"
        @click="nextStep($event)"
      >
        <template v-slot:text>
          Next
        </template>
        <template v-slot:icon>
          <NextIcon class="h-6 w-6" />
        </template>
      </LibBaseButton>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { debounce } from '@/mixins/debounce.js'
import { activeSteps } from '@/mixins/activeSteps.js'
import { scrolledToBottom } from '@/mixins/scrolledToBottom.js'
import { disabledButtonMessage } from '@/mixins/disabledButtonMessage.js'
import { GAMethods } from '@/mixins/GAMethods.js'

import NextIcon from '@/assets/icons/arrow-right-sm.svg?inline'

export default {
  components: {
    NextIcon,
  },
  mixins: [
    debounce,
    activeSteps,
    scrolledToBottom,
    disabledButtonMessage,
    GAMethods,
  ],
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
    isEnabled() {
      return (
        this.scrolledToBottom || this.completedSteps.includes(this.currentStep)
      )
    },
  },
  watch: {
    isEnabled() {
      this.showToolTip = false
      if (this.isEnabled) {
        this.$nextTick(() => {
          // see https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements
          this.$refs.nextStep.focus()
        })
      }
    },
  },
  updated() {
    if (this.scrolledToBottom) {
      const logEvent = '[STEP: ' + this.currentStep + '] Scrolled To Bottom'
      this.gaLogEvent(logEvent)
      this.$nextTick(() => {
        this.$animations.buttonPulse('.next-step')
      })
    }
  },
  methods: {
    ...mapActions('steps', ['addCompletedStep']),
    nextStep($event) {
      if (this.isEnabled) {
        const isFinalStep =
          parseInt(this.currentStep + 1) > parseInt(this.totalSteps)
        const nextStep = isFinalStep
          ? '/thankyou' // 100 = default step number for Thank you page
          : '/steps/' + parseInt(this.currentStep + 1)
        const path = nextStep

        this.gaLogEvent('Nav: Clicked next after viewing all content', { 
          page: window.location.pathname })
          
        this.addCompletedStep(this.currentStep)
        this.$router.push(path)
      }
    },
  },
}
</script>
