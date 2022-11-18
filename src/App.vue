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
import { mapActions } from 'vuex'
import navbar from '@/components/global/navbar.vue'

export default {
	name: 'App',
	components: {
		navbar,
	},
	created() {
		this.fetchAccessToken()
	},

	methods: {
		...mapActions(['fetchAccessToken']),
	},
	computed: {
		isNotCreator() {
			return this.$route.name == 'create.form.creator'
				? false
				: this.$route.name == 'home.preview'
				? false
				: this.$route.name == 'form.complete'
				? false
				: true
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

.v-transfer-dom {
	& .ivu-modal-wrap {
		& .ivu-modal {
			& .ivu-modal-content {
				background: #151515;

				& .ivu-modal-header {
					& .ivu-modal-header-inner {
						color: white;
					}
				}

				& .ivu-modal-body {
					display: none;
				}

				& .ivu-modal-footer {
					& .ivu-btn-text {
						& > span {
							display: none;
						}
						&::after {
							content: 'Cancel';
						}
					}
					& .ivu-btn-primary {
						& > span {
							display: none;
						}
						&::after {
							content: 'Yes';
						}
					}
				}
			}
		}
	}
}
</style>
