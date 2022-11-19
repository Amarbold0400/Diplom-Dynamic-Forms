import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const page = (path) => () =>
	import(`../views/${path}`).then((m) => m.default || m)

const routes = [
	// {
	// 	path: '/:id',
	// 	redirect: (to) => {
	// 		return { path: '/formComplete/:id' }
	// 	},
	// },
	{
		path: '/',
		name: 'HomeView',
		component: page('home/HomeView.vue'),
	},
	{
		path: '/preview/:id',
		name: 'home.preview',
		component: page('home/PreView.vue'),
	},
	{
		path: '/formComplete/:id',
		name: 'form.complete',
		component: page('home/formComplete.vue'),
	},
	{
		path: '/login',
		name: 'login.index',
		component: page('login/loginPage.vue'),
	},
	{
		path: '/createForm',
		name: 'create.form.index',
		component: page('form/formIndex.vue'),
	},
	{
		// Энэ нь id-тай байна. Яг worki тестийн тест initialize хийх endpoint шиг.
		path: '/formCreator/:id',
		name: 'create.form.creator',
		component: page('form/formCreator.vue'),
	},
	{
		// Энэ нь id-тай байна. Яг worki тестийн тест initialize хийх endpoint шиг.
		path: '/formResult/:id',
		name: 'form.result',
		component: page('form/formResult.vue'),
	},

	{
		path: '*',
		name: 'notFound',
		meta: { layout: 'blank' },
		component: page('error/404.vue'),
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
