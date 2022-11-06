import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import { vsCard } from 'vuesax'
import 'vuesax/dist/vuesax.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '@/assets/scss/app.scss'
import '../src/static/iconsax/style.css'
Vue.use(iView)
Vue.use(vsCard)

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
