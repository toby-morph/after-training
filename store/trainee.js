export const trainee = () => ({
    surveyOneCompleted: false,
    surveyTwoCompleted: false,
})

export const mutations = {
    SET_SURVEY_ONE_COMPLETED: (state, payload) => {
        state.surveyOneCompleted = payload
    },
    SET_SURVEY_TWO_COMPLETED: (state, payload) => {
        state.surveyTwoCompleted = payload
    },
}

export const actions = {
    setSurveyOneCompleted({ commit }, payload) {
        commit('SET_SURVEY_ONE_COMPLETED', payload)
    },
    setSurveyTwoCompleted({ commit }, payload) {
        commit('SET_SURVEY_TWO_COMPLETED', payload)
    },
}