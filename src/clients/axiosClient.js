import axios from 'axios'

const baseDomain = 'http://localhost:3333'
const baseURL = `${baseDomain}` // Incase of /api/v1;

// ALL DEFUALT CONFIGURATION HERE

export default axios.create({
	baseURL,
	headers: {
		// "Authorization": "Bearer xxxxx"
	},
})
