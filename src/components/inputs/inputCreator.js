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
					name: 'RadioButton',
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
			this.$store.state.activeForm = []
			this.$store.state.activeTabForFields = 'elements'
			this.$delete(vm.$store.forms, index)
		},
		cloneElement(index, form) {
			console.log(vm)
			var cloned = lodash.cloneDeep(form) // clone deep lodash
			vm.$store.forms.splice(index, 0, cloned)
		},
		editElementProperties(form) {
			vm.$store.activeForm = form
			vm.$store.activeTabForFields = 'properties'
		},
	},
})
