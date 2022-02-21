<template>
  <div class="rounded-full focus:shadow-outline-on-dark">
    <LibBaseButton
      :theme="theme"
      on-background="dark"
      class="
        btn-light
        min-w-0
        xs:min-w-125
        focus:shadow-outline-on-dark focus:outline-none
      "
      @click="returnToStep"
    >
      <template v-slot:text>
        Close<template v-if="currentPageTitle">
          {{ currentPageTitle }}
        </template>
      </template>
      <template v-slot:icon>
        <NextIcon class="h-6 w-6" />
      </template>
    </LibBaseButton>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NextIcon from '@/assets/icons/arrow-right-sm.svg?inline'
import { activeSteps } from '@/mixins/activeSteps.js'

export default {
  components: {
    NextIcon,
  },
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
      currentPageTitle: (state) => state.site.currentPageTitle,
    }),
  },
  methods: {
    returnToStep() {
      const redirectRoute = this.$piTool.lastStepVisitedRoute()
      // console.log(redirectRoute)
      if (redirectRoute) {
        this.$router.push(redirectRoute)
      }
    },
  },
}
</script>
