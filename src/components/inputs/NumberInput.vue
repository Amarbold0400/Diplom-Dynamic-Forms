<template>
	<div>
		<InputNumber
			:min="0"
			:max="50"
			:value="value"
			@on-change="onChange($event)"
		></InputNumber>
	</div>
</template>

<script>
export default {
	name: 'NumberInput',
	props: ['value'],
	emits: ['update:modelValue'],
	data() {
		return {
			number: 10,
		}
	},
	methods: {
		onChange(value) {
			this.$emit('input', '' + value)
		},
	},
}
</script>
