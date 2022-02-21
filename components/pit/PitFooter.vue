<template>
  <footer
    id="pageFooter"
    class="relative z-30"
    :class="footerClass"
  >
    <section
      class="
        footer-content
        section
        flex flex-row flex-wrap
        items-start
        pt-4
        md:items-center md:pt-0 md:items-center
      "
    >
      <div class="flex flex-row flex-wrap items-center justify-between w-full">
        <template v-if="isStep || isThankyou">
          <div
            class="w-full flex md:flex-1 order-3 md:justify-center items-center"
          >
            <!-- placeholder if next button not required -->
            <div
              v-if="isThankyou"
              class="ml-auto order-2 sm:pl-2 justify-end"
            />
            <PitStepsButtonNext
              v-else
              class="order-3 ml-auto sm:pl-2 justify-end xxs:ml-auto"
              :theme="theme"
            />
            <PitStepsButtonPrev
              class="order-1 mr-auto flex sm:pr-2 justify-center"
              :theme="theme"
            />
            <div v-if="isStep" class="order-2 justify-center xxs:hidden">
              <PitStepsNav :theme="theme" />
            </div>
          </div>
        </template>
        <template v-if="isGetStarted">
          <PitStepsButtonStart class="ml-auto" :theme="theme" />
        </template>
        <template v-if="isInfoPage">
          <PitStepsButtonReturn class="ml-auto" :theme="theme" />
        </template>
      </div>
    </section>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

import { currentPage } from '@/mixins/currentPage.js'

export default {
  mixins: [currentPage],
  props: {
    theme: {
      type: String,
      default: 'primary'
    }
  },
  data() {
    return {
      windowHeightOnLoad: Math.max(window.innerHeight),
      windowHeightCurrent: Math.max(window.innerHeight),
    }
  },
  computed: {
    ...mapState({
      currentStep: (state) => parseInt(state.steps.currentStep),
      steps: (state) => state.steps.steps,
    }),
    expandedWindowHeight() {
      return this.windowHeightCurrent > this.windowHeightOnLoad + 50
    },
    footerClass(){
      const footerClass = [`bg-${this.theme}`]
      if(this.expandedWindowHeight){
        footerClass.push('ios-toolbar-closed')
      }
      return footerClass
    }
  },
  mounted() {
    window.addEventListener(
      'resize',
      this.$utils.debounce(() => {
        this.windowHeightCurrent = Math.max(window.innerHeight)
      }, 200)
    )
  },
}
</script>

<style lang="scss" scoped></style>
