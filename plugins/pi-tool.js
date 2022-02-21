export default ({ params, route, redirect, store }, inject) => {
  const piTool = {}

  piTool.lastStepCompleted = () => {
    let lastStepCompleted = null

    // check if vuex completedSteps array is populated
    let completedSteps = store.state.steps.completedSteps

    // if not, check if there's anything in localStorage
    if (completedSteps.length === 0) {
      const localStorageData = JSON.parse(
        window.localStorage.getItem('patient-info-vuex')
      )
      if (localStorageData) {
        completedSteps = localStorageData.steps.completedSteps
      }
    }
    // if completedSteps array has any items, return this, otherwise null
    if (completedSteps.length > 0) {
      lastStepCompleted = Math.max(...completedSteps)
    }
    return lastStepCompleted
  }

  // the step following the last step completed has been visited
  piTool.lastStepVisited = () => {
    const lastStepCompleted = parseInt(piTool.lastStepCompleted())
    let lastStepVisited = 0
    if (lastStepCompleted >= 0) {
      lastStepVisited = parseInt(lastStepCompleted + 1)
    }
    return lastStepVisited
  }

  piTool.nextStepUnvisited = () => {
    const lastStepVisited = piTool.lastStepVisited()
    const nextStepUnvisited = parseInt(lastStepVisited + 1)
    return nextStepUnvisited
  }

  piTool.resetForNewUser = () => {
    store.dispatch('steps/emptyCompletedSteps')
    store.dispatch('steps/setCurrentStep', 0)
    store.dispatch('steps/setStartedSteps', false)
    store.dispatch('site/hasRefreshed', true)
  }

  piTool.lastStepVisitedRoute = () => {
    let lastStepVisitedRoute = null

    const lastStepVisited = piTool.lastStepVisited()
    const totalActiveSteps = store.state.steps.totalActiveSteps

    if (lastStepVisited > 0) {
      lastStepVisitedRoute =
        lastStepVisited >= totalActiveSteps
          ? '/thankyou'
          : '/steps/' + lastStepVisited
    } else {
      lastStepVisitedRoute = '/get-started'
    }

    return lastStepVisitedRoute
  }

  inject('piTool', piTool)
}
