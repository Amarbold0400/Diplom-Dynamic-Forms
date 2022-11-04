// export default {
// 	forms: [],
// 	activeForm: [],
// 	activeTabForFields: 'elements',
// }

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		forms: [],
		activeForm: [],
		activeTabForFields: 'elements',
	},
	getters: {},
	mutations: {
		EDIT_INPUT(state, payload) {
			state.activeForm = payload
			state.activeTabForFields = 'properties'
		},
		CLONE_INPUT(state, { idx, cloned }) {
			state.forms.splice(idx, 0, cloned)
		},
		DELETE_INPUT(state, payload) {
			state.activeForm = []
			state.activeTabForFields = 'elements'
			let index = state.forms.findIndex((_, idx) => idx == payload)
			state.forms.splice(index, 1)
		},
	},
	actions: {
		editInput({ commit }, payload) {
			commit('EDIT_INPUT', payload)
		},
		cloneInput({ commit }, payload) {
			commit('CLONE_INPUT', payload)
		},
		deleteInput({ commit }, payload) {
			commit('DELETE_INPUT', payload)
		},
	},
})
