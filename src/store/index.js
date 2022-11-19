// export default {
// 	forms: [],
// 	activeForm: [],
// 	activeTabForFields: 'elements',
// }

import Vue from 'vue'
import Vuex from 'vuex'
import Repository from '../repository/repoFactory'
const testRepo = Repository.get('test')
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// Below are for survey inputs
		forms: [],
		activeForm: [],
		activeTabForFields: 'elements',
		extractedColors: [],
		themingVars: {
			globalFontFamily: 'Arial',
			globalBackgroundColor: 'black',
			globalFontColor: '#777777',
			globalLinkColor: '#206C92',
			globalFontSize: 16,

			primaryColor: '#FFFFFF',
			labelFontWeight: 500,
			labelFontSize: 16,
			labelMarginBottom: 10,

			formGroupBackgroundColor: '#404040',
			formGroupBackgroundHoverColor: '#969696',
			formGroupBorderWidth: 'thin',
			formGroupBorderStyle: 'solid',
			formGroupBorderColor: '#808080',
			formGroupBorderHoverColor: '#969696',

			helpTextColor: '#cccccc',
			helpTextFontSize: 12,
			helpTextMarginTop: 10,

			inputBorderRadius: 4,
			inputBorderColor: '#dcdfe6',
			inputHoverBorderColor: '#c0c4cc',
			inputFocusBorderColor: '#000000',
			inputShadowColor: '#9D9D9D',

			buttonBackground: '#000000',
			buttonBorderColor: '#000000',
			buttonColor: '#FFFFFF',
		},
		// Below are for login and signup
		token: '',
		user: null,
		// Below are for survey
		surveys: [],
		inputs: [],
		results: [],
	},
	getters: {
		themingVars: (state) => state.themingVars,
		extractedColors: (state) => state.extractedColors,
		getToken: (state) => state.token,
		getCurrentUser: (state) => state.user,
		isAuthenticated: (state) => !!state.token,
		getAllSurveys: (state) => state.surveys,
		getAllInput: (state) => state.inputs,
		getAllResults: (state) => state.results,
	},
	mutations: {
		// Below are for survey inputs
		EDIT_INPUT(state, payload) {
			state.activeForm = payload
			state.activeTabForFields = 'properties'
		},
		CLONE_INPUT(state, { idx, cloned }) {
			state.inputs.splice(idx, 0, cloned)
		},
		DELETE_INPUT(state, payload) {
			state.activeForm = []
			// state.activeTabForFields = 'elements'
			let index = state.inputs.findIndex((_, idx) => idx == payload)
			state.inputs.splice(index, 1)
		},
		SET_EXTRACTED_COLORS(state, payload) {
			state.extractedColors = payload
		},
		// Below are for login and signup
		LOGOUT(state) {
			localStorage.removeItem('accessToken')
			state.token = ''
			state.user = ''
		},
		SET_TOKEN(state, payload) {
			state.token = payload.access_token
		},
		UPDATE_ACCESS_TOKEN(state, payload) {
			state.token = payload
		},
		// Below are for user
		SET_USER(state, payload) {
			state.user = payload
		},
		// Below are for survey
		SET_SURVEYS(state, payload) {
			state.surveys = payload
		},
		PUSH_SURVEY(state, payload) {
			state.surveys.push(payload)
		},
		DELETE_SURVEY(state, payload) {
			const indexOfObject = state.surveys.findIndex((object) => {
				return object.id === payload
			})
			console.log(indexOfObject)
			state.surveys.splice(indexOfObject, 1)

			// state.surveys
		},
		SET_INPUTS(state, payload) {
			// console.log(payload)
			state.inputs = payload
		},
		SET_THEMING_VARS(state, payload) {
			state.themingVars = payload
		},
		// Below are for results
		SET_RESULTS(state, payload) {
			state.results = payload
		},
	},
	actions: {
		// Below are for survey inputs
		editInput({ commit }, payload) {
			commit('EDIT_INPUT', payload)
		},
		cloneInput({ commit }, payload) {
			commit('CLONE_INPUT', payload)
		},
		deleteInput({ commit }, payload) {
			commit('DELETE_INPUT', payload)
		},
		saveExtractColors({ commit }, payload) {
			commit('SET_EXTRACTED_COLORS', payload)
		},
		// Below are for login and signup
		fetchAccessToken({ commit }) {
			commit('UPDATE_ACCESS_TOKEN', localStorage.getItem('accessToken'))
		},
		async login({ commit }, payload) {
			try {
				vm.$vs.loading({ background: 'rgba(28, 28, 28, 0.6)' })
				const { data } = await testRepo.login(payload)
				commit('SET_TOKEN', data)
				localStorage.setItem('accessToken', data.access_token)
				vm.$vs.loading.close()
				setTimeout(() => {
					vm.$Message.success('Successfully Logged In.')
				}, 500)
			} catch (e) {
				vm.$vs.loading.close()
				setTimeout(() => {
					vm.$Message.error('There was an error loggin in!')
				}, 500)
				console.log(e)
			}
		},
		async signup({ commit }, payload) {
			try {
				vm.$vs.loading({ background: 'rgba(28, 28, 28, 0.6)' })
				const { data } = await testRepo.signup(payload)
				commit('SET_TOKEN', data)
				localStorage.setItem('accessToken', data.access_token)
				vm.$vs.loading.close()
				setTimeout(() => {
					vm.$Message.success('Successfully Signed up.')
				}, 500)
			} catch (e) {
				vm.$vs.loading.close()
				setTimeout(() => {
					vm.$Message.error('This was an error signing up!')
				}, 500)
				console.log(e)
			}
		},
		// Below are for user
		async fetchUser({ commit }) {
			try {
				vm.$vs.loading({ background: 'rgba(28, 28, 28, 0.6)' })
				const { data } = await testRepo.getSurveyor()
				commit('SET_USER', data)
				vm.$vs.loading.close()
			} catch (e) {
				vm.$vs.loading.close()
				console.log(e)
			}
		},
		// Below are for surveys
		async fetchAllSurveys({ commit }) {
			try {
				vm.$vs.loading({ background: 'rgba(28, 28, 28, 0.6)' })
				const { data } = await testRepo.getAllSurveys()
				data.forEach((element) => {
					element.questions.map((el) => {
						el['label'] = el.text
						el['fieldType'] = el.type
						delete el.text
						delete el.type
						delete el['formId']
						delete el['order']
						delete el['id']
					})
				})
				commit('SET_SURVEYS', data)
				vm.$vs.loading.close()
			} catch (e) {
				vm.$vs.loading.close()
				console.log(e)
			}
		},
		async deleteSurveyById({ commit }, payload) {
			try {
				vm.$vs.loading({ background: 'rgba(28, 28, 28, 0.6)' })
				const { data } = await testRepo.deleteSurvey(payload)
				commit('DELETE_SURVEY', data)
				vm.$vs.loading.close()
				return data
			} catch (e) {
				vm.$vs.loading.close()
				console.log(e)
				return false
			}
		},
		async createSurveyInit({ commit }) {
			try {
				const { data } = await testRepo.createSurvey()
				commit('PUSH_SURVEY', data)
				return data
			} catch (e) {
				console.log(e)
				return false
			}
		},
		storeAllInputs({ commit }, payload) {
			payload.map((el) => {
				el['label'] = el.text
				el['fieldType'] = el.type
				delete el.text
				delete el.type
				delete el['formId']
				delete el['order']
				// delete el['id']
			})
			// console.log(payload)
			commit('SET_INPUTS', payload)
		},
		storeThemingVars({ commit }, payload) {
			commit('SET_THEMING_VARS', payload)
		},
		// Below are for results
		async fetchAllResults({ commit }, payload) {
			try {
				const { data } = await testRepo.getAllResultsByFormId(payload)
				commit('SET_RESULTS', data)
				return data
			} catch (e) {
				console.log(e)
				return false
			}
		},
	},
})
