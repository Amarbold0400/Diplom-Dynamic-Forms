<template>
	<div class="form-creator-container">
		<div class="form-upper-content-wrapper container width-100">
			<div class="form-creator-content">
				<div class="upper-content flex-col">
					<i
						class="back-arrow isax isax-arrow-left"
						@click="$router.push({ name: 'HomeView' })"
					/>
					<div class="upper-navigation flex-line center">
						<i-button
							class="mr-sm"
							type="primary"
							size="large"
							@click="$router.push({ name: 'create.form.creator' })"
						>
							<!-- tuhain form-iin id ni paramsaar orno deerh click deer -->
							<div class="upper-nav-text flex-line center">
								<i class="isax isax-edit mr-four" />
								<p>Create</p>
							</div></i-button
						>
						<i-button
							type="primary"
							size="large"
							@click="
								$router.push({
									name: 'home.preview',
									params: {
										id: $route.params.id,
									},
								})
							"
						>
							<!-- deerh click preview uchir route-ee solino formsID params bas nemegdene -->
							<div class="upper-nav-text flex-line center">
								<i class="isax isax-eye mr-four" />
								<p>Preview</p>
							</div>
						</i-button>
					</div>
				</div>
			</div>
		</div>
		<div class="form-upper-edit-wrapper">
			<div class="edit-navbar flex-line center">
				<div
					class="edit-option 1 flex-col"
					:class="{ active: active === 1 }"
					@click="
						active = 1
						activeSidebar = !activeSidebar
					"
				>
					Edit
				</div>
				<div
					class="edit-option 2"
					:class="{ active: active === 2 }"
					@click="
						active = 2
						activeSidebar = !activeSidebar
					"
				>
					Design
				</div>
				<div
					class="edit-option 3"
					:class="{ active: active === 3 }"
					@click="active = 3"
				>
					Share
				</div>
				<div class="edit-option save mr-sm">
					<i-button type="primary" size="large" @click="saveForm">
						<div class="upper-nav-text flex-line center">
							<i class="isax isax-save-add mr-four" />
							<p>Save</p>
						</div>
					</i-button>
				</div>
			</div>
		</div>
		<div class="form-main-content-wrapper row reverse">
			<div class="main-content-sidebar right col-md-2 pt-sm">
				<transition name="fade" mode="out-in">
					<properties
						v-if="showProperties && forms.length > 0 && active == 1"
					></properties>
					<div v-else-if="showProperties && forms.length == 0 && active == 1">
						Choose an input
					</div>
					<design v-if="active == 2"></design>
					<share v-if="active == 3"></share>
				</transition>
			</div>
			<div class="main-content col-md flex-col center" :style="cssProps">
				<div class="form-title flex-col center">
					<p class="form-title-p">
						{{ form.title }}
					</p>

					<Input v-model="form.title" size="large" placeholder="Form Title" />
				</div>
				<draggable :list="forms" class="dragArea" :options="sortElementOptions">
					<div
						v-for="(form, index) in forms"
						:key="index"
						v-bind="form"
						class="form__group"
						:class="{ 'is--active': form === activeForm }"
						@click="editElementProperties(form)"
					>
						<span class="form__selectedlabel">{{ index + 1 }}.</span>

						<div>
							<label
								class="form__label"
								v-model="form.label"
								v-show="form.hasOwnProperty('label')"
							>
								{{ form.label }}
							</label>

							<component
								:is="form.fieldType"
								:currentField="form"
								class="form__field"
							/>

							<small
								class="form__helpblock"
								v-model="form.helpBlockText"
								v-show="form.isHelpBlockVisible"
							>
								{{ form.helpBlockText }}
							</small>
						</div>

						<!-- Actions list -->
						<div class="form__actiongroup flex-line end">
							<i-button
								type="primary"
								size="large"
								class="form__actionitem--move"
							>
								<i class="isax isax-row-vertical"></i
							></i-button>
							<i-button
								class="mr-tn"
								type="primary"
								size="large"
								@click="cloneElement(index, form)"
								v-show="form.fieldType !== 'Button'"
								>Clone</i-button
							>
							<i-button
								type="primary"
								size="large"
								@click="deleteElement(index)"
								>Delete</i-button
							>
						</div>
					</div>
				</draggable>
			</div>

			<div
				class="main-content-sidebar left col-md-2 pt-sm"
				:class="active != 2 ? 'edit' : ''"
			>
				<div class="inputs-title-text mb-sm">Inputs</div>
				<inputs />
			</div>
			<!-- <div v-if="active == 2" class="spacer col-md-3"></div> -->
		</div>
	</div>
</template>

