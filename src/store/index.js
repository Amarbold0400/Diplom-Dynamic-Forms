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
	},
	getters: {
		themingVars: (state) => state.themingVars,
		extractedColors: (state) => state.extractedColors,
	},
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
		SET_EXTRACTED_COLORS(state, payload) {
			state.extractedColors = payload
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
		saveExtractColors({ commit }, payload) {
			commit('SET_EXTRACTED_COLORS', payload)
		},
	},
})
