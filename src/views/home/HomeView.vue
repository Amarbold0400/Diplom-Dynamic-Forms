<template>
	<div class="forms-home-container container width-100">
		<div class="forms-home-content-wrapper">
			<div class="home-upper-content flex-line start pt-md">
				<div class="home-upper-content-title mr-tn">Created Forms</div>
				<i-button @click="createFormDialog">CREATE FORM</i-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		createFormDialog() {
			this.$router.push({ name: 'create.form.index' })
		},
	},
}
</script>

<style lang="scss">
.forms-home-container {
	padding: 0 30px;

	& .forms-home-content-wrapper {
		& .home-upper-content {
			& .home-upper-content-title {
				font-style: normal;
				font-weight: 500;
				font-size: 24px;
				line-height: 30px;
				color: white;
			}
		}
	}
}
</style>
