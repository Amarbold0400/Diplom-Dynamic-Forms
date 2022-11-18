import Vue from 'vue'
import lodash from 'lodash'

import draggable from 'vuedraggable'

import RadioInput from '@/components/inputs/RadioInput'
import TextInput from '@/components/inputs/TextInput'
import NumberInput from '@/components/inputs/NumberInput'
import Button from '@/components/inputs/FormButton'
import FormDate from '@/components/inputs/FormDate'

import Inputs from '@/components/inputs/Inputs.vue'
import Properties from '@/components/inputs/properties.vue'
import Design from '@/components/inputs/design.vue'

export const InputCreator = new Vue({
	components: {
		Inputs,
		draggable,
		RadioInput,
		TextInput,
		NumberInput,
		FormDate,
		Button,
		Properties,
		Design,
	},
	data() {
		return {
			fields: [
				{
					name: 'TextInput',
					text: 'Text',
					group: 'form', //form group
					hasOptions: false,
					isPlaceholderVisible: true,
					// isRequired: false,
					// isHelpBlockVisible: false,
					// isUnique: false,
				},
				{
					name: 'NumberInput',
					text: 'Number',
					group: 'form',
					hasOptions: false,
					isRequired: false,
					isHelpBlockVisible: false,
					isPlaceholderVisible: false,
					isUnique: false,
				},
				{
					name: 'Button',
					text: 'Button',
					group: 'button',
					hasOptions: false,
					isRequired: false,
					isHelpBlockVisible: false,
					isPlaceholderVisible: false,
					isUnique: true,
				},
				{
					name: 'FormDate',
					text: 'Date Picker',
					group: 'form',
					hasOptions: false,
					isRequired: false,
					isHelpBlockVisible: false,
					isPlaceholderVisible: false,
					isUnique: false,
				},
				// {
				// 	name: 'RadioInput',
				// 	text: 'Radio',
				// 	group: 'form',
				// 	hasOptions: true,
				// 	isPlaceholderVisible: false,
				// 	// isRequired: false,
				// 	// isHelpBlockVisible: false,
				// 	// isUnique: false,
				// },
			],

			sortElementOptions: {
				group: { name: 'inputCreator', pull: false, put: true },
				sort: true,
				handle: '.form__actionitem--move',
			},

			dropElementOptions: {
				group: { name: 'inputCreator', pull: 'clone', put: false },
				sort: false,
				ghostClass: 'sortable__ghost',
				filter: '.is-disabled',
			},
		}
	},
	methods: {
		editElementProperties(form) {
			vm.$store.dispatch('editInput', form)
		},
		cloneElement(index, form) {
			var cloned = lodash.cloneDeep(form) // clone deep lodash
			vm.$store.dispatch('cloneInput', { idx: index, cloned: cloned })
		},
		deleteElement(payload) {
			vm.$store.dispatch('deleteInput', payload)
		},
	},
})
