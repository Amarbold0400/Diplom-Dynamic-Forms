<template>
	<div class="container width-100">
		<div class="navbar flex-line between">
			<div class="navbar-left" @click="$router.push({ name: 'HomeView' })">
				<p class="logo-text flex-line center">
					<i class="isax isax-note-2 mr-tn" style="color: white"></i> Online
					Form<span class="accent">,</span> Test creator<span class="accent"
						>.</span
					>
				</p>
			</div>
			<div class="navbar-right">
				<vs-button
					flat
					class="ml-sm"
					size="large"
					color="#3f4ad9"
					:active="active === 1"
					@click="navBarClick(1, 'login.index')"
				>
					Login
				</vs-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: 0,
		}
	},
	methods: {
		navBarClick(active, to) {
			this.active = active
			this.$router.push({ name: to })
		},
	},
}
</script>

<style lang="scss">
.navbar {
	padding: 30px;
	background: #151515;
	border-bottom: 1px solid #4a4a4a;

	& .navbar-left {
		cursor: pointer;
		& .accent {
			color: #3f4ad9;
		}
	}

	& .logo-text {
		color: white;
		font-style: normal;
		font-weight: 700;
		font-size: 32px;
		line-height: 40px;
	}
}
</style>
