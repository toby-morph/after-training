const getSteps = (stepsDataFile) =>
    import('~/content/steps/' + stepsDataFile).then((m) => m.default || m)

export default async function ({ store, $auth, $appUser, redirect }) {

    if ($auth.loggedIn) {

        let stepsLoaded = store.state.steps.steps.length !== 0
        let intervention = null

        if ($appUser.isParticipant()) {
            intervention = $auth.user.meta.trial_intervention
        } else {
            intervention = store.state.steps.currentStepsVersion
            if(!intervention){
                intervention = 'unsupervised'
            }
        }

        // const interventionName = 'intervention' + intervention.toUpperCase();
        
        if (store.state.steps.currentStepsVersion !== intervention) {
            store.dispatch('steps/setCurrentStepsVersion', intervention)
            stepsLoaded = false
        }

        if (!stepsLoaded) {

            let stepsData = []
            const interventionJsonFile = 'steps-' + intervention

            stepsData = await getSteps(interventionJsonFile)
            store.dispatch('steps/loadAllSteps', stepsData.steps)
            if(stepsData.steps_strapline){
                store.dispatch('steps/setCurrentStepsStrapline', stepsData.steps_strapline)
            }   
        }
    }

}
