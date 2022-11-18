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
	// Below are for Survey
	getAllSurveys() {
		const token = vm.$store.getters.getToken
		return Client.get('allSurveys', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
	getSurveyById(id) {
		const token = vm.$store.getters.getToken
		return Client.get(`survey/${id}`, {
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

		payload.questions.forEach((el, i) => {
			if (el.fieldType === 'RadioInput') {
				el.options.map((opt) => {
					opt['text'] = opt.optionValue
					delete opt['optionLabel']
					delete opt['optionValue']
				})
			}
			el['order'] = i
			el['text'] = el.label
			el['type'] = el.fieldType
			delete el.label
		})
		return Client.put(
			`survey/${payload.id}`,
			{
				formId: parseInt(payload.id),
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
	deleteSurvey(payload) {
		const token = vm.$store.getters.getToken
		return Client.delete(`survey/${payload}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	},
	// Below are for result
	saveResult(payload) {
		return Client.post(`saveResult/${parseInt(payload.id)}`, {
			formId: parseInt(payload.id),
			surveyeeNick: payload.surveyeeNick,
			answers: [...payload.answer],
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
