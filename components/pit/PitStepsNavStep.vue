<template>
  <div>
    <template v-if="isEnabled">
      <nuxt-link
        class="
          focus:shadow-outline-on-dark focus:outline-none
          block
          rounded-full
        "
        :class="isCurrentStep ? 'pointer-events-none' : ''"
        :to="'/steps/' + step.step_number"
        @click.native="registerNavStepClickEvent(step.step_number)"
      >
        <PitStepNumIcon
          :class="navIconClass"
          class="opacity-50 text-white border-white"
          :step="step"
        />
      </nuxt-link>
    </template>
    <template v-else>
      <div class="relative">
        <LibBaseToolTip
          ref="tooltip"
          arrow-pos="bottomLeft"
          :theme="`dark-${theme}`"
          class="
            step-icon-disabled-message-tooltip
            w-48
            z-50
            shadow-lg
            absolute
            clearfix
          "
          @click.capture="closeTooltip()"
        >
          Sorry, but you cannot jump ahead
        </LibBaseToolTip>
        <PitStepNumIcon
          aria-disabled="true"
          :class="navIconClass"
          class="opacity-50 text-white border-white"
          :step="step"
          :theme="theme"
          @click="disabledClick()"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { disabledButtonMessage } from '@/mixins/disabledButtonMessage.js'
import { GAMethods } from '@/mixins/GAMethods.js'

export default {
  mixins: [disabledButtonMessage, GAMethods],
  props: {
    isCompletedStep: {
      type: Boolean,
      required: true,
      default: false,
    },
    isCurrentStep: {
      type: Boolean,
      required: true,
      default: false,
    },
    isNextStep: {
      type: Boolean,
      required: true,
      default: false,
    },
    step: {
      type: Object,
      required: true,
    },
    theme: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    isEnabled() {
      return this.isCompletedStep || this.isNextStep
    },
    navIconClass() {
      const navIconClass = []
      if (this.isCompletedStep) {
        navIconClass.push('is-completed-step')
      }
      if (this.isCurrentStep) {
        navIconClass.push('is-current-step')
      }
      if (this.isNextStep) {
        navIconClass.push('is-next-step')
      }
      navIconClass.push(`bg-${this.theme}`)
      navIconClass.push(`steps-nav-icon-${this.theme}`)
      navIconClass.push('steps-nav-icon')
      return navIconClass.join(' ')
    },
  },
  methods: {
    ...mapActions('site', ['setTooltipIsOpen']),
    disabledClick() {
      if (!this.isCurrentStep) {
        this.showDisabledMessage()
      }
    },
    registerNavStepClickEvent(step) {
      this.gaLogEvent('Nav: Step number clicked', { destination: step })
    },
  },
}
</script>

<style lang="scss" scoped>
.steps-nav-icon {
  &:after {
    content: '';
    transform: scale(0.2);
    @apply absolute z-10 bg-white rounded-full w-0 h-0;
    transition: all 0.3s ease-out;
  }
}
.is-completed-step:not(.is-current-step),
.is-next-step:not(.is-current-step) {
  // .is-current-step {
  @apply opacity-100;
  &:hover {
    @apply font-bold;
    &:after {
      transform: scale(1);
      transform-origin: center;
      width: calc(100% + 3px);
      height: calc(100% + 3px);
    }
  }
  &.steps-nav-icon-primary:hover {
    @apply text-primary;
  }
  &.steps-nav-icon-secondary:hover {
    @apply text-secondary;
  }
}
// .is-completed-step:not(.is-current-step),
// .is-next-step:not(.is-current-step) {
.is-current-step {
  @apply opacity-100 font-bold pointer-events-none;
  &.steps-nav-icon-primary {
    @apply text-primary;
  }
  &.steps-nav-icon-secondary {
    @apply text-secondary;
  }
  &:after {
    transform: scale(1);
    transform-origin: center;
    width: calc(100% + 3px);
    height: calc(100% + 3px);
  }
  &.hovered {
    @apply text-white;
    // see https://stackoverflow.com/questions/23885255/how-to-remove-ignore-hover-css-style-on-touch-devices
    @media (hover: hover) and (pointer: fine) {
      &:after {
        @apply opacity-0;
      }
    }
  }
}
</style>
