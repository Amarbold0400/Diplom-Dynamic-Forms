<template>
	<div class="card-wrapper flex-col between" @click="$emit('clicked', id)">
		<div class="form-title flex-line start">Response - {{ index + 1 }}</div>
	</div>
</template>

<script>
export default {
	props: {
		id: {
			type: Number,
		},
		index: {
			type: Number,
		},
	},
	data() {
		return {
			modal1: false,
		}
	},
	computed: {
		// formResults() {
		// 	if (this.$store.getters.getAllSurveys.length > 0) {
		// 		const found = this.$store.getters.getAllSurveys.find(
		// 			(el) => el.id === this.id
		// 		)
		// 		return found.results.length
		// 	}
		// },
	},
	methods: {
		// showResults() {
		// 	this.$router.push({
		// 		name: 'form.result',
		// 		params: {
		// 			id: this.id,
		// 		},
		// 	})
		// },
		deleteSurvey() {
			console.log('')
		},
	},
}
</script>

<style lang="scss" scoped>
.card-wrapper {
	position: relative;
	z-index: 0;
	min-height: 50px;
	background: #151515;
	border-radius: 8px;
	cursor: pointer;
	width: 95%;

	& .form-title {
		margin: auto;
		color: white;
		font-size: 20px;
	}

	& .form-controls {
		position: relative;
		& .delete-btn {
			position: absolute;
			right: 0;
			z-index: 15;
		}

		& .results,
		i {
			padding: 5px;
			color: white;
			border-radius: 8px;
			transition: all 0.2s;
			cursor: pointer;

			&:hover {
				background: grey;
			}
		}
	}
}
</style>
