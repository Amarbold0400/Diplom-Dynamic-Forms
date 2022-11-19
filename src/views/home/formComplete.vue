<template>
	<div class="form-creator-container">
		<div class="form-main-content-wrapper">
			<div
				class="main-content preview col-md flex-col center"
				:style="cssProps"
			>
				<div class="form-title flex-col center">
					<p class="form-title-p">
						{{ title }}
					</p>
				</div>
				<div
					v-for="(form, index) in forms"
					:key="index"
					v-bind="form"
					class="form__group"
				>
					<label
						class="form__label"
						v-model="form.label"
						v-show="form.hasOwnProperty('label')"
						>{{ index + 1 }}. {{ form.label }}</label
					>

					<component
						:is="form.fieldType"
						:currentField="form"
						class="form__field"
						v-model="models[index].answer"
					>
					</component>

					<small
						class="form__helpblock"
						v-model="form.helpBlockText"
						v-show="form.isHelpBlockVisible"
					>
						{{ form.helpBlockText }}
					</small>
				</div>

				<h4 style="color: white">Nick Name:</h4>
				<Input
					class="mt-ten mb-tn"
					style="width: 500px"
					placeholder="Enter Nick Name here..."
					v-model="nickName"
				>
				</Input>
				<i-button style="width: 500px; height: 40px" @click="submitAnswer"
					>Submit</i-button
				>
			</div>
		</div>
	</div>
</template>

<script>
import { InputCreator } from '@/components/inputs/inputCreator'
import Repository from '../../repository/repoFactory'
const testRepo = Repository.get('test')
export default {
	name: 'FormComplete',
	components: InputCreator.$options.components,
	created() {
		this.fetchSurveyById()
		// if (this.$store.getters.getAllSurveys.length === 0) {
		// 	this.$store.dispatch('fetchAllSurveys')
		// }
	},
	data() {
		return {
			title: '',
			model: '',
			nickName: '',
			css: null,
		}
	},
	computed: {
		models() {
			let arr = []
			const len = this.forms.length
			for (var i = 0; i < len; i++) {
				arr.push({
					questionId: this.forms[i].id,
					answer: null,
				})
			}
			return arr
		},
		forms() {
			return this.$store.getters.getAllInput
		},
		themingVars() {
			return this.$store.state.themingVars
		},
		cssProps() {
			if (this.css === null) {
				let result = {},
					themingVars = this.themingVars

				for (let v in themingVars) {
					if (themingVars.hasOwnProperty(v)) {
						let newV = '--theme-' + _.kebabCase(v),
							suffix = ''

						if (_.includes(newV, 'size')) suffix = 'px'
						else if (_.includes(newV, 'margin')) suffix = 'px'
						else if (_.includes(newV, 'radius')) suffix = 'px'

						result[newV] = themingVars[v] + suffix
					}
				}

				return result
			} else {
				delete this.css['formId']
				delete this.css['id']

				Object.keys(this.css).forEach((e) => {
					this.css[this.kebabize(e)] = this.css[e]
					delete this.css[e]
				})

				Object.keys(this.css).forEach((e) => {
					this.css['--' + e] = this.css[e]
					delete this.css[e]
				})

				return this.css
			}
		},
	},
	methods: {
		kebabize(str) {
			return str
				.split('')
				.map((letter, idx) => {
					return letter.toUpperCase() === letter
						? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
						: letter
				})
				.join('')
		},
		async fetchSurveyById() {
			const { data } = await testRepo.getSurveyById(this.$route.params.id)
			this.title = data.title
			this.css = data.css
			this.$store.dispatch('storeAllInputs', data.questions)
		},
		async submitAnswer() {
			await testRepo.saveResult({
				id: this.$route.params.id,
				surveyeeNick: this.nickName,
				answer: [...this.models],
			})
		},
	},
}
</script>

<style lang="scss">
.form-creator-container {
	& .form-main-content-wrapper {
		height: 100vh;

		& .main-content {
			&.preview {
				height: 100%;
			}

			& .form-title {
				& .form-title-p {
					font-size: 40px;
					color: white;
				}
				margin-bottom: 30px;
			}

			& .form__group {
				min-height: 100px;
				width: 500px;
				border-radius: 8px;
				padding: 10px;
				margin-bottom: 30px;
				cursor: pointer;

				& .form__actiongroup {
					position: relative;

					& .form__actionitem--move {
						position: absolute;
						right: -33px;
						bottom: 70px;
						transform: translateY(-50%);
						visibility: hidden;
					}
				}

				&:hover {
					.form__actionitem--move {
						visibility: visible;
					}
				}

				&.is--active {
					.form__actionlist {
						visibility: visible;
					}
					.form__selectedlabel {
						display: inline-block;
					}
				}
			}
		}

		& .main-content-sidebar {
			border-left: 1px solid #4a4a4a;
			background: #151515;
			padding-left: 30px;
			padding-right: 25px;

			&.left {
				border-left: none;
				border-right: 1px solid #4a4a4a;
			}

			& .inputs-title-text {
				font-style: normal;
				font-weight: 500;
				font-size: 25px;
				line-height: 30px;
			}
		}

		& .spacer {
			background: black;
		}
	}
}
</style>
