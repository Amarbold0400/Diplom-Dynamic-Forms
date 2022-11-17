<template>
	<div
		class="form-template-card-wrapper col-md-2 col-xs-12 col-sm-12 mt-sm"
		@click="initFormCreation"
	>
		<vs-card style="height: 100%">
			<div class="card-title">{{ title }}</div>
			<div class="card-template-icon flex-line center">
				<img
					class="icon-img"
					src="../../assets/img/img-template-blank.svg"
					alt="template-blank"
				/>
			</div>
		</vs-card>
	</div>
</template>

<script>
import Repository from '../../repository/repoFactory'
const testRepo = Repository.get('test')
export default {
	name: 'FormTemplateCard',
	props: {
		title: {
			type: String,
			default: 'Blank',
		},
		type: {
			type: String,
			default: 'blank',
		},
	},
	methods: {
		async initFormCreation() {
			const res = await this.$store.dispatch('createSurveyInit')
			console.log(res)
			if (res != false) {
				this.$router.push({
					name: 'create.form.creator',
					params: {
						id: res.id,
					},
				})
			} else {
				this.$Message.error('There was an error!')
			}
		},
	},
}
</script>

<style lang="scss">
.form-template-card-wrapper {
	height: 180px;
	transition: all 0.3s ease;
	&:hover {
		transform: translateY(-10px);
	}

	& .con-vs-card {
		height: 100%;
		background: #151515;
		border: 1px solid #4a4a4a;
		border-radius: 8px;
		cursor: pointer;

		& .card-title {
			color: white;
			border-bottom: 1px solid #4a4a4a;
			padding-bottom: 5px;
		}

		& .card-template-icon {
			& .icon-img {
				width: 125px;
				height: 125px;
			}
		}
	}
}
</style>
