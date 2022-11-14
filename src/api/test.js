import Client from '../clients/axiosClient'
const resource = './test.js'

export default {
	get() {
		return Client.get(`${resource}`)
	},
	getPost(id) {
		return Client.get(`${resource}/${id}`)
	},
	create(payload) {
		return Client.post(`${resource}`, payload)
	},
	update(payload, id) {
		return Client.put(`${resource}/${id}`, payload)
	},
	delete(id) {
		return Client.delete(`${resource}/${id}`)
	},

	// MANY OTHER ENDPOINT RELATED STUFFS
}
