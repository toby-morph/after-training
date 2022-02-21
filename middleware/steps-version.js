const getSteps = (stepsDataFile) =>
  import('~/content/steps/' + stepsDataFile).then((m) => m.default || m)

export default async function ({ app, store, redirect, route, env, params }) {
  // are there multiple steps data files?
  const stepsVersions = store.state.steps.stepsVersions
  const isMultiVersion = stepsVersions.length > 1

  // set store isMultiVersions to true if more than 1 version
  if (isMultiVersion && !store.state.site.isMultiVersion) {
    store.dispatch('site/setIsMultiVersion', true)
  }

  // does the route contain a querystring with a version(v) parameter?
  const versionParam = route.query.v ? route.query.v : null
  if (versionParam) {
    // does the version param match an object label in stepsVersions?
    const versionParamValid = stepsVersions.find(
      (version) => version.name === versionParam
    )
    // if so set currentStepVersion to this value in vuex
    if (versionParamValid) {
      store.dispatch('steps/setCurrentStepsVersion', versionParam)
    }
  }

  // get current step version and all data for current steps from store
  const currentStepsVersion = store.state.steps.currentStepsVersion
  const stepsInStore = store.state.steps.steps

  // array to popuate with new steps data, if required
  let stepsData = []

  // if this is a multi-version site...
  if (isMultiVersion) {
    // ...redirect to version-landing page if no version selected
    if (!currentStepsVersion && route.path !== '/') {
      redirect('/')
    } else if (stepsInStore.length === 0 && currentStepsVersion) {
      // ...or populate steps data in store with current version, if empty
      const stepsDataVersion = stepsVersions.find(
        (version) => version.name === currentStepsVersion
      )
      stepsData = await getSteps(stepsDataVersion.file)
      store.dispatch('steps/loadAllSteps', stepsData.steps)
      if (stepsData.steps_strapline) {
        store.dispatch('steps/setCurrentStepsStrapline', stepsData.steps_strapline)
      }
    }
  } else {
    // set stepsVersion in store if not currently set
    if (!currentStepsVersion) {
      store.dispatch('steps/setCurrentStepsVersion', stepsVersions[0].name)
    }
    // set stepsData in store if currently empty
    if (stepsInStore.length === 0) {
      stepsData = await getSteps(stepsVersions[0].file)
      store.dispatch('steps/loadAllSteps', stepsData.steps)
      if (stepsData.steps_strapline) {
        store.dispatch('steps/setCurrentStepsStrapline', stepsData.steps_strapline)
      }
    }
    if (route.path === '/') {
      // or redirect to last step visited?
      redirect('/get-started')
    }
  }
}
