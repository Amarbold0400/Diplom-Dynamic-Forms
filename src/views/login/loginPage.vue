<template>
	<div class="login-container container mt-lg">
		<div class="form-wrapper">
			<Form
				ref="formValidate"
				:model="formValidate"
				:rules="ruleCustom"
				:label-width="80"
			>
				<FormItem label="Name" prop="name">
					<Input
						v-model="formValidate.name"
						placeholder="Enter your name"
					></Input>
				</FormItem>
				<FormItem label="E-mail" prop="email">
					<Input
						v-model="formValidate.email"
						placeholder="Enter your e-mail"
					></Input>
				</FormItem>

				<FormItem>
					<Button type="primary" @click="handleSubmit('formValidate')"
						>Submit</Button
					>
					<Button @click="handleReset('formValidate')" style="margin-left: 8px"
						>Reset</Button
					>
				</FormItem>

				<FormItem v-if="active === 'login'">
					<div style="color: gray">
						Don't have an account?
						<span class="span-text" @click="active = 'signup'">SIGN UP</span>
					</div>
				</FormItem>
				<FormItem v-else>
					<div style="color: gray">
						Already have an account?
						<span class="spantext" @click="active = 'login'">LOG IN</span>
					</div>
				</FormItem>
			</Form>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			active: 'login',
			formValidate: {
				name: '',
				email: '',
			},
			ruleCustom: {
				name: [
					{
						required: true,
						message: 'The name cannot be empty',
						trigger: 'blur',
					},
				],
				email: [
					{
						required: true,
						message: 'Mailbox cannot be empty',
						trigger: 'blur',
					},
					{ type: 'email', message: 'Incorrect email format', trigger: 'blur' },
				],
			},
		}
	},
	methods: {
		async handleSubmit(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					if (this.active === 'login') {
						this.$store.dispatch('login', this.formValidate)
					} else {
						this.$store.dispatch('signup', this.formValidate)
					}
					this.$router.push({ name: 'HomeView' })
				} else {
					this.$Message.error('Fail!')
				}
			})
		},
		handleReset(name) {
			this.$refs[name].resetFields()
		},
	},
}
</script>

<style lang="scss">
.form-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;

	& .span-text {
		color: #57a3f3;
		cursor: pointer;
	}

	& .ivu-form {
		width: 50%;
		& .ivu-form-item {
			& .ivu-form-item-label {
				color: white;
			}

			& .ivu-form-item-content {
				& .ivu-input-wrapper {
					& .ivu-input-inner-container {
						& .ivu-input {
							color: white;
							background: rgba(100, 100, 100, 0.2);
						}
					}
				}
			}
		}
	}
}
</style>
