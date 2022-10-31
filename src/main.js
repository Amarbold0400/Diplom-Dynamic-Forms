import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import '@/assets/scss/app.scss'
import '../src/static/iconsax/style.css'
Vue.use(Vuesax)

import VueLodash from 'vue-lodash'
Vue.use(VueLodash)

Vue.config.productionTip = false

var vm = new Vue({
	router,
	store,
	render: function (h) {
		return h(App)
	},
}).$mount('#app')

global.vm = vm
