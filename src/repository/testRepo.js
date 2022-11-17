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
	getAllSurveys() {
		const token = vm.$store.getters.getToken
		return Client.get('allSurveys', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
	createSurvey(payload) {
		const token = vm.$store.getters.getToken
		const userId = vm.$store.getters.getCurrentUser

		return Client.post(
			`create`,
			{
				title: 'Untitled',
				surveyorId: userId,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
	},
	updateSurvey(payload) {
		const token = vm.$store.getters.getToken
		const userId = vm.$store.getters.getCurrentUser
		// console.log(payload)
		// const questions = payload.questions.forEach((el) => {
		// 	delete el['fieldType']
		// 	delete el['helpBlockText']
		// 	delete el['isHelpBlockVisible']
		// 	delete el['isPlaceholderVisible']
		// 	delete el['isRequired']
		// 	delete el['isUnique']
		// 	delete el['placeholder']
		// 	el['order'] = i
		// 	el.text = el.label
		// 	delete el.label
		// })
		console.log(payload)
		return Client.put(
			`survey/${payload.id}`,
			{
				formId: payload.id,
				title: payload.title,
				createdBy: payload.createdBy,
				questions: payload.questions,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
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
