import testRepo from './testRepo'

const repositories = {
	test: testRepo,
}
export default {
	get: (name) => repositories[name],
}
