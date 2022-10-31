<template>
	<div class="inputs-container container">
		<div class="row">
			<draggable
				:list="fields"
				:clone="clone"
				class="dragArea"
				:options="dropElementOptions"
				@start="onStart"
			>
				<div
					class="col-md-12"
					:class="{ 'is-disabled': checkStopDragCondition(field) }"
					v-for="(field, index) in fields"
					:key="index"
				>
					<vs-button flat :active="active == 0" @click="active = 0">
						{{ field.text }}
					</vs-button>
				</div>
			</draggable>
		</div>
	</div>
</template>

<script>
import { InputCreator } from '@/components/inputs/inputCreator'
import draggable from 'vuedraggable'
// import { forms, activeForm } from '@/store/index.js'

export default {
	name: 'Inputs',
	components: { draggable },
	data() {
		return {
			fields: InputCreator.$data.fields,
			dropElementOptions: InputCreator.$data.dropElementOptions,
			active: 0,
		}
	},
	methods: {
		clone(field) {
			var newField = {
				fieldType: field.name,
				isUnique: field.isUnique,
			}

			// Show placeholder
			if (field.isPlaceholderVisible) {
				newField['isPlaceholderVisible'] = false
				newField['placeholder'] = 'Input your text here...'
			}

			// Decide whether display label, required field, helpblock
			if (field.group == 'form') {
				newField['label'] = 'Enter your field label'
				newField['isHelpBlockVisible'] = false
				newField['helpBlockText'] = 'Please input your helpblock here...'
				newField['isRequired'] = false
			}

			if (field.group == 'button') {
				newField['buttonText'] = 'Submit your form'
			}

			if (field.name == 'TextEditor') {
				newField['fieldText'] = 'Start typing...'
			}

			// Add dummy options for loading the radio/checkbox
			if (field.hasOptions) {
				newField['options'] = [
					{ optionLabel: 'Option 1', optionValue: 'Option 1' },
					{ optionLabel: 'Option 2', optionValue: 'Option 2' },
				]
			}

			return newField
		},
		onStart() {
			console.log('start liao')
		},
		checkStopDragCondition(field) {
			let form = this.$store.state.forms
			let formArray = []

			for (var key in form) {
				formArray.push(form[key]['fieldType'])
			}

			// Check if the fieldname exist in formArray
			// And when the field.isUnique too
			return formArray.includes(field.name) && field.isUnique
		},
	},
}
</script>

<style lang="scss" scoped>
.button__sidebar {
	width: 100%;
	margin-bottom: 10px;

	.is-disabled & {
		opacity: 0.4;
	}
}

// Display this ghost in <main> only
.wrapper--forms .sortable__ghost {
	position: relative;
	width: 100%;
	border-bottom: 2px solid black;
	margin-top: 2px;
	margin-bottom: 2px;

	[type='button'] {
		display: none;
	}

	&:before {
		content: 'Drag it here';
		background-color: black;
		color: white;
		position: absolute;
		left: 50%;
		font-size: 10px;
		border-radius: 10px;
		line-height: 15px;
		padding: 0 10px;
		top: -6px;
		transform: translateX(-50%);
	}
}
</style>
