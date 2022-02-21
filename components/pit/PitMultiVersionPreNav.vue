<template>
  <LibPreNav class="print:hidden">
    <template #title>
      Site admin links
    </template>
    <template #nav>
      <div
        class="flex justify-between items-center"
      >
        <nav class="ml-auto">
          <span class="ml-auto uppercase text-small">{{ currentStepsVersionLabel }}</span>
          <span class="mx-2 sm:mx-4">|</span>
          <nuxt-link
            class="text-small focus:outline-none focus:shadow-outline-on-dark"
            to="/"
          >
            Change version
          </nuxt-link>
        </nav>
      </div>
    </template>
  </LibPreNav>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      stepsVersions: (state) => state.steps.stepsVersions,
      currentStepsVersion: (state) => state.steps.currentStepsVersion,
    }),
    currentStepsVersionLabel(){
      const currentStepVersionIndex = this.stepsVersions.findIndex(version => version.name === this.currentStepsVersion)
      return this.stepsVersions[currentStepVersionIndex].label
    }
  },
}
</script>

<style lang="scss" scoped></style>
