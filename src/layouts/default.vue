<template>
	<div class="container">
		<div class="header">
			<div class="container">
				<div class="header">
					<vs-navbar center-collapsed v-model="active">
						<vs-navbar-item :active="active == 'guide'" id="guide">
							Guide
						</vs-navbar-item>
						<vs-navbar-item :active="active == 'docs'" id="docs">
							Documents
						</vs-navbar-item>
					</vs-navbar>
				</div>
			</div>
			<div class="container">
				<div class="main">
					<slot />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: 'guide',
		}
	},
}
</script>

<style lang="scss" scoped>
.el-aside {
	overflow-x: hidden;
}
</style>
<!-- https://itnext.io/anyway-heres-how-to-create-a-multiple-layout-system-with-vue-and-vue-router-b379baa91a05 -->
