<template>
	<div class="form-creator-container">
		<div class="form-upper-content-wrapper container width-100">
			<div class="form-creator-content">
				<div class="upper-content flex-col start">
					<i-button
						class="mr-sm"
						type="primary"
						size="large"
						@click="$router.push({ name: 'create.form.creator' })"
					>
						<!-- tuhain form-iin id ni paramsaar orno deerh click deer -->
						<div class="upper-nav-text flex-line center">
							<i
								class="isax isax-arrow-left"
								@click="
									$router.push({
										name: 'create.form.creator',
										params: {
											id: $route.params.id,
										},
									})
								"
							/></div
					></i-button>
				</div>
			</div>
		</div>
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
				<i-button style="width: 500px; height: 40px">Submit</i-button>
			</div>
		</div>
	</div>
</template>

<script>
import { InputCreator } from '@/components/inputs/inputCreator'
import Repository from '../../repository/repoFactory'
const testRepo = Repository.get('test')
import { cloneDeep } from 'lodash'
export default {
	name: 'Preview',
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
		}
	},
	computed: {
		// forms() {
		// 	return this.$store.state.forms
		// },

		forms() {
			return this.$store.getters.getAllInput
			// return this.$store.state.forms
			// const found = this.$store.getters.getAllSurveys.find(
			// 	(el) => el.id == this.$route.params.id
			// )
			// console.log(found)
			// if (found && found.questions) {
			// 	const cloned = cloneDeep(found.questions)
			// 	return cloned
			// 	// TODO front-oos yavj baigaa form-iin propertynuudtai adil back-iig yanzlah
			// 	// return this.$store.state.surveys
			// } else {
			// 	return this.$store.state.forms
			// }
		},
		themingVars() {
			return this.$store.state.themingVars
		},
		cssProps() {
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
		},
	},
	methods: {
		async fetchSurveyById() {
			const { data } = await testRepo.getSurveyById(this.$route.params.id)
			this.title = data.title
			this.$store.dispatch('storeAllInputs', data.questions)
			// this.$store.dispatch('fetchAllSurveys')
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
