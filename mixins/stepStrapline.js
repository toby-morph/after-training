import { mapState } from 'vuex'

export const stepStrapline = {
  computed: {
    ...mapState({
      siteStrapline: (state) => state.site.siteDetails.siteStrapline,
      currentStepsVersion: (state) => state.steps.currentStepsVersion,
      stepsVersions: (state) => state.steps.stepsVersions,
    }),
    stepStrapline(){
      let stepStrapline = null
      if(this.step && this.step.step_strapline){
        stepStrapline = this.step.step_strapline
      } else {
        const currentStepVersionObj = this.stepsVersions.find(version => version.name === this.currentStepsVersion)
        stepStrapline = currentStepVersionObj ? currentStepVersionObj.label : this.siteStrapline
      }
      return stepStrapline
    },
  }
}
