<template>
	<div class="main__wrapper">
		<div class="container">
			<main :style="cssProps">
				<div class="wrapper--forms preview__wrapper">
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
						>
							{{ form.helpBlockText }}
						</small>
					</div>
				</div>
			</main>
		</div>
	</div>
</template>

<script>
import { InputCreator } from '@/components/inputs/inputCreator'

export default {
	name: 'Preview',
	components: InputCreator.$options.components,
	computed: {
		forms() {
			return this.$store.state.forms
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
}
</script>
