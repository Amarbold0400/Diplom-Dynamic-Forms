<template>
	<div>
		<RadioGroup v-model="vertical" vertical>
			<Radio
				v-model="picked"
				v-for="(item, index) in currentField.options"
				:key="item.optionValue"
				:val="item.optionLabel"
			>
				{{ item.optionValue }}</Radio
			>
		</RadioGroup>
		<!-- <Radio
			v-model="picked"
			v-for="(item, index) in currentField.options"
			:key="item.optionValue"
			:val="item.optionLabel"
		>
			{{ item.optionValue }}</Radio
		> -->
		<!-- <vs-radio
			v-model="picked"
			v-for="(item, index) in currentField.options"
			:key="item.optionValue"
			:val="item.optionLabel"
		>
			{{ item.optionValue }}
		</vs-radio> -->
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

<style lang="scss">
.ivu-radio-wrapper {
	// color: white;
}
</style>
