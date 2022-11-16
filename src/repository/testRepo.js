import Client from '../clients/axiosClient'

export default {
	extractCss(payload) {
		return Client.post(`extractCss`, payload)
	},
	// Below are for signup and login
	signup(payload) {
		return Client.post(`signup`, payload)
	},
	login(payload) {
		return Client.post(`login`, payload)
	},
	// Below are for user
	getSurveyor() {
		const token = vm.$store.getters.getToken
		return Client.get('getSurveyor', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
}

// const resource = '/posts'
//
// export default {
// 	get() {
// 		return Client.get(`${resource}`)
// 	},
// 	getPost(id) {
// 		return Client.get(`${resource}/${id}`)
// 	},
// 	create(payload) {
// 		return Client.post(`${resource}`, payload)
// 	},
// 	update(payload, id) {
// 		return Client.put(`${resource}/${id}`, payload)
// 	},
// 	delete(id) {
// 		return Client.delete(`${resource}/${id}`)
// 	},

// 	// MANY OTHER ENDPOINT RELATED STUFFS
// }
