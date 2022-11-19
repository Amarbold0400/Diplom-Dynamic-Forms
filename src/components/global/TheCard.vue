<template>
	<div
		class="card-wrapper flex-col between"
		@click="
			$router.push({
				name: 'create.form.creator',
				params: {
					id: id,
				},
			})
		"
	>
		<Modal
			v-model="modal1"
			title="Are you sure to delete?"
			@on-ok="deleteSurvey"
			@on-cancel="modal1 = false"
		>
		</Modal>
		<div class="form-title flex-line center mt-md">{{ title }}</div>
		<div class="form-controls flex-line between width-100 mb-sm">
			<div class="results ml-tn" @click="showResults">
				Responses : {{ formResults }}
			</div>

			<div class="delete-btn" @click.stop="modal1 = true">
				<i class="isax isax-trash mr-tn" style="color: white"></i>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		id: {
			type: Number,
		},
		title: {
			type: String,
		},
	},
	data() {
		return {
			modal1: false,
		}
	},
	computed: {
		formResults() {
			if (this.$store.getters.getAllSurveys.length > 0) {
				const found = this.$store.getters.getAllSurveys.find(
					(el) => el.id === this.id
				)
				return found.results.length
			}
		},
	},
	methods: {
		showResults() {
			this.$router.push({
				name: 'form.result',
				params: {
					id: this.id,
				},
			})
		},
		deleteSurvey() {
			this.$store.dispatch('deleteSurveyById', this.id)
		},
	},
}
</script>

<style lang="scss" scoped>
.card-wrapper {
	position: relative;
	z-index: 0;
	min-height: 140px;
	background: #151515;
	border-radius: 8px;
	cursor: pointer;

	& .form-title {
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
