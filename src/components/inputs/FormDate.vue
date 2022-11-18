<template>
	<div>
		<DatePicker
			type="date"
			placeholder="Select date"
			style="width: 200px"
			:value="value"
			@on-change="onChange($event)"
		></DatePicker>
	</div>
</template>

<script>
export default {
	name: 'FormDate',
	props: ['currentField', 'value'],
	emits: ['update:modelValue'],
	methods: {
		onChange(value) {
			console.log(value)
			this.$emit('input', value)
		},
	},
	data() {
		return {
			date: '',
		}
	},
}
</script>
