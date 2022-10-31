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
						<vs-button
							flat
							size="large"
							color="#3f4ad9"
							class="mr-md"
							@click="$router.push({ name: create.form.creator })"
						>
							<!-- tuhain form-iin id ni paramsaar orno deerh click deer -->
							<div class="upper-nav-text flex-line center">
								<i class="isax isax-edit mr-four" />
								<p>Create</p>
							</div>
						</vs-button>

						<vs-button
							flat
							size="large"
							color="#3f4ad9"
							@click="$router.push({ name: create.form.creator })"
						>
							<!-- deerh click preview uchir route-ee solino formsID params bas nemegdene -->
							<div class="upper-nav-text flex-line center">
								<i class="isax isax-eye mr-four" />
								<p>Preview</p>
							</div>
						</vs-button>
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
					Edit 2
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
				<div>design options</div>
				<div>design options</div>
				<div>design options</div>
				<div>design options</div>
				<div>design options</div>
				<div>design options</div>
			</div>
			<div class="main-content col-md flex-line center">
				<draggable :list="forms" class="dragArea" :options="sortElementOptions">
					<div
						v-for="(form, index) in forms"
						:key="index"
						v-bind="form"
						class="form__group"
						:class="{ 'is--active': form === activeForm }"
					>
						<span class="form__selectedlabel">{{ form.fieldType }}</span>

						<div @click="editElementProperties(form)">
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
						<div class="form__actiongroup">
							<vs-button class="form__actionitem--move">Move</vs-button>

							<vs-button-group>
								<vs-button
									@click="cloneElement(index, form)"
									v-show="!form.isUnique"
								>
									Clone
								</vs-button>
								<vs-button @click="deleteElement(index)">Delete</vs-button>
							</vs-button-group>
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
		}
	},
	computed: {
		forms() {
			return this.$store.state.forms
		},
		activeForm() {
			return this.$store.state.activeForm
		},
	},
	methods: {
		editElementProperties(form) {
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
				max-width: 600px;
				margin-left: auto;
				margin-right: auto;
				position: relative;
				top: 10px;
				min-height: 10px;
				z-index: 2;

				& .form__group {
					& .form__selectedlabel {
						color: white;
					}
					& .form__label {
						color: white;
					}
				}
			}
		}

		& .main-content-sidebar {
			border-left: 1px solid #4a4a4a;
			background: #151515;
			padding-left: 30px;

			&.left {
				border-left: none;
				border-right: 1px solid #4a4a4a;
			}

			& > div {
				color: white;
			}

			& .inputs-title-text {
				font-style: normal;
				font-weight: 500;
				font-size: 25px;
				line-height: 30px;
				color: white;
			}
		}
	}
}
</style>
