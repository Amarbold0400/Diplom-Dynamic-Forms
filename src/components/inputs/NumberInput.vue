<template>
	<div>
		<InputNumber v-model="number" :min="0" :max="50"></InputNumber>
	</div>
</template>

<script>
export default {
	name: 'NumberInput',
	data() {
		return {
			number: 10,
		}
	},
}
</script>