<script>
import { InputCreator } from '@/components/inputs/inputCreator'
import Repository from '../../repository/repoFactory'
const testRepo = Repository.get('test')
import { cloneDeep } from 'lodash'
export default {
	components: InputCreator.$options.components,
	data() {
		return {
			activeSidebar: false,
			active: 1,
			sortElementOptions: InputCreator.$data.sortElementOptions,
			showProperties: false,

			form: {
				title: '',
				createdBy: '',
			},

			css: null,
		}
	},
	created() {
		this.fetchSurveyById()
	},
	computed: {
		allSurveys() {
			return this.$store.getters.getAllSurveys
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

		forms() {
			return this.$store.getters.getAllInput
		},
		activeForm() {
			return this.$store.state.activeForm
		},
		surveys() {
			return this.$store.state.inputs
		},
	},
	methods: {
		formTitle() {
			const found = this.$store.getters.getAllSurveys.find(
				(el) => el.id === this.$route.params.id
			)
			if (found) {
				return found.title
			} else {
				return 'Untitled'
			}
		},
		createdById() {
			if (this.$store.getters.getAllSurveys.length === 0) {
				return null
			} else {
				return this.$store.getters.getAllSurveys.find(
					(el) => el.id === this.$route.params.id
				).createdBy
			}
		},

		editElementProperties(form) {
			this.showProperties = true
			InputCreator.editElementProperties(form)
		},
		cloneElement(index, form) {
			InputCreator.cloneElement(index, form)
		},
		deleteElement(index) {
			InputCreator.deleteElement(index)
		},
		// For survey
		async saveForm() {
			try {
				this.$Loading.start()
				this.$vs.loading({
					background: 'rgba(28, 28, 28, 0.6)',
				})
				const { data } = await testRepo.updateSurvey({
					...this.form,
					questions: this.surveys,
					id: this.$route.params.id,
					css: this.cssProps,
				})
				this.$store.dispatch('storeAllInputs', data.questions)
			} catch (e) {
				console.log(e)
				this.$Loading.finish()
				this.$vs.loading.close()
			}

			this.$Loading.finish()
			this.$vs.loading.close()
		},
		async fetchSurveyById() {
			const { data } = await testRepo.getSurveyById(this.$route.params.id)
			this.form.title = data.title
			this.form.createdBy = data.surveyorId
			this.css = data.css
			this.$store.dispatch('storeAllInputs', data.questions)
		},
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
	},
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.form-creator-container {
	& .form-upper-content-wrapper {
		padding: 15px 30px;
		background: #151515;
		border-bottom: 1px solid #4a4a4a;

		& .form-creator-content {
			& .upper-content {
				position: relative;

				& .back-arrow {
					position: absolute;
					left: 0;
					font-size: 24px;
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
		}
	}

	& .form-upper-edit-wrapper {
		padding: 15px 30px;
		background: #151515;
		border-bottom: 1px solid #4a4a4a;

		& .edit-navbar {
			gap: 25px;

			& .edit-option {
				position: relative;
				cursor: pointer;
				color: white;

				&.save {
					position: absolute;
					right: 0;
				}

				&.active {
					border-bottom: 1px solid white;
				}
			}
		}
	}

	& .form-main-content-wrapper {
		min-height: 100vh;
		position: relative;

		& .main-content {
			& .form-title {
				margin-top: 15px;
				margin-bottom: 15px;

				& .form-title-p {
					color: white;
					font-size: 25px;
					margin-bottom: 5px;
				}
			}

			& .dragArea {
				// width: 100%;
				max-width: 600px;
				margin-left: auto;
				margin-right: auto;
				position: relative;
				top: 10px;
				min-height: 900px;
				z-index: 2;

				.form__actionlist {
					position: absolute;
					margin-top: 10px;
					visibility: hidden;
					z-index: 3;
					right: 15px;
					border-radius: 2px;
				}

				& .form__group {
					min-height: 170px;
					width: 500px;
					// border: 1px solid;
					border-radius: 8px;
					padding: 10px;
					margin-bottom: 30px;
					cursor: pointer;

					& .form__selectedlabel {
						// color: white;
					}
					& .form__label {
						// color: white;
					}

					& .form__actiongroup {
						position: relative;

						& .form__actionitem--move {
							position: absolute;
							right: -33px;
							bottom: 70px;
							transform: translateY(-50%);
							visibility: hidden;

							&:active,
							&:focus,
							&:hover {
								// border-color: lighten(black, 25%);
								// background: lighten(black, 25%);
							}
						}
					}

					&:hover {
						// border-color: lighten(black, 80%);

						.form__actionitem--move {
							visibility: visible;
						}
					}

					&.is--active {
						// border-color: lighten(black, 50%);
						// background: lighten(black, 25%);

						.form__actionlist {
							visibility: visible;
						}
						.form__selectedlabel {
							display: inline-block;
						}
					}

					& .form__helpblock {
						// color: white;
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

			&.edit {
				width: 100%;
			}

			& > div {
				// color: white;
			}

			& .inputs-title-text {
				font-style: normal;
				font-weight: 500;
				font-size: 25px;
				line-height: 30px;
				color: white;
			}
		}

		& .spacer {
			background: black;
		}
	}
}
</style>
