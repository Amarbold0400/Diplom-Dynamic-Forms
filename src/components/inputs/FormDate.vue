<template>
	<div>
		<DatePicker
			v-model="date"
			type="date"
			placeholder="Select date"
			style="width: 200px"
		></DatePicker>
	</div>
</template>

<script>
export default {
	name: 'FormDate',
	data() {
		return {
			date: '',
		}
	},
}
</script>
