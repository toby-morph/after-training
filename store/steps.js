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
}

export const actions = {
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
  addCompletedStep({ commit, state }, completedStep) {
    // const completedSteps = [...state.completedSteps]
    if (!state.completedSteps.includes(parseInt(completedStep))) {
      // completedSteps.push(completedStep)
      commit('ADD_COMPLETED_STEP', completedStep)
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
