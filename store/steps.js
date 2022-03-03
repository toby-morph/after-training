// import stepsData from '@/content/steps.json'

export const state = () => ({
  currentStepsVersion: null, // defined in .env
  currentStepsStrapline: null,
  steps: [],
  totalActiveSteps: 0,
  currentStep: null,
  completedSteps: [],
  startedSteps: false,
  stepsVersions: []
})

export const getters = {
  getSteps: (state) => {
    return state.steps
  },
  getStepByIndex: (state) => (index) => {
    return state.steps[index]
  },
  getStepByNumber: (state) => (stepNumber) => {
    return state.steps.find(
      (step) => parseInt(step.step_number) === parseInt(stepNumber)
    )
  },
}

export const mutations = {
  SET_STEPS_VERSIONS: (state, payload) => {
    state.stepsVersions = payload
  },
  SET_CURRENT_STEPS_STRAPLINE: (state, payload) => {
    state.currentStepsStrapline = payload
  },
  UPDATE_STEPS: (state, payload) => {
    state.steps = payload
  },
  EMPTY_STEPS: (state) => {
    state.steps = []
    state.totalActiveSteps = 0
  },
  SET_CURRENT_STEPS_VERSION: (state, payload) => {
    state.currentStepsVersion = payload
  },
  SET_CURRENT_STEP: (state, stepNum) => {
    state.currentStep = stepNum
  },
  SET_COMPLETED_STEPS: (state, completedSteps) => {
    state.completedSteps = completedSteps
  },
  ADD_COMPLETED_STEP: (state, completedStep) => {
    state.completedSteps.push(parseInt(completedStep))
  },
  EMPTY_COMPLETED_STEPS: (state) => {
    state.completedSteps = []
  },
  SET_STARTED_STEPS: (state, startedSteps) => {
    state.startedSteps = startedSteps
  },
  SET_TOTAL_ACTIVE_STEPS: (state, totalActiveSteps) => {
    state.totalActiveSteps = totalActiveSteps
  },
  RESET_STEPS_STORE: (state) => {
    state.currentStepsVersion = null
    state.currentStepsStrapline = null
    state.steps = []
    state.totalActiveSteps = 0
    state.currentStep = 0
    state.completedSteps = []
    state.startedSteps = false
    state.stepsVersions = []
  },
  RESET_USER_STEPS_STORE: (state) => {
    state.currentStep = 0
    state.completedSteps = []
    state.startedSteps = false
  },
}

export const actions = {
  resetUserStepsStore({ commit }) {
    commit('RESET_USER_STEPS_STORE')
  },
  resetStepsStore({ commit }) {
    commit('RESET_STEPS_STORE')
  },
  loadAllSteps({ commit, dispatch }, stepsData) {
    commit('UPDATE_STEPS', stepsData)
    dispatch('setTotalActiveSteps')
  },
  emptySteps({ commit }) {
    commit('EMPTY_STEPS')
  },
  setStepsVersions({ commit }, stepsVersions) {
    commit('SET_STEPS_VERSIONS', stepsVersions)
  },
  setCurrentStepsVersion({ state, commit, dispatch }, currentStepsVersion) {
    commit('SET_CURRENT_STEPS_VERSION', currentStepsVersion)
  },
  setCurrentStepsStrapline({ commit }, currentStepsStrapline) {
    commit('SET_CURRENT_STEPS_STRAPLINE', currentStepsStrapline)
  },
  setCurrentStep({ commit }, stepNum) {
    commit('SET_CURRENT_STEP', stepNum)
  },
  setStartedSteps({ commit }, startedSteps) {
    commit('SET_STARTED_STEPS', startedSteps)
  },
  setCompletedSteps({ commit }, completedSteps) {
    commit('SET_COMPLETED_STEPS', completedSteps)
  },
  async addCompletedStep({ commit, state, rootState, app }, completedStep) {
    if (!state.completedSteps.includes(parseInt(completedStep))) {
      commit('ADD_COMPLETED_STEP', completedStep)

      // also add completed step to WP db for next login
      try {
        const userId = this.app.$auth.user.id
        const completedStepStr = completedStep.toString()
        await this.$axios.post(
          this.$config.wpHeadlessUrl + `/wp-json/digitrial/v1/user/${userId}/last-step/${completedStepStr}`
        )
        // console.log(response)
      } catch (error) {
        // console.error(error)
      }

    }
  },
  emptyCompletedSteps({ commit }) {
    commit('EMPTY_COMPLETED_STEPS')
  },
  setTotalActiveSteps({ commit, state }) {
    const activeSteps = state.steps.slice().filter(function (step) {
      return step.step_number > 0 && step.step_number < 100
    })
    const totalActiveSteps = activeSteps.length
    commit('SET_TOTAL_ACTIVE_STEPS', totalActiveSteps)
  },
}
