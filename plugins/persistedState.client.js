// https://github.com/robinvdvleuten/vuex-persistedstate

import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'morph-vuex',
    paths: [
      'steps.totalActiveSteps',
      'steps.completedSteps',
      'steps.startedSteps',
      'trainee.surveyOneCompleted',
      'trainee.surveyTwoCompleted',
      // 'steps.currentStepsVersion',
      // 'site.deviceOfflineEnabled',
      // 'site.deviceUserResetEnabled',
      // 'site.cacheRefreshedDate',
      // 'site.hasRefreshed'
    ],
  })(store)
}
