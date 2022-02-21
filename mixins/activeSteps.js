export const activeSteps = {
  computed: {
    activeSteps() {
      const activeSteps = this.steps.slice().filter(function (step) {
        return step.step_number > 0 && step.step_number < 100
      })
      return activeSteps
    },
    totalSteps() {
      return this.activeSteps.length
    },
  },
}
