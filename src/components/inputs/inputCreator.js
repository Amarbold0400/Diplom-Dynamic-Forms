import Vue from 'vue'
import lodash from 'lodash'

import draggable from 'vuedraggable'

import RadioInput from '@/components/inputs/RadioInput'
import TextInput from '@/components/inputs/TextInput'

import Inputs from '@/components/inputs/Inputs.vue'
import Properties from '@/components/inputs/properties.vue'
// import Theming from '@/components/form_elements/Theming'

export const InputCreator = new Vue({
	components: {
		Inputs,
		draggable,
		RadioInput,
		TextInput,
		Properties,
	},
	data() {
		return {
			fields: [
				{
					name: 'TextInput',
					text: 'Text',
					group: 'form', //form group
					hasOptions: false,
					isRequired: false,
					isHelpBlockVisible: false,
					isPlaceholderVisible: true,
					isUnique: false,
				},
				{
					name: 'RadioInput',
					text: 'Radio',
					group: 'form',
					hasOptions: true,
					isRequired: false,
					isHelpBlockVisible: false,
					isPlaceholderVisible: false,
					isUnique: false,
				},
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
		deleteElement(index) {
			vm.$store.dispatch('deleteInput', index)
		},
	},
})
