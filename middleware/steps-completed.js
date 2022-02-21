export default function ({ app, store, redirect, params, route, from }) {
  // detect <= ie 11
  if (!document.documentMode) {
    // console.log(store.state.steps.totalActiveSteps)
    // // make sure totalActiveSteps has been dispatched in vuex first
    // store.dispatch('steps/setTotalActiveSteps').then(() => {
    const lastStepVisited = app.$piTool.lastStepVisited()
    const lastStepVisitedRoute = app.$piTool.lastStepVisitedRoute()

    // if user is trying to access a step ahead, redirect to last step visited
    if ('step' in params) {
      // is the user trying to jump ahead?
      if (params.step > lastStepVisited) {
        // is the user not coming from the previous step?
        if (from.path !== lastStepVisitedRoute) {
          // then redirect back to the last step they visited
          redirect(lastStepVisitedRoute)
        }
      }
    } else if (route.path === '/thankyou') {
      const totalActiveSteps = store.state.steps.totalActiveSteps

      if (lastStepVisited <= totalActiveSteps) {
        redirect(lastStepVisitedRoute)
      }
    }
    // })
  } else {
    // if < ie11 redirect to warning message page
    redirect('http://localhost:3000/html/outdated-browser.html')
  }
}
