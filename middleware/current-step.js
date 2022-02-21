export default function ({ route, params, store }) {
    let stepNum = null
    if ('step' in params) {
        stepNum = params.step
    }
    if (route.path.includes('/get-started')) {
        stepNum = 0
    }
    if (route.path.includes('/thankyou')) {
        stepNum = 100
    }
    if (stepNum !== null) {
        store.dispatch('steps/setCurrentStep', stepNum)
    }
}
