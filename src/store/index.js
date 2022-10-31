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
	mutations: {},
	actions: {},
	modules: {},
})
