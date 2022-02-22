<template>
  <div class="relative">
    <LibBaseToolTip
      id="disabledStartTooltip"
      ref="tooltip"
      arrow-pos="bottomRight"
      :theme="`dark-${theme}`"
      class="
        start-disabled-message-tooltip
        absolute
        right-0
        w-48
        transition-opacity
        duration-200
        ease-out
      "
      @click="closeTooltip()"
    >
      Please scroll through and read all the page content before continuing.
      Thanks!
    </LibBaseToolTip>
    <div
      class="rounded-btn"
      :tabindex="!isEnabled ? '0' : '-1'"
      :class="
        !isEnabled ? 'focus:shadow-outline-on-dark focus:outline-none' : ''
      "
      aria-describedby="disabledStartTooltip"
      @click.capture="showDisabledMessage()"
      @keyup.enter.capture="showDisabledMessage()"
    >
      <LibBaseButton
        ref="startSteps"
        class="
          steps-start
          min-w-0
          xs:min-w-125
          focus:shadow-outline-on-dark focus:outline-none
        "
        :theme="theme"
        on-background="dark"
        :disabled="!isEnabled"
        :class="!isEnabled ? 'pointer-events-none' : ''"
        aria-describedby="disabledStartTooltip"
        @click="startSteps"
      >
        <template v-slot:text>
          Start
        </template><template v-slot:icon>
          <NextIcon class="w-6 h-6 flex-shrink-0 next-icon ml-2" />
        </template>
      </LibBaseButton>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { scrolledToBottom } from '@/mixins/scrolledToBottom.js'
import { fullScreen } from '@/mixins/fullScreen.js'
import { disabledButtonMessage } from '@/mixins/disabledButtonMessage.js'

import NextIcon from '@/assets/icons/arrow-right-sm.svg?inline'
export default {
  components: {
    NextIcon,
  },
  mixins: [scrolledToBottom, fullScreen, disabledButtonMessage],
  props: {
    theme: {
      type: String,
      default: 'primary',
    },
  },
  computed: {
    ...mapState({
      exitedFullScreen: (state) => state.site.exitedFullScreen,
      startedSteps: (state) => state.steps.startedSteps,
    }),
    isEnabled() {
      return this.scrolledToBottom || this.startedSteps
    },
  },
  watch: {
    isEnabled() {
      this.showToolTip = false
      if (this.isEnabled) {
        this.$nextTick(() => {
          // see https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements
          this.$refs.startSteps.focus()
        })
      }
    },
  },
  updated() {
    if (this.scrolledToBottom) {
      this.$nextTick(() => {
        this.$animations.buttonPulse('.steps-start')
      })
    }
  },
  methods: {
    ...mapActions('site', ['setHasRefreshed']),
    ...mapActions('steps', ['setStartedSteps', 'addCompletedStep']),
    startSteps() {
      this.setStartedSteps(true)
      this.setHasRefreshed(false)
      this.startFullScreen()
      this.goToFirstStep()
      this.gaLogEvent('Start')
    },
    goToFirstStep() {
      const path = '/steps/1'
      this.$router.push(path)
      this.addCompletedStep(0)
    },
  },
}
</script>

<style lang="scss" scoped></style>
