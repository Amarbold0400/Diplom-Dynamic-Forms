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
							@click="$router.push({ name: create.form.creator })"
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
							@click="$router.push({ name: create.form.creator })"
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
					@click="active = 1"
				>
					Edit
				</div>
				<div
					class="edit-option 2"
					:class="{ active: active === 2 }"
					@click="active = 2"
				>
					Design
				</div>
				<div
					class="edit-option 3"
					:class="{ active: active === 3 }"
					@click="active = 3"
				>
					Edit 3
				</div>
				<div
					class="edit-option 4"
					:class="{ active: active === 4 }"
					@click="active = 4"
				>
					Edit 4
				</div>
				<div
					class="edit-option 5"
					:class="{ active: active === 5 }"
					@click="active = 5"
				>
					Edit 5
				</div>
			</div>
		</div>
		<div class="form-main-content-wrapper row reverse">
			<div class="main-content-sidebar right col-md-3 pt-sm">
				<!-- <properties v-if="showProperties && forms.length > 0"></properties>
				<div v-else-if="showProperties && forms.length == 0">
					Choose an input
				</div> -->
				<design v-if="active == 2"></design>
				<!-- <div v-else="active == 2 && activeForm.length == 0">Hello</div> -->
				<!-- <div>design options</div>
				<div>design options</div>
				<div>design options</div>
				<div>design options</div>
				<div>design options</div>
				<div>design options</div> -->
			</div>
			<div class="main-content col-md flex-line center" :style="cssProps">
				<draggable :list="forms" class="dragArea" :options="sortElementOptions">
					<div
						v-for="(form, index) in forms"
						:key="index"
						v-bind="form"
						class="form__group"
						:class="{ 'is--active': form === activeForm }"
						@click="editElementProperties(form)"
					>
						<span class="form__selectedlabel">{{ form.fieldType }}</span>

						<div>
							<label
								class="form__label"
								v-model="form.label"
								v-show="form.hasOwnProperty('label')"
								>{{ form.label }}</label
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
								>{{ form.helpBlockText }}
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
								v-show="!form.isUnique"
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
			<div class="main-content-sidebar left col-md-3 pt-sm">
				<div class="inputs-title-text mb-sm">Inputs</div>
				<inputs />
			</div>
		</div>
	</div>
</template>

<script>
import { InputCreator } from '@/components/inputs/inputCreator'
export default {
	components: InputCreator.$options.components,
	data() {
		return {
			active: 1,
			sortElementOptions: InputCreator.$data.sortElementOptions,
			showProperties: false,
		}
	},
	computed: {
		themingVars() {
			return this.$store.state.themingVars
		},
		cssProps() {
			// Return an object that will generate css properties key
			// to match with the themingVars
			//
			// Example output: { '--theme-primary-color': this.themingVars.primaryColor }
			var result = {},
				themingVars = this.themingVars

			for (var v in themingVars) {
				if (themingVars.hasOwnProperty(v)) {
					var newV = '--theme-' + _.kebabCase(v),
						suffix = ''

					// Add px to the value if the default value contain 'px'
					if (_.includes(newV, 'size')) suffix = 'px'
					else if (_.includes(newV, 'margin')) suffix = 'px'
					else if (_.includes(newV, 'radius')) suffix = 'px'

					result[newV] = themingVars[v] + suffix
				}
			}

			// console.log('result', result)

			return result
		},
		forms() {
			return this.$store.state.forms
		},
		activeForm() {
			return this.$store.state.activeForm
		},
	},
	methods: {
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
	},
}
</script>

<style lang="scss">
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
				cursor: pointer;
				color: white;

				&.active {
					border-bottom: 1px solid white;
				}
			}
		}
	}

	& .form-main-content-wrapper {
		height: 85vh;

		& .main-content {
			& .dragArea {
				// width: 100%;
				max-width: 600px;
				margin-left: auto;
				margin-right: auto;
				position: relative;
				top: 10px;
				min-height: 10px;
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
					border: 1px solid black;
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
								border-color: lighten(black, 25%);
								// background: lighten(black, 25%);
							}
						}
					}

					&:hover {
						border-color: lighten(black, 80%);

						.form__actionitem--move {
							visibility: visible;
						}
					}

					&.is--active {
						border-color: lighten(black, 50%);
						background: lighten(black, 25%);

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

			& > div {
				// color: white;
			}

			& .inputs-title-text {
				font-style: normal;
				font-weight: 500;
				font-size: 25px;
				line-height: 30px;
				// color: white;
			}
		}
	}
}
</style>
