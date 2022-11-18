<template>
	<div>
		<Input
			class="mt-ten mb-tn"
			:placeholder="
				currentField.isPlaceholderVisible ? currentField.placeholder : ''
			"
			:value="value"
			@on-change="onChange($event.target.value)"
		>
		</Input>
	</div>
</template>

<script>
export default {
	name: 'TextInput',
	props: ['currentField', 'value'],
	emits: ['update:modelValue'],
	methods: {
		onChange(value) {
			console.log('changin2')
			this.$emit('input', value)
		},
	},
}
</script>
