<template>
	<div>
		<vs-radio
			v-model="picked"
			v-for="(item, index) in currentField.options"
			:key="item.optionValue"
			:val="item.optionLabel"
		>
			{{ item.optionValue }}
		</vs-radio>
	</div>
</template>

<script>
export default {
	name: 'RadioInput',
	props: ['currentField'],
	data() {
		return {
			radio: '1',
		}
	},
}
</script>
