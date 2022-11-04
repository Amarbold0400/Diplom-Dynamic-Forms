import Vue from 'vue'
import lodash from 'lodash'

import draggable from 'vuedraggable'

import RadioInput from '@/components/inputs/RadioInput'

import Inputs from '@/components/inputs/Inputs.vue'
// import Properties from '@/components/form_elements/Properties'
// import Theming from '@/components/form_elements/Theming'

export const InputCreator = new Vue({
	components: {
		Inputs,
		draggable,
		RadioInput,
	},
	data() {
		return {
			fields: [
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
		deleteElement(index) {
			vm.$store.dispatch('deleteInput', index)
		},
		cloneElement(index, form) {
			var cloned = lodash.cloneDeep(form) // clone deep lodash
			vm.$store.dispatch('cloneInput', { idx: index, cloned: cloned })
		},
		editElementProperties(form) {
			vm.$store.dispatch('editInput', form)
		},
	},
})
