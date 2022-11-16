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
		<div class="form-title flex-line center mt-md">{{ title }}</div>
		<div class="form-controls flex-line between width-100 mb-sm">
			<div class="results ml-tn" @click="showResults">Results : 0</div>

			<i class="isax isax-trash mr-tn" style="color: white"></i>
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
		// results: {
		// 	type: Array,
		// },
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
	},
}
</script>

<style lang="scss" scoped>
.card-wrapper {
	min-height: 140px;
	background: #151515;
	border-radius: 8px;
	cursor: pointer;

	& .form-title {
		color: white;
		font-size: 20px;
	}

	& .form-controls {
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
