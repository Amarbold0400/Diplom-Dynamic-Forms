<template>
	<div class="forms-result-container container width-100">
		<div class="forms-result-content-wrapper">
			<div class="upper-content flex-line start mt-sm">
				<i
					class="back-arrow isax isax-arrow-left"
					@click="$router.push({ name: 'HomeView' })"
				/>
			</div>
			<div class="result-upper-content flex-line start pt-md mb-md">
				<div class="result-upper-content-title mr-tn flex-col start">
					<h3>Form Title: "{{ surveyName }}"</h3>
					<h4>Responses: {{ allResults.length }}</h4>
				</div>
			</div>
			<div class="result-main-content row">
				<div class="col-md-3">
					<div
						v-if="allResults.length > 0"
						class="flex-col start"
						style="gap: 15px"
					>
						<result-card
							v-for="(result, i) in allResults"
							@clicked="fetchAnswerByResultId"
							:key="'result ' + result"
							:id="result.id"
							:index="i"
						/>
					</div>
					<div v-else class="no-survey-text flex-line center">
						<i class="isax isax-clipboard-close mr-tn" style="color: white"></i>
						<p style="color: white">No responses</p>
					</div>
				</div>
				<div class="col-md" style="border-left: 1px solid #4a4a4a">
					<div class="flex-col">
						<div
							class="response flex-col start"
							v-for="(answer, i) in allAnswers"
						>
							<div class="response-question">
								Question {{ i + 1 }}: {{ getQuestionTitle(answer.questionId) }}
							</div>

							<div class="response-answer">
								Answer {{ i + 1 }}:
								<span style="font-weight: 800; font-size: 15px">{{
									answer.answer
								}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ResultCard from '../../components/global/ResultCard.vue'
import Repository from '../../repository/repoFactory'
const testRepo = Repository.get('test')
export default {
	components: {
		ResultCard,
	},
	data() {
		return {
			allForms: null,
			allAnswers: null,
		}
	},
	created() {
		if (!this.currentUser) {
			this.$store.dispatch('fetchUser')
		}
		if (this.$store.getters.getAllSurveys.length === 0) {
			this.fetchAllSurvey()
		}
		if (this.allResults.length === 0) {
			this.$store.dispatch('fetchAllResults', this.$route.params.id)
		}
	},
	computed: {
		currentUser() {
			return this.$store.getters.getCurrentUser
		},
		allResults() {
			return this.$store.getters.getAllResults
		},
		surveyName() {
			if (this.allForms !== null && this.allForms.length > 0) {
				return this.allForms.find((el) => el.id == this.$route.params.id).title
			} else {
				return ''
			}
		},
		allQuestions() {
			if (this.allForms !== null) {
				const found = this.allForms.find((el) => el.id == this.$route.params.id)
				return found.questions
			}
		},
	},
	methods: {
		createFormDialog() {
			this.$router.push({ name: 'create.form.index' })
		},
		async fetchAnswerByResultId(id) {
			const { data } = await testRepo.getAllAnswerByResultId(id)
			this.allAnswers = data
			console.log(data)
		},
		async fetchAllSurvey() {
			const { data } = await testRepo.getAllSurveys()
			data.forEach((element) => {
				element.questions.map((el) => {
					el['label'] = el.text
					el['fieldType'] = el.type
					delete el.text
					delete el.type
				})
			})
			this.allForms = data
		},
		getQuestionTitle(id) {
			return this.allQuestions.find((el) => el.id == id).label
		},
		getAnswerByQuestionId(id) {},
		// getFormTitle(formId) {
		// 	return this.allResults.find((el) => el.id == formId).title
		// },
	},
}
</script>

<style lang="scss">
.forms-result-container {
	padding: 0 30px;

	& .forms-result-content-wrapper {
		& .upper-content {
			& .back-arrow {
				font-size: 35px;
				color: white;
				border-radius: 8px;
				cursor: pointer;

				&:hover {
					background: #4a4a4a;
					transition: all 0.2s ease-in;
				}
			}

			& .upper-navigation {
				& .upper-nav-text {
					& i,
					p {
						color: white;
					}
				}
			}
		}

		& .result-main-content {
			border: 1px solid #4a4a4a;
			border-radius: 8px;
			padding: 15px;
			min-height: 350px;

			& .no-survey-text {
				font-size: 25px;
			}

			& .response {
				color: white;
				font-size: 15px;
				margin-bottom: 15px;
				border-bottom: 1px solid white;
				width: 100%;

				& .response-question {
					border-bottom: 1px solid #4a4a4a;
					padding-bottom: 15px;
				}

				& .response-answer {
					margin-top: 15px;
					padding-bottom: 15px;
				}
			}
		}

		& .result-upper-content {
			& .result-upper-content-title {
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
