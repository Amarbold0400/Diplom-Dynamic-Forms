<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<navbar v-if="isNotCreator" />
		</transition>
		<transition name="fade" mode="out-in">
			<router-view />
		</transition>
	</div>
</template>

<script>
import navbar from '@/components/global/navbar.vue'

export default {
	name: 'App',
	components: {
		navbar,
	},
	computed: {
		isNotCreator() {
			return this.$route.name !== 'create.form.creator' ? true : false
		},
	},
}
</script>

<style lang="scss">
#app {
	background: black;
}
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
