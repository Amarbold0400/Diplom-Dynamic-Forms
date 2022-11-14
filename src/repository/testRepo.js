import Client from '../clients/axiosClient'

export default {
	extractCss(payload) {
		return Client.post(`extractCss`, payload)
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
