<template>
	<div class="forms-home-container container width-100">
		<div class="forms-home-content-wrapper">
			<div class="home-upper-content flex-line start pt-md mb-md">
				<div class="home-upper-content-title mr-tn">
					Created Forms: {{ allSurveys.length }}
				</div>
				<i-button type="primary" @click="createFormDialog"
					>CREATE FORM</i-button
				>
			</div>
			<div class="home-main-content">
				<div v-if="allSurveys.length > 0" class="row" style="gap: 15px">
					<the-card
						v-for="(survey, i) in allSurveys"
						@click="
							$router.push({
								name: 'create.form.creator',
								params: {
									id: survey.id,
								},
							})
						"
						class="col-md-3"
						:key="'survey ' + survey"
						:id="survey.id"
						:title="survey.title"
					/>
				</div>
				<div v-else class="no-survey-text flex-line center">
					<i class="isax isax-clipboard-close mr-tn" style="color: white"></i>
					<p style="color: white">No Surveys Created</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TheCard from '../../components/global/TheCard.vue'
export default {
	components: {
		TheCard,
	},
	created() {
		if (!this.currentUser) {
			this.$store.dispatch('fetchUser')
		}
		if (this.allSurveys.length === 0) {
			this.$store.dispatch('fetchAllSurveys')
		}
	},
	computed: {
		currentUser() {
			return this.$store.getters.getCurrentUser
		},
		allSurveys() {
			return this.$store.getters.getAllSurveys
		},
	},
	methods: {
		createFormDialog() {
			this.$router.push({ name: 'create.form.index' })
		},
	},
}
</script>

<style lang="scss">
.forms-home-container {
	padding: 0 30px;

	& .forms-home-content-wrapper {
		& .home-main-content {
			& .no-survey-text {
				font-size: 25px;
			}
		}

		& .home-upper-content {
			& .home-upper-content-title {
				font-style: normal;
				font-weight: 500;
				font-size: 24px;
				line-height: 30px;
				color: white;
			}
		}
	}
}
</style>
