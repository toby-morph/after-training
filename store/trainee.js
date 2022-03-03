export const state = () => ({
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
    RESET_TRAINEE_STORE: (state) => {
        state.surveyOneCompleted = false
        state.surveyTwoCompleted = false
    },
}

export const actions = {
    resetTraineeStore({ commit }){
        commit('RESET_TRAINEE_STORE')
    },
    setSurveyOneCompleted({ commit }, payload) {
        commit('SET_SURVEY_ONE_COMPLETED', payload)
    },
    setSurveyTwoCompleted({ commit }, payload) {
        commit('SET_SURVEY_TWO_COMPLETED', payload)
    }
}